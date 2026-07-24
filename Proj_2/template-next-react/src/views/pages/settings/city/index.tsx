import React, { useState, useMemo, useEffect } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { GridRowSelectionModel } from '@mui/x-data-grid'

import CustomModal from 'src/components/custom-modal'
import ConfirmDeleteModal from 'src/components/confirm-delete-modal'

import CityHeader from './component/CityHeader'
import CityGridTable from './component/CityGridTable'
import CardCityForm from './component/CardCityForm'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import {
    fetchCitiesAsync,
    createCityAsync,
    updateCityAsync,
    deleteCityAsync
} from 'src/stores/apps/city/actions'

const CityManagementPage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()

    const dispatch = useDispatch<AppDispatch>()
    const cityState = useSelector((state: RootState) => (state as any).city) || {}
    const loading = cityState?.loading || false

    const cities = (cityState?.cities || []).map((item: any) => ({
        ...item,
        id: item?._id || item?.id
    }))

    const [searchTerm, setSearchTerm] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedRow, setSelectedRow] = useState<any>(null)
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([])

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [cityToDelete, setCityToDelete] = useState<any>(null)
    const [openDeleteMultipleModal, setOpenDeleteMultipleModal] = useState(false)

    useEffect(() => {
        dispatch(fetchCitiesAsync({}))
    }, [dispatch])

    const schema = useMemo(() => {
        return yup.object().shape({
            name: yup.string().required('Vui lòng nhập tên thành phố.'),
        })
    }, [t, i18n.language])

    type TFormInputs = yup.InferType<typeof schema>

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<TFormInputs>({
        defaultValues: { name: '' },
        resolver: yupResolver(schema),
    })

    const handleEdit = (row: any) => {
        setIsEdit(true)
        setSelectedRow(row)
        setValue('name', row.name || '')
        setOpenModal(true)
    }

    const handleAdd = () => {
        setIsEdit(false)
        setSelectedRow(null)
        reset({ name: '' })
        setOpenModal(true)
    }

    const handleDeleteClick = (row: any) => {
        setCityToDelete(row)
        setOpenDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        try {
            const targetId = cityToDelete?.id || cityToDelete?._id
            await dispatch(deleteCityAsync(targetId)).unwrap()
            toast.success('Xóa thành phố thành công!')
            setOpenDeleteModal(false)
            setCityToDelete(null)
            dispatch(fetchCitiesAsync({}))
        } catch (error: any) {
            toast.error(error?.message || 'Xóa thành phố thất bại!')
        }
    }

    const handleDeleteMultipleClick = () => {
        if (selectedRows.length === 0) return
        setOpenDeleteMultipleModal(true)
    }

    const handleConfirmDeleteMultiple = async () => {
        try {
            await Promise.all(
                selectedRows.map((id) => dispatch(deleteCityAsync(id)).unwrap())
            )
            toast.success(`Xóa thành công ${selectedRows.length} thành phố!`)
            setOpenDeleteMultipleModal(false)
            setSelectedRows([])
            dispatch(fetchCitiesAsync({}))
        } catch (error: any) {
            toast.error(error?.message || 'Xóa hàng loạt thất bại!')
        }
    }

    const onSubmit = async (data: TFormInputs) => {
        try {
            if (isEdit && selectedRow) {
                const targetId = selectedRow.id || selectedRow._id
                await dispatch(updateCityAsync({ id: targetId, data })).unwrap()
                toast.success('Cập nhật thành phố thành công!')
            } else {
                await dispatch(createCityAsync(data)).unwrap()
                toast.success('Thêm mới thành phố thành công!')
            }

            setOpenModal(false)
            reset()
            dispatch(fetchCitiesAsync({}))
        } catch (error: any) {
            toast.error(error?.message || 'Thất bại.')
        }
    }

    const filteredRows = cities.filter((c: any) =>
        c.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', gap: 3, p: 3 }}>
            <Typography variant='h4' sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Quản lý Thành phố
            </Typography>

            <CityHeader
                searchTerm={searchTerm}
                selectedCount={selectedRows.length}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                onClearSearch={() => setSearchTerm('')}
                onAddClick={handleAdd}
                onDeleteMultiple={handleDeleteMultipleClick}
            />

            <CityGridTable
                rows={filteredRows}
                loading={loading}
                selectedRows={selectedRows}
                onSelectionChange={(newSelection) => setSelectedRows(newSelection)}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <CustomModal
                open={openModal}
                title={isEdit ? 'Chỉnh sửa tên thành phố' : 'Thêm mới thành phố'}
                onClose={() => setOpenModal(false)}
                maxWidth='sm'
            >
                <CardCityForm
                    control={control}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    reset={reset}
                    setValue={setValue}
                    loading={loading}
                    isEdit={isEdit}
                />
            </CustomModal>

            <ConfirmDeleteModal
                open={openDeleteModal}
                content={`Bạn có chắc chắn muốn xóa thành phố "${cityToDelete?.name}" này không?`}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                loading={loading}
            />

            <ConfirmDeleteModal
                open={openDeleteMultipleModal}
                content={`Bạn có chắc chắn muốn xóa ${selectedRows.length} thành phố đã chọn không?`}
                onClose={() => setOpenDeleteMultipleModal(false)}
                onConfirm={handleConfirmDeleteMultiple}
                loading={loading}
            />
        </Box>
    )
}

export default CityManagementPage