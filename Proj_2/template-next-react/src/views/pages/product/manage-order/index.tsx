import React, { useState, useMemo } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Card, Grid, Button, Divider, FormControl, FormLabel, Typography, useTheme } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomTextField from 'src/components/text-field'
import toast from 'react-hot-toast'

const ManageOrderPage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)

    const schema = useMemo(() => {
        return yup.object().shape({
            orderCode: yup.string().required(t('validation.codeRequired', 'Please enter order code.')),
            customerName: yup.string().required(t('validation.nameRequired', 'Please enter customer name.')),
            status: yup.string().required('Please select status'),
        })
    }, [t, i18n.language])

    type TFormInputs = yup.InferType<typeof schema>

    const { control, handleSubmit, reset, formState: { errors } } = useForm<TFormInputs>({
        defaultValues: { orderCode: '', customerName: '', status: 'PENDING' },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: TFormInputs) => {
        try {
            setLoading(true)
            console.log('Order Data:', data)
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
                {t('order.title', 'Manage Order')}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                            {t('order.details', 'Order Details')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <FormControl fullWidth error={Boolean(errors.orderCode)}>
                                <FormLabel>{t('order.code', 'Order Code')}</FormLabel>
                                <Controller name="orderCode" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter order code..." fullWidth error={Boolean(errors.orderCode)} helperText={errors.orderCode?.message} />
                                )} />
                            </FormControl>
                            <FormControl fullWidth error={Boolean(errors.customerName)}>
                                <FormLabel>{t('order.customer', 'Customer Name')}</FormLabel>
                                <Controller name="customerName" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter customer name..." fullWidth error={Boolean(errors.customerName)} helperText={errors.customerName?.message} />
                                )} />
                            </FormControl>
                            <FormControl fullWidth error={Boolean(errors.status)}>
                                <FormLabel>{t('order.status', 'Status')}</FormLabel>
                                <Controller name="status" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter status..." fullWidth error={Boolean(errors.status)} helperText={errors.status?.message} />
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

export default ManageOrderPage