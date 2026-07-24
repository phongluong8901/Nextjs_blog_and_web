// ** React Imports
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import {
    Box,
    Card,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Typography,
    InputAdornment,
    IconButton,
    useTheme,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Icon } from '@iconify/react'
import CustomTextField from 'src/components/text-field'

// ** Redux Imports
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/stores'

// ** Third Party Components
import toast from 'react-hot-toast'
import CustomCircularProgress from 'src/components/custom-circular-process'
import { changePassword } from 'src/stores/apps/auth/actions'

const getPasswordSchema = (t: TFunction) =>
    yup.object().shape({
        currentPassword: yup
            .string()
            .required(t('validation.currentPasswordRequired', 'Please enter current password.')),
        newPassword: yup
            .string()
            .required(t('validation.newPasswordRequired', 'Please enter new password.'))
            .min(6, t('validation.passwordMin', 'Password must be at least 6 characters.'))
            .matches(/[A-Z]/, t('validation.passwordUppercase', 'Must contain at least one uppercase letter.'))
            .matches(/[a-z]/, t('validation.passwordLowercase', 'Must contain at least one lowercase letter.'))
            .matches(/[0-9]/, t('validation.passwordNumber', 'Must contain at least one number.'))
            .matches(/[@$!%*?&]/, t('validation.passwordSpecial', 'Must contain at least one special character.')),
        confirmNewPassword: yup
            .string()
            .required(t('validation.confirmPasswordRequired', 'Please confirm your new password.'))
            .oneOf([yup.ref('newPassword')], t('validation.passwordsMustMatch', 'Passwords must match.')),
    })

type TPasswordForm = yup.InferType<ReturnType<typeof getPasswordSchema>>

export default function ChangePasswordTab() {
    const theme = useTheme()
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const passwordSchema = useMemo(() => getPasswordSchema(t), [t, i18n.language])

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

    const onSubmitPassword = async (data: TPasswordForm) => {
        setIsSaving(true)
        try {
            const [resultAction] = await Promise.all([
                dispatch(
                    changePassword({
                        currentPassword: data.currentPassword,
                        newPassword: data.newPassword,
                    })
                ),
                new Promise((resolve) => setTimeout(resolve, 1000))
            ])

            if (changePassword.fulfilled.match(resultAction)) {
                toast.success(t('settings.passwordChangedSuccess', 'Password changed successfully!'))
                reset()
            } else {
                const errorPayload = resultAction.payload as any
                const errorMsg = errorPayload?.message || t('settings.passwordChangedFailed', 'Failed to change password.')
                toast.error(errorMsg)
            }
        } catch (error: any) {
            console.error('Change password error:', error)
            const errorMsg = error?.response?.data?.message || t('settings.passwordChangedFailed', 'Failed to change password.')
            toast.error(errorMsg)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper, position: 'relative' }}>
            {isSaving && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        borderRadius: 1,
                    }}
                >
                    <CustomCircularProgress
                        size={55}
                        thickness={4}
                        label={t('common.saving', 'Saving changes...')}
                    />
                </Box>
            )}

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
                {/* Current Password Field */}
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

                {/* New Password Field */}
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

                {/* Confirm New Password Field */}
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

                {/* Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button type="submit" variant="contained" disabled={isSaving}>
                        {isSaving ? t('common.saving', 'Saving...') : t('common.saveChanges', 'Save Changes')}
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={() => reset()} disabled={isSaving}>
                        {t('common.reset', 'Reset')}
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}