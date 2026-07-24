import React, { useState, useMemo } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Card, Grid, Button, Divider, FormControl, FormLabel, Typography, useTheme } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomTextField from 'src/components/text-field'
import toast from 'react-hot-toast'

const UserManagementPage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)

    const schema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().email('Invalid email').required(t('validation.emailRequired', 'Please enter email.')),
            fullName: yup.string().required(t('validation.nameRequired', 'Please enter full name.')),
            phone: yup.string().optional(),
        })
    }, [t, i18n.language])

    type TFormInputs = yup.InferType<typeof schema>

    const { control, handleSubmit, reset, formState: { errors } } = useForm<TFormInputs>({
        defaultValues: { email: '', fullName: '', phone: '' },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: TFormInputs) => {
        try {
            setLoading(true)
            console.log('User Data:', data)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success(t('common.updateSuccess', 'Operation completed successfully!'))
        } catch (error: any) {
            toast.error(t('common.updateFailed', 'Operation failed.'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', gap: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {t('user.title', 'User Management')}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                            {t('user.details', 'User Information')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <FormControl fullWidth error={Boolean(errors.fullName)}>
                                <FormLabel>{t('common.fullName', 'Full Name')}</FormLabel>
                                <Controller name="fullName" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter full name..." fullWidth error={Boolean(errors.fullName)} helperText={errors.fullName?.message} />
                                )} />
                            </FormControl>
                            <FormControl fullWidth error={Boolean(errors.email)}>
                                <FormLabel>{t('common.email', 'Email')}</FormLabel>
                                <Controller name="email" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter email..." fullWidth error={Boolean(errors.email)} helperText={errors.email?.message} />
                                )} />
                            </FormControl>
                            <FormControl fullWidth>
                                <FormLabel>{t('common.phone', 'Phone')}</FormLabel>
                                <Controller name="phone" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter phone number..." fullWidth />
                                )} />
                            </FormControl>
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
                                <Button type="button" variant="outlined" color="secondary" onClick={() => reset()}>Reset</Button>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UserManagementPage