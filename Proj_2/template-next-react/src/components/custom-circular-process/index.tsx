// ** React Imports
import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

export interface CustomCircularProgressProps extends CircularProgressProps {
    label?: string
    labelKey?: string
    showTextValue?: boolean
    boxSx?: object
    colorVariant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'gradient'
    showTrack?: boolean
}

const CustomCircularProgress = ({
    label,
    labelKey,
    showTextValue = false,
    size = 48,
    thickness = 4.5,
    value = 0,
    variant = 'indeterminate',
    boxSx = {},
    colorVariant = 'gradient',
    showTrack = true,
    ...props
}: CustomCircularProgressProps) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const isLight = theme.palette.mode === 'light'

    const renderedLabel = labelKey ? t(labelKey) : label

    const getColor = () => {
        switch (colorVariant) {
            case 'primary':
                return theme.palette.primary.main
            case 'secondary':
                return theme.palette.secondary.main
            case 'success':
                return theme.palette.success.main
            case 'error':
                return theme.palette.error.main
            case 'warning':
                return theme.palette.warning.main
            case 'info':
                return theme.palette.info.main
            case 'gradient':
                return 'url(#loading_3d_gradient)'
            default:
                return theme.palette.primary.main
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                backgroundColor: 'transparent',
                ...boxSx,
            }}
        >
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="loading_3d_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        {/* 💡 Điều chỉnh tông màu tím nhẹ thanh lịch, sáng rõ ở cả 2 mode */}
                        <stop offset="0%" stopColor={isLight ? '#b794f4' : '#d6bcfa'} />
                        <stop offset="50%" stopColor={isLight ? '#805ad5' : '#b794f4'} />
                        <stop offset="100%" stopColor={isLight ? '#6b46c1' : '#9f7aea'} />
                    </linearGradient>
                </defs>
            </svg>

            <Box
                sx={{
                    position: 'relative',
                    display: 'inline-flex',

                    // Đổ bóng tối ưu giúp nổi khối 3D rõ nét trên Dark Mode
                    filter: isLight
                        ? 'drop-shadow(0px 10px 18px rgba(0, 0, 0, 0.18)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))'
                        : 'drop-shadow(0px 12px 24px rgba(0, 0, 0, 0.85)) drop-shadow(0px 0px 8px rgba(183, 148, 244, 0.35))',
                    transform: 'perspective(600px) rotateX(12deg) rotateY(-4deg)',
                    transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1.08)',
                    },
                }}
            >
                {/* Lớp Track chìm bên dưới */}
                {showTrack && (
                    <CircularProgress
                        variant="determinate"
                        value={100}
                        size={size}
                        thickness={thickness + 0.6}
                        sx={{
                            color: isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.1)',
                            position: 'absolute',
                            left: 0,
                            boxShadow: isLight
                                ? 'inset 0 3px 6px rgba(0, 0, 0, 0.12), inset 0 -1px 2px rgba(255, 255, 255, 0.8)'
                                : 'inset 0 3px 6px rgba(0, 0, 0, 0.7), inset 0 -1px 2px rgba(255, 255, 255, 0.15)',
                            borderRadius: '50%',
                        }}
                    />
                )}

                {/* Vòng tròn Progress chính */}
                <CircularProgress
                    variant={variant}
                    value={value}
                    size={size}
                    thickness={thickness}
                    sx={{
                        color: getColor(),
                        animationDuration: variant === 'indeterminate' ? '1.4s' : undefined,
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                            filter: isLight
                                ? 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.35))'
                                : 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.8))',
                        },
                    }}
                    {...props}
                />

                {/* Phần hiển thị Text/Value chính giữa */}
                {(showTextValue || variant === 'determinate') && (
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="caption"
                            component="div"
                            sx={{
                                fontWeight: 800,
                                fontSize: Number(size) < 40 ? '0.65rem' : '0.75rem',
                                color: theme.palette.text.primary,
                                textShadow: isLight ? '0 1px 2px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.9)',
                            }}
                        >
                            {`${Math.round(value)}%`}
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Label phía dưới */}
            {renderedLabel && (
                <Typography
                    variant="body2"
                    sx={{
                        mt: 2.5,
                        fontWeight: 700,
                        letterSpacing: '0.6px',
                        color: theme.palette.text.secondary,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        textShadow: isLight ? '0 1px 1px rgba(255,255,255,0.9)' : '0 1px 2px rgba(0,0,0,0.6)',
                    }}
                >
                    {renderedLabel}
                </Typography>
            )}
        </Box>
    )
}

export default CustomCircularProgress