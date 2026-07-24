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
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks & Redux Actions
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/hooks/useSettings'
import { logout as clearAuthRedux } from 'src/stores/apps/auth'
import { RootState } from 'src/stores'

// ** Styled Badge cho hiệu ứng chấm trạng thái online/active
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))

const UserDropdown = () => {
    // 💡 Lấy trực tiếp user từ Redux Store để realtime ngay khi state thay đổi
    const { user: authUser, logout } = useAuth()
    const reduxUser = useSelector((state: RootState) => state.auth.user)

    // Ưu tiên lấy user từ Redux store nếu có, fallback về authUser
    const user = reduxUser || authUser

    const dispatch = useDispatch()
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
        dispatch(clearAuthRedux())
        logout()
    }

    const primaryColorMap: Record<string, string> = {
        primary: '#7367F0',
        success: '#28C76F',
        error: '#EA5455',
        warning: '#FF9F43',
        info: '#00CFE8',
    }

    const currentAvatarBg = primaryColorMap[settings.themeColor] || '#7367F0'

    const uAny = user as any
    const displayEmail = uAny?.email || uAny?.username || 'user@domain.com'
    const userRole = uAny?.role?.name || uAny?.role || 'Basic'
    const displayName = uAny?.firstName ? `${uAny.firstName} ${uAny?.lastName || ''}` : displayEmail

    let isUserActive = true
    if (uAny) {
        if (typeof uAny.status === 'boolean') {
            isUserActive = uAny.status
        } else if (typeof uAny.status === 'number') {
            isUserActive = uAny.status === 1
        } else if (typeof uAny.status === 'string') {
            isUserActive = uAny.status.toLowerCase() === 'active' || uAny.status.toLowerCase() === 'true' || uAny.status === '1'
        }
    }

    const rawAvatar = uAny?.avatar || uAny?.image || uAny?.profilePicture || ''
    const apiHostname = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

    let userAvatar = ''
    if (rawAvatar) {
        const timestamp = typeof window !== 'undefined' ? (uAny?.updatedAt || new Date().getTime()) : ''

        if (rawAvatar.startsWith('http') || rawAvatar.startsWith('blob:')) {
            userAvatar = `${rawAvatar}${rawAvatar.includes('?') ? '&' : '?'}t=${timestamp}`
        } else {
            const cleanBase = apiHostname.endsWith('/') ? apiHostname.slice(0, -1) : apiHostname
            const cleanPath = rawAvatar.startsWith('/') ? rawAvatar : `/${rawAvatar}`
            userAvatar = `${cleanBase}${cleanPath}?t=${timestamp}`
        }
    }

    const avatarLetter = (uAny?.firstName?.[0] || uAny?.fullName?.[0] || uAny?.name?.[0] || uAny?.email?.[0] || 'U').toUpperCase()

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' }, mr: 1.5 }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                    {displayName}
                </Typography>
                <Typography variant='caption' color='text.secondary' sx={{ textTransform: 'capitalize' }}>
                    {userRole}
                </Typography>
            </Box>

            <Tooltip title={t('Profile') as string}>
                <IconButton onClick={handleOpen} size='small' sx={{ ml: 0.5 }}>
                    {isUserActive ? (
                        <StyledBadge
                            overlap='circular'
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant='dot'
                        >
                            <Avatar
                                src={userAvatar}
                                alt={displayName}
                                sx={{ width: 40, height: 40, bgcolor: currentAvatarBg, fontWeight: 'bold' }}
                            >
                                {!userAvatar && avatarLetter}
                            </Avatar>
                        </StyledBadge>
                    ) : (
                        <Badge
                            overlap='circular'
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant='dot'
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: '#EA5455',
                                    color: '#EA5455',
                                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                                },
                            }}
                        >
                            <Avatar
                                src={userAvatar}
                                alt={displayName}
                                sx={{ width: 40, height: 40, bgcolor: currentAvatarBg, fontWeight: 'bold', filter: 'grayscale(30%)' }}
                            >
                                {!userAvatar && avatarLetter}
                            </Avatar>
                        </Badge>
                    )}
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        mt: 1.5,
                        minWidth: 200,
                        borderRadius: '16px',
                        p: 1,
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                    },
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