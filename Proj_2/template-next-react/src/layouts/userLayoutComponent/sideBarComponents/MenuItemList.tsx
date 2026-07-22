// ** React & Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Sub-components
import SubMenuList from './SubMenuList'

export type MenuItemType = {
    title: string
    path?: string
    icon: string
    role?: string // <-- Đã thêm thuộc tính role vào đây
    children?: {
        title: string
        path: string
    }[]
}

type MenuItemListProps = {
    menuItems: MenuItemType[]
    collapsed: boolean
    openSubMenus: { [key: string]: boolean }
    onToggleSubMenu: (title: string) => void
    onNavigate: (path: string) => void
    onMobileClose: () => void
}

const MenuItemList = ({
    menuItems,
    collapsed,
    openSubMenus,
    onToggleSubMenu,
    onMobileClose,
}: MenuItemListProps) => {
    const router = useRouter()
    const { t } = useTranslation()

    return (
        <List sx={{ px: collapsed ? 1 : 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {menuItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0
                const isActive = item.path ? router.pathname === item.path : false
                const isSubMenuOpen = openSubMenus[item.title] || false
                const isChildActive = hasChildren && item.children?.some((child) => router.pathname === child.path)

                return (
                    <Box key={item.title}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <Tooltip title={collapsed ? t(item.title) : ''} placement='right'>
                                <ListItemButton
                                    {...(hasChildren
                                        ? {
                                            onClick: () => onToggleSubMenu(item.title),
                                        }
                                        : {
                                            component: Link,
                                            href: item.path || '/',
                                            onClick: () => onMobileClose(),
                                        })}
                                    sx={{
                                        borderRadius: '12px',
                                        backgroundColor: isActive || isChildActive ? 'primary.main' : 'transparent',
                                        color: isActive || isChildActive ? 'primary.contrastText' : 'text.primary',
                                        '&:hover': {
                                            backgroundColor: isActive || isChildActive ? 'primary.dark' : 'action.hover',
                                        },
                                        py: 1.2,
                                        px: 2,
                                        justifyContent: collapsed ? 'center' : 'initial',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: collapsed ? 0 : 2,
                                            justifyContent: 'center',
                                            color: isActive || isChildActive ? 'inherit' : 'text.secondary',
                                        }}
                                    >
                                        <Icon icon={item.icon} width={22} />
                                    </ListItemIcon>

                                    {!collapsed && (
                                        <>
                                            <ListItemText
                                                primary={t(item.title)}
                                                primaryTypographyProps={{
                                                    fontSize: '0.95rem',
                                                    fontWeight: isActive || isChildActive ? 600 : 500,
                                                }}
                                            />
                                            {hasChildren && (
                                                <Icon
                                                    icon={isSubMenuOpen ? 'mdi:chevron-down' : 'mdi:chevron-right'}
                                                    width={18}
                                                    style={{ opacity: 0.7 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>

                        {/* Render Submenu */}
                        {hasChildren && !collapsed && (
                            <SubMenuList
                                isOpen={isSubMenuOpen}
                                childrenItems={item.children}
                                onItemClick={onMobileClose}
                            />
                        )}
                    </Box>
                )
            })}
        </List>
    )
}

export default MenuItemList