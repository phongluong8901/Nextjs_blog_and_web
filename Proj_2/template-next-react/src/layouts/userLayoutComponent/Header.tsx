// ** MUI Imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Hook Imports
import { useSettings } from 'src/hooks/useSettings'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Header Sub-components
import LanguageDropdown from './headerComponents/LanguageDropdown'
import ThemeDropdown from './headerComponents/ThemeDropdown'
import UserDropdown from './headerComponents/UserDropdown'
import ColorCustomizerDropdown from './headerComponents/ColorCustomizerDropdown'

type HeaderProps = {
    onDrawerToggle: () => void
}

const Header = ({ onDrawerToggle }: HeaderProps) => {
    const theme = useTheme()
    const { settings } = useSettings()
    const { t } = useTranslation()

    // Map giá trị themeColor từ context sang mã màu hex hoặc dùng màu primary của palette hiện tại
    const primaryColorMap: Record<string, string> = {
        primary: '#7367F0',
        success: '#28C76F',
        error: '#EA5455',
        warning: '#FF9F43',
        info: '#00CFE8',
    }

    const currentPrimaryColor = primaryColorMap[settings.themeColor] || theme.palette.primary.main

    return (
        <AppBar
            position='sticky'
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                {/* Nút mở mobile drawer & Tiêu đề */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={onDrawerToggle}
                        sx={{ display: { md: 'none' } }}
                    >
                        <Icon icon='mdi:menu' width={24} />
                    </IconButton>

                    <Typography variant='h6' noWrap component='div' sx={{ fontWeight: 600, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                        {t('System Overview')}
                    </Typography>
                </Box>

                {/* Các chức năng bên phải */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {/* 1. Ngôn ngữ */}
                    <LanguageDropdown />

                    {/* 2. Đổi màu chủ đề */}
                    <ColorCustomizerDropdown />

                    {/* 3. Chế độ hiển thị Light/Dark/System */}
                    <ThemeDropdown />

                    {/* 4. Thông tin User & Menu tài khoản */}
                    <UserDropdown />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header