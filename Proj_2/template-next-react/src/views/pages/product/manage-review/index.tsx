import React, { useState, useMemo } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Card, Grid, Button, Divider, FormControl, FormLabel, Typography, useTheme } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomTextField from 'src/components/text-field'
import toast from 'react-hot-toast'

const ManageReviewPage: NextPage = () => {
    const theme = useTheme()
    const { t, i18n } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)

    const schema = useMemo(() => {
        return yup.object().shape({
            productName: yup.string().required('Please enter product name'),
            rating: yup.number().min(1).max(5).required('Please enter rating'),
            comment: yup.string().required('Please enter comment'),
        })
    }, [t, i18n.language])

    type TFormInputs = yup.InferType<typeof schema>

    const { control, handleSubmit, reset, formState: { errors } } = useForm<TFormInputs>({
        defaultValues: { productName: '', rating: 5, comment: '' },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: TFormInputs) => {
        try {
            setLoading(true)
            console.log('Review Data:', data)
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
                {t('review.title', 'Manage Review')}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                            {t('review.details', 'Review Details')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <FormControl fullWidth error={Boolean(errors.productName)}>
                                <FormLabel>{t('review.product', 'Product Name')}</FormLabel>
                                <Controller name="productName" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter product name..." fullWidth error={Boolean(errors.productName)} helperText={errors.productName?.message} />
                                )} />
                            </FormControl>
                            <FormControl fullWidth error={Boolean(errors.rating)}>
                                <FormLabel>{t('review.rating', 'Rating')}</FormLabel>
                                <Controller name="rating" control={control} render={({ field }) => (
                                    <CustomTextField {...field} type="number" placeholder="1-5" fullWidth error={Boolean(errors.rating)} helperText={errors.rating?.message} />
                                )} />
                            </FormControl>
                            <FormControl fullWidth error={Boolean(errors.comment)}>
                                <FormLabel>{t('review.comment', 'Comment')}</FormLabel>
                                <Controller name="comment" control={control} render={({ field }) => (
                                    <CustomTextField {...field} placeholder="Enter comment..." fullWidth multiline rows={3} error={Boolean(errors.comment)} helperText={errors.comment?.message} />
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

export default ManageReviewPage