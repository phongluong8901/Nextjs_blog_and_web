// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

interface BlankLayoutProps {
    children: ReactNode
}

// Styled component cho khung chứa bao trùm toàn màn hình
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.default,
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {
    return (
        <BlankLayoutWrapper className='blank-layout'>
            <Box sx={{ flex: 1, height: '100%', overflowY: 'auto', position: 'relative' }}>
                {children}
            </Box>
        </BlankLayoutWrapper>
    )
}

export default BlankLayout