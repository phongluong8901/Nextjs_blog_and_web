import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Card,
    Button,
    Divider,
    Typography,
    useTheme,
} from '@mui/material'

const CustomToggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
    const theme = useTheme()

    return (
        <Box
            onClick={onChange}
            sx={{
                width: 44,
                height: 24,
                backgroundColor: checked ? theme.palette.primary.main : theme.palette.action.disabledBackground,
                borderRadius: 12,
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                p: '2px'
            }}
        >
            <Box
                sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    transform: checked ? 'translateX(20px)' : 'translateX(0px)',
                    transition: 'transform 0.2s ease-in-out',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)'
                }}
            />
        </Box>
    )
}

export default function NotificationTab() {
    const theme = useTheme()
    const { t } = useTranslation()

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        browserPush: false,
        monthlyNewsletter: true,
    })

    const handleNotificationChange = (field: keyof typeof notifications) => {
        setNotifications((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    const handleSaveNotifications = async () => {
        try {
            alert(t('settings.notificationsSavedSuccess', 'Notification settings saved successfully!'))
        } catch (error: any) {
            console.error('Save notification settings error:', error)
            alert(t('settings.notificationsSavedFailed', 'Failed to save notification preferences.'))
        }
    }

    return (
        <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                {t('settings.notificationPreferences', 'Notification Preferences')}
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: theme.palette.text.primary }}>
                        {t('settings.emailAlertsDesc', 'Receive email notifications for important activities')}
                    </Typography>
                    <CustomToggle
                        checked={notifications.emailAlerts}
                        onChange={() => handleNotificationChange('emailAlerts')}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: theme.palette.text.primary }}>
                        {t('settings.browserPushDesc', 'Enable browser push notifications')}
                    </Typography>
                    <CustomToggle
                        checked={notifications.browserPush}
                        onChange={() => handleNotificationChange('browserPush')}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: theme.palette.text.primary }}>
                        {t('settings.newsletterDesc', 'Receive monthly system updates & newsletter')}
                    </Typography>
                    <CustomToggle
                        checked={notifications.monthlyNewsletter}
                        onChange={() => handleNotificationChange('monthlyNewsletter')}
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSaveNotifications}>
                        {t('settings.savePreferences', 'Save Preferences')}
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}