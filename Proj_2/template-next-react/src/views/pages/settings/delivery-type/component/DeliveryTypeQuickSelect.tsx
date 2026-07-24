import React from 'react'
import { Box, Typography, Paper, List, ListItemButton, ListItemText, Chip, useTheme } from '@mui/material'
import { CONFIG_DELIVERY_TYPES, DeliveryConfigItem } from 'src/configs/delivery'

interface DeliveryTypeQuickSelectProps {
    onSelectQuickItem: (item: DeliveryConfigItem) => void
}

export const DeliveryTypeQuickSelect: React.FC<DeliveryTypeQuickSelectProps> = ({ onSelectQuickItem }) => {
    const theme = useTheme()

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant='caption' sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
                Hoặc chọn nhanh mẫu cấu hình sẵn:
            </Typography>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    backgroundColor: theme.palette.background.default,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    maxHeight: '220px',
                    overflowY: 'auto'
                }}
            >
                <List component='nav' sx={{ width: '100%', p: 0 }}>
                    {CONFIG_DELIVERY_TYPES.map((item, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => onSelectQuickItem(item)}
                            sx={{
                                py: 1.25,
                                px: 2,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                                '&:hover': { backgroundColor: theme.palette.action.selected }
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                            {item.name}
                                        </Typography>
                                        <Chip
                                            label={`${item.price.toLocaleString()} đ`}
                                            size='small'
                                            color='primary'
                                            variant='outlined'
                                            sx={{ height: 20, fontSize: '0.7rem' }}
                                        />
                                    </Box>
                                }
                                secondary={
                                    item.description ? (
                                        <Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>
                                            {item.description}
                                        </Typography>
                                    ) : null
                                }
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Paper>
        </Box>
    )
}