import React from 'react'
import { Box, Button, TextField, MenuItem } from '@mui/material'
import { Icon } from '@iconify/react'

// Import component InputSearch có sẵn của bạn
import InputSearch from 'src/components/input-search' // (Đường dẫn import tùy thuộc vào cấu trúc thư mục thực tế của bạn)

interface UserHeaderProps {
    searchTerm: string
    roleFilter: string
    statusFilter: string | number
    selectedCount: number
    roles?: any[]
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClearSearch: () => void
    onAddClick: () => void
    onDeleteMultiple: () => void
}

export default function UserHeader({
    searchTerm,
    roleFilter,
    statusFilter,
    selectedCount,
    roles = [],
    onSearchChange,
    onRoleChange,
    onStatusChange,
    onClearSearch,
    onAddClick,
    onDeleteMultiple
}: UserHeaderProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 2
            }}
        >
            {/* Nhóm bên trái: Dùng InputSearch custom + Dropdown Vai trò + Trạng thái nằm chung một vùng */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', flexGrow: 1 }}>
                {/* 1. Component tìm kiếm có sẵn */}
                <InputSearch
                    value={searchTerm}
                    onChange={onSearchChange}
                    onClear={onClearSearch}
                    placeholder='Tìm kiếm người dùng (tên, email)...'
                    sx={{ width: { xs: '100%', sm: '260px' } }}
                />

                {/* 2. Dropdown lọc theo Vai trò */}
                <TextField
                    select
                    size='small'
                    value={roleFilter}
                    onChange={onRoleChange}
                    label='Vai trò'
                    sx={{ width: { xs: '100%', sm: '150px' } }}
                >
                    <MenuItem value=''>Tất cả vai trò</MenuItem>
                    {roles.map((role: any) => (
                        <MenuItem key={role._id || role.id} value={role._id || role.id}>
                            {role.name}
                        </MenuItem>
                    ))}
                </TextField>

                {/* 3. Dropdown lọc theo Trạng thái */}
                <TextField
                    select
                    size='small'
                    value={statusFilter}
                    onChange={onStatusChange}
                    label='Trạng thái'
                    sx={{ width: { xs: '100%', sm: '150px' } }}
                >
                    <MenuItem value=''>Tất cả trạng thái</MenuItem>
                    <MenuItem value={1}>Hoạt động</MenuItem>
                    <MenuItem value={0}>Khóa</MenuItem>
                </TextField>
            </Box>

            {/* Nhóm bên phải: Nút Xóa nhiều và Nút Thêm mới */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                {selectedCount > 0 && (
                    <Button
                        variant='outlined'
                        color='error'
                        startIcon={<Icon icon='mdi:delete-sweep-outline' width={20} />}
                        onClick={onDeleteMultiple}
                    >
                        Xóa đã chọn ({selectedCount})
                    </Button>
                )}

                <Button
                    variant='contained'
                    startIcon={<Icon icon='mdi:plus' width={20} />}
                    onClick={onAddClick}
                >
                    Thêm người dùng
                </Button>
            </Box>
        </Box>
    )
}