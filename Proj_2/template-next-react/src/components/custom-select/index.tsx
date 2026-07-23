// src/components/common/CustomSelect.tsx
import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectProps } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'

export interface OptionType {
  label: string
  value: string | number
}

export type CustomSelectProps = SelectProps & {
  label: string
  options: OptionType[]
  errorText?: string
}

const CustomSelect = ({ label, options, errorText, value, onChange, ...props }: CustomSelectProps) => {
  const labelId = `custom-select-${label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <FormControl fullWidth error={Boolean(errorText)}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        onChange={onChange}
        label={label}
        sx={{ borderRadius: 2 }}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSelect