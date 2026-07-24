import React, { ReactNode } from 'react'
import { Box, useTheme } from '@mui/material'

interface ShopifyBackgroundProps {
    children: ReactNode
}

const ShopifyBackground: React.FC<ShopifyBackgroundProps> = ({ children }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: 2, sm: 3, md: 4 },
                overflow: 'hidden',
                position: 'relative',

                // Nền Gradient chuyển màu chuẩn Shopify Enterprise Hero Page
                backgroundColor: theme.palette.mode === 'dark' ? '#0B0F17' : '#F1F5F9',
                backgroundImage:
                    theme.palette.mode === 'dark'
                        ? 'radial-gradient(at 0% 0%, rgba(0, 128, 96, 0.25) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(15, 23, 42, 0.9) 0px, transparent 50%)'
                        : 'radial-gradient(at 0% 0%, rgba(0, 128, 96, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(226, 232, 240, 0.8) 0px, transparent 50%)',
            }}
        >
            {/* SHOPIFY AURORA GLOW ORB (Trái) */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-5%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 128, 96, 0.35) 0%, rgba(0, 128, 96, 0) 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* SHOPIFY AURORA GLOW ORB (Phải) */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 76, 63, 0.4) 0%, rgba(0, 76, 63, 0) 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* Nội dung bên trong (Card Login / Form...) */}
            {children}
        </Box>
    )
}

export default ShopifyBackground