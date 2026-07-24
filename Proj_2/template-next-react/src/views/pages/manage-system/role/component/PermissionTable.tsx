import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/stores'
import { updateRoleAsync, fetchRolesAsync } from 'src/stores/apps/role/actions'
import { CONFIG_PERMISSIONS, PermissionType } from 'src/configs/permission'

interface PermissionTableProps {
    selectedRole?: any
}

// Danh sách nhóm quyền lấy chuẩn xác 100% từ CONFIG_PERMISSIONS
const SYSTEM_PERMISSION_GROUPS = [
    {
        module: 'Quyền hệ thống (Admin & Tổng quan)',
        actions: [
            { key: CONFIG_PERMISSIONS.ADMIN, label: 'Admin tối cao (ADMIN.GRANTED)' },
            { key: CONFIG_PERMISSIONS.BASIC, label: 'Cơ bản công khai (BASIC.PUBLIC)' },
            { key: CONFIG_PERMISSIONS.DASHBOARD, label: 'Trang tổng quan (DASHBOARD)' },
        ],
    },
    {
        module: 'Quản lý Hệ thống (Users & Roles)',
        actions: [
            { key: CONFIG_PERMISSIONS.SYSTEM.USER.VIEW, label: 'Xem người dùng' },
            { key: CONFIG_PERMISSIONS.SYSTEM.USER.CREATE, label: 'Thêm người dùng' },
            { key: CONFIG_PERMISSIONS.SYSTEM.USER.UPDATE, label: 'Sửa người dùng' },
            { key: CONFIG_PERMISSIONS.SYSTEM.USER.DELETE, label: 'Xóa người dùng' },
            { key: CONFIG_PERMISSIONS.SYSTEM.ROLE.VIEW, label: 'Xem vai trò' },
            { key: CONFIG_PERMISSIONS.SYSTEM.ROLE.CREATE, label: 'Thêm vai trò' },
            { key: CONFIG_PERMISSIONS.SYSTEM.ROLE.UPDATE, label: 'Sửa vai trò' },
            { key: CONFIG_PERMISSIONS.SYSTEM.ROLE.DELETE, label: 'Xóa vai trò' },
        ],
    },
    {
        module: 'Quản lý Sản phẩm (Product, Type & Comment)',
        actions: [
            { key: CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW, label: 'Xem sản phẩm' },
            { key: CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT.CREATE, label: 'Thêm sản phẩm' },
            { key: CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT.UPDATE, label: 'Sửa sản phẩm' },
            { key: CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT.DELETE, label: 'Xóa sản phẩm' },
            { key: CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE.CREATE, label: 'Thêm loại sản phẩm' },
            { key: CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE.UPDATE, label: 'Sửa loại sản phẩm' },
            { key: CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE.DELETE, label: 'Xóa loại sản phẩm' },
            { key: CONFIG_PERMISSIONS.MANAGE_PRODUCT.COMMENT.UPDATE, label: 'Sửa bình luận' },
            { key: CONFIG_PERMISSIONS.MANAGE_PRODUCT.COMMENT.DELETE, label: 'Xóa bình luận' },
        ],
    },
    {
        module: 'Quản lý Đơn hàng & Đánh giá (Orders & Reviews)',
        actions: [
            { key: CONFIG_PERMISSIONS.MANAGE_ORDER.ORDER.VIEW, label: 'Xem đơn hàng' },
            { key: CONFIG_PERMISSIONS.MANAGE_ORDER.ORDER.UPDATE, label: 'Cập nhật đơn hàng' },
            { key: CONFIG_PERMISSIONS.MANAGE_ORDER.ORDER.DELETE, label: 'Xóa đơn hàng' },
            { key: CONFIG_PERMISSIONS.MANAGE_ORDER.REVIEW.UPDATE, label: 'Sửa đánh giá' },
            { key: CONFIG_PERMISSIONS.MANAGE_ORDER.REVIEW.DELETE, label: 'Xóa đánh giá' },
        ],
    },
    {
        module: 'Cài đặt hệ thống (Payment, Delivery & City)',
        actions: [
            { key: CONFIG_PERMISSIONS.SETTING.PAYMENT_TYPE.CREATE, label: 'Thêm hình thức thanh toán' },
            { key: CONFIG_PERMISSIONS.SETTING.PAYMENT_TYPE.UPDATE, label: 'Sửa hình thức thanh toán' },
            { key: CONFIG_PERMISSIONS.SETTING.PAYMENT_TYPE.DELETE, label: 'Xóa hình thức thanh toán' },
            { key: CONFIG_PERMISSIONS.SETTING.DELIVERY_TYPE.CREATE, label: 'Thêm hình thức vận chuyển' },
            { key: CONFIG_PERMISSIONS.SETTING.DELIVERY_TYPE.UPDATE, label: 'Sửa hình thức vận chuyển' },
            { key: CONFIG_PERMISSIONS.SETTING.DELIVERY_TYPE.DELETE, label: 'Xóa hình thức vận chuyển' },
            { key: CONFIG_PERMISSIONS.SETTING.CITY.CREATE, label: 'Thêm thành phố' },
            { key: CONFIG_PERMISSIONS.SETTING.CITY.UPDATE, label: 'Sửa thành phố' },
            { key: CONFIG_PERMISSIONS.SETTING.CITY.DELETE, label: 'Xóa thành phố' },
        ],
    },
]

