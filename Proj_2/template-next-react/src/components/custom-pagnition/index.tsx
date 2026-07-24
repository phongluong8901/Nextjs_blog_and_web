// ** React Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Pagination, { PaginationProps } from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

export type CustomPaginationProps = PaginationProps & {
    totalRows?: number
    pageSize?: number
    page?: number
}

const CustomPagination = ({
    count,
    page = 1, // Đặt giá trị mặc định tránh bị undefined
    onChange,
    totalRows,
    pageSize = 10,
    ...props
}: CustomPaginationProps) => {
    // Chuẩn hóa trang hiện tại an toàn tuyệt đối
    const currentPage = page || 1
    const startRow = totalRows && totalRows > 0 ? (currentPage - 1) * pageSize + 1 : 0
    const endRow = totalRows ? Math.min(currentPage * pageSize, totalRows) : 0

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                px: 1,
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
            {totalRows !== undefined && (
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Hiển thị {startRow} - {endRow} trong tổng số {totalRows} bản ghi
                </Typography>
            )}
            <Pagination
                color='primary'
                shape='rounded'
                count={count}
                page={currentPage}
                onChange={onChange}
                {...props}
            />
        </Box>
    )
}

export default CustomPagination