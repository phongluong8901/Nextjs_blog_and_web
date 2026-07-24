// ** React Imports
import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import { gridPaginationModelSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid'

export default function CustomPagination() {
    const theme = useTheme()
    const { t } = useTranslation()
    const apiRef = useGridApiContext()

    // Sử dụng gridPaginationModelSelector để lấy chuẩn { page, pageSize }
    const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector)

    const page = paginationModel.page // Bắt đầu từ 0
    const pageSize = paginationModel.pageSize
    const totalRows = apiRef.current.getRowsCount()

    const totalPages = Math.ceil(totalRows / pageSize) || 1
    const startRow = totalRows === 0 ? 0 : page * pageSize + 1
    const endRow = Math.min((page + 1) * pageSize, totalRows)

    const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
        apiRef.current.setPageSize(Number(event.target.value))
    }

    const handlePageChange = (newPage: number) => {
        apiRef.current.setPage(newPage)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                py: 1.5,
                width: '100%',
                flexWrap: 'wrap',
                gap: 2,
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}
        >
            {/* Cột trái: Số dòng mỗi trang & Thông tin tổng số */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant='body2' sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                        {t('Pagination.Show', 'Hiển thị')}
                    </Typography>
                    <Select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        size='small'
                        sx={{
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            '& .MuiSelect-select': { py: '4px', px: '10px' },
                            backgroundColor: theme.palette.action.hover,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.divider,
                            },
                        }}
                    >
                        {[5, 10, 20, 50, 100].map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant='body2' sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                        {t('Pagination.Rows', 'dòng')}
                    </Typography>
                </Box>

                <Typography variant='body2' sx={{ color: theme.palette.text.disabled, display: { xs: 'none', sm: 'block' } }}>
                    |
                </Typography>

                <Typography variant='body2' sx={{ color: theme.palette.text.secondary, display: { xs: 'none', sm: 'block' } }}>
                    {t('Pagination.TotalInfo', 'Tổng số')} <Box component="span" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{totalRows}</Box> {t('Pagination.Records', 'bản ghi')} ({t('Pagination.From', 'Từ')} {startRow} {t('Pagination.To', 'đến')} {endRow})
                </Typography>
            </Box>

            {/* Cột phải: Điều hướng trang số & Các nút bấm */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant='body2' sx={{ color: theme.palette.text.secondary, mr: 0.5 }}>
                    {t('Pagination.Page', 'Trang')} <Box component="span" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{page + 1}</Box> / {totalPages}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {/* Trang đầu */}
                    <Tooltip title={t('Pagination.FirstPage', 'Trang đầu')}>
                        <span>
                            <IconButton
                                size='small'
                                onClick={() => handlePageChange(0)}
                                disabled={page === 0}
                                sx={{
                                    borderRadius: '8px',
                                    border: `1px solid ${theme.palette.divider}`,
                                    color: theme.palette.text.primary,
                                    '&.Mui-disabled': { opacity: 0.4, color: theme.palette.action.disabled },
                                    '&:hover': { backgroundColor: theme.palette.action.hover }
                                }}
                            >
                                <Icon icon="mdi:page-first" width={18} />
                            </IconButton>
                        </span>
                    </Tooltip>

                    {/* Trang trước */}
                    <Tooltip title={t('Pagination.PrevPage', 'Trang trước')}>
                        <span>
                            <IconButton
                                size='small'
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 0}
                                sx={{
                                    borderRadius: '8px',
                                    border: `1px solid ${theme.palette.divider}`,
                                    color: theme.palette.text.primary,
                                    '&.Mui-disabled': { opacity: 0.4, color: theme.palette.action.disabled },
                                    '&:hover': { backgroundColor: theme.palette.action.hover }
                                }}
                            >
                                <Icon icon="mdi:chevron-left" width={18} />
                            </IconButton>
                        </span>
                    </Tooltip>

                    {/* Trang sau */}
                    <Tooltip title={t('Pagination.NextPage', 'Trang sau')}>
                        <span>
                            <IconButton
                                size='small'
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page >= totalPages - 1}
                                sx={{
                                    borderRadius: '8px',
                                    border: `1px solid ${theme.palette.divider}`,
                                    color: theme.palette.text.primary,
                                    '&.Mui-disabled': { opacity: 0.4, color: theme.palette.action.disabled },
                                    '&:hover': { backgroundColor: theme.palette.action.hover }
                                }}
                            >
                                <Icon icon="mdi:chevron-right" width={18} />
                            </IconButton>
                        </span>
                    </Tooltip>

                    {/* Trang cuối */}
                    <Tooltip title={t('Pagination.LastPage', 'Trang cuối')}>
                        <span>
                            <IconButton
                                size='small'
                                onClick={() => handlePageChange(totalPages - 1)}
                                disabled={page >= totalPages - 1}
                                sx={{
                                    borderRadius: '8px',
                                    border: `1px solid ${theme.palette.divider}`,
                                    color: theme.palette.text.primary,
                                    '&.Mui-disabled': { opacity: 0.4, color: theme.palette.action.disabled },
                                    '&:hover': { backgroundColor: theme.palette.action.hover }
                                }}
                            >
                                <Icon icon="mdi:page-last" width={18} />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    )
}