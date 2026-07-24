import React from 'react'
import { Box, Button } from '@mui/material'
import { Icon } from '@iconify/react'
import InputSearch from 'src/components/input-search'

interface CityHeaderProps {
    searchTerm: string
    selectedCount: number
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClearSearch: () => void
    onAddClick: () => void
    onDeleteMultiple: () => void
}

export default function CityHeader({
    searchTerm,
    selectedCount,
    onSearchChange,
    onClearSearch,
    onAddClick,
    onDeleteMultiple
}: CityHeaderProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 2
            }}
        >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', flexGrow: 1 }}>
                <InputSearch
                    value={searchTerm}
                    onChange={onSearchChange}
                    onClear={onClearSearch}
                    placeholder='Tìm kiếm tên thành phố...'
                    sx={{ width: { xs: '100%', sm: '300px' } }}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                {selectedCount > 0 && (
                    <Button
                        variant='outlined'
                        color='error'
                        startIcon={<Icon icon='mdi:delete-sweep-outline' width={20} />}
                        onClick={onDeleteMultiple}
                    >
                        Xóa đã chọn ({selectedCount})
                    </Button>
                )}

                <Button
                    variant='contained'
                    startIcon={<Icon icon='mdi:plus' width={20} />}
                    onClick={onAddClick}
                >
                    Thêm thành phố
                </Button>
            </Box>
        </Box>
    )
}