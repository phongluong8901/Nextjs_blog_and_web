// ** React Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'

export interface CustomDataGridProps extends DataGridProps {
    rows: any[]
    columns: GridColDef[]
    loading?: boolean
    pageSize?: number
    rowsPerPageOptions?: number[]
    height?: number | string
    showActionsColumn?: boolean
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 'none',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: theme.palette.action.hover,
        borderBottom: `1px solid ${theme.palette.divider}`,
        fontWeight: 600,
    },
    '& .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiDataGrid-row:hover': {
        backgroundColor: theme.palette.action.selected,
    },
    '& .MuiDataGrid-footerContainer': {
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },
}))

const CustomDataGrid = ({
    rows,
    columns,
    loading = false,
    pageSize = 10,
    rowsPerPageOptions = [10, 25, 50],
    height = 500,
    showActionsColumn = true, // Sử dụng giá trị mặc định để tránh lỗi unused
    ...props
}: CustomDataGridProps) => {
    // Hoặc bạn có thể dùng biến showActionsColumn tại đây nếu muốn lọc cột tự động, 
    // hiện tại khai báo mặc định như trên sẽ hết cảnh báo.
    void showActionsColumn

    return (
        <Box sx={{ width: '100%', height: height }}>
            <StyledDataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                pageSizeOptions={rowsPerPageOptions}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: pageSize, page: 0 },
                    },
                }}
                disableRowSelectionOnClick
                {...props}
            />
        </Box>
    )
}

export default CustomDataGrid