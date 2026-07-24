import React, { useState, useEffect, useRef } from 'react'

// ** Import các utilities từ Next.js
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** Import i18n Hook
import { useTranslation } from 'react-i18next'

// ** Import Toast library
import toast from 'react-hot-toast'

// ** Import Redux Hooks & Actions
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { registerUser } from 'src/stores/apps/auth/actions'

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
} from '@mui/material'

// ** Import Custom Component TextField
import CustomTextField from 'src/components/text-field'

// ** Import ảnh Light / Dark Mode cho Register
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'

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
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const router = useRouter()
    const theme = useTheme()
    const { t } = useTranslation()
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

    // Dọn dẹp timer khi unmount component để tránh memory leak
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [])

    const onSubmit = async (data: TFormData) => {
        const payload = {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        }

        const resultAction = await dispatch(registerUser(payload))

        if (registerUser.fulfilled.match(resultAction)) {
            toast.success(t('Auth.Register.Success', 'Đăng ký tài khoản thành công! Đang chuyển hướng...'))

            timerRef.current = setTimeout(() => {
                router.push('/login')
            }, 1500)
        } else {
            const errorMessage =
                (resultAction.payload as { message?: string })?.message ||
                t('Auth.Register.Error', 'Đăng ký thất bại. Vui lòng thử lại!')
            toast.error(errorMessage)
        }
    }

    const handleGoogleRegister = (): void => {
        console.log('Register with Google')
    }

    const handleFacebookRegister = (): void => {
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
            <MainStackedCard>
                {/* Cột trái: Hình minh họa */}
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

                {/* Cột phải: Form Đăng ký */}
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
                            {t('Auth.Register.Title', 'Sign up')}
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
                                <FormLabel htmlFor="fullName">{t('Auth.Register.FullName', 'Full Name')}</FormLabel>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id="fullName"
                                            placeholder={t('Auth.Register.FullNamePlaceholder', 'John Doe')}
                                            autoFocus
                                            fullWidth
                                            error={Boolean(errors.fullName)}
                                            helperText={errors.fullName?.message}
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth error={Boolean(errors.email)}>
                                <FormLabel htmlFor="email">{t('Auth.Register.Email', 'Email')}</FormLabel>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder={t('Auth.Register.EmailPlaceholder', 'your@email.com')}
                                            autoComplete="email"
                                            fullWidth
                                            error={Boolean(errors.email)}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth error={Boolean(errors.password)}>
                                <FormLabel htmlFor="password">{t('Auth.Register.Password', 'Password')}</FormLabel>
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
                                <FormLabel htmlFor="confirmPassword">{t('Auth.Register.ConfirmPassword', 'Confirm Password')}</FormLabel>
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
                                                    {t('Auth.Register.AgreeTo', 'I agree to')}{' '}
                                                    <MuiLink
                                                        href="#"
                                                        onClick={(e) => e.preventDefault()}
                                                        underline="hover"
                                                    >
                                                        {t('Auth.Register.PrivacyPolicy', 'privacy policy & terms')}
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
                                {loading ? t('Auth.Register.SigningUp', 'Signing up...') : t('Auth.Register.SignUpButton', 'Sign up')}
                            </Button>
                        </Box>

                        <Divider sx={{ my: 2.5 }}>{t('Auth.Register.OrSignWith', 'or sign up with')}</Divider>

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
                                {t('Auth.Register.AlreadyHaveAccount', 'Already have an account?')}
                            </Typography>
                            <MuiLink
                                component={Link}
                                href="/login"
                                variant="body2"
                                sx={{ fontWeight: 600 }}
                            >
                                {t('Auth.Register.SignIn', 'Sign in')}
                            </MuiLink>
                        </Box>
                    </Box>
                </Box>
            </MainStackedCard>
        </Box>
    )
}

export default RegisterPage