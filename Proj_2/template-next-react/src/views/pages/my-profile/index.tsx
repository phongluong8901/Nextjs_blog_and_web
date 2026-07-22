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
import CustomTextField from 'src/components/text-field'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { getAuthMeAsync, updateAuthMeAsync } from 'src/stores/apps/auth/actions'
import { AppDispatch, RootState } from 'src/stores'

const MyProfilePage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()

    const { user, loading } = useSelector((state: RootState) => state.auth)

    const profileSchema = useMemo(() => {
        return yup.object().shape({
            firstName: yup.string().required(t('validation.firstNameRequired', 'Please enter your first name.')),
            lastName: yup.string().required(t('validation.lastNameRequired', 'Please enter your last name.')),
            middleName: yup.string().optional(),
            phoneNumber: yup.string().optional(),
            address: yup.string().optional(),
        })
    }, [t, i18n.language])

    type TProfileForm = yup.InferType<typeof profileSchema>

    const [avatarPreview, setAvatarPreview] = useState<string>('/images/avatars/1.png')
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
        },
        resolver: yupResolver(profileSchema),
    })

    // 1. Gọi API lấy thông tin user khi vào trang
    useEffect(() => {
        dispatch(getAuthMeAsync())
    }, [dispatch])

    // 2. Đổ dữ liệu vào form khi có user từ Redux
    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                middleName: user.middleName || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
            })
            if (user.email) setUserEmail(user.email)

            if (user.role) {
                const roleName = typeof user.role === 'object' && user.role !== null ? (user.role as any).name : user.role
                setUserRole(roleName || '')
            }

            if (user.avatar) setAvatarPreview(user.avatar)
        }
    }, [user, reset])

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            // console.log('=== [DEBUG CLIENT] Đã chọn file ảnh:', file) // Log kiểm tra file được chọn
            setSelectedFile(file)
            setAvatarPreview(URL.createObjectURL(file))
        } else {
            // console.log('=== [DEBUG CLIENT] Không có file nào được chọn hoặc bị hủy')
        }
    }

    const onSubmit = async (data: TProfileForm) => {
        try {
            // console.log('=== [DEBUG CLIENT] Dữ liệu form chuẩn bị gửi:', data)
            // console.log('=== [DEBUG CLIENT] File ảnh hiện tại trong state selectedFile:', selectedFile)

            const formData = new FormData()

            formData.append('firstName', data.firstName)
            formData.append('lastName', data.lastName)
            formData.append('middleName', data.middleName || '')
            formData.append('phoneNumber', data.phoneNumber || '')
            formData.append('address', data.address || '')

            if (selectedFile) {
                formData.append('avatar', selectedFile)
                // console.log('=== [DEBUG CLIENT] Đã append key "avatar" vào FormData thành công!')
            } else {
                // console.log('=== [DEBUG CLIENT] Không có file ảnh nào được đính kèm vào FormData.')
            }

            // In ra toàn bộ nội dung bên trong FormData để kiểm tra
            // console.log('=== [DEBUG CLIENT] Các entries có trong FormData: ===')
            for (let pair of formData.entries()) {
                // console.log(pair[0] + ': ', pair[1])
            }

            const resultAction = await dispatch(updateAuthMeAsync(formData))

            // console.log('=== [DEBUG CLIENT] Kết quả trả về từ Redux action:', resultAction)

            if (updateAuthMeAsync.fulfilled.match(resultAction)) {
                alert(t('profile.updateSuccess', 'Update profile successfully!'))
                dispatch(getAuthMeAsync())
                setSelectedFile(null)
            } else {
                // console.log('=== [DEBUG CLIENT] Lỗi từ server trả về:', resultAction.payload)
                alert((resultAction.payload as any)?.message || resultAction.payload || t('profile.updateFailed', 'Failed to update profile.'))
            }
        } catch (error: any) {
            // console.error('=== [DEBUG CLIENT EXCEPTION] Update error:', error)
            alert(error?.response?.data?.message || t('profile.updateFailed', 'Failed to update profile.'))
        }
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
                    <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                            {t('profile.profileDetails', 'Profile Details')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth error={Boolean(errors.lastName)}>
                                        <FormLabel htmlFor="lastName">{t('profile.lastName', 'Last Name')}</FormLabel>
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            render={({ field }) => (
                                                <CustomTextField
                                                    {...field}
                                                    id="lastName"
                                                    placeholder="Nguyen"
                                                    fullWidth
                                                    error={Boolean(errors.lastName)}
                                                    helperText={errors.lastName?.message}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth error={Boolean(errors.middleName)}>
                                        <FormLabel htmlFor="middleName">{t('profile.middleName', 'Middle Name')}</FormLabel>
                                        <Controller
                                            name="middleName"
                                            control={control}
                                            render={({ field }) => (
                                                <CustomTextField
                                                    {...field}
                                                    id="middleName"
                                                    placeholder="Van"
                                                    fullWidth
                                                    error={Boolean(errors.middleName)}
                                                    helperText={errors.middleName?.message}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth error={Boolean(errors.firstName)}>
                                        <FormLabel htmlFor="firstName">{t('profile.firstName', 'First Name')}</FormLabel>
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            render={({ field }) => (
                                                <CustomTextField
                                                    {...field}
                                                    id="firstName"
                                                    placeholder="An"
                                                    fullWidth
                                                    error={Boolean(errors.firstName)}
                                                    helperText={errors.firstName?.message}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <FormControl fullWidth>
                                <FormLabel htmlFor="email">{t('profile.emailAddress', 'Email Address')}</FormLabel>
                                <CustomTextField
                                    id="email"
                                    value={userEmail}
                                    fullWidth
                                    disabled
                                />
                            </FormControl>

                            <FormControl fullWidth>
                                <FormLabel htmlFor="role">{t('profile.role', 'Role')}</FormLabel>
                                <CustomTextField
                                    id="role"
                                    value={userRole}
                                    fullWidth
                                    disabled
                                />
                            </FormControl>

                            <FormControl fullWidth error={Boolean(errors.phoneNumber)}>
                                <FormLabel htmlFor="phoneNumber">{t('profile.phoneNumber', 'Phone Number')}</FormLabel>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id="phoneNumber"
                                            placeholder="0123456789"
                                            fullWidth
                                            error={Boolean(errors.phoneNumber)}
                                            helperText={errors.phoneNumber?.message}
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth error={Boolean(errors.address)}>
                                <FormLabel htmlFor="address">{t('profile.address', 'Address')}</FormLabel>
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id="address"
                                            placeholder="123 Street, City"
                                            fullWidth
                                            error={Boolean(errors.address)}
                                            helperText={errors.address?.message}
                                        />
                                    )}
                                />
                            </FormControl>

                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button type="submit" variant="contained" disabled={loading}>
                                    {loading ? t('common.saving', 'Saving...') : t('common.saveChanges', 'Save Changes')}
                                </Button>
                                <Button type="button" variant="outlined" color="secondary" onClick={() => reset()}>
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