const PermissionTable: React.FC<PermissionTableProps> = ({ selectedRole }) => {
    const theme = useTheme()
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState(false)
    const [checkedPermissions, setCheckedPermissions] = useState<PermissionType[]>([])

    useEffect(() => {
        if (selectedRole && Array.isArray(selectedRole.permissions)) {
            setCheckedPermissions(selectedRole.permissions as PermissionType[])
        } else {
            setCheckedPermissions([])
        }
    }, [selectedRole])

    const handleToggle = (permissionKey: PermissionType) => {
        setCheckedPermissions((prev) =>
            prev.includes(permissionKey)
                ? prev.filter((p) => p !== permissionKey)
                : [...prev, permissionKey]
        )
    }

    const handleToggleModuleAll = (group: typeof SYSTEM_PERMISSION_GROUPS[number]) => {
        const groupKeys = group.actions.map((act) => act.key as PermissionType)
        const isAllChecked = groupKeys.every((key) => checkedPermissions.includes(key))

        setCheckedPermissions((prev) => {
            if (isAllChecked) {
                return prev.filter((key) => !groupKeys.includes(key))
            } else {
                return Array.from(new Set([...prev, ...groupKeys])) as PermissionType[]
            }
        })
    }

    const handleSavePermissions = async () => {
        if (!selectedRole) return
        const targetId = selectedRole._id || selectedRole.id

        try {
            setLoading(true)
            await dispatch(
                updateRoleAsync({
                    id: targetId,
                    data: {
                        name: selectedRole.name,
                        permissions: checkedPermissions,
                    },
                })
            ).unwrap()

            toast.success(`Đã cập nhật quyền cho vai trò "${selectedRole.name}"!`)
            dispatch(fetchRolesAsync({} as any))
        } catch (error: any) {
            toast.error(error?.message || 'Cập nhật quyền thất bại!')
        } finally {
            setLoading(false)
        }
    }

    if (!selectedRole) {
        return (
            <Card
                sx={{
                    p: 4,
                    backgroundColor: theme.palette.background.paper,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 400,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[1]
                }}
            >
                <Typography variant='body2' color='textSecondary'>
                    Vui lòng chọn một vai trò ở bảng bên trái để cấu hình quyền.
                </Typography>
            </Card>
        )
    }

    return (
        <Card
            sx={{
                p: 4,
                backgroundColor: theme.palette.background.paper,
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[1]
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Phân quyền cho: <span style={{ color: theme.palette.primary.main }}>{selectedRole.name}</span>
                </Typography>
                <Button
                    variant='contained'
                    size='small'
                    onClick={handleSavePermissions}
                    disabled={loading}
                >
                    {loading ? 'Đang lưu...' : 'Lưu quyền'}
                </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {SYSTEM_PERMISSION_GROUPS.map((group, index) => {
                    const groupKeys = group.actions.map((act) => act.key as PermissionType)
                    const isGroupChecked = groupKeys.length > 0 && groupKeys.every((key) => checkedPermissions.includes(key))
                    const isGroupIndeterminate = groupKeys.some((key) => checkedPermissions.includes(key)) && !isGroupChecked

                    return (
                        <Box key={index} sx={{ border: `1px solid ${theme.palette.divider}`, p: 2, borderRadius: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                                    {group.module}
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size='small'
                                            checked={isGroupChecked}
                                            indeterminate={isGroupIndeterminate}
                                            onChange={() => handleToggleModuleAll(group)}
                                        />
                                    }
                                    label={<Typography variant='body2' sx={{ fontWeight: 500 }}>Chọn tất cả</Typography>}
                                    sx={{ mr: 0 }}
                                />
                            </Box>
                            <Divider sx={{ mb: 1.5 }} />

                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1 }}>
                                {group.actions.map((act) => (
                                    <FormControlLabel
                                        key={act.key}
                                        control={
                                            <Checkbox
                                                size='small'
                                                checked={checkedPermissions.includes(act.key as PermissionType)}
                                                onChange={() => handleToggle(act.key as PermissionType)}
                                            />
                                        }
                                        label={act.label}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Card>
    )
}

export default PermissionTable