// ** React Imports
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// ** Hook Imports
import { useSettings } from 'src/hooks/useSettings'

interface StyledReactHotToastProps extends BoxProps {
  topPosition: string
  drawerZIndex: string
}

const StyledReactHotToast = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'topPosition' && prop !== 'drawerZIndex',
})<StyledReactHotToastProps>(({ theme, topPosition, drawerZIndex }) => ({
  '& > div': {
    left: `${theme.spacing(6)} !important`,
    right: `${theme.spacing(6)} !important`,
    bottom: `${theme.spacing(6)} !important`,
    top: `${topPosition} !important`,
    zIndex: `${drawerZIndex} !important`,
  },
  '& .react-hot-toast': {
    fontWeight: 400,
    letterSpacing: '0.14px',
    boxShadow: theme.palette.mode === 'dark' ? '0px 4px 20px rgba(0, 0, 0, 0.7)' : theme.shadows[4],
    borderRadius: theme.shape.borderRadius,
    fontSize: theme.typography.body1.fontSize,

    // 💡 Dùng !important để triệt tiêu các style mặc định cứng của thư viện
    backgroundColor: `${theme.palette.background.paper} !important`,
    color: `${theme.palette.text.primary} !important`,
    border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none',

    // 💡 Ép màu riêng cho success/error kèm !important để ăn sâu vào các thẻ con bên trong
    '&[data-type="success"]': {
      backgroundColor: `${theme.palette.mode === 'dark' ? '#064e3b' : '#E8F5E9'} !important`,
      color: `${theme.palette.mode === 'dark' ? '#4ade80' : '#2e7d32'} !important`,
      border: theme.palette.mode === 'dark' ? '1px solid rgba(74, 222, 128, 0.3)' : 'none',
    },
    '&[data-type="error"]': {
      backgroundColor: `${theme.palette.mode === 'dark' ? '#7f1d1d' : '#FFEBEE'} !important`,
      color: `${theme.palette.mode === 'dark' ? '#f87171' : '#c62828'} !important`,
      border: theme.palette.mode === 'dark' ? '1px solid rgba(248, 113, 113, 0.3)' : 'none',
    },

    // Ghi đè thêm cả các thẻ span/div chữ bên trong nếu bị lệch màu
    '& *': {
      color: 'inherit !important',
    },

    '&>:first-of-type:not([role])>:first-of-type': {
      width: 14,
      height: 14,
    },
  },
}))

const ReactHotToast = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()
  useTranslation()
  const { settings } = useSettings()
  const { layout, navHidden } = settings

  const hiddenLG = useMediaQuery(theme.breakpoints.down('lg'))

  const topPosition = layout === 'horizontal' && !navHidden ? '139px' : '75px'
  const drawerZIndex = hiddenLG ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1

  return (
    <StyledReactHotToast topPosition={topPosition} drawerZIndex={String(drawerZIndex)}>
      {children}
    </StyledReactHotToast>
  )
}

export default ReactHotToast