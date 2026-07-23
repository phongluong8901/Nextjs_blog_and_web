import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Chip, { ChipProps } from '@mui/material/Chip'
import { GridColDef } from '@mui/x-data-grid'
import GridEdit from 'src/components/gird-edit'
import GridDelete from 'src/components/grid-delete'
import CustomDataGrid from 'src/components/custom-data-grid'

interface GridTableProps {
    rows: any[]
    loading?: boolean
    onEdit: (row: any) => void
    onDelete: (row: any) => void

    // Bổ sung thêm props phân trang nếu component cha cần kiểm soát
    page?: number
    pageSize?: number
    onPageChange?: (newPage: number) => void
    onPageSizeChange?: (newPageSize: number) => void
}

// 🎨 Hàm helper quyết định màu của Chip (chuẩn hóa kiểu trả về khớp với MUI ChipProps['color'])
const getRoleColor = (code: string): ChipProps['color'] => {
    switch (code?.toUpperCase()) {
        case 'ADMIN':
            return 'error'
        case 'MANAGER':
            return 'warning'
        case 'USER':
            return 'info'
        default:
            return 'default'
    }
}

const GridTable: React.FC<GridTableProps> = ({
    rows,
    loading = false,
    onEdit,
    onDelete,
    page,
    pageSize = 10,
    onPageChange,
    onPageSizeChange,
}) => {
    // Dùng useMemo để tối ưu render cột
    const columns: GridColDef[] = useMemo(
        () => [
            { field: 'id', headerName: 'ID', width: 80 },
            {
                field: 'code',
                headerName: 'Mã vai trò',
                width: 160,
                renderCell: (params) => (
                    <Chip
                        label={params.value || ''}
                        color={getRoleColor(params.value)}
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 500 }}
                    />
                ),
            },
            { field: 'name', headerName: 'Tên vai trò', flex: 1, minWidth: 180 },
            { field: 'description', headerName: 'Mô tả', flex: 1.5, minWidth: 220 },
            {
                field: 'actions',
                headerName: 'Hành động',
                width: 120,
                sortable: false,
                filterable: false,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <GridEdit onClick={() => onEdit(params.row)} />
                        <GridDelete onClick={() => onDelete(params.row)} />
                    </Box>
                ),
            },
        ],
        [onEdit, onDelete]
    )

    return (
        <CustomDataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            height={500}
            pagination
            pageSize={pageSize}
            rowsPerPageOptions={[10, 25, 50]}
            {...(page !== undefined && { page })}
            {...(onPageChange && { onPageChange })}
            {...(onPageSizeChange && { onPageSizeChange })}
        />
    )
}

export default GridTable