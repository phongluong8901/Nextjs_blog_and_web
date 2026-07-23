import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Box, Typography } from '@mui/material'

export interface CarouselItem {
    image?: string | StaticImageData
    title?: string
    description?: string
    alt?: string
}

interface CarouselProps {
    items: CarouselItem[]
    autoPlay?: boolean
    autoPlayInterval?: number
}

const CustomCarousel: React.FC<CarouselProps> = ({
    items,
    autoPlay = true,
    autoPlayInterval = 4000,
}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const startXRef = useRef<number>(0)

    const handleNext = useCallback(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, [items.length])

    const handlePrev = useCallback(() => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    }, [items.length])

    // Autoplay
    useEffect(() => {
        if (!autoPlay || items.length <= 1 || isDragging) return

        const timer = setInterval(() => {
            handleNext()
        }, autoPlayInterval)

        return () => clearInterval(timer)
    }, [autoPlay, autoPlayInterval, items.length, handleNext, isDragging])

    // Xử lý Kéo / Vuốt (Swipe / Drag)
    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true)
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        startXRef.current = clientX
    }

    const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return
        setIsDragging(false)
        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
        const diffX = clientX - startXRef.current

        if (diffX < -40) handleNext()
        else if (diffX > 40) handlePrev()
    }

    if (!items || items.length === 0) return null

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                userSelect: 'none',
                perspective: '1000px', // Không gian 3D
                px: 2, // Thêm margin/padding 2 bên để chắc chắn không chạm mép ngoài
            }}
        >
            {/* KHỐI CHỨA THẺ CAROUSEL 3D */}
            <Box
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                sx={{
                    width: '100%',
                    height: '240px',
                    position: 'relative',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    transformStyle: 'preserve-3d',
                }}
            >
                {items.map((item, index) => {
                    const total = items.length
                    let offset = index - activeIndex
                    if (offset > total / 2) offset -= total
                    if (offset < -total / 2) offset += total

                    const isActive = offset === 0
                    const isPrev = offset === -1 || (activeIndex === 0 && index === total - 1)
                    const isNext = offset === 1 || (activeIndex === total - 1 && index === 0)

                    // BIẾN ĐỔI 3D GỌN GÀNG TRONG KHUNG
                    let transformStyle = 'translateX(0%) scale(0.65) translateZ(-250px)'
                    let opacity = 0
                    let zIndex = 0

                    if (isActive) {
                        // Card chính giữa nổi lồi nhẹ
                        transformStyle = 'translateX(0%) scale(0.95) translateZ(0px) rotateY(0deg)'
                        opacity = 1
                        zIndex = 10
                    } else if (isPrev) {
                        // Card bên trái ép sát vào trong, nghiêng sâu hơn
                        transformStyle = 'translateX(-16%) scale(0.78) translateZ(-120px) rotateY(25deg)'
                        opacity = 0.5
                        zIndex = 5
                    } else if (isNext) {
                        // Card bên phải ép sát vào trong, nghiêng sâu hơn
                        transformStyle = 'translateX(16%) scale(0.78) translateZ(-120px) rotateY(-25deg)'
                        opacity = 0.5
                        zIndex = 5
                    }

                    return (
                        <Box
                            key={index}
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '20px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: 2.5,
                                pb: 4,
                                transform: transformStyle,
                                opacity: opacity,
                                zIndex: zIndex,
                                transition: isDragging
                                    ? 'none'
                                    : 'all 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                                boxShadow: isActive
                                    ? '0 15px 35px rgba(0,0,0,0.4)'
                                    : '0 8px 16px rgba(0,0,0,0.2)',
                                border: isActive
                                    ? '1px solid rgba(255, 255, 255, 0.25)'
                                    : '1px solid rgba(255, 255, 255, 0.08)',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                if (!isActive) setActiveIndex(index)
                            }}
                        >
                            {/* 1. HÌNH ẢNH NỀN FULL KHUNG */}
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={item.alt || item.title || `Slide ${index + 1}`}
                                    fill
                                    sizes="(max-width: 1200px) 50vw, 600px"
                                    style={{ objectFit: 'cover' }}
                                    priority={index === 0}
                                    draggable={false}
                                />
                            )}

                            {/* 2. HIỆU ỨNG MỜ 4 GÓC & BÓNG CHÂN VIGNETTE */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    zIndex: 1,
                                    background:
                                        'radial-gradient(ellipse at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.85) 100%), linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 65%)',
                                    pointerEvents: 'none',
                                }}
                            />

                            {/* 3. NỘI DUNG CHỮ TRẮNG */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    zIndex: 2,
                                    color: '#FFFFFF',
                                    textAlign: 'center',
                                    pointerEvents: 'none',
                                    transform: isActive ? 'translateY(0)' : 'translateY(15px)',
                                    opacity: isActive ? 1 : 0,
                                    transition: 'all 0.4s ease 0.1s',
                                }}
                            >
                                {item.title && (
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 0.5,
                                            fontSize: '1rem',
                                            color: '#FFFFFF',
                                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                )}

                                {item.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8rem',
                                            lineHeight: 1.3,
                                            color: '#FFFFFF',
                                            opacity: 0.95,
                                            textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    )
                })}

                {/* 4. THANH INDICATOR BÓNG KÍNH (GUSSION GLASS DOTS) */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                >
                    {items.map((_, index) => {
                        const isActive = index === activeIndex

                        return (
                            <Box
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                sx={{
                                    width: isActive ? 22 : 6,
                                    height: 6,
                                    borderRadius: '3px',
                                    backgroundColor: isActive
                                        ? '#FFFFFF'
                                        : 'rgba(255, 255, 255, 0.35)',
                                    cursor: 'pointer',
                                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: isActive ? '0 0 8px rgba(255,255,255,0.8)' : 'none',
                                    '&:hover': { backgroundColor: '#FFFFFF' },
                                }}
                            />
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default CustomCarousel