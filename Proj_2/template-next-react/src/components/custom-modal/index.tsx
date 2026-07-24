// ** React Imports
import React, { ReactNode } from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

// ** Iconify Imports
import { Icon } from '@iconify/react'

export interface CustomModalProps {
    open: boolean
    title?: string
    titleKey?: string // Hỗ trợ i18n key cho title
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
        color: theme.palette.text.primary,
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
    title = '',
    titleKey,
    onClose,
    children,
    footer,
    maxWidth = 'sm',
    fullWidth = true,
}: CustomModalProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    // Xử lý i18n ưu tiên theo key, nếu không có thì lấy chuỗi truyền vào
    const renderedTitle = titleKey ? t(titleKey) : title

    return (
        <BootstrapDialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            aria-labelledby='custom-modal-title'
        >
            <DialogTitle
                id='custom-modal-title'
                sx={{
                    m: 0,
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
            >
                <Typography
                    variant='h6'
                    component='span'
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                    {renderedTitle}
                </Typography>
                {onClose ? (
                    <IconButton
                        aria-label='close'
                        onClick={onClose}
                        sx={{
                            color: theme.palette.grey[500],
                            transition: 'all 0.2s',
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                                color: theme.palette.text.primary,
                            },
                        }}
                    >
                        <Icon icon='mdi:close' width={20} height={20} />
                    </IconButton>
                ) : null}
            </DialogTitle>

            <DialogContent dividers sx={{ borderColor: theme.palette.divider }}>
                <Box sx={{ my: 1, color: theme.palette.text.secondary }}>{children}</Box>
            </DialogContent>

            {footer && (
                <DialogActions sx={{ borderColor: theme.palette.divider }}>
                    {footer}
                </DialogActions>
            )}
        </BootstrapDialog>
    )
}

export default CustomModal