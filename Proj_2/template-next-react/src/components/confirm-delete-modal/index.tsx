// src/components/common/ConfirmDeleteModal.tsx
import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Icon } from '@iconify/react'
import CustomModal from '../custom-modal'

export interface ConfirmDeleteModalProps {
  open: boolean
  title?: string
  content?: string
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

const ConfirmDeleteModal = ({
  open,
  title = 'Xác nhận xóa',
  content = 'Bạn có chắc chắn muốn xóa bản ghi này? Thao tác này không thể hoàn tác.',
  onClose,
  onConfirm,
  loading = false,
}: ConfirmDeleteModalProps) => {
  return (
    <CustomModal
      open={open}
      title={title}
      onClose={onClose}
      maxWidth='xs'
      footer={
        <>
          <Button variant='outlined' color='secondary' onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button variant='contained' color='error' onClick={onConfirm} disabled={loading}>
            {loading ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
        <Icon icon='mdi:alert-circle-outline' width={48} height={48} color='#ff4d4f' />
        <Typography variant='body1' sx={{ color: 'text.primary' }}>
          {content}
        </Typography>
      </Box>
    </CustomModal>
  )
}

export default ConfirmDeleteModal