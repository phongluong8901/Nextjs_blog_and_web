import React, { useState, useMemo } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Card, Grid, Button, Divider, FormControl, FormLabel, Typography, useTheme } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomTextField from 'src/components/text-field'
import toast from 'react-hot-toast'

const ManageProductPage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)

    const schema = useMemo(() => {
        return yup.object().shape({
            productName: yup.string().required(t('validation.nameRequired', 'Please enter product name.')),
            sku: yup.string().required(t('validation.skuRequired', 'Please enter SKU.')),
            price: yup.number().typeError('Must be a number').required('Please enter price'),
        })
    }, [t, i18n.language])

    type TFormInputs = yup.InferType<typeof schema>

    const { control, handleSubmit, reset, formState: { errors } } = useForm<TFormInputs>({
        defaultValues: { productName: '', sku: '', price: 0 },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: TFormInputs) => {
        try {
            setLoading(true)
            console.log('Product Data:', data)
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
                {t('product.title', 'Manage Product')}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                            {t('product.details', 'Product Details')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <FormControl fullWidth error={Boolean(errors.productName)}>
                                <FormLabel>{t('product.name', 'Product Name')}</FormLabel>
                                <Controller name="productName" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter product name..." fullWidth error={Boolean(errors.productName)} helperText={errors.productName?.message} />
                                )} />
                            </FormControl>
                            <FormControl fullWidth error={Boolean(errors.sku)}>
                                <FormLabel>{t('product.sku', 'SKU')}</FormLabel>
                                <Controller name="sku" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter SKU..." fullWidth error={Boolean(errors.sku)} helperText={errors.sku?.message} />
                                )} />
                            </FormControl>
                            <FormControl fullWidth error={Boolean(errors.price)}>
                                <FormLabel>{t('product.price', 'Price')}</FormLabel>
                                <Controller name="price" control={control} render={({ field }) => (
                                    <CustomTextField {...field} type="number" placeholder="Enter price..." fullWidth error={Boolean(errors.price)} helperText={errors.price?.message} />
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

export default ManageProductPage