import React, { useEffect } from 'react'
import { Box, Card, Button, Divider, FormControl, FormLabel, Typography, useTheme } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomTextField from 'src/components/text-field'
import { useTranslation } from 'react-i18next'
import { TDeliveryType } from 'src/types/delivery-type'

interface DeliveryTypeFormProps {
    isEdit: boolean
    selectedItem: TDeliveryType | null
    loading: boolean
    onSubmitForm: (data: { name: string; price: number }) => void
    onResetForm: () => void
    schema: yup.ObjectSchema<any>
}

export const DeliveryTypeForm: React.FC<DeliveryTypeFormProps> = ({
    isEdit,
    selectedItem,
    loading,
    onSubmitForm,
    onResetForm,
    schema
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    type TFormInputs = yup.InferType<typeof schema>

    const { control, handleSubmit, reset, formState: { errors } } = useForm<TFormInputs>({
        defaultValues: { name: '', price: 0 },
        resolver: yupResolver(schema),
    })

    // Cập nhật lại giá trị form khi chọn edit hoặc reset
    useEffect(() => {
        if (isEdit && selectedItem) {
            reset({
                name: selectedItem.name,
                price: selectedItem.price
            })
        } else {
            reset({ name: '', price: 0 })
        }
    }, [isEdit, selectedItem, reset])

    const handleReset = () => {
        reset({ name: '', price: 0 })
        onResetForm()
    }

    return (
        <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {isEdit ? 'Edit Delivery Type' : 'Add Delivery Type'}
            </Typography>
            <Divider />
            <Box component="form" onSubmit={handleSubmit(onSubmitForm)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <FormControl fullWidth error={Boolean(errors.name)}>
                    <FormLabel>{t('common.name', 'Name')}</FormLabel>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <CustomTextField
                                {...field}
                                placeholder="Enter delivery type..."
                                fullWidth
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message as string}
                            />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth error={Boolean(errors.price)}>
                    <FormLabel>{t('delivery.fee', 'Price')}</FormLabel>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <CustomTextField
                                {...field}
                                type="number"
                                placeholder="Enter price..."
                                fullWidth
                                error={Boolean(errors.price)}
                                helperText={errors.price?.message as string}
                            />
                        )}
                    />
                </FormControl>

                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Saving...' : isEdit ? 'Update' : 'Save Changes'}
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}