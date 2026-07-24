// ** React Imports
import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'

interface UserFilterProps {
    searchTerm: string
    roleFilter: string
    statusFilter: string | number
    roles?: any[]
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClearSearch: () => void
}

export default function UserFilter({
    searchTerm,
    roleFilter,
    statusFilter,
    roles = [],
    onSearchChange,
    onRoleChange,
    onStatusChange,
    onClearSearch
}: UserFilterProps) {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center',
                flexGrow: 1,

                // Tích hợp theme tổng thể cho container nếu cần
                '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }
            }}
        >
            {/* Ô tìm kiếm */}
            <TextField
                size='small'
                value={searchTerm}
                onChange={onSearchChange}
                placeholder={t('UserFilter.SearchPlaceholder', 'Tìm kiếm người dùng (tên, email)...')}
                sx={{ width: { xs: '100%', sm: '260px' } }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Icon
                                icon='mdi:magnify'
                                width={20}
                                color={theme.palette.text.secondary}
                            />
                        </InputAdornment>
                    ),
                    endAdornment: searchTerm ? (
                        <InputAdornment position='end'>
                            <IconButton size='small' onClick={onClearSearch}>
                                <Icon
                                    icon='mdi:close'
                                    width={18}
                                    color={theme.palette.text.secondary}
                                />
                            </IconButton>
                        </InputAdornment>
                    ) : null
                }}
            />

            {/* Dropdown lọc theo Vai trò */}
            <TextField
                select
                size='small'
                value={roleFilter}
                onChange={onRoleChange}
                label={t('UserFilter.RoleLabel', 'Vai trò')}
                sx={{ width: { xs: '100%', sm: '160px' } }}
            >
                <MenuItem value=''>
                    {t('UserFilter.AllRoles', 'Tất cả vai trò')}
                </MenuItem>
                {roles.map((role: any) => (
                    <MenuItem key={role._id || role.id} value={role._id || role.id}>
                        {role.name}
                    </MenuItem>
                ))}
            </TextField>

            {/* Dropdown lọc theo Trạng thái */}
            <TextField
                select
                size='small'
                value={statusFilter}
                onChange={onStatusChange}
                label={t('UserFilter.StatusLabel', 'Trạng thái')}
                sx={{ width: { xs: '100%', sm: '150px' } }}
            >
                <MenuItem value=''>
                    {t('UserFilter.AllStatus', 'Tất cả trạng thái')}
                </MenuItem>
                <MenuItem value={1}>
                    {t('UserFilter.Active', 'Hoạt động')}
                </MenuItem>
                <MenuItem value={0}>
                    {t('UserFilter.Locked', 'Khóa')}
                </MenuItem>
            </TextField>
        </Box>
    )
}