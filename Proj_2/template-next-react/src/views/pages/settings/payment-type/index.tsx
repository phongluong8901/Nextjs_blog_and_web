import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { createPaymentTypeAsync, deleteManyPaymentTypesAsync, deletePaymentTypeAsync, fetchPaymentTypesAsync, updatePaymentTypeAsync } from 'src/stores/apps/payment-type/actions'

import { TPaymentType } from 'src/types/payment-type'
import { PAYMENT_TYPE_OPTIONS } from 'src/configs/payment'

// ** Components
import CustomConfirmDialog from 'src/components/custom-confirm-dialog'
import PaymentTypeForm from './component/PaymentTypeForm'
import PaymentTypeTemplates from './component/PaymentTypeTemplates'
import PaymentTypeListTable from './component/PaymentTypeListTable'


const PaymentTypeSettingPage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()

    const { paymentTypes, total, loading } = useSelector((state: RootState) => state.paymenType)

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [searchVal, setSearchVal] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [selectedItem, setSelectedItem] = useState<TPaymentType | null>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [selectedRows, setSelectedRows] = useState<string[]>([])

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openDeleteManyDialog, setOpenDeleteManyDialog] = useState(false)

    const schema = useMemo(() => {
        return yup.object().shape({
            name: yup.string().required(t('validation.nameRequired', 'Please enter payment type name.')),
            type: yup.string().required(t('validation.typeRequired', 'Please select payment type.')),
        })
    }, [t, i18n.language])

    type TFormInputs = yup.InferType<typeof schema>

    const methods = useForm<TFormInputs>({
        defaultValues: { name: '', type: '' },
        resolver: yupResolver(schema),
    })

    const { setValue, reset } = methods

    const fetchPaymentTypes = useCallback(() => {
        dispatch(
            fetchPaymentTypesAsync({
                page: paginationModel.page + 1,
                limit: paginationModel.pageSize,
                search: searchVal
            })
        )
    }, [dispatch, paginationModel, searchVal])

    useEffect(() => {
        setPaginationModel(prev => ({ ...prev, page: 0 }))
    }, [searchVal])

    useEffect(() => {
        fetchPaymentTypes()
    }, [fetchPaymentTypes])

    const handleResetForm = () => {
        setIsEdit(false)
        setSelectedId(null)
        setSelectedItem(null)
        reset({ name: '', type: '' })
    }

    const handleSelectTemplate = (item: typeof PAYMENT_TYPE_OPTIONS[number]) => {
        setValue('type', item.value)
        setValue('name', t(item.labelKey, item.defaultLabel))
    }

    const onSubmit = async (data: TFormInputs) => {
        if (isEdit && selectedId) {
            const res = await dispatch(updatePaymentTypeAsync({ id: selectedId, data }))
            if (updatePaymentTypeAsync.fulfilled.match(res)) {
                toast.success(t('payment.updateSuccess', 'Updated payment type successfully!'))
                handleResetForm()
                fetchPaymentTypes()
            } else {
                toast.error((res.payload as any)?.message || t('common.updateFailed', 'Operation failed.'))
            }
        } else {
            const res = await dispatch(createPaymentTypeAsync(data))
            if (createPaymentTypeAsync.fulfilled.match(res)) {
                toast.success(t('payment.createSuccess', 'Created payment type successfully!'))
                handleResetForm()
                fetchPaymentTypes()
            } else {
                toast.error((res.payload as any)?.message || t('common.updateFailed', 'Operation failed.'))
            }
        }
    }

    const handleEditClick = (item: TPaymentType) => {
        setIsEdit(true)
        setSelectedId(item._id)
        setSelectedItem(item)
    }

    const handleDeleteSingle = async () => {
        if (!selectedId) return
        const res = await dispatch(deletePaymentTypeAsync(selectedId))
        if (deletePaymentTypeAsync.fulfilled.match(res)) {
            toast.success(t('payment.deleteSuccess', 'Deleted payment type successfully!'))
            setOpenDeleteDialog(false)
            setSelectedId(null)
            fetchPaymentTypes()
        } else {
            toast.error((res.payload as any)?.message || 'Delete failed.')
        }
    }

    const handleDeleteMany = async () => {
        const res = await dispatch(deleteManyPaymentTypesAsync({ ids: selectedRows }))
        if (deleteManyPaymentTypesAsync.fulfilled.match(res)) {
            toast.success(t('payment.deleteManySuccess', 'Deleted selected payment types successfully!'))
            setOpenDeleteManyDialog(false)
            setSelectedRows([])
            fetchPaymentTypes()
        } else {
            toast.error((res.payload as any)?.message || 'Delete many failed.')
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', gap: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {t('payment.title', 'Payment Type Settings')}
            </Typography>

            <Grid container spacing={3}>
                {/* Form & Templates Section */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <PaymentTypeForm
                            methods={methods}
                            isEdit={isEdit}
                            loading={loading}
                            selectedItem={selectedItem}
                            onSubmit={onSubmit}
                            onReset={handleResetForm}
                        />

                        {!isEdit && (
                            <PaymentTypeTemplates onSelectTemplate={handleSelectTemplate} />
                        )}
                    </Box>
                </Grid>

                {/* Table List Section */}
                <Grid item xs={12} md={8}>
                    <PaymentTypeListTable
                        paymentTypes={paymentTypes}
                        total={total}
                        loading={loading}
                        searchVal={searchVal}
                        paginationModel={paginationModel}
                        selectedRows={selectedRows}
                        setSearchVal={setSearchVal}
                        setPaginationModel={setPaginationModel}
                        setSelectedRows={setSelectedRows}
                        onEdit={handleEditClick}
                        onDeleteSingle={(id) => { setSelectedId(id); setOpenDeleteDialog(true) }}
                        onDeleteMany={() => setOpenDeleteManyDialog(true)}
                    />
                </Grid>
            </Grid>

            <CustomConfirmDialog
                open={openDeleteDialog}
                title={t('common.confirmDelete', 'Confirm Delete')}
                content={t('payment.confirmDeleteContent', 'Are you sure you want to delete this payment type?')}
                confirmText={t('common.delete', 'Delete')}
                confirmColor='error'
                icon='mdi:alert-circle-outline'
                loading={loading}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDeleteSingle}
            />

            <CustomConfirmDialog
                open={openDeleteManyDialog}
                title={t('common.confirmDeleteMany', 'Confirm Delete Many')}
                content={t('payment.confirmDeleteManyContent', `Are you sure you want to delete ${selectedRows.length} selected payment types?`)}
                confirmText={t('common.delete', 'Delete')}
                confirmColor='error'
                icon='mdi:alert-circle-outline'
                loading={loading}
                onClose={() => setOpenDeleteManyDialog(false)}
                onConfirm={handleDeleteMany}
            />
        </Box>
    )
}

export default PaymentTypeSettingPage