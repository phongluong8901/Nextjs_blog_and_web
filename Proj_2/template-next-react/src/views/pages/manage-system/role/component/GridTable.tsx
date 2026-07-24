import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip, { ChipProps } from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import GridEdit from 'src/components/gird-edit'
import GridDelete from 'src/components/grid-delete'
import CustomDataGrid from 'src/components/custom-data-grid'
import CustomPagination from 'src/components/custom-pagnition' // Import CustomPagination của bạn
import { useTheme } from '@mui/material/styles'

interface GridTableProps {
    rows: any[]
    loading?: boolean
    onEdit: (row: any) => void
    onDelete: (row: any) => void
    page?: number
    pageSize?: number
    onPageChange?: (newPage: number) => void
    onPageSizeChange?: (newPageSize: number) => void
}

const getRoleColor = (name: string): ChipProps['color'] => {
    switch (name?.toUpperCase()) {
        case 'ADMIN':
            return 'error'
        case 'MANAGER':
            return 'warning'
        case 'USER':
        case 'BASIC':
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
    const theme = useTheme()

    const columns: GridColDef[] = useMemo(
        () => [
            { field: '_id', headerName: 'ID', width: 220 },
            {
                field: 'name',
                headerName: 'Tên vai trò',
                width: 180,
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
            {
                field: 'permissions',
                headerName: 'Quyền hạn',
                flex: 1,
                minWidth: 250,
                renderCell: (params) => (
                    <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                        {Array.isArray(params.value) && params.value.length > 0
                            ? params.value.join(', ')
                            : 'Không có quyền'}
                    </Typography>
                ),
            },
            {
                field: 'actions',
                headerName: 'Hành động',
                width: 100,
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
        <Card
            sx={{
                p: 3,
                backgroundColor: theme.palette.background.paper,
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[1]
            }}
        >
            <CustomDataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                getRowId={(row) => row._id || row.id}
                height={460}
                pagination
                pageSize={pageSize}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                {...(page !== undefined && { page })}
                {...(onPageChange && { onPageChange })}
                {...(onPageSizeChange && { onPageSizeChange })}
                slots={{
                    pagination: CustomPagination
                }}
            />
        </Card>
    )
}

export default GridTable