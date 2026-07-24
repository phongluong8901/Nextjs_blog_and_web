// ** React Imports
import React from 'react'

// ** MUI Imports
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Iconify Imports
import { Icon } from '@iconify/react'

export type GridEditProps = IconButtonProps & {
    tooltipTitle?: string
}

const GridEdit = ({ tooltipTitle = 'Chỉnh sửa', ...props }: GridEditProps) => {
    return (
        <Tooltip title={tooltipTitle}>
            <IconButton size='small' color='primary' {...props}>
                <Icon icon='mdi:pencil-outline' width={18} height={18} />
            </IconButton>
        </Tooltip>
    )
}

export default GridEdit