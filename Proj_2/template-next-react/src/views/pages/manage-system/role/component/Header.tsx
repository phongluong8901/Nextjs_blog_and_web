import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import GridCreate from 'src/components/gird-create'
import InputSearch from 'src/components/input-search'

interface HeaderProps {
    searchTerm: string
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
    onClearSearch: () => void
    onAddClick: () => void
    addLabel?: string
}

const Header: React.FC<HeaderProps> = ({
    searchTerm,
    onSearchChange,
    onClearSearch,
    onAddClick,
    addLabel,
}) => {
    const { t } = useTranslation()

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
            <InputSearch
                value={searchTerm}
                onChange={onSearchChange}
                onClear={onClearSearch}
                placeholder={t('common.searchPlaceholder', 'Tìm kiếm theo mã hoặc tên...')}
                sx={{ width: { xs: '100%', sm: 320 } }} // 👈 Responsive chiều rộng trên mobile
            />
            <GridCreate
                label={addLabel || t('role.add', 'Thêm vai trò')}
                onClick={onAddClick}
            />
        </Box>
    )
}

export default Header