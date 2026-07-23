// ** React & Next Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Sub-components
import MenuItemList, { MenuItemType } from './sideBarComponents/MenuItemList'

type SidebarProps = {
    drawerWidthOpen: number
    drawerWidthClosed: number
    collapsed: boolean
    mobileOpen: boolean
    onDrawerToggle: () => void
    onToggleCollapse: () => void
}

// Cấu trúc toàn bộ menu của hệ thống
const allMenuItems: MenuItemType[] = [
    { title: 'Dashboard', path: '/', icon: 'mdi:view-dashboard-outline' },
    { title: 'User Home', path: '/user-home', icon: 'mdi:home-account-outline', excludeRole: 'Admin' },
    { title: 'Admin Home', path: '/admin-home', icon: 'mdi:view-dashboard-variant-outline', role: 'Admin' },
    { title: 'Admin Dashboard', path: '/admin-dashboard', icon: 'mdi:shield-account-outline', role: 'Admin' },
    {
        title: 'User Management',
        icon: 'mdi:account-group-outline',
        role: 'Admin',
        children: [
            { title: 'List', path: '/users' },
            { title: 'Roles', path: '/users/roles' },
        ],
    },
    { title: 'My Profile', path: '/my-profile', icon: 'mdi:account-outline' },
    { title: 'System Settings', path: '/setting', icon: 'mdi:cog-outline' },
]

const Sidebar = ({
    drawerWidthOpen,
    drawerWidthClosed,
    collapsed,
    mobileOpen,
    onDrawerToggle,
    onToggleCollapse,
}: SidebarProps) => {
    const router = useRouter()
    const theme = useTheme()
    const auth = useAuth()

    // Lấy role hiện tại của user (mặc định là 'Basic' nếu chưa có)
    const userRole = (auth.user?.role as any)?.name ? (auth.user?.role as any).name : 'Basic'

    // Lọc menu items dựa trên role và excludeRole của user
    const menuItems = allMenuItems.filter((item: any) => {
        if (item.role && item.role !== userRole) {
            return false
        }
        if (item.excludeRole && item.excludeRole === userRole) {
            return false

        }

        return true
    })

    // State lưu trữ các menu đang mở rộng
    const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({})

    const handleToggleSubMenu = (title: string) => {
        if (collapsed) return
        setOpenSubMenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }))
    }

    const handleNavigate = (path: string) => {
        router.push(path)
    }

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowX: 'hidden' }}>
            {/* Logo & Toggle Button */}
            <Box
                sx={{
                    p: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    minHeight: 70,
                }}
            >
                {!collapsed && (
                    <Box
                        onClick={() => handleNavigate('/')}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.15rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: '1rem', fontWeight: 700 }}>
                            M
                        </Avatar>
                        MUI Dashboard
                    </Box>
                )}

                {collapsed && (
                    <Avatar
                        onClick={() => handleNavigate('/')}
                        sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                        M
                    </Avatar>
                )}

                <IconButton onClick={onToggleCollapse} size='small' sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Icon icon={collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'} width={20} />
                </IconButton>
            </Box>

            {/* Navigation Menu Component với danh sách đã được lọc theo role */}
            <MenuItemList
                menuItems={menuItems}
                collapsed={collapsed}
                openSubMenus={openSubMenus}
                onToggleSubMenu={handleToggleSubMenu}
                onNavigate={handleNavigate}
                onMobileClose={onDrawerToggle}
            />
        </Box>
    )

    const currentDrawerWidth = collapsed ? drawerWidthClosed : drawerWidthOpen

    return (
        <>
            <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidthOpen },
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: currentDrawerWidth,
                    flexShrink: 0,
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    '& .MuiDrawer-paper': {
                        width: currentDrawerWidth,
                        boxSizing: 'border-box',
                        borderRight: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                        overflowX: 'hidden',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    )
}

export default Sidebar