// ** React Imports
import React from 'react'

// ** MUI Imports
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Iconify Imports
import { Icon } from '@iconify/react'

export type GridDeleteProps = IconButtonProps & {
    tooltipTitle?: string
}

const GridDelete = ({ tooltipTitle = 'Xóa', ...props }: GridDeleteProps) => {
    return (
        <Tooltip title={tooltipTitle}>
            <IconButton size='small' color='error' {...props}>
                <Icon icon='mdi:delete-outline' width={18} height={18} />
            </IconButton>
        </Tooltip>
    )
}

export default GridDelete