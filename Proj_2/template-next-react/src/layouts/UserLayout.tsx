// ** React & Next Imports
import { ReactNode, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Sidebar from './userLayoutComponent/Sidebar'
import Header from './userLayoutComponent/Header'
import Footer from './userLayoutComponent/Footer'

// ** Layout Child Components

type TProps = {
    children: ReactNode
}

const DRAWER_WIDTH_OPEN = 260
const DRAWER_WIDTH_CLOSED = 80

const UserLayout = ({ children }: TProps) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleToggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Sidebar Component */}
            <Sidebar
                drawerWidthOpen={DRAWER_WIDTH_OPEN}
                drawerWidthClosed={DRAWER_WIDTH_CLOSED}
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                onDrawerToggle={handleDrawerToggle}
                onToggleCollapse={handleToggleCollapse}
            />

            {/* Main Content Area */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '100vh' }}>
                {/* Header Component */}
                <Header onDrawerToggle={handleDrawerToggle} />

                {/* Main Body Content */}
                <Box
                    component='main'
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, sm: 3, md: 4 },
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        bgcolor: 'background.default',
                    }}
                >
                    {children}
                </Box>

                {/* Footer Component */}
                <Footer />
            </Box>
        </Box>
    )
}

export default UserLayout