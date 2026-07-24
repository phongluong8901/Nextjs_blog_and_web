// ** React Imports
import React, { ReactNode } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Iconify Imports
import { Icon } from '@iconify/react'

export interface CustomModalProps {
    open: boolean
    title: string
    onClose: () => void
    children: ReactNode
    footer?: ReactNode
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
    fullWidth?: boolean
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 12,
        padding: theme.spacing(1),
        boxShadow: theme.shadows[9],
        backgroundColor: theme.palette.background.paper,
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2, 3),
    },
}))

const CustomModal = ({
    open,
    title,
    onClose,
    children,
    footer,
    maxWidth = 'sm',
    fullWidth = true,
}: CustomModalProps) => {
    return (
        <BootstrapDialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            aria-labelledby='custom-modal-title'
        >
            <DialogTitle id='custom-modal-title' sx={{ m: 0, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6' component='span' sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
                {onClose ? (
                    <IconButton
                        aria-label='close'
                        onClick={onClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                            transition: 'all 0.2s',
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.action.hover,
                                color: (theme) => theme.palette.text.primary,
                            },
                        }}
                    >
                        <Icon icon='mdi:close' width={20} height={20} />
                    </IconButton>
                ) : null}
            </DialogTitle>

            <DialogContent dividers sx={{ borderColor: 'divider' }}>
                <Box sx={{ my: 1 }}>{children}</Box>
            </DialogContent>

            {footer && <DialogActions sx={{ borderColor: 'divider' }}>{footer}</DialogActions>}
        </BootstrapDialog>
    )
}

export default CustomModal