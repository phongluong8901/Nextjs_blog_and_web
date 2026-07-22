import React, { useState } from 'react'

// ** Import các utilities từ Next.js
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** Import thư viện quản lý Form và Validation Schema (Yup)
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** Import Iconify để hiển thị icon
import { Icon } from '@iconify/react'

// ** Import các UI Components từ Material-UI (MUI)
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    IconButton,
    InputAdornment,
    Link as MuiLink,
    Typography,
    Card as MuiCard,
    styled,
    useTheme,
    CircularProgress,
    Fade,
} from '@mui/material'

// ** Import Custom Component TextField
import CustomTextField from 'src/components/text-field'

// ** Import Service gọi API đổi mật khẩu
import { resetPasswordAuth } from 'src/services/auth'

// ** Import ảnh Light / Dark Mode
import ResetDark from '/public/images/register-dark.png'
import ResetLight from '/public/images/register-light.png'

const MainStackedCard = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    minHeight: '720px',
    maxHeight: '94vh',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 20px 50px rgba(0,0,0,0.6)'
            : '0 20px 50px rgba(0,0,0,0.08)',
    position: 'relative',
}))

type TProps = {}

const schema = yup.object().shape({
    newPassword: yup
        .string()
        .required('Please enter your new password.')
        .min(6, 'Password must be at least 6 characters.'),
    confirmPassword: yup
        .string()
        .required('Please confirm your new password.')
        .oneOf([yup.ref('newPassword')], 'Passwords must match.'),
})

type TFormData = yup.InferType<typeof schema>

const ResetPasswordPage: NextPage<TProps> = () => {
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success')
    const [loading, setLoading] = useState(false)

    // States ẩn/hiện mật khẩu
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const router = useRouter()
    const theme = useTheme()

    // Lấy secretKey từ query params của Next.js (VD: ?secretKey=l6mffaxp6vwopkok6q6e)
    const { secretKey } = router.query

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TFormData>({
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: TFormData) => {
        if (!secretKey) {
            setAlertSeverity('error')
            setAlertMessage('Mã xác thực (secretKey) không hợp lệ hoặc đã hết hạn!')
            setOpenAlert(true)
            return
        }

        try {
            setLoading(true)

            // Gọi API đổi mật khẩu thực tế qua service
            const response = await resetPasswordAuth({
                secretKey: String(secretKey),
                newPassword: data.newPassword,
            })

            setAlertSeverity('success')
            setAlertMessage(response?.message || 'Đặt lại mật khẩu thành công! Đang chuyển hướng về trang đăng nhập...')
            setOpenAlert(true)

            setTimeout(() => {
                router.push('/login')
            }, 3000)

        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại!'

            setAlertSeverity('error')
            setAlertMessage(errorMessage)
            setOpenAlert(true)

            setTimeout(() => {
                setOpenAlert(false)
            }, 4000)
        } finally {
            setLoading(false)
        }
    }

    const imageSource = theme.palette.mode === 'dark' ? ResetDark : ResetLight

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.default,
                padding: { xs: 2, sm: 3, md: 4 },
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Custom Toast Alert */}
            <Fade in={openAlert}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 24,
                        right: 24,
                        zIndex: 9999,
                        display: openAlert ? 'flex' : 'none',
                        alignItems: 'center',
                        gap: 1.5,
                        padding: '14px 20px',
                        backgroundColor: alertSeverity === 'success' ? '#2e7d32' : '#d32f2f',
                        color: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                        fontWeight: 500,
                        fontSize: '14px',
                        minWidth: '280px',
                    }}
                >
                    <Icon
                        icon={
                            alertSeverity === 'success'
                                ? 'mdi:check-circle-outline'
                                : 'mdi:alert-circle-outline'
                        }
                        width={22}
                        height={22}
                    />
                    <Box sx={{ flex: 1 }}>{alertMessage}</Box>
                    <IconButton
                        size="small"
                        onClick={() => setOpenAlert(false)}
                        sx={{ color: '#fff', padding: '2px' }}
                    >
                        <Icon icon="mdi:close" width={18} height={18} />
                    </IconButton>
                </Box>
            </Fade>

            <MainStackedCard>
                {/* Cột hình ảnh minh họa bên trái */}
                <Box
                    sx={{
                        flex: { xs: '0 0 0%', sm: '1 1 45%', md: '1 1 55%' },
                        display: { xs: 'none', sm: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.action.hover,
                        padding: 4,
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            maxHeight: '520px',
                        }}
                    >
                        <Image
                            src={imageSource}
                            alt="reset password illustration"
                            fill
                            sizes="(max-width: 1200px) 50vw, 600px"
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Box>
                </Box>

                {/* Cột form nhập liệu bên phải */}
                <Box
                    sx={{
                        flex: { xs: '1 1 100%', sm: '1 1 55%', md: '1 1 45%' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: { xs: 3, sm: 4, md: 5 },
                        backgroundColor: theme.palette.background.paper,
                        overflowY: 'auto',
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: '400px' }}>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
                        >
                            Reset Password 🔒
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Your new password must be different from previously used passwords
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: 2,
                            }}
                        >
                            {/* New Password */}
                            <FormControl fullWidth error={Boolean(errors.newPassword)}>
                                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                                <Controller
                                    name="newPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id="newPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="············"
                                            fullWidth
                                            error={Boolean(errors.newPassword)}
                                            helperText={errors.newPassword?.message}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                        >
                                                            <Icon
                                                                icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                                                                fontSize={20}
                                                            />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </FormControl>

                            {/* Confirm Password */}
                            <FormControl fullWidth error={Boolean(errors.confirmPassword)}>
                                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="············"
                                            fullWidth
                                            error={Boolean(errors.confirmPassword)}
                                            helperText={errors.confirmPassword?.message}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                        >
                                                            <Icon
                                                                icon={showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                                                                fontSize={20}
                                                            />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                                sx={{ mt: 1 }}
                            >
                                {loading ? 'Saving...' : 'Set new password'}
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                                mt: 3,
                            }}
                        >
                            <MuiLink
                                component={Link}
                                href="/login"
                                variant="body2"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                }}
                            >
                                <Icon icon="mdi:chevron-left" width={20} height={20} />
                                Back to login
                            </MuiLink>
                        </Box>
                    </Box>
                </Box>
            </MainStackedCard>
        </Box>
    )
}

export default ResetPasswordPage