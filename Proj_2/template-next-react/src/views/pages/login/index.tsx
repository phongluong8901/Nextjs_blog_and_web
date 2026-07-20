import React, { useState } from 'react'

// ** Import các utilities từ Next.js
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

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
} from '@mui/material'

// ** Import Custom Component TextField do mình định nghĩa
import CustomTextField from 'src/components/text-field'

// ** Import ảnh Light / Dark Mode
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import CustomCarousel from 'src/components/component_path/ImageCarousel'
import ShopifyBackground from 'src/components/component_path/ShopifyBackground'

// ==========================================
// 1. KHOẢNG STYLED COMPONENTS
// ==========================================

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

// Tạo mảng dữ liệu slide
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

// ==========================================
// 2. VALIDATION SCHEMA
// ==========================================
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

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
const LoginPage: NextPage<TProps> = () => {
    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const theme = useTheme()

    const {
        control,
        handleSubmit,
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

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const onSubmit = (data: TFormData) => {
        console.log('Form Submit Data:', data)
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
            <MainStackedCard>
                {/* KHỐI BÊN TRÁI: DẠNG CỘT */}
                <Box
                    sx={{
                        flex: { xs: '0 0 0%', sm: '1 1 45%', md: '1 1 55%' },
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        backgroundColor:
                            theme.palette.customColors?.bodyBg || theme.palette.action.hover,
                        padding: 3,
                        position: 'relative',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {/* KHỐI ẢNH PHÍA TRÊN (~65% CHIỀU CAO) */}
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

                    {/* KHỐI CAROUSEL PHÍA DƯỚI (~35% CHIỀU CAO) */}
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
                {/* KHỐI FORM BÊN PHẢI */}
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
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                            {/* EMAIL */}
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
                                            color={errors.email ? 'error' : 'primary'}
                                        />
                                    )}
                                />
                            </FormControl>

                            {/* PASSWORD */}
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
                                            color={errors.password ? 'error' : 'primary'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            aria-label="toggle password visibility"
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

                            {/* REMEMBER ME */}
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

                            {/* NÚT SUBMIT */}
                            <Button type="submit" fullWidth variant="contained" size="large">
                                Sign in
                            </Button>

                            {/* FORGOT PASSWORD */}
                            <MuiLink
                                component="button"
                                type="button"
                                onClick={handleClickOpen}
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Forgot your password?
                            </MuiLink>
                        </Box>

                        <Divider sx={{ my: 2.5 }}>or sign in with</Divider>

                        {/* NÚT SOCIAL LOGIN */}
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
                                    transition: 'all 0.2s',
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
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                        borderColor: theme.palette.text.secondary,
                                    },
                                }}
                            >
                                <Icon icon="logos:facebook" width={22} height={22} />
                            </IconButton>
                        </Box>

                        {/* REGISTER REDIRECT */}
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