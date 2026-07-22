import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Card,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Typography,
    Tab,
    Tabs,
    InputAdornment,
    IconButton,
    useTheme,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Icon } from '@iconify/react'
import CustomTextField from 'src/components/text-field'
import instanceAxios from 'src/helpers/axios'

// Validation Schema dùng i18n (được đưa ra ngoài component để tránh khởi tạo lại mỗi lần render)
const getPasswordSchema = (t: (key: string, fallback?: string) => string) =>
    yup.object().shape({
        currentPassword: yup.string().required(t('validation.currentPasswordRequired', 'Please enter current password.')),
        newPassword: yup
            .string()
            .required(t('validation.newPasswordRequired', 'Please enter new password.'))
            .min(6, t('validation.passwordMin', 'Password must be at least 6 characters.')),
        confirmNewPassword: yup
            .string()
            .required(t('validation.confirmPasswordRequired', 'Please confirm your new password.'))
            .oneOf([yup.ref('newPassword')], t('validation.passwordsMustMatch', 'Passwords must match.')),
    })

type TPasswordForm = yup.InferType<ReturnType<typeof getPasswordSchema>>

// Custom Toggle Switch thuần túy, loại bỏ hoàn toàn dependency gây lỗi của MUI Switch
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

const SettingPage: NextPage = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const [tabValue, setTabValue] = useState('account')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        browserPush: false,
        monthlyNewsletter: true,
    })

    const passwordSchema = React.useMemo(() => getPasswordSchema(t), [t])

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TPasswordForm>({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        resolver: yupResolver(passwordSchema),
    })

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    const onSubmitPassword = async (data: TPasswordForm) => {
        try {
            setLoading(true)
            await instanceAxios.put('/users/change-password', {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            })
            alert(t('settings.passwordChangedSuccess', 'Password changed successfully!'))
            reset()
        } catch (error: any) {
            console.error('Change password error:', error)
            alert(error?.response?.data?.message || t('settings.passwordChangedFailed', 'Failed to change password.'))
        } finally {
            setLoading(false)
        }
    }

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

            {tabValue === 'account' && (
                <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                        {t('settings.changePassword', 'Change Password')}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmitPassword)}
                        noValidate
                        sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '500px' }}
                    >
                        <FormControl fullWidth error={Boolean(errors.currentPassword)}>
                            <FormLabel htmlFor="currentPassword">{t('settings.currentPassword', 'Current Password')}</FormLabel>
                            <Controller
                                name="currentPassword"
                                control={control}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        id="currentPassword"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        placeholder="••••••"
                                        fullWidth
                                        error={Boolean(errors.currentPassword)}
                                        helperText={errors.currentPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                    >
                                                        <Icon
                                                            icon={
                                                                showCurrentPassword
                                                                    ? 'mdi:eye-outline'
                                                                    : 'mdi:eye-off-outline'
                                                            }
                                                        />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth error={Boolean(errors.newPassword)}>
                            <FormLabel htmlFor="newPassword">{t('settings.newPassword', 'New Password')}</FormLabel>
                            <Controller
                                name="newPassword"
                                control={control}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        id="newPassword"
                                        type={showNewPassword ? 'text' : 'password'}
                                        placeholder="••••••"
                                        fullWidth
                                        error={Boolean(errors.newPassword)}
                                        helperText={errors.newPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                    >
                                                        <Icon
                                                            icon={
                                                                showNewPassword
                                                                    ? 'mdi:eye-outline'
                                                                    : 'mdi:eye-off-outline'
                                                            }
                                                        />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth error={Boolean(errors.confirmNewPassword)}>
                            <FormLabel htmlFor="confirmNewPassword">{t('settings.confirmNewPassword', 'Confirm New Password')}</FormLabel>
                            <Controller
                                name="confirmNewPassword"
                                control={control}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        id="confirmNewPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="••••••"
                                        fullWidth
                                        error={Boolean(errors.confirmNewPassword)}
                                        helperText={errors.confirmNewPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                    >
                                                        <Icon
                                                            icon={
                                                                showConfirmPassword
                                                                    ? 'mdi:eye-outline'
                                                                    : 'mdi:eye-off-outline'
                                                            }
                                                        />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </FormControl>

                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Button type="submit" variant="contained" disabled={loading}>
                                {loading ? t('common.saving', 'Saving...') : t('common.saveChanges', 'Save Changes')}
                            </Button>
                            <Button type="button" variant="outlined" color="secondary" onClick={() => reset()}>
                                {t('common.reset', 'Reset')}
                            </Button>
                        </Box>
                    </Box>
                </Card>
            )}

            {tabValue === 'notifications' && (
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
            )}
        </Box>
    )
}

export default SettingPage