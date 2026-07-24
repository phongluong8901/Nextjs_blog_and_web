// src/components/common/CustomTextField.tsx
import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'

export type CustomTextFieldProps = TextFieldProps & {
    errorText?: string
    errorTextKey?: string // Hỗ trợ i18n key cho thông báo lỗi
    labelKey?: string     // Hỗ trợ i18n key cho label
    placeholderKey?: string // Hỗ trợ i18n key cho placeholder
}

const CustomTextField = ({
    error,
    errorText,
    errorTextKey,
    label,
    labelKey,
    placeholder,
    placeholderKey,
    ...props
}: CustomTextFieldProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    // Xử lý i18n ưu tiên theo key, fallback về text truyền thống
    const renderedLabel = labelKey ? t(labelKey) : label
    const renderedPlaceholder = placeholderKey ? t(placeholderKey) : placeholder
    const renderedErrorText = errorTextKey ? t(errorTextKey) : errorText

    return (
        <TextField
            fullWidth
            variant='outlined'
            label={renderedLabel}
            placeholder={renderedPlaceholder}
            error={Boolean(error || renderedErrorText)}
            helperText={renderedErrorText}
            {...props}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.divider,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.text.primary,
                    },
                },
                '& .MuiInputLabel-root': {
                    color: theme.palette.text.secondary,
                },
                '& .MuiFormHelperText-root': {
                    color: Boolean(error || renderedErrorText) ? theme.palette.error.main : theme.palette.text.secondary,
                },
                ...props.sx,
            }}
        />
    )
}

export default CustomTextField