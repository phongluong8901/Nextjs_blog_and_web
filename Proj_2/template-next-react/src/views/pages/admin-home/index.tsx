// ** React & Next Imports
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

// ** Iconify Imports
import { Icon } from '@iconify/react'

const AdminHomePage: NextPage = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box sx={{ p: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
            {/* Banner chào mừng */}
            <Card
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    mb: 4,
                    p: 4,
                    borderRadius: 2,
                    boxShadow: theme.shadows[2]
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
                            {t('Admin Home')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {t('System Overview')}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Icon icon="mdi:cogs" />}
                        href="/setting"
                    >
                        {t('System Settings')}
                    </Button>
                </Box>
            </Card>

            {/* Các lối tắt truy cập nhanh cho Admin */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
                {t('User Management')}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: theme.palette.background.paper, height: '100%', p: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(115, 103, 240, 0.12)', color: theme.palette.primary.main }}>
                                    <Icon icon="mdi:account-group" width={28} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {t('Users')}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                {t('List')}
                            </Typography>
                            <Button variant="outlined" fullWidth href="/users" startIcon={<Icon icon="mdi:arrow-right" />}>
                                {t('View')}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: theme.palette.background.paper, height: '100%', p: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(40, 199, 111, 0.12)', color: '#28c76f' }}>
                                    <Icon icon="mdi:shield-key" width={28} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {t('Roles')}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                {t('Roles')}
                            </Typography>
                            <Button variant="outlined" fullWidth href="/users/roles" startIcon={<Icon icon="mdi:arrow-right" />}>
                                {t('View')}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: theme.palette.background.paper, height: '100%', p: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(255, 159, 67, 0.12)', color: '#ff9f43' }}>
                                    <Icon icon="mdi:file-document-outline" width={28} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {t('Settings')}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                {t('System Settings')}
                            </Typography>
                            <Button variant="outlined" fullWidth href="/setting" startIcon={<Icon icon="mdi:arrow-right" />}>
                                {t('View')}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminHomePage