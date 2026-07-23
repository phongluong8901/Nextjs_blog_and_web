// ** React Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export interface CustomCircularProgressProps extends CircularProgressProps {
    label?: string
    showTextValue?: boolean
    boxSx?: object
}

const CustomCircularProgress = ({
    label,
    showTextValue = false,
    size = 40,
    thickness = 4,
    value = 0,
    variant = 'indeterminate',
    boxSx = {},
    ...props
}: CustomCircularProgressProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                ...boxSx,
            }}
        >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    variant={variant}
                    value={value}
                    size={size}
                    thickness={thickness}
                    {...props}
                />
                {showTextValue && variant === 'determinate' && (
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
                        <Typography variant='caption' component='div' color='text.secondary' sx={{ fontWeight: 600 }}>
                            {`${Math.round(value)}%`}
                        </Typography>
                    </Box>
                )}
            </Box>

            {label && (
                <Typography variant='body2' color='text.secondary' sx={{ mt: 2, fontWeight: 500 }}>
                    {label}
                </Typography>
            )}
        </Box>
    )
}

export default CustomCircularProgress