// src/components/common/CustomTextField.tsx
import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

export type CustomTextFieldProps = TextFieldProps & {
    errorText?: string
}

const CustomTextField = ({ error, errorText, ...props }: CustomTextFieldProps) => {
    return (
        <TextField
            fullWidth
            variant='outlined'
            error={Boolean(error || errorText)}
            helperText={errorText}
            {...props}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                },
                ...props.sx,
            }}
        />
    )
}

export default CustomTextField