import React from 'react'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Icon } from '@iconify/react'
import CustomPagination from 'src/components/custom-pagnition'

interface CityGridTableProps {
    rows: any[]
    loading: boolean
    selectedRows: GridRowSelectionModel
    onSelectionChange: (newSelection: GridRowSelectionModel) => void
    onEdit: (row: any) => void
    onDelete: (row: any) => void
}

export default function CityGridTable({
    rows,
    loading,
    selectedRows,
    onSelectionChange,
    onEdit,
    onDelete
}: CityGridTableProps) {
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Tên thành phố', flex: 1, minWidth: 200 },
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
                pageSizeOptions={[5, 10, 20, 50]}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                disableRowSelectionOnClick
                slots={{
                    pagination: CustomPagination
                }}
            />
        </Box>
    )
}