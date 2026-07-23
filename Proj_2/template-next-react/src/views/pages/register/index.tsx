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
    FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment,
    Link as MuiLink,
    Typography,
    Card as MuiCard,
    styled,
    useTheme,
} from '@mui/material'

// ** Import Custom Component TextField
import CustomTextField from 'src/components/text-field'

// ** Import ảnh Light / Dark Mode cho Register
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'

// ==========================================
// 1. STYLED COMPONENTS
// ==========================================

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

// ==========================================
// 2. VALIDATION SCHEMA DÀNH CHO REGISTER
// ==========================================
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

// ==========================================
// 3. MAIN COMPONENT (REGISTER PAGE)
// ==========================================
const RegisterPage: NextPage<TProps> = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const theme = useTheme()

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

    const onSubmit = (data: TFormData) => {
        console.log('Register Submit Data:', data)
    }

    const handleGoogleRegister = () => {
        console.log('Register with Google')
    }

    const handleFacebookRegister = () => {
        console.log('Register with Facebook')
    }

    const imageSource =
        theme.palette.mode === 'dark' ? RegisterDark : RegisterLight

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
                {/* KHỐI ẢNH BÊN TRÁI */}
                <Box
                    sx={{
                        flex: { xs: '0 0 0%', sm: '1 1 45%', md: '1 1 55%' },
                        display: { xs: 'none', sm: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:
                            theme.palette.customColors?.bodyBg || theme.palette.action.hover,
                        padding: 4,
                        position: 'relative',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                            {/* FULL NAME */}
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

                            {/* CONFIRM PASSWORD */}
                            <FormControl fullWidth error={Boolean(errors.confirmPassword)}>
                                <FormLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </FormLabel>
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
                                                            onClick={() =>
                                                                setShowConfirmPassword(!showConfirmPassword)
                                                            }
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            aria-label="toggle confirm password visibility"
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

                            {/* TERMS & CONDITIONS CHECKBOX */}
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

                            {/* NÚT SUBMIT REGISTER */}
                            <Button type="submit" fullWidth variant="contained" size="large">
                                Sign up
                            </Button>
                        </Box>

                        <Divider sx={{ my: 2.5 }}>or sign up with</Divider>

                        {/* NÚT SOCIAL REGISTER */}
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
                                onClick={handleFacebookRegister}
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

                        {/* LOGIN REDIRECT */}
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