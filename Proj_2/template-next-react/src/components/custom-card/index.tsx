// ** React Imports
import React, { ReactNode } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import { SxProps, Theme } from '@mui/material/styles'

export interface CustomCardProps {
    title?: string | ReactNode
    subheader?: string | ReactNode
    action?: ReactNode
    children: ReactNode
    footer?: ReactNode
    cardSx?: SxProps<Theme>
    contentSx?: SxProps<Theme>
    headerSx?: SxProps<Theme>
    footerSx?: SxProps<Theme>
    showDivider?: boolean
}

const CustomCard = ({
    title,
    subheader,
    action,
    children,
    footer,
    cardSx = {},
    contentSx = {},
    headerSx = {},
    footerSx = {},
    showDivider = false,
}: CustomCardProps) => {
    return (
        <Card
            sx={{
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[3],
                backgroundColor: (theme) => theme.palette.background.paper,
                ...cardSx,
            }}
        >
            {(title || subheader || action) && (
                <>
                    <CardHeader
                        title={title}
                        subheader={subheader}
                        action={action}
                        titleTypographyNames={{ variant: 'h6', fontWeight: 600 }}
                        sx={{
                            p: 3,
                            '& .MuiCardHeader-content': { overflow: 'hidden' },
                            ...headerSx,
                        }}
                    />
                    {showDivider && <Divider />}
                </>
            )}

            <CardContent
                sx={{
                    p: 3,
                    '&:last-child': { pb: footer ? 2 : 3 },
                    ...contentSx,
                }}
            >
                {children}
            </CardContent>

            {footer && (
                <>
                    {showDivider && <Divider />}
                    <CardActions
                        sx={{
                            p: 3,
                            pt: 2,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            ...footerSx,
                        }}
                    >
                        {footer}
                    </CardActions>
                </>
            )}
        </Card>
    )
}

export default CustomCard