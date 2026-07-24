// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

const Footer = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box
            component='footer'
            sx={{
                py: 2.5,
                px: { xs: 2, sm: 3, md: 4 },
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: `1px solid ${theme.palette.divider}`,
                bgcolor: 'background.paper',
                mt: 'auto', // Giúp footer luôn đẩy xuống đáy khi nội dung trang ngắn
            }}
        >
            <Typography variant='body2' color='text.secondary'>
                {`© ${new Date().getFullYear()}, Made with `}
                <Box component='span' sx={{ color: 'error.main', fontSize: '1.1rem' }}>
                    ♥
                </Box>
                {` by `}
                <Link href='#' target='_blank' sx={{ fontWeight: 600, textDecoration: 'none' }}>
                    Your Company
                </Link>
            </Typography>

            <Box sx={{ display: 'flex', gap: 3 }}>
                <Link href='#' variant='body2' color='text.secondary' sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                    {t('About')}
                </Link>
                <Link href='#' variant='body2' color='text.secondary' sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                    {t('Support')}
                </Link>
                <Link href='#' variant='body2' color='text.secondary' sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                    {t('Terms')}
                </Link>
            </Box>
        </Box>
    )
}

export default Footer