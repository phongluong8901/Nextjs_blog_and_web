import React from 'react'
import Chip, { ChipProps } from '@mui/material/Chip'

export type StatusType = 'active' | 'inactive' | 'pending' | 'success' | 'error' | 'warning' | 'info'

export type CustomChipProps = ChipProps & {
    status?: StatusType
}

const CustomChip = ({ status, label, sx, ...props }: CustomChipProps) => {
    // Bảng màu chi tiết cho từng trạng thái để dễ phân biệt
    const getStylesByStatus = (st?: StatusType) => {
        switch (st) {
            case 'active':
            case 'success':
                return {
                    backgroundColor: '#e8f5e9', // Xanh lá nhạt
                    color: '#2e7d32',          // Xanh lá đậm
                    borderColor: '#a5d6a7',
                }
            case 'inactive':
            case 'error':
                return {
                    backgroundColor: '#ffebee', // Đỏ nhạt
                    color: '#c62828',          // Đỏ đậm
                    borderColor: '#ef9a9a',
                }
            case 'pending':
            case 'warning':
                return {
                    backgroundColor: '#fff8e1', // Vàng/Cam nhạt
                    color: '#f57f17',          // Vàng/Cam đậm
                    borderColor: '#ffe082',
                }
            case 'info':
                return {
                    backgroundColor: '#e3f2fd', // Xanh dương nhạt
                    color: '#1565c0',          // Xanh dương đậm
                    borderColor: '#90caf9',
                }
            default:
                return {
                    backgroundColor: '#f5f5f5', // Xám nhạt mặc định
                    color: '#616161',          // Xám đậm
                }
        }
    }

    return (
        <Chip
            label={label}
            size='small'
            variant='outlined' // Dùng dạng border mỏng nhìn sẽ thanh thoát hơn
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