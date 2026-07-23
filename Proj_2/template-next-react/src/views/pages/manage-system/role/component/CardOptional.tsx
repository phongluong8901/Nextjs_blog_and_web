import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react'

interface RoleItem {
    id: string | number
    code: string
    name: string
    description?: string
}

interface CardOptionalProps {
    roles: RoleItem[]
    selectedRoleId: string | number | null
    onSelectRole: (roleId: string | number) => void
    onDeleteRole: (role: RoleItem, e: React.MouseEvent) => void
}

const CardOptional: React.FC<CardOptionalProps> = ({ roles, selectedRoleId, onSelectRole, onDeleteRole }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 3,
                mb: 3,
            }}
        >
            {roles.map((role) => {
                const isSelected = selectedRoleId === role.id

                return (
                    <Card
                        key={role.id}
                        onClick={() => onSelectRole(role.id)}
                        sx={{
                            p: 3,
                            cursor: 'pointer',
                            position: 'relative',
                            borderRadius: 2,
                            border: '2px solid',
                            borderColor: isSelected ? 'primary.main' : 'divider',
                            backgroundColor: isSelected ? 'action.selected' : 'background.paper',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                borderColor: 'primary.main',
                                boxShadow: 2,
                            },
                        }}
                    >
                        {/* Nút xóa nhanh góc trên bên phải Card */}
                        <IconButton
                            size='small'
                            color='error'
                            onClick={(e) => {
                                e.stopPropagation() // 👈 Ngăn chặn sự kiện click lan ra Card bên ngoài
                                onDeleteRole(role, e)
                            }}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                backgroundColor: 'action.hover',
                                '&:hover': { backgroundColor: 'error.lighter' },
                            }}
                        >
                            <Icon icon='mdi:close' width={16} height={16} />
                        </IconButton>

                        <Typography variant='subtitle2' sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, pr: 3 }}>
                            {role.code}
                        </Typography>
                        <Typography variant='h6' sx={{ fontWeight: 700, mb: 1, pr: 3 }}>
                            {role.name}
                        </Typography>
                        <Typography variant='body2' noWrap sx={{ color: 'text.secondary' }}>
                            {role.description || 'Không có mô tả'}
                        </Typography>
                    </Card>
                )
            })}
        </Box>
    )
}

export default CardOptional