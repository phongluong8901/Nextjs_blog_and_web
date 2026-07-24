import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Card, Typography, Divider, Button, IconButton, Tooltip } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Icon } from '@iconify/react'
import InputSearch from 'src/components/input-search'
import CustomPagination from 'src/components/custom-pagnition'
import { TPaymentType } from 'src/types/payment-type'

interface TPaymentTypeListTableProps {
    paymentTypes: TPaymentType[]
    total: number
    loading: boolean
    searchVal: string
    paginationModel: { page: number; pageSize: number }
    selectedRows: string[]
    setSearchVal: (val: string) => void
    setPaginationModel: (model: any) => void
    setSelectedRows: (rows: string[]) => void
    onEdit: (item: TPaymentType) => void
    onDeleteSingle: (id: string) => void
    onDeleteMany: () => void
}

const PaymentTypeListTable: React.FC<TPaymentTypeListTableProps> = ({
    paymentTypes, total, loading, searchVal, paginationModel, selectedRows,
    setSearchVal, setPaginationModel, setSelectedRows, onEdit, onDeleteSingle, onDeleteMany
}) => {
    const { t } = useTranslation()

    const columns: GridColDef[] = [
        { field: 'name', headerName: t('common.name', 'Name'), flex: 1, minWidth: 200 },
        { field: 'type', headerName: t('common.type', 'Type'), flex: 1, minWidth: 150 },
        {
            field: 'actions',
            headerName: t('common.actions', 'Actions'),
            width: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title={t('common.edit', 'Edit')}>
                        <IconButton size='small' onClick={() => onEdit(row)}>
                            <Icon icon='mdi:pencil-outline' fontSize={20} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('common.delete', 'Delete')}>
                        <IconButton size='small' color='error' onClick={() => onDeleteSingle(row._id)}>
                            <Icon icon='mdi:delete-outline' fontSize={20} />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ]

    return (
        <Card sx={{ p: 0, backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Box sx={{ p: 4, pb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t('payment.listTitle', 'Payment Types List')}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <InputSearch
                        value={searchVal}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchVal(e.target.value)}
                        placeholder={t('common.search', 'Search payment type...')}
                        onClear={() => setSearchVal('')}
                        sx={{ width: { xs: '100%', sm: 250 } }}
                    />
                    {selectedRows.length > 0 && (
                        <Button
                            variant='contained'
                            color='error'
                            size='small'
                            startIcon={<Icon icon='mdi:delete-outline' />}
                            onClick={onDeleteMany}
                        >
                            {t('common.deleteSelected', 'Delete Selected')} ({selectedRows.length})
                        </Button>
                    )}
                </Box>
            </Box>

            <Divider />

            <Box sx={{ width: '100%' }}>
                <DataGrid
                    autoHeight
                    rows={paymentTypes}
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
                    slots={{ pagination: CustomPagination }}
                    sx={{ border: 'none', '& .MuiDataGrid-cell': { borderColor: (theme) => theme.palette.divider } }}
                />
            </Box>
        </Card>
    )
}

export default PaymentTypeListTable