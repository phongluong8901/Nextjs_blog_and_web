import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import CustomTextField from 'src/components/text-field'

interface CardRoleProps {
    control: Control<any>
    errors: FieldErrors<any>
    handleSubmit: any
    onSubmit: (data: any) => void
    reset: () => void
    loading: boolean
    isEdit?: boolean
}

const CardRole: React.FC<CardRoleProps> = ({
    control,
    errors,
    handleSubmit,
    onSubmit,
    reset,
    loading,
    isEdit = false,
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
            <Typography variant='h6' sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                {isEdit ? t('role.editTitle', 'Chỉnh sửa thông tin vai trò') : t('role.details', 'Thông tin vai trò')}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
                <FormControl fullWidth error={Boolean(errors.name)}>
                    <FormLabel>{t('common.name', 'Tên vai trò')}</FormLabel>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field }) => (
                            <CustomTextField
                                {...field}
                                placeholder={t('role.placeholderName', 'Nhập tên vai trò...')}
                                fullWidth
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message as string}
                            />
                        )}
                    />
                </FormControl>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                        type='submit'
                        variant='contained'
                        disabled={loading}
                        sx={{ minWidth: 120 }}
                    >
                        {loading ? t('common.saving', 'Đang lưu...') : t('common.saveChanges', 'Lưu thay đổi')}
                    </Button>
                    <Button
                        type='button'
                        variant='outlined'
                        color='secondary'
                        onClick={() => reset()}
                        disabled={loading}
                    >
                        {t('common.reset', 'Làm mới')}
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}

export default CardRole