// ** React Imports
import { useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/hooks/useSettings'

const UserDropdown = () => {
    const { user, logout } = useAuth()
    const { settings } = useSettings()
    const router = useRouter()
    const { t } = useTranslation()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl)

    const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handleNavigate = (path: string) => {
        handleClose()
        router.push(path)
    }

    const handleLogout = () => {
        handleClose()
        logout()
    }

    // Map giá trị themeColor từ context sang mã màu hex cho Avatar
    const primaryColorMap: Record<string, string> = {
        primary: '#7367F0',
        success: '#28C76F',
        error: '#EA5455',
        warning: '#FF9F43',
        info: '#00CFE8',
    }

    const currentAvatarBg = primaryColorMap[settings.themeColor] || '#7367F0'

    // Xử lý linh hoạt thông tin từ object user
    const uAny = user as any
    const displayName = uAny?.firstName
        ? `${uAny.firstName} ${uAny?.lastName || ''}`
        : uAny?.fullName || uAny?.name || uAny?.username || t('User Account')

    // Dòng chính hiển thị email
    const displayEmail = uAny?.email || uAny?.username || 'user@domain.com'

    // Dòng phụ hiển thị phân quyền (role)
    const userRole = uAny?.role?.name || uAny?.role || 'Basic'

    // Lấy ký tự đầu để hiển thị lên Avatar
    const avatarLetter = (uAny?.firstName?.[0] || uAny?.fullName?.[0] || uAny?.name?.[0] || uAny?.email?.[0] || 'U').toUpperCase()

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' }, mr: 1.5 }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                    {displayEmail}
                </Typography>
                <Typography variant='caption' color='text.secondary' sx={{ textTransform: 'capitalize' }}>
                    {userRole}
                </Typography>
            </Box>

            <Tooltip title={t('Profile')}>
                <IconButton onClick={handleOpen} size='small' sx={{ ml: 0.5 }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: currentAvatarBg, fontWeight: 'bold' }}>
                        {avatarLetter}
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: { mt: 1.5, minWidth: 200, borderRadius: '16px', p: 1, filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))' },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => handleNavigate('/my-profile')} sx={{ borderRadius: '8px', gap: 1.5 }}>
                    <Icon icon='mdi:account-outline' width={18} /> {t('Profile')}
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/setting')} sx={{ borderRadius: '8px', gap: 1.5 }}>
                    <Icon icon='mdi:cog-outline' width={18} /> {t('System Settings')}
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main', borderRadius: '8px', gap: 1.5 }}>
                    <Icon icon='mdi:logout' width={18} /> {t('Logout')}
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default UserDropdown