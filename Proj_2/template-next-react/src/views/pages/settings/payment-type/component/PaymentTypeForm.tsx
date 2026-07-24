import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Card, Button, Divider, FormControl, FormLabel, Typography, useTheme, MenuItem } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import CustomTextField from 'src/components/text-field'
import { PAYMENT_TYPE_OPTIONS } from 'src/configs/payment'
import { TPaymentType } from 'src/types/payment-type'

interface TPaymentTypeFormProps {
  methods: UseFormReturn<any>
  isEdit: boolean
  loading: boolean
  selectedItem: TPaymentType | null
  onSubmit: (data: any) => void
  onReset: () => void
}

const PaymentTypeForm: React.FC<TPaymentTypeFormProps> = ({ methods, isEdit, loading, selectedItem, onSubmit, onReset }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { control, handleSubmit, reset, formState: { errors } } = methods

  useEffect(() => {
    if (isEdit && selectedItem) {
      reset({
        name: selectedItem.name,
        type: selectedItem.type
      })
    } else {
      reset({ name: '', type: '' })
    }
  }, [isEdit, selectedItem, reset])

  return (
    <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
        {isEdit ? t('payment.editDetails', 'Edit Payment Type') : t('payment.details', 'Add Payment Type')}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth error={Boolean(errors.name)}>
          <FormLabel>{t('common.name', 'Name')}</FormLabel>
          <Controller name="name" control={control} render={({ field }) => (
            <CustomTextField {...field} placeholder={t('payment.enterName', 'Enter payment name...')} fullWidth error={Boolean(errors.name)} helperText={errors.name?.message as string} />
          )} />
        </FormControl>

        <FormControl fullWidth error={Boolean(errors.type)}>
          <FormLabel>{t('common.type', 'Type')}</FormLabel>
          <Controller name="type" control={control} render={({ field }) => (
            <CustomTextField select {...field} placeholder={t('payment.selectType', 'Select payment type...')} fullWidth error={Boolean(errors.type)} helperText={errors.type?.message as string}>
              {PAYMENT_TYPE_OPTIONS.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {t(item.labelKey, item.defaultLabel)}
                </MenuItem>
              ))}
            </CustomTextField>
          )} />
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? t('common.saving', 'Saving...') : isEdit ? t('common.update', 'Update') : t('common.saveChanges', 'Save Changes')}
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onReset}>
            {t('common.reset', 'Reset')}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default PaymentTypeForm