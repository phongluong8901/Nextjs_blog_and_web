// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Hook Imports
import { useSettings } from 'src/hooks/useSettings'

const ThemeDropdown = () => {
    // ** Lấy settings và hàm saveSettings từ Context của template
    const { settings, saveSettings } = useSettings()

    // Hàm xử lý khi click chọn mode
    const handleModeChange = (newMode: 'light' | 'dark' | 'system') => {
        saveSettings({ ...settings, mode: newMode })
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, border: '1px solid', borderColor: 'divider', borderRadius: '99px', p: 0.5 }}>
            {/* Nút Light */}
            <Tooltip title='Sáng (Light)'>
                <IconButton
                    size='small'
                    onClick={() => handleModeChange('light')}
                    sx={{
                        borderRadius: '50%',
                        p: 1.5,
                        backgroundColor: settings.mode === 'light' ? 'action.selected' : 'transparent',
                        color: settings.mode === 'light' ? 'primary.main' : 'text.secondary',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        }
                    }}
                >
                    <Icon icon='mdi:weather-sunny' width={18} />
                </IconButton>
            </Tooltip>

            {/* Nút Dark */}
            <Tooltip title='Tối (Dark)'>
                <IconButton
                    size='small'
                    onClick={() => handleModeChange('dark')}
                    sx={{
                        borderRadius: '50%',
                        p: 1.5,
                        backgroundColor: settings.mode === 'dark' ? 'action.selected' : 'transparent',
                        color: settings.mode === 'dark' ? 'primary.main' : 'text.secondary',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        }
                    }}
                >
                    <Icon icon='mdi:weather-night' width={18} />
                </IconButton>
            </Tooltip>

            {/* Nút System */}
            <Tooltip title='Hệ thống (System)'>
                <IconButton
                    size='small'
                    onClick={() => handleModeChange('system')}
                    sx={{
                        borderRadius: '50%',
                        p: 1.5,
                        backgroundColor: settings.mode === 'system' ? 'action.selected' : 'transparent',
                        color: settings.mode === 'system' ? 'primary.main' : 'text.secondary',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        }
                    }}
                >
                    <Icon icon='mdi:laptop' width={18} />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default ThemeDropdown