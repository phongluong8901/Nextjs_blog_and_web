import React, { useState } from 'react'

// ** Import các utilities từ Next.js
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** Import Redux Hooks & Actions
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'

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
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
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

// ** Import ảnh Light / Dark Mode cho Register
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import { registerUser } from 'src/stores/apps/auth/actions'

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
    fullName: yup.string().required('Please enter your full name.'),
    email: yup
        .string()
        .required('Please enter your email address.')
        .email('Please enter a valid email address.'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(6, 'Password must be at least 6 characters.'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password.')
        .oneOf([yup.ref('password')], 'Passwords must match.'),
    terms: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions.'),
})

type TFormData = yup.InferType<typeof schema>

const RegisterPage: NextPage<TProps> = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success')

    const router = useRouter()
    const theme = useTheme()
    const dispatch = useDispatch<AppDispatch>()

    const { loading } = useSelector((state: RootState) => state.auth)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: TFormData) => {
        const payload = {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        }

        const resultAction = await dispatch(registerUser(payload))

        if (registerUser.fulfilled.match(resultAction)) {
            setAlertSeverity('success')
            setAlertMessage('Đăng ký tài khoản thành công! Đang chuyển hướng...')
            setOpenAlert(true)

            setTimeout(() => {
                router.push('/login')
            }, 1500)
        } else {
            const errorMessage = (resultAction.payload as any)?.message || 'Đăng ký thất bại. Vui lòng thử lại!'
            setAlertSeverity('error')
            setAlertMessage(errorMessage)
            setOpenAlert(true)

            // Tự tắt sau 4 giây
            setTimeout(() => {
                setOpenAlert(false)
            }, 4000)
        }
    }

    const handleGoogleRegister = () => {
        console.log('Register with Google')
    }

    const handleFacebookRegister = () => {
        console.log('Register with Facebook')
    }

    const imageSource = theme.palette.mode === 'dark' ? RegisterDark : RegisterLight

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
            {/* Custom Toast thay thế Snackbar/Alert để tránh hoàn toàn lỗi từ core theme */}
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
                            alt="register illustration"
                            fill
                            sizes="(max-width: 1200px) 50vw, 600px"
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Box>
                </Box>

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
                            Sign up
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
                                mt: 2,
                            }}
                        >
                            <FormControl fullWidth error={Boolean(errors.fullName)}>
                                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id="fullName"
                                            placeholder="John Doe"
                                            autoFocus
                                            fullWidth
                                            error={Boolean(errors.fullName)}
                                            helperText={errors.fullName?.message}
                                            color={errors.fullName ? 'error' : 'primary'}
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth error={Boolean(errors.email)}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            autoComplete="email"
                                            fullWidth
                                            error={Boolean(errors.email)}
                                            helperText={errors.email?.message}
                                            color={errors.email ? 'error' : 'primary'}
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth error={Boolean(errors.password)}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••"
                                            autoComplete="new-password"
                                            fullWidth
                                            error={Boolean(errors.password)}
                                            helperText={errors.password?.message}
                                            color={errors.password ? 'error' : 'primary'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                        >
                                                            <Icon
                                                                icon={
                                                                    showPassword
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
                                            placeholder="••••••"
                                            autoComplete="new-password"
                                            fullWidth
                                            error={Boolean(errors.confirmPassword)}
                                            helperText={errors.confirmPassword?.message}
                                            color={errors.confirmPassword ? 'error' : 'primary'}
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

                            <Controller
                                name="terms"
                                control={control}
                                render={({ field: { value, onChange, ...fieldRest } }) => (
                                    <FormControl error={Boolean(errors.terms)}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...fieldRest}
                                                    checked={Boolean(value)}
                                                    onChange={(e) => onChange(e.target.checked)}
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                <Typography variant="body2">
                                                    I agree to{' '}
                                                    <MuiLink
                                                        href="#"
                                                        onClick={(e) => e.preventDefault()}
                                                        underline="hover"
                                                    >
                                                        privacy policy & terms
                                                    </MuiLink>
                                                </Typography>
                                            }
                                        />
                                        {errors.terms && (
                                            <FormHelperText error>
                                                {errors.terms.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                {loading ? 'Signing up...' : 'Sign up'}
                            </Button>
                        </Box>

                        <Divider sx={{ my: 2.5 }}>or sign up with</Divider>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                            }}
                        >
                            <IconButton
                                onClick={handleGoogleRegister}
                                sx={{
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: '12px',
                                    padding: '10px 18px',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                        borderColor: theme.palette.text.secondary,
                                    },
                                }}
                            >
                                <Icon icon="logos:google-icon" width={22} height={22} />
                            </IconButton>

                            <IconButton
                                onClick={handleFacebookRegister}
                                sx={{
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: '12px',
                                    padding: '10px 18px',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                        borderColor: theme.palette.text.secondary,
                                    },
                                }}
                            >
                                <Icon icon="logos:facebook" width={22} height={22} />
                            </IconButton>
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
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?
                            </Typography>
                            <MuiLink
                                component={Link}
                                href="/login"
                                variant="body2"
                                sx={{ fontWeight: 600 }}
                            >
                                Sign in
                            </MuiLink>
                        </Box>
                    </Box>
                </Box>
            </MainStackedCard>
        </Box>
    )
}

export default RegisterPage