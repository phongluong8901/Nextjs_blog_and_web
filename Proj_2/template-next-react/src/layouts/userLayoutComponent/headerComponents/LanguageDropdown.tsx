// ** React Imports
import { useState, MouseEvent, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

const LanguageDropdown = () => {
    const router = useRouter()
    const { i18n, t } = useTranslation()

    // Lấy ngôn ngữ hiện tại từ i18n hoặc fallback về 'vi'
    const [locale, setLocale] = useState<string>(i18n.language || 'vi')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl)

    // Đồng bộ lại state khi i18n thay đổi ngôn ngữ từ bên ngoài
    useEffect(() => {
        if (i18n.language) {
            setLocale(i18n.language)
        }
    }, [i18n.language])

    const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handleChangeLanguage = (lang: string) => {
        setLocale(lang)
        handleClose()
        // Kích hoạt đổi ngôn ngữ ngay lập tức cho toàn hệ thống qua i18next
        i18n.changeLanguage(lang)
    }

    // Hàm ánh xạ mã ngôn ngữ sang icon cờ tương ứng
    const getFlagIcon = (lang: string) => {
        switch (lang) {
            case 'en':
                return 'circle-flags:us'
            case 'fr':
                return 'circle-flags:fr'
            case 'zh':
                return 'circle-flags:cn'
            case 'vi':
            default:
                return 'circle-flags:vn'
        }
    }

    return (
        <>
            <Tooltip title={t('Language')}>
                <IconButton color='inherit' onClick={handleOpen} size='small'>
                    <Icon icon={getFlagIcon(locale)} width={22} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: { mt: 1.5, minWidth: 160, borderRadius: '12px', p: 0.5, filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))' },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    onClick={() => handleChangeLanguage('vi')}
                    selected={locale === 'vi'}
                    sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.9rem' }}
                >
                    <Icon icon='circle-flags:vn' width={18} /> {t('Vietnamese')}
                </MenuItem>
                <MenuItem
                    onClick={() => handleChangeLanguage('en')}
                    selected={locale === 'en'}
                    sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.9rem' }}
                >
                    <Icon icon='circle-flags:us' width={18} /> {t('English')}
                </MenuItem>
                <MenuItem
                    onClick={() => handleChangeLanguage('fr')}
                    selected={locale === 'fr'}
                    sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.9rem' }}
                >
                    <Icon icon='circle-flags:fr' width={18} /> {t('French')}
                </MenuItem>
                <MenuItem
                    onClick={() => handleChangeLanguage('zh')}
                    selected={locale === 'zh'}
                    sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.9rem' }}
                >
                    <Icon icon='circle-flags:cn' width={18} /> {t('Chinese')}
                </MenuItem>
            </Menu>
        </>
    )
}

export default LanguageDropdown