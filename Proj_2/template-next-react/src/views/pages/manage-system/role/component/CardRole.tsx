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
import { Controller, Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import CustomTextField from 'src/components/text-field'

interface CardRoleProps {
    control: Control<any>
    errors: FieldErrors<any>
    handleSubmit: any
    onSubmit: (data: any) => void
    reset: () => void
    loading: boolean
    isEdit?: boolean
    setValue: UseFormSetValue<any> // <--- Thêm setValue vào interface
}

// Hàm chuẩn hóa tiếng Việt thành mã code (Ví dụ: "Thu ngân" -> "THU_NGAN")
const generateCodeFromName = (str: string) => {
    if (!str) return ''

    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
        .replace(/[đĐ]/g, 'd')
        .replace(/([^0-9a-z-\s])/gi, '') // Xóa ký tự đặc biệt
        .trim()
        .replace(/\s+/g, '_') // Thay khoảng trắng bằng dấu gạch dưới
        .toUpperCase()
}

const CardRole: React.FC<CardRoleProps> = ({
    control,
    errors,
    handleSubmit,
    onSubmit,
    reset,
    loading,
    isEdit = false,
    setValue,
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
            <Typography variant='h6' sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                {isEdit ? t('role.editTitle', 'Chỉnh sửa thông tin vai trò') : t('role.details', 'Role Information')}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
                {/* Ô CODE */}
                <FormControl fullWidth error={Boolean(errors.code)}>
                    <FormLabel>{t('common.code', 'Code')}</FormLabel>
                    <Controller
                        name='code'
                        control={control}
                        render={({ field }) => (
                            <CustomTextField
                                {...field}
                                placeholder={t('role.placeholderCode', 'Enter role code...')}
                                fullWidth
                                error={Boolean(errors.code)}
                                helperText={errors.code?.message as string}
                            />
                        )}
                    />
                </FormControl>

                {/* Ô NAME: Bắt sự kiện gõ để tự động sinh Code nếu không phải chế độ Edit */}
                <FormControl fullWidth error={Boolean(errors.name)}>
                    <FormLabel>{t('common.name', 'Name')}</FormLabel>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field }) => (
                            <CustomTextField
                                {...field}
                                onChange={(e) => {
                                    const value = e.target.value
                                    field.onChange(value)
                                    if (!isEdit) {
                                        const autoCode = generateCodeFromName(value)
                                        setValue('code', autoCode, { shouldValidate: true })
                                    }
                                }}
                                placeholder={t('role.placeholderName', 'Enter role name...')}
                                fullWidth
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message as string}
                            />
                        )}
                    />
                </FormControl>

                {/* Ô DESCRIPTION */}
                <FormControl fullWidth>
                    <FormLabel>{t('common.description', 'Description')}</FormLabel>
                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => (
                            <CustomTextField
                                {...field}
                                placeholder={t('role.placeholderDesc', 'Enter description...')}
                                fullWidth
                                multiline
                                rows={3}
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
                        {loading ? t('common.saving', 'Saving...') : t('common.saveChanges', 'Save Changes')}
                    </Button>
                    <Button
                        type='button'
                        variant='outlined'
                        color='secondary'
                        onClick={() => reset()}
                        disabled={loading}
                    >
                        {t('common.reset', 'Reset')}
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}

export default CardRole