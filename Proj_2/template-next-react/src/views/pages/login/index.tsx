import React, { useState, useEffect } from 'react'

// ** Import các utilities từ Next.js
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** Import Redux hooks & actions
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/stores'
import { clearRegisteredCredentials } from 'src/stores/apps/auth'

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
    FormLabel,
    IconButton,
    InputAdornment,
    Link as MuiLink,
    Typography,
    Card as MuiCard,
    styled,
    useTheme,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material'

// ** Import Custom Component TextField do mình định nghĩa
import CustomTextField from 'src/components/text-field'

// ** Import ảnh Light / Dark Mode
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import CustomCarousel from 'src/components/component_path/ImageCarousel'
import { useAuth } from 'src/hooks/useAuth'

const MainStackedCard = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    minHeight: '680px',
    maxHeight: '92vh',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 20px 50px rgba(0,0,0,0.6)'
            : '0 20px 50px rgba(0,0,0,0.08)',
    position: 'relative',
}))

const slideItems = [
    {
        title: 'Efficient Workflow Management',
        description: 'Streamline your daily operations with real-time tracking and intuitive controls.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    },
    {
        title: 'Advanced Data Analytics',
        description: 'Visualize your business metrics effortlessly with responsive dashboard tools.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    },
    {
        title: 'Seamless Global Collaboration',
        description: 'Connect and coordinate with your distributed teams from anywhere in the world.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
]

type TProps = {}

const schema = yup.object().shape({
    email: yup
        .string()
        .required('Please enter your email address.')
        .email('Please enter a valid email address.'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(6, 'Password must be at least 6 characters.'),
    remember: yup.boolean().default(false),
})

type TFormData = yup.InferType<typeof schema>

const LoginPage: NextPage<TProps> = () => {
    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success')

    const theme = useTheme()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { login } = useAuth()

    // Lấy thông tin tài khoản vừa đăng ký từ Redux store
    const authState = useSelector((state: RootState) => state.auth)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TFormData>({
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    })

    // Tự động điền email và password từ Redux store khi chuyển trang từ Register sang
    useEffect(() => {
        if (authState.registeredEmail) {
            setValue('email', authState.registeredEmail, { shouldValidate: true, shouldDirty: true })
        }
        if (authState.registeredPassword) {
            setValue('password', authState.registeredPassword, { shouldValidate: true, shouldDirty: true })
        }

        // Xóa sạch sau khi đã điền xong để F5 lại trang không bị điền lại nữa
        return () => {
            if (authState.registeredEmail) {
                dispatch(clearRegisteredCredentials())
            }
        }
    }, [authState.registeredEmail, authState.registeredPassword, setValue, dispatch])

    const handleClickOpen = () => setOpen(true)
    const handleCloseAlert = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setOpenAlert(false)
    }

    const onSubmit = (data: TFormData) => {
        setLoading(true)
        login(
            {
                email: data.email,
                password: data.password,
                rememberMe: data.remember, // 👈 Truyền vào rememberMe (lấy giá trị từ checkbox data.remember của form)
            },
            (err) => {
                setLoading(false)
                if (err) {
                    setAlertSeverity('error')
                    setAlertMessage(err?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!')
                    setOpenAlert(true)
                }
            }
        )
    }

    const handleGoogleLogin = () => {
        console.log('Login with Google')
    }

    const handleFacebookLogin = () => {
        console.log('Login with Facebook')
    }

    const imageSource = theme.palette.mode === 'dark' ? LoginDark : LoginLight

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
            }}
        >
            <Snackbar
                open={openAlert}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>

            <MainStackedCard>
                <Box
                    sx={{
                        flex: { xs: '0 0 0%', sm: '1 1 45%', md: '1 1 55%' },
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        backgroundColor:
                            theme.palette.customColors?.bodyBg || theme.palette.action.hover,
                        padding: 3,
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            flex: '0 0 65%',
                            position: 'relative',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            src={imageSource}
                            alt="login illustration"
                            fill
                            sizes="(max-width: 1200px) 50vw, 600px"
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Box>

                    <Box
                        sx={{
                            flex: '0 0 35%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        <CustomCarousel items={slideItems} autoPlay={true} autoPlayInterval={4000} />
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
                            Sign in
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
                                            autoFocus
                                            fullWidth
                                            error={Boolean(errors.email)}
                                            helperText={errors.email?.message}
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
                                            autoComplete="current-password"
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

                            <Controller
                                name="remember"
                                control={control}
                                render={({ field: { value, onChange, ...fieldRest } }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...fieldRest}
                                                checked={Boolean(value)}
                                                onChange={(e) => onChange(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="Remember me"
                                    />
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
                                {loading ? 'Signing in...' : 'Sign in'}
                            </Button>

                            <MuiLink
                                component={Link}
                                href="/forgot-password"
                                variant="body2"
                                sx={{ alignSelf: 'center', fontWeight: 600, textDecoration: 'none' }}
                            >
                                Forgot your password?
                            </MuiLink>
                        </Box>

                        <Divider sx={{ my: 2.5 }}>or sign in with</Divider>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                            }}
                        >
                            <IconButton
                                onClick={handleGoogleLogin}
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
                                onClick={handleFacebookLogin}
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
                                Don't have an account?
                            </Typography>
                            <MuiLink
                                component={Link}
                                href="/register"
                                variant="body2"
                                sx={{ fontWeight: 600 }}
                            >
                                Sign up
                            </MuiLink>
                        </Box>
                    </Box>
                </Box>
            </MainStackedCard>
        </Box>
    )
}

export default LoginPage