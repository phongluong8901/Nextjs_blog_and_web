import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import * as yup from 'yup'
import toast from 'react-hot-toast'

// ** Redux Hooks & Actions
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/stores'
import {
    fetchDeliveryTypesAsync,
    createDeliveryTypeAsync,
    updateDeliveryTypeAsync,
    deleteDeliveryTypeAsync,
    deleteManyDeliveryTypesAsync
} from 'src/stores/apps/delivery-type/actions'
import CustomConfirmDialog from 'src/components/custom-confirm-dialog'
import { TDeliveryType } from 'src/types/delivery-type'
import { DeliveryConfigItem } from 'src/configs/delivery'
import { DeliveryTypeForm } from './component/DeliveryTypeForm'
import { DeliveryTypeQuickSelect } from './component/DeliveryTypeQuickSelect'
import { DeliveryTypeList } from './component/DeliveryTypeList'

const DeliveryTypeSettingPage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()

    // ** Redux State
    const { deliveryTypes, total, loading } = useSelector((state: RootState) => state.deliveryType)

    // ** Local States
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [searchVal, setSearchVal] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [selectedItem, setSelectedItem] = useState<TDeliveryType | null>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [selectedRows, setSelectedRows] = useState<string[]>([])

    // ** Dialog States
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openDeleteManyDialog, setOpenDeleteManyDialog] = useState(false)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [selectedQuickItem, setSelectedQuickItem] = useState<DeliveryConfigItem | null>(null)

    // ** Yup Schema Validation
    const schema = useMemo(() => {
        return yup.object().shape({
            name: yup.string().required(t('validation.nameRequired', 'Please enter delivery type name.')),
            price: yup.number().typeError('Must be a number').required('Please enter delivery price'),
        })
    }, [t, i18n.language])

    // ** Fetch Data
    const fetchDeliveryTypes = useCallback(() => {
        dispatch(
            fetchDeliveryTypesAsync({
                page: paginationModel.page + 1,
                limit: paginationModel.pageSize,
                search: searchVal
            })
        )
    }, [dispatch, paginationModel, searchVal])

    // ** Reset page về 0 mỗi khi từ khóa tìm kiếm thay đổi
    useEffect(() => {
        setPaginationModel(prev => ({ ...prev, page: 0 }))
    }, [searchVal])

    useEffect(() => {
        fetchDeliveryTypes()
    }, [fetchDeliveryTypes])

    // ** Submit Handler (Create or Update)
    const onSubmitForm = async (data: { name: string; price: number }) => {
        if (isEdit && selectedId) {
            const res = await dispatch(updateDeliveryTypeAsync({ id: selectedId, data }))
            if (updateDeliveryTypeAsync.fulfilled.match(res)) {
                toast.success('Updated delivery type successfully!')
                handleResetForm()
                fetchDeliveryTypes()
            } else {
                toast.error((res.payload as any)?.message || 'Update failed.')
            }
        } else {
            const res = await dispatch(createDeliveryTypeAsync(data))
            if (createDeliveryTypeAsync.fulfilled.match(res)) {
                toast.success('Created delivery type successfully!')
                handleResetForm()
                fetchDeliveryTypes()
            } else {
                toast.error((res.payload as any)?.message || 'Creation failed.')
            }
        }
    }

    const handleResetForm = () => {
        setIsEdit(false)
        setSelectedId(null)
        setSelectedItem(null)
    }

    // ** Quick Select Handlers
    const handleSelectQuickItem = (item: DeliveryConfigItem) => {
        setSelectedQuickItem(item)
        setOpenConfirmDialog(true)
    }

    const handleConfirmQuickSelect = () => {
        if (selectedQuickItem) {
            setSelectedItem({
                _id: '',
                name: selectedQuickItem.name,
                price: selectedQuickItem.price
            })
            setIsEdit(true)
        }
        setOpenConfirmDialog(false)
    }

    // ** Edit / Delete Handlers
    const handleEditClick = (item: TDeliveryType) => {
        setIsEdit(true)
        setSelectedId(item._id)
        setSelectedItem(item)
    }

    const handleDeleteSingleClick = (id: string) => {
        setSelectedId(id)
        setOpenDeleteDialog(true)
    }

    const handleDeleteSingle = async () => {
        if (!selectedId) return
        const res = await dispatch(deleteDeliveryTypeAsync(selectedId))
        if (deleteDeliveryTypeAsync.fulfilled.match(res)) {
            toast.success('Deleted delivery type successfully!')
            setOpenDeleteDialog(false)
            setSelectedId(null)
            fetchDeliveryTypes()
        } else {
            toast.error('Delete failed.')
        }
    }

    const handleDeleteMany = async () => {
        const res = await dispatch(deleteManyDeliveryTypesAsync({ ids: selectedRows }))
        if (deleteManyDeliveryTypesAsync.fulfilled.match(res)) {
            toast.success('Deleted selected delivery types successfully!')
            setOpenDeleteManyDialog(false)
            setSelectedRows([])
            fetchDeliveryTypes()
        } else {
            toast.error('Delete many failed.')
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', gap: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {t('delivery.title', 'Delivery Type Settings')}
            </Typography>

            <Grid container spacing={3}>
                {/* Form & Quick Select Section */}
                <Grid item xs={12} md={4}>
                    <DeliveryTypeForm
                        isEdit={isEdit}
                        selectedItem={selectedItem}
                        loading={loading}
                        onSubmitForm={onSubmitForm}
                        onResetForm={handleResetForm}
                        schema={schema}
                    />
                    {!isEdit && (
                        <DeliveryTypeQuickSelect onSelectQuickItem={handleSelectQuickItem} />
                    )}
                </Grid>

                {/* Table List Section */}
                <Grid item xs={12} md={8}>
                    <DeliveryTypeList
                        deliveryTypes={deliveryTypes}
                        total={total}
                        loading={loading}
                        searchVal={searchVal}
                        setSearchVal={setSearchVal}
                        paginationModel={paginationModel}
                        setPaginationModel={setPaginationModel}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteSingleClick}
                        onDeleteManyClick={() => setOpenDeleteManyDialog(true)}
                    />
                </Grid>
            </Grid>

            {/* Confirm Dialog Quick Select */}
            <CustomConfirmDialog
                open={openConfirmDialog}
                title='Xác nhận điền mẫu'
                content={`Bạn có muốn điền mẫu "${selectedQuickItem?.name}" với giá ${selectedQuickItem?.price.toLocaleString()} đ vào form không?`}
                confirmText='Xác nhận'
                confirmColor='primary'
                icon='mdi:check-circle-outline'
                loading={false}
                onClose={() => setOpenConfirmDialog(false)}
                onConfirm={handleConfirmQuickSelect}
            />

            {/* Confirm Dialog Delete Single */}
            <CustomConfirmDialog
                open={openDeleteDialog}
                title='Confirm Delete'
                content='Are you sure you want to delete this delivery type?'
                confirmText='Delete'
                confirmColor='error'
                icon='mdi:alert-circle-outline'
                loading={loading}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDeleteSingle}
            />

            {/* Confirm Dialog Delete Many */}
            <CustomConfirmDialog
                open={openDeleteManyDialog}
                title='Confirm Delete Many'
                content={`Are you sure you want to delete ${selectedRows.length} selected delivery types?`}
                confirmText='Delete'
                confirmColor='error'
                icon='mdi:alert-circle-outline'
                loading={loading}
                onClose={() => setOpenDeleteManyDialog(false)}
                onConfirm={handleDeleteMany}
            />
        </Box>
    )
}

export default DeliveryTypeSettingPage