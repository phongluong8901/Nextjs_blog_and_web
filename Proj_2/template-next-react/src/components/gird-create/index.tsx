// ** React Imports
import React from 'react'

// ** MUI Imports
import Button, { ButtonProps } from '@mui/material/Button'

// ** Iconify Imports
import { Icon } from '@iconify/react'

export interface GridCreateProps extends ButtonProps {
    label?: string
}

const GridCreate = ({ label = 'Thêm mới', ...props }: GridCreateProps) => {
    return (
        <Button
            variant='contained'
            startIcon={<Icon icon='mdi:plus' width={20} height={20} />}
            {...props}
        >
            {label}
        </Button>
    )
}

export default GridCreate