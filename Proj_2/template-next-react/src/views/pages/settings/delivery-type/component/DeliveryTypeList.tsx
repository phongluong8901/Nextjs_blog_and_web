import React, { ChangeEvent } from 'react'
import { Box, Card, Button, Divider, Typography, IconButton, Tooltip } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Icon } from '@iconify/react'
import { TDeliveryType } from 'src/types/delivery-type'
import InputSearch from 'src/components/input-search'
import CustomPagination from 'src/components/custom-pagnition'


interface DeliveryTypeListProps {
    deliveryTypes: TDeliveryType[]
    total: number
    loading: boolean
    searchVal: string
    setSearchVal: (val: string) => void
    paginationModel: { page: number; pageSize: number }
    setPaginationModel: (model: { page: number; pageSize: number }) => void
    selectedRows: string[]
    setSelectedRows: (rows: string[]) => void
    onEditClick: (item: TDeliveryType) => void
    onDeleteClick: (id: string) => void
    onDeleteManyClick: () => void
}

export const DeliveryTypeList: React.FC<DeliveryTypeListProps> = ({
    deliveryTypes,
    total,
    loading,
    searchVal,
    setSearchVal,
    paginationModel,
    setPaginationModel,
    selectedRows,
    setSelectedRows,
    onEditClick,
    onDeleteClick,
    onDeleteManyClick
}) => {
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Delivery Name', flex: 1, minWidth: 200 },
        {
            field: 'price',
            headerName: 'Price',
            flex: 1,
            minWidth: 150,
            renderCell: ({ row }) => <Typography variant='body2'>{row.price?.toLocaleString()} đ</Typography>
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title='Edit'>
                        <IconButton size='small' onClick={() => onEditClick(row)}>
                            <Icon icon='mdi:pencil-outline' fontSize={20} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton
                            size='small'
                            color='error'
                            onClick={() => onDeleteClick(row._id)}
                        >
                            <Icon icon='mdi:delete-outline' fontSize={20} />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ]

    return (
        <Card sx={{ p: 0, backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header: Tiêu đề, Ô tìm kiếm và Nút xóa hàng loạt */}
            <Box sx={{ p: 4, pb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Delivery Types List
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <InputSearch
                        value={searchVal}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchVal(e.target.value)}
                        placeholder="Search delivery type..."
                        onClear={() => setSearchVal('')}
                        sx={{ width: { xs: '100%', sm: 250 } }}
                    />
                    {selectedRows.length > 0 && (
                        <Button
                            variant='contained'
                            color='error'
                            size='small'
                            startIcon={<Icon icon='mdi:delete-outline' />}
                            onClick={onDeleteManyClick}
                        >
                            Delete Selected ({selectedRows.length})
                        </Button>
                    )}
                </Box>
            </Box>

            <Divider />

            {/* DataGrid Table */}
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    autoHeight
                    rows={deliveryTypes}
                    columns={columns}
                    getRowId={(row) => row._id}
                    paginationMode='server'
                    rowCount={total}
                    pageSizeOptions={[10, 25, 50]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection: any) => setSelectedRows(newSelection)}
                    loading={loading}
                    disableRowSelectionOnClick
                    slots={{
                        pagination: CustomPagination
                    }}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            borderColor: (theme) => theme.palette.divider,
                        },
                    }}
                />
            </Box>
        </Card>
    )
}