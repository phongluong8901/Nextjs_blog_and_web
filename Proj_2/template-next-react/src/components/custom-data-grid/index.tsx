// ** React Imports
import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { styled, useTheme } from '@mui/material/styles'

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

    // Tùy chỉnh thêm màu sắc cho phần phân trang và chữ trong DataGrid theo Theme
    '& .MuiTablePagination-root': {
        color: theme.palette.text.secondary,
    },
    '& .MuiTablePagination-selectIcon': {
        color: theme.palette.text.secondary,
    },
}))

const CustomDataGrid = ({
    rows,
    columns,
    loading = false,
    pageSize = 10,
    rowsPerPageOptions = [10, 25, 50],
    height = 500,
    showActionsColumn = true,
    ...props
}: CustomDataGridProps) => {
    void showActionsColumn
    const theme = useTheme()
    const { t } = useTranslation()

    // Tự động dịch các chuỗi localText mặc định của DataGrid sang i18n (ví dụ: phân trang, No rows, v.v.)
    const localeText = {
        noRowsLabel: t('DataGrid.NoRowsLabel', 'Không có dữ liệu'),
        noResultsOverlayLabel: t('DataGrid.NoResultsOverlayLabel', 'Không tìm thấy kết quả phù hợp'),
        errorOverlayDefaultLabel: t('DataGrid.ErrorOverlayDefaultLabel', 'Đã có lỗi xảy ra.'),

        // Phân trang (Pagination)
        footerRowSelected: (count: number) =>
            t('DataGrid.FooterRowSelected', 'Đã chọn {{count}} hàng', { count }),
        footerTotalRows: t('DataGrid.FooterTotalRows', 'Tổng số hàng:'),
        footerPaginationRowsPerPage: t('DataGrid.FooterPaginationRowsPerPage', 'Số hàng mỗi trang:'),

        // Filter & Toolbar (nếu có dùng)
        toolbarDensity: t('DataGrid.ToolbarDensity', 'Mật độ hiển thị'),
        toolbarDensityLabel: t('DataGrid.ToolbarDensityLabel', 'Mật độ hiển thị'),
        toolbarDensityCompact: t('DataGrid.ToolbarDensityCompact', 'Thu gọn'),
        toolbarDensityStandard: t('DataGrid.ToolbarDensityStandard', 'Tiêu chuẩn'),
        toolbarDensityComfortable: t('DataGrid.ToolbarDensityComfortable', 'Thoải mái'),

        ...props.localeText,
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: height,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: theme.shadows[1],
            }}
        >
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
                localeText={localeText}
                {...props}
            />
        </Box>
    )
}

export default CustomDataGrid