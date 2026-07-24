// ** React Imports
import React, { useState, useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Card,
    Grid,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Typography,
    Avatar,
    useTheme,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Icon } from '@iconify/react'



// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { getAuthMeAsync, updateAuthMeAsync } from 'src/stores/apps/auth/actions'
import { AppDispatch, RootState } from 'src/stores'

// ** Third Party Components
import toast from 'react-hot-toast'
import CustomCircularProgress from 'src/components/custom-circular-process'
import CustomTextField from 'src/components/custom-text-field'
import CustomSwitch from 'src/components/custom-toggle'

const MyProfilePage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()

    const { user, loading } = useSelector((state: RootState) => state.auth)

    // 💡 Thêm state riêng chuyên để quản lý hiệu ứng loading khi bấm Save
    const [isSaving, setIsSaving] = useState(false)

    const profileSchema = useMemo(() => {
        return yup.object().shape({
            firstName: yup.string().required(t('validation.firstNameRequired', 'Please enter your first name.')),
            lastName: yup.string().required(t('validation.lastNameRequired', 'Please enter your last name.')),
            middleName: yup.string().optional(),
            phoneNumber: yup.string().optional(),
            address: yup.string().optional(),
            status: yup.boolean().required(),
        })
    }, [t, i18n.language])

    type TProfileForm = yup.InferType<typeof profileSchema>

    const [avatarPreview, setAvatarPreview] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [userEmail, setUserEmail] = useState<string>('')
    const [userRole, setUserRole] = useState<string>('')

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TProfileForm>({
        defaultValues: {
            firstName: '',
            lastName: '',
            middleName: '',
            phoneNumber: '',
            address: '',
            status: true,
        },
        resolver: yupResolver(profileSchema),
    })

    // Hàm phụ trợ để reset form về trạng thái ban đầu của user
    const handleResetForm = () => {
        if (!user) return

        let parsedStatus = true
        const rawStatus = (user as any).status
        if (typeof rawStatus === 'boolean') {
            parsedStatus = rawStatus
        } else if (typeof rawStatus === 'number') {
            parsedStatus = rawStatus === 1
        } else if (typeof rawStatus === 'string') {
            parsedStatus = rawStatus.toLowerCase() === 'active' || rawStatus.toLowerCase() === 'true' || rawStatus === '1'
        }

        reset({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            middleName: user.middleName || '',
            phoneNumber: user.phoneNumber || '',
            address: user.address || '',
            status: parsedStatus,
        })

        setSelectedFile(null)
        if (user.avatar) setAvatarPreview(user.avatar)
    }

    // 1. Gọi API lấy thông tin user khi vào trang
    useEffect(() => {
        dispatch(getAuthMeAsync())
    }, [dispatch])

    // 2. Đổ dữ liệu vào form khi có user từ Redux
    useEffect(() => {
        if (user) {
            handleResetForm()
            if (user.email) setUserEmail(user.email)

            if (user.role) {
                const roleName = typeof user.role === 'object' && user.role !== null ? (user.role as any).name : user.role
                setUserRole(roleName || '')
            }
        }
    }, [user, reset])

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedFile(file)

            // Xóa URL cũ nếu có để tránh rò rỉ bộ nhớ (Memory Leak)
            if (avatarPreview && avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview)
            }

            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const onSubmit = async (data: TProfileForm) => {
        setIsSaving(true)
        try {
            const formData = new FormData()

            formData.append('firstName', data.firstName)
            formData.append('lastName', data.lastName)
            formData.append('middleName', data.middleName || '')
            formData.append('phoneNumber', data.phoneNumber || '')
            formData.append('address', data.address || '')

            const statusValue = data.status ? '1' : '0'
            formData.append('status', statusValue)

            if (selectedFile) {
                formData.append('avatar', selectedFile)
            }

            const [resultAction] = await Promise.all([
                dispatch(updateAuthMeAsync(formData as any)),
                new Promise((resolve) => setTimeout(resolve, 1500))
            ])

            if (updateAuthMeAsync.fulfilled.match(resultAction)) {
                toast.success(t('profile.updateSuccess', 'Update profile successfully!'))
                await dispatch(getAuthMeAsync())
                setSelectedFile(null)
            } else {
                const errorMsg = (resultAction.payload as any)?.message || resultAction.payload || t('profile.updateFailed', 'Failed to update profile.')
                toast.error(errorMsg)
            }
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || t('profile.updateFailed', 'Failed to update profile.')
            toast.error(errorMsg)
        } finally {
            setIsSaving(false)
        }
    }

    if (!user && loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', width: '100%' }}>
                <CustomCircularProgress size={50} thickness={4} label={t('common.loading', 'Loading profile...')} />
            </Box>
        )
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                gap: 3,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {t('profile.accountSettings', 'Account Settings')}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: theme.palette.background.paper, height: '100%' }}>
                        <Avatar
                            src={avatarPreview}
                            alt="User Avatar"
                            sx={{ width: 120, height: 120, mb: 2 }}
                        />
                        <Button
                            component="label"
                            variant="outlined"
                            size="small"
                            startIcon={<Icon icon="mdi:upload" />}
                            sx={{ mb: 2 }}
                        >
                            {t('profile.uploadNewPhoto', 'Upload New Photo')}
                            <input hidden type="file" accept="image/*" onChange={handleAvatarChange} />
                        </Button>
                        <Typography variant="body2" color="text.secondary">
                            {t('profile.allowedFormats', 'Allowed JPG, GIF or PNG. Max size of 800K')}
                        </Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper, position: 'relative' }}>
                        {isSaving && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',

                                    // 💡 Sửa lại đoạn này để tự động đổi màu theo Dark/Light Mode
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(15, 23, 42, 0.8)' // Màu tối mờ cho Dark Mode
                                            : 'rgba(255, 255, 255, 0.7)', // Màu trắng mờ cho Light Mode
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10,
                                    borderRadius: 1
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
                            {t('profile.profileDetails', 'Profile Details')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomTextField
                                                {...field}
                                                label={t('profile.lastName', 'Last Name')}
                                                placeholder="Nguyen"
                                                errorText={errors.lastName?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name="middleName"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomTextField
                                                {...field}
                                                label={t('profile.middleName', 'Middle Name')}
                                                placeholder="Van"
                                                errorText={errors.middleName?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomTextField
                                                {...field}
                                                label={t('profile.firstName', 'First Name')}
                                                placeholder="An"
                                                errorText={errors.firstName?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <CustomTextField
                                label={t('profile.emailAddress', 'Email Address')}
                                value={userEmail}
                                disabled
                            />

                            <CustomTextField
                                label={t('profile.role', 'Role')}
                                value={userRole}
                                disabled
                            />

                            <Controller
                                name="phoneNumber"
                                control={control}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        label={t('profile.phoneNumber', 'Phone Number')}
                                        placeholder="0123456789"
                                        errorText={errors.phoneNumber?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        label={t('profile.address', 'Address')}
                                        placeholder="123 Street, City"
                                        errorText={errors.address?.message}
                                    />
                                )}
                            />

                            <FormControl component="fieldset" variant="standard">
                                <FormLabel component="legend" sx={{ mb: 1, fontSize: '0.875rem' }}>
                                    {t('profile.status', 'Trạng thái hoạt động')}
                                </FormLabel>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <CustomSwitch
                                            checked={Boolean(value)}
                                            onChange={(e) => onChange(e.target.checked)}
                                            color="success"
                                            label={
                                                value
                                                    ? t('profile.active', 'Đang hoạt động (Active)')
                                                    : t('profile.inactive', 'Đã khóa (Inactive)')
                                            }
                                        />
                                    )}
                                />
                            </FormControl>

                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button type="submit" variant="contained" disabled={isSaving}>
                                    {isSaving ? t('common.saving', 'Saving...') : t('common.saveChanges', 'Save Changes')}
                                </Button>
                                <Button type="button" variant="outlined" color="secondary" onClick={handleResetForm} disabled={isSaving}>
                                    {t('common.reset', 'Reset')}
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MyProfilePage