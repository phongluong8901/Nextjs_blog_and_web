import React, { useState } from 'react'
import {
    Box,
    Typography,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Chip,
    useTheme
} from '@mui/material'
import { Icon } from '@iconify/react'

// Import cấu hình có sẵn của bạn (điều chỉnh lại đường dẫn cho đúng với thư mục thực tế)
// import { CONFIG_CITIES } from 'src/configs/cityConfig'

interface CityDistrictSelectorProps {
    onSelectCity: (cityName: string) => void
    onSelectDistrict?: (districtName: string, cityName: string) => void
}

export default function CityDistrictSelector({ onSelectCity, onSelectDistrict }: CityDistrictSelectorProps) {
    const theme = useTheme()
    const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({})

    const handleToggle = (index: number) => {
        setOpenItems((prev) => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                maxHeight: '300px',
                overflowY: 'auto',
                mt: 1
            }}
        >
            <Box sx={{ p: 1.5, borderBottom: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.action.hover }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    Gợi ý chọn nhanh từ danh mục mẫu:
                </Typography>
            </Box>

            <List component='nav' sx={{ width: '100%', p: 0 }}>
                {CONFIG_CITIES.map((city: any, index: number) => {
                    const isOpen = Boolean(openItems[index])

                    return (
                        <React.Fragment key={index}>
                            <ListItemButton
                                onClick={() => handleToggle(index)}
                                sx={{
                                    py: 1,
                                    px: 2,
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.selected
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Box
                                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onSelectCity(city.name)
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                                    {city.name}
                                                </Typography>
                                                {city.code && (
                                                    <Chip
                                                        label={city.code}
                                                        size='small'
                                                        variant='outlined'
                                                        color='primary'
                                                        sx={{ height: 18, fontSize: '0.65rem' }}
                                                    />
                                                )}
                                            </Box>
                                            <Typography variant='caption' sx={{ color: theme.palette.primary.main, fontWeight: 500, mr: 1 }}>
                                                [Chọn tỉnh này]
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <Icon
                                    icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                                    width={20}
                                    style={{ color: theme.palette.text.secondary }}
                                />
                            </ListItemButton>

                            <Collapse in={isOpen} timeout='auto' unmountOnExit>
                                <List component='div' disablePadding sx={{ backgroundColor: theme.palette.background.paper }}>
                                    {city.districts.map((district: string, dIndex: number) => (
                                        <ListItemButton
                                            key={dIndex}
                                            onClick={() => {
                                                onSelectCity(city.name)
                                                if (onSelectDistrict) onSelectDistrict(district, city.name)
                                            }}
                                            sx={{
                                                pl: 4,
                                                py: 0.75,
                                                borderBottom: `1px dashed ${theme.palette.divider}`,
                                                '&:hover': { backgroundColor: theme.palette.action.hover }
                                            }}
                                        >
                                            <Icon
                                                icon='mdi:circle-small'
                                                width={18}
                                                style={{ marginRight: 6, color: theme.palette.text.secondary }}
                                            />
                                            <ListItemText
                                                primary={
                                                    <Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>
                                                        {district}
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    )
                })}
            </List>
        </Paper>
    )
}