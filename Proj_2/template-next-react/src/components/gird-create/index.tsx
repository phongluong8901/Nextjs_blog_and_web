// ** React Imports
import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Button, { ButtonProps } from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

// ** Iconify Imports
import { Icon } from '@iconify/react'

export interface GridCreateProps extends ButtonProps {
    label?: string
    labelKey?: string // Hỗ trợ i18n key cho label của button
}

const GridCreate = ({
    label = 'Thêm mới',
    labelKey,
    ...props
}: GridCreateProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    // Xử lý i18n ưu tiên theo key, fallback về label truyền vào
    const renderedLabel = labelKey ? t(labelKey) : label

    return (
        <Button
            variant='contained'
            startIcon={<Icon icon='mdi:plus' width={20} height={20} />}
            {...props}
            sx={{
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: theme.shadows[2],
                ...props.sx,
            }}
        >
            {renderedLabel}
        </Button>
    )
}

export default GridCreate