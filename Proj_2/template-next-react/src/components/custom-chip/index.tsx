import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Chip, { ChipProps } from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

export type StatusType = 'active' | 'inactive' | 'pending' | 'success' | 'error' | 'warning' | 'info'

export type CustomChipProps = ChipProps & {
    status?: StatusType
    labelKey?: string // Thêm prop hỗ trợ i18n key cho label
}

const CustomChip = ({ status, label, labelKey, sx, ...props }: CustomChipProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    // Xử lý dịch i18n nếu có key truyền vào
    const renderedLabel = labelKey ? t(labelKey) : label

    // Bảng màu chi tiết cho từng trạng thái, tích hợp hoàn toàn với theme (Dark/Light mode)
    const getStylesByStatus = (st?: StatusType) => {
        const isDarkMode = theme.palette.mode === 'dark'

        switch (st) {
            case 'active':
            case 'success':
                return {
                    backgroundColor: isDarkMode ? 'rgba(46, 125, 50, 0.16)' : '#e8f5e9',
                    color: isDarkMode ? '#81c784' : '#2e7d32',
                    borderColor: isDarkMode ? 'rgba(129, 199, 132, 0.3)' : '#a5d6a7',
                }
            case 'inactive':
            case 'error':
                return {
                    backgroundColor: isDarkMode ? 'rgba(198, 40, 40, 0.16)' : '#ffebee',
                    color: isDarkMode ? '#e57373' : '#c62828',
                    borderColor: isDarkMode ? 'rgba(229, 115, 115, 0.3)' : '#ef9a9a',
                }
            case 'pending':
            case 'warning':
                return {
                    backgroundColor: isDarkMode ? 'rgba(245, 127, 23, 0.16)' : '#fff8e1',
                    color: isDarkMode ? '#ffb74d' : '#f57f17',
                    borderColor: isDarkMode ? 'rgba(255, 183, 77, 0.3)' : '#ffe082',
                }
            case 'info':
                return {
                    backgroundColor: isDarkMode ? 'rgba(21, 101, 192, 0.16)' : '#e3f2fd',
                    color: isDarkMode ? '#64b5f6' : '#1565c0',
                    borderColor: isDarkMode ? 'rgba(100, 181, 246, 0.3)' : '#90caf9',
                }
            default:
                return {
                    backgroundColor: isDarkMode ? theme.palette.action.hover : '#f5f5f5',
                    color: isDarkMode ? theme.palette.text.secondary : '#616161',
                    borderColor: isDarkMode ? theme.palette.divider : '#e0e0e0',
                }
        }
    }

    return (
        <Chip
            label={renderedLabel}
            size="small"
            variant="outlined"
            sx={{
                fontWeight: 600,
                borderRadius: 1.5,
                borderWidth: '1px',
                ...getStylesByStatus(status),
                ...sx,
            }}
            {...props}
        />
    )
}

export default CustomChip