import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Card,
    Typography,
    Tab,
    Tabs,
    useTheme,
} from '@mui/material'
import { Icon } from '@iconify/react'
import ChangePasswordTab from './component/ChangePassword'
import NotificationTab from './component/Notifications'

// Import các sub-components đã tách


const SettingPage: NextPage = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const [tabValue, setTabValue] = useState('account')

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                gap: 3
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {t('profile.accountSettings', 'Account Settings')}
            </Typography>

            <Card sx={{ backgroundColor: theme.palette.background.paper }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, px: 2 }}
                >
                    <Tab
                        value="account"
                        label={t('settings.accountSecurity', 'Account & Security')}
                        icon={<Icon icon="mdi:lock-outline" width={20} />}
                        iconPosition="start"
                    />
                    <Tab
                        value="notifications"
                        label={t('settings.notifications', 'Notifications')}
                        icon={<Icon icon="mdi:bell-outline" width={20} />}
                        iconPosition="start"
                    />
                </Tabs>
            </Card>

            {tabValue === 'account' && <ChangePasswordTab />}
            {tabValue === 'notifications' && <NotificationTab />}
        </Box>
    )
}

export default SettingPage