// ** React Imports
import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'

// ** Iconify Imports
import { Icon } from '@iconify/react'

export type GridEditProps = IconButtonProps & {
    tooltipTitle?: string
    tooltipTitleKey?: string // Hỗ trợ i18n key cho tooltip
}

const GridEdit = ({
    tooltipTitle = 'Chỉnh sửa',
    tooltipTitleKey,
    ...props
}: GridEditProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    // Xử lý i18n ưu tiên theo key, fallback về tooltipTitle truyền vào
    const renderedTooltip = tooltipTitleKey ? t(tooltipTitleKey) : tooltipTitle

    return (
        <Tooltip title={renderedTooltip}>
            <IconButton
                size='small'
                color='primary'
                {...props}
                sx={{
                    borderRadius: 2,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                    ...props.sx,
                }}
            >
                <Icon icon='mdi:pencil-outline' width={18} height={18} />
            </IconButton>
        </Tooltip>
    )
}

export default GridEdit