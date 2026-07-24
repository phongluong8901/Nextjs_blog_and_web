// ** Next & React Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

type ChildType = {
    title: string
    path: string
    icon?: string // Thêm thuộc tính icon cho item con
}

type SubMenuListProps = {
    isOpen: boolean
    childrenItems?: ChildType[]
    onItemClick: () => void
}

const SubMenuList = ({ isOpen, childrenItems, onItemClick }: SubMenuListProps) => {
    const router = useRouter()
    const { t } = useTranslation()

    return (
        <Collapse in={isOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding sx={{ pl: 2, pt: 0.5, pb: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {childrenItems?.map((child) => {
                    const isChildRouteActive = router.pathname === child.path

                    return (
                        <ListItemButton
                            key={child.path}
                            component={Link}
                            href={child.path}
                            onClick={onItemClick}
                            sx={{
                                borderRadius: '10px',
                                py: 1,
                                px: 2,
                                backgroundColor: isChildRouteActive ? 'action.selected' : 'transparent',
                                color: isChildRouteActive ? 'primary.main' : 'text.secondary',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                    color: 'text.primary',
                                },
                            }}
                        >
                            {/* Hiển thị Icon của mục con nếu có */}
                            {child.icon && (
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 2,
                                        justifyContent: 'center',
                                        color: isChildRouteActive ? 'primary.main' : 'text.secondary',
                                    }}
                                >
                                    <Icon icon={child.icon} width={20} />
                                </ListItemIcon>
                            )}

                            <ListItemText
                                primary={t(child.title)}
                                primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                    fontWeight: isChildRouteActive ? 600 : 400,
                                }}
                            />
                        </ListItemButton>
                    )
                })}
            </List>
        </Collapse>
    )
}

export default SubMenuList