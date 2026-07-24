import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'

const UserHomePage: NextPage = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box sx={{ p: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
            {/* Banner chào mừng dành cho User */}
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
                            {t('user.homeWelcome', 'Welcome to your Workspace!')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {t('user.homeSub', 'Explore your personal profile, update settings, and navigate features easily.')}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Icon icon="mdi:account-edit" />}
                        href="/my-profile"
                    >
                        {t('user.updateProfile', 'Update Profile')}
                    </Button>
                </Box>
            </Card>

            {/* Các lối tắt truy cập nhanh cho User */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
                {t('user.quickShortcuts', 'Quick Features')}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{ backgroundColor: theme.palette.background.paper, height: '100%', p: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(115, 103, 240, 0.12)', color: theme.palette.primary.main }}>
                                    <Icon icon="mdi:account-circle-outline" width={28} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {t('navigation.myProfile', 'My Profile')}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                {t('user.profileDesc', 'View and modify your personal account information and avatar.')}
                            </Typography>
                            <Button variant="outlined" fullWidth href="/my-profile" startIcon={<Icon icon="mdi:arrow-right" />}>
                                {t('common.viewDetails', 'View Details')}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{ backgroundColor: theme.palette.background.paper, height: '100%', p: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(40, 199, 111, 0.12)', color: '#28c76f' }}>
                                    <Icon icon="mdi:cog-outline" width={28} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {t('navigation.settings', 'Settings')}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                {t('user.settingsDesc', 'Manage notification preferences, passwords, and security options.')}
                            </Typography>
                            <Button variant="outlined" fullWidth href="/setting" startIcon={<Icon icon="mdi:arrow-right" />}>
                                {t('common.configure', 'Configure')}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UserHomePage