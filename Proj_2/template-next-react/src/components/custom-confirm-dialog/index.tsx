import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { Icon } from '@iconify/react'

interface CustomConfirmDialogProps {
    open: boolean
    title?: string
    content: string | React.ReactNode
    confirmText?: string
    cancelText?: string
    confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    icon?: string
    loading?: boolean
    onClose: () => void
    onConfirm: () => void
}

const CustomConfirmDialog: React.FC<CustomConfirmDialogProps> = ({
    open,
    title = 'Xác nhận hành động',
    content,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    confirmColor = 'primary',
    icon = 'mdi:alert-circle-outline',
    loading = false,
    onClose,
    onConfirm,
}) => {
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            maxWidth='xs'
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2, p: 1 }
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
                {icon && <Icon icon={icon} width={24} height={24} color={`var(--mui-palette-${confirmColor}-main, #1976d2)`} />}
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ pb: 2 }}>
                {typeof content === 'string' ? (
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        {content}
                    </Typography>
                ) : (
                    content
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={onClose}
                    disabled={loading}
                >
                    {cancelText}
                </Button>
                <Button
                    variant='contained'
                    color={confirmColor}
                    onClick={onConfirm}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={18} color='inherit' /> : undefined}
                >
                    {loading ? 'Đang xử lý...' : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomConfirmDialog