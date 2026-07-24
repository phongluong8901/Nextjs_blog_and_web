import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'

interface CustomConfirmDialogProps {
    open: boolean
    title?: string
    titleKey?: string
    content: string | React.ReactNode
    contentKey?: string
    confirmText?: string
    confirmTextKey?: string
    cancelText?: string
    cancelTextKey?: string
    confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    icon?: string
    loading?: boolean
    onClose: () => void
    onConfirm: () => void
}

const CustomConfirmDialog: React.FC<CustomConfirmDialogProps> = ({
    open,
    title = 'Xác nhận hành động',
    titleKey,
    content,
    contentKey,
    confirmText,
    confirmTextKey,
    cancelText,
    cancelTextKey,
    confirmColor = 'primary',
    icon = 'mdi:alert-circle-outline',
    loading = false,
    onClose,
    onConfirm,
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    // Xử lý dịch i18n theo thứ tự ưu tiên: key -> text truyền vào -> giá trị mặc định tiếng Việt
    const renderedTitle = titleKey ? t(titleKey) : title
    const renderedContent = contentKey ? t(contentKey) : content
    const renderedConfirmText = confirmTextKey ? t(confirmTextKey) : confirmText || 'Xác nhận'
    const renderedCancelText = cancelTextKey ? t(cancelTextKey) : cancelText || 'Hủy'
    const loadingText = t('Common.Loading', 'Đang xử lý...')

    // Lấy màu sắc chuẩn từ theme palette
    const getIconColor = () => {
        switch (confirmColor) {
            case 'primary':
                return theme.palette.primary.main
            case 'secondary':
                return theme.palette.secondary.main
            case 'error':
                return theme.palette.error.main
            case 'warning':
                return theme.palette.warning.main
            case 'info':
                return theme.palette.info.main
            case 'success':
                return theme.palette.success.main
            default:
                return theme.palette.primary.main
        }
    }

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    p: 1,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[6],
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
                {icon && <Icon icon={icon} width={24} height={24} color={getIconColor()} />}
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    {renderedTitle}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ pb: 2 }}>
                {typeof renderedContent === 'string' ? (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {renderedContent}
                    </Typography>
                ) : (
                    renderedContent
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onClose}
                    disabled={loading}
                >
                    {renderedCancelText}
                </Button>
                <Button
                    variant="contained"
                    color={confirmColor}
                    onClick={onConfirm}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
                >
                    {loading ? loadingText : renderedConfirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomConfirmDialog