import React from 'react'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import { Box, IconButton, Tooltip, Chip } from '@mui/material'
import { Icon } from '@iconify/react'
import CustomPagination from 'src/components/custom-pagnition'

interface UserGridTableProps {
    rows: any[]
    loading: boolean
    selectedRows: GridRowSelectionModel
    onSelectionChange: (newSelection: GridRowSelectionModel) => void
    onEdit: (row: any) => void
    onDelete: (row: any) => void
}

export default function UserGridTable({
    rows,
    loading,
    selectedRows,
    onSelectionChange,
    onEdit,
    onDelete
}: UserGridTableProps) {
    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
        { field: 'firstName', headerName: 'Họ', width: 100 },
        { field: 'middleName', headerName: 'Tên đệm', width: 110 },
        { field: 'lastName', headerName: 'Tên', width: 100 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', width: 130 },
        { field: 'address', headerName: 'Địa chỉ', width: 150 },
        {
            field: 'city',
            headerName: 'Thành phố',
            width: 130,
            renderCell: (params) => {
                return params.row.city?.name || params.row.city || '---'
            }
        },
        {
            field: 'role',
            headerName: 'Vai trò',
            width: 130,
            renderCell: (params) => {
                const roleName = params.row.role?.name || 'User'

                return <Chip label={roleName} size="small" color="primary" variant="outlined" />
            }
        },
        {
            field: 'userType',
            headerName: 'Loại User',
            width: 100,
            renderCell: (params) => {
                const typeMap: Record<number, { label: string, color: 'default' | 'primary' | 'secondary' | 'success' }> = {
                    1: { label: 'Admin', color: 'success' },
                    2: { label: 'Staff', color: 'primary' },
                    3: { label: 'Normal', color: 'default' },
                }
                const currentType = typeMap[params.value] || { label: 'Normal', color: 'default' }

                return <Chip label={currentType.label} size="small" color={currentType.color} />
            }
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 110,
            renderCell: (params) => (
                <Chip
                    label={params.value === 1 ? 'Hoạt động' : 'Khóa'}
                    size="small"
                    color={params.value === 1 ? 'success' : 'error'}
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            width: 110,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Chỉnh sửa">
                        <IconButton size="small" onClick={() => onEdit(params.row)}>
                            <Icon icon="mdi:pencil-outline" width={20} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton size="small" color="error" onClick={() => onDelete(params.row)}>
                            <Icon icon="mdi:delete-outline" width={20} />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ]

    return (
        <Box sx={{ height: 600, width: '100%', backgroundColor: 'background.paper', borderRadius: 2 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                checkboxSelection
                onRowSelectionModelChange={(newSelection) => {
                    onSelectionChange(newSelection)
                }}
                rowSelectionModel={selectedRows}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                disableRowSelectionOnClick
                slots={{
                    pagination: CustomPagination
                }}
            />
        </Box>
    )
}