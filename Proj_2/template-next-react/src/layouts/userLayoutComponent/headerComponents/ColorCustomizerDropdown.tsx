// ** React Imports
import { useState, MouseEvent } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Hook Imports
import { useSettings } from 'src/hooks/useSettings'

// Các tên định danh màu mà template hỗ trợ
const themeColors = [
    { name: 'Tím (Primary)', color: 'primary', hex: '#7367F0' },
    { name: 'Xanh Lá (Success)', color: 'success', hex: '#28C76F' },
    { name: 'Đỏ (Error)', color: 'error', hex: '#EA5455' },
    { name: 'Cam (Warning)', color: 'warning', hex: '#FF9F43' },
    { name: 'Xanh Dương (Info)', color: 'info', hex: '#00CFE8' },
]

const ColorCustomizerDropdown = () => {
    const { settings, saveSettings } = useSettings()
    const [colorAnchorEl, setColorAnchorEl] = useState<null | HTMLElement>(null)
    const openColorMenu = Boolean(colorAnchorEl)

    const handleOpenColorMenu = (event: MouseEvent<HTMLElement>) => setColorAnchorEl(event.currentTarget)
    const handleCloseColorMenu = () => setColorAnchorEl(null)

    const handleSelectColor = (colorName: any) => {
        // Cập nhật themeColor vào toàn cục thông qua saveSettings
        saveSettings({ ...settings, themeColor: colorName })
        handleCloseColorMenu()
    }

    // Lấy mã hex tương ứng để hiển thị icon cho đúng màu hiện tại
    const currentThemeObj = themeColors.find(item => item.color === settings.themeColor) || themeColors[0]

    return (
        <>
            <Tooltip title='Chọn màu chủ đề'>
                <IconButton color='inherit' onClick={handleOpenColorMenu} size='small'>
                    <Icon icon='mdi:palette-outline' width={22} style={{ color: currentThemeObj.hex }} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={colorAnchorEl}
                open={openColorMenu}
                onClose={handleCloseColorMenu}
                onClick={handleCloseColorMenu}
                PaperProps={{
                    elevation: 0,
                    sx: { mt: 1.5, minWidth: 160, borderRadius: '12px', p: 1, filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))' },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {themeColors.map((item) => (
                    <MenuItem
                        key={item.color}
                        onClick={() => handleSelectColor(item.color)}
                        selected={settings.themeColor === item.color}
                        sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.9rem' }}
                    >
                        <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: item.hex }} />
                        {item.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default ColorCustomizerDropdown