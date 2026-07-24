import React, { useState, useMemo, useEffect } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { GridRowSelectionModel } from '@mui/x-data-grid'

// ** Components chung
import CustomModal from 'src/components/custom-modal'
import ConfirmDeleteModal from 'src/components/confirm-delete-modal'
import CustomConfirmDialog from 'src/components/custom-confirm-dialog'

// ** Components riêng của User
import UserHeader from './component/UserHeader'
import UserGridTable from './component/UserGridTable'
import CardUserForm from './component/CardUserForm'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import {
    fetchUsersAsync,
    createUserAsync,
    updateUserAsync,
    deleteUserAsync
} from 'src/stores/apps/user/actions'
import { fetchRolesAsync } from 'src/stores/apps/role/actions' // <--- Import action role

const UserManagementPage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()

    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector((state: RootState) => state.user) || {}
    const loading = userState?.loading || false

    // ** Lấy danh sách roles từ Redux state của role
    const roleState = useSelector((state: RootState) => state.role) || {}
    const rolesList = roleState?.roles || []

    const users = (userState?.users || []).map((item: any) => ({
        ...item,
        id: item?._id || item?.id
    }))

    // ** States quản lý Tìm kiếm và Bộ lọc
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState<any>('')

    const [openModal, setOpenModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedRow, setSelectedRow] = useState<any>(null)

    // State chọn nhiều hàng trên DataGrid
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([])

    // State xóa 1 người dùng
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [userToDelete, setUserToDelete] = useState<any>(null)

    // State xóa nhiều người dùng
    const [openDeleteMultipleModal, setOpenDeleteMultipleModal] = useState(false)

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [pendingFormData, setPendingFormData] = useState<any>(null)

    useEffect(() => {
        dispatch(fetchUsersAsync({}))
        dispatch(fetchRolesAsync({})) // <--- Fetch danh sách role khi load trang
    }, [dispatch])

    const schema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email.'),
            password: yup.string().when('isEdit', {
                is: false,
                then: (schema) => schema.required('Vui lòng nhập mật khẩu.'),
                otherwise: (schema) => schema.optional(),
            }),
            firstName: yup.string().optional(),
            middleName: yup.string().optional(),
            lastName: yup.string().optional(),
            phoneNumber: yup.string().optional(),
            address: yup.string().optional(),
            city: yup.string().optional(),
            role: yup.string().optional(),
            userType: yup.number().optional(),
            status: yup.number().optional(),
        })
    }, [t, i18n.language])

    type TFormInputs = yup.InferType<typeof schema>

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<TFormInputs>({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            middleName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            city: '',
            role: '',
            userType: 3,
            status: 1,
        },
        resolver: yupResolver(schema),
    })

    const handleEdit = (row: any) => {
        setIsEdit(true)
        setSelectedRow(row)
        setValue('email', row.email || '')
        setValue('firstName', row.firstName || '')
        setValue('middleName', row.middleName || '')
        setValue('lastName', row.lastName || '')
        setValue('phoneNumber', row.phoneNumber || '')
        setValue('address', row.address || '')
        setValue('city', row.city?._id || row.city || '')
        setValue('role', row.role?._id || row.role || '')
        setValue('userType', row.userType ?? 3)
        setValue('status', row.status ?? 1)
        setOpenModal(true)
    }

    const handleAdd = () => {
        setIsEdit(false)
        setSelectedRow(null)
        reset({
            email: '',
            password: '',
            firstName: '',
            middleName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            city: '',
            role: '',
            userType: 3,
            status: 1,
        })
        setOpenModal(true)
    }

    const handleDeleteClick = (row: any) => {
        setUserToDelete(row)
        setOpenDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        try {
            const targetId = userToDelete?.id || userToDelete?._id
            await dispatch(deleteUserAsync(targetId)).unwrap()
            toast.success('Xóa người dùng thành công!')
            setOpenDeleteModal(false)
            setUserToDelete(null)
            dispatch(fetchUsersAsync({}))
        } catch (error: any) {
            toast.error(error?.message || 'Xóa người dùng thất bại!')
        }
    }

    const handleDeleteMultipleClick = () => {
        if (selectedRows.length === 0) return
        setOpenDeleteMultipleModal(true)
    }

    const handleConfirmDeleteMultiple = async () => {
        try {
            await Promise.all(
                selectedRows.map((id) => dispatch(deleteUserAsync(id)).unwrap())
            )

            toast.success(`Xóa thành công ${selectedRows.length} người dùng!`)
            setOpenDeleteMultipleModal(false)
            setSelectedRows([])
            dispatch(fetchUsersAsync({}))
        } catch (error: any) {
            toast.error(error?.message || 'Xóa hàng loạt thất bại!')
        }
    }

    const onSubmit = (data: TFormInputs) => {
        setPendingFormData(data)
        setOpenConfirmDialog(true)
    }

    const handleConfirmSave = async () => {
        try {
            if (isEdit && selectedRow) {
                const targetId = selectedRow.id || selectedRow._id
                await dispatch(updateUserAsync({ id: targetId, data: pendingFormData })).unwrap()
                toast.success('Cập nhật người dùng thành công!')
            } else {
                await dispatch(createUserAsync(pendingFormData)).unwrap()
                toast.success('Thêm mới người dùng thành công!')
            }

            setOpenConfirmDialog(false)
            setOpenModal(false)
            reset()
            dispatch(fetchUsersAsync({}))
        } catch (error: any) {
            toast.error(error?.message || 'Thất bại.')
        }
    }

    // ** Logic lọc dữ liệu kết hợp: Tìm kiếm + Vai trò + Trạng thái
    const filteredRows = users.filter((u: any) => {
        const matchSearch =
            u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchRole = roleFilter === '' || (u.role?._id || u.role) === roleFilter
        const matchStatus = statusFilter === '' || u.status === Number(statusFilter)

        return matchSearch && matchRole && matchStatus
    })

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', gap: 3, p: 3 }}>
            <Typography variant='h4' sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Quản lý người dùng
            </Typography>

            {/* Truyền rolesList lấy từ Redux vào đây */}
            <UserHeader
                searchTerm={searchTerm}
                roleFilter={roleFilter}
                statusFilter={statusFilter}
                selectedCount={selectedRows.length}
                roles={rolesList}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                onRoleChange={(e) => setRoleFilter(e.target.value)}
                onStatusChange={(e) => setStatusFilter(e.target.value)}
                onClearSearch={() => setSearchTerm('')}
                onAddClick={handleAdd}
                onDeleteMultiple={handleDeleteMultipleClick}
            />

            <UserGridTable
                rows={filteredRows}
                loading={loading}
                selectedRows={selectedRows}
                onSelectionChange={(newSelection) => setSelectedRows(newSelection)}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <CustomModal
                open={openModal}
                title={isEdit ? 'Chỉnh sửa người dùng' : 'Thêm mới người dùng'}
                onClose={() => setOpenModal(false)}
                maxWidth='md'
            >
                <CardUserForm
                    control={control}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    reset={reset}
                    loading={loading}
                    isEdit={isEdit}
                />
            </CustomModal>

            {/* Modal xác nhận xóa 1 người dùng */}
            <ConfirmDeleteModal
                open={openDeleteModal}
                content={`Bạn có chắc chắn muốn xóa người dùng "${userToDelete?.email}" này không?`}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                loading={loading}
            />

            {/* Modal xác nhận xóa nhiều người dùng */}
            <ConfirmDeleteModal
                open={openDeleteMultipleModal}
                content={`Bạn có chắc chắn muốn xóa ${selectedRows.length} người dùng đã chọn không?`}
                onClose={() => setOpenDeleteMultipleModal(false)}
                onConfirm={handleConfirmDeleteMultiple}
                loading={loading}
            />

            <CustomConfirmDialog
                open={openConfirmDialog}
                title='Xác nhận lưu thông tin'
                content={isEdit ? 'Bạn có chắc chắn muốn cập nhật lại thông tin người dùng này không?' : 'Bạn có chắc chắn muốn tạo mới người dùng này không?'}
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

export default UserManagementPage