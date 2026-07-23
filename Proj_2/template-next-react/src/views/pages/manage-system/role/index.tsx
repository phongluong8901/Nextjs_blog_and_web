import React, { useState, useMemo, useEffect } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import Header from './component/Header'
import CardOptional from './component/CardOptional'
import CustomModal from 'src/components/custom-modal'
import ConfirmDeleteModal from 'src/components/confirm-delete-modal'
import CustomConfirmDialog from 'src/components/custom-confirm-dialog'
import GridTable from './component/GridTable'
import CardRole from './component/CardRole'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import {
    fetchRolesAsync,
    createRoleAsync,
    updateRoleAsync,
    deleteRoleAsync
} from 'src/stores/apps/role/actions'

const RoleManagementPage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()

    // ** Redux Hooks
    const dispatch = useDispatch<AppDispatch>()
    const roleState = useSelector((state: RootState) => state.role) || {}
    const loading = roleState?.loading || false

    // ** Safe Data Extraction for Roles
    const rawData = roleState?.roles
    const rolesArray = Array.isArray(rawData)
        ? rawData
        : Array.isArray((rawData as any)?.roles)
            ? (rawData as any).roles
            : Array.isArray((rawData as any)?.data?.roles)
                ? (rawData as any).data.roles
                : Array.isArray((rawData as any)?.data)
                    ? (rawData as any).data
                    : []

    const roles = rolesArray.map((item: any) => ({
        ...item,
        id: item?.id || item?._id || Math.random().toString()
    }))

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedRoleId, setSelectedRoleId] = useState<any>(null)
    const [openModal, setOpenModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedRow, setSelectedRow] = useState<any>(null)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [roleToDelete, setRoleToDelete] = useState<any>(null)

    // ** State for Save/Update Confirm Dialog
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [pendingFormData, setPendingFormData] = useState<any>(null)

    // ** Fetch initial role list
    useEffect(() => {
        dispatch(fetchRolesAsync())
    }, [dispatch])

    const schema = useMemo(() => {
        return yup.object().shape({
            name: yup.string().required(t('validation.nameRequired', 'Please enter a role name.')),
            code: yup.string().optional(),
            description: yup.string().optional(),
        })
    }, [t, i18n.language])

    type TFormInputs = yup.InferType<typeof schema>

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<TFormInputs>({
        defaultValues: { name: '', code: '', description: '' },
        resolver: yupResolver(schema),
    })

    const handleEdit = (row: any) => {
        setIsEdit(true)
        setSelectedRow(row)
        setValue('code', row.code || '')
        setValue('name', row.name || '')
        setValue('description', row.description || '')
        setOpenModal(true)
    }

    const handleAdd = () => {
        setIsEdit(false)
        setSelectedRow(null)
        reset({ code: '', name: '', description: '' })
        setOpenModal(true)
    }

    const handleDeleteClick = (row: any, e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        setRoleToDelete(row)
        setOpenDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        try {
            const targetId = roleToDelete?.id || roleToDelete?._id
            await dispatch(deleteRoleAsync(targetId)).unwrap()
            if (selectedRoleId === targetId) setSelectedRoleId(null)
            toast.success('Xóa vai trò thành công!')
            setOpenDeleteModal(false)
            dispatch(fetchRolesAsync())
        } catch (error: any) {
            toast.error(error?.message || 'Xóa vai trò thất bại!')
        }
    }

    const onSubmit = (data: TFormInputs) => {
        const formattedData = {
            ...data,
            code: data.code || '',
            description: data.description || '',
        }
        setPendingFormData(formattedData)
        setOpenConfirmDialog(true)
    }

    const handleConfirmSave = async () => {
        try {
            if (isEdit && selectedRow) {
                const targetId = selectedRow.id || selectedRow._id
                await dispatch(updateRoleAsync({ id: targetId, data: pendingFormData })).unwrap()
                toast.success('Cập nhật vai trò thành công!')
            } else {
                await dispatch(createRoleAsync(pendingFormData)).unwrap()
                toast.success(t('common.updateSuccess', 'Operation completed successfully!'))
            }

            setOpenConfirmDialog(false)
            setOpenModal(false)
            reset()
            dispatch(fetchRolesAsync())
        } catch (error: any) {
            toast.error(error?.message || t('common.updateFailed', 'Operation failed.'))
        }
    }

    const filteredRows = roles.filter((r: any) => {
        const matchesSearch =
            r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.code?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCard = selectedRoleId ? (r.id === selectedRoleId || r._id === selectedRoleId) : true

        return matchesSearch && matchesCard
    })

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', gap: 3, p: 3 }}>
            <Typography variant='h4' sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {t('role.title', 'Role Management')}
            </Typography>

            <CardOptional
                roles={roles}
                selectedRoleId={selectedRoleId}
                onSelectRole={(id) => setSelectedRoleId(selectedRoleId === id ? null : id)}
                onDeleteRole={handleDeleteClick}
            />

            <Header
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                onClearSearch={() => setSearchTerm('')}
                onAddClick={handleAdd}
                addLabel='Thêm vai trò'
            />

            <GridTable rows={filteredRows} loading={loading} onEdit={handleEdit} onDelete={(row) => handleDeleteClick(row)} />

            <CustomModal
                open={openModal}
                title={isEdit ? 'Chỉnh sửa vai trò' : 'Thêm mới vai trò'}
                onClose={() => setOpenModal(false)}
                maxWidth='sm'
            >
                <CardRole
                    control={control}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    reset={reset}
                    loading={loading}
                    isEdit={isEdit}
                />
            </CustomModal>

            <ConfirmDeleteModal
                open={openDeleteModal}
                content={`Bạn có chắc chắn muốn xóa vai trò "${roleToDelete?.name}" này không?`}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                loading={loading}
            />

            <CustomConfirmDialog
                open={openConfirmDialog}
                title='Xác nhận lưu thông tin'
                content={isEdit ? 'Bạn có chắc chắn muốn cập nhật lại thông tin vai trò này không?' : 'Bạn có chắc chắn muốn tạo mới vai trò này không?'}
                confirmText='Đồng ý lưu'
                cancelText='Hủy bỏ'
                confirmColor='primary'
                icon='mdi:content-save-edit-outline'
                loading={loading}
                onClose={() => setOpenConfirmDialog(false)}
                onConfirm={handleConfirmSave}
            />
        </Box>
    )
}

export default RoleManagementPage