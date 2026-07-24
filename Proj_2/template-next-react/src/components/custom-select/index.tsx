// src/components/common/CustomSelect.tsx
import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectProps } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import { useTheme } from '@mui/material/styles'

export interface OptionType {
  label: string
  labelKey?: string // Hỗ trợ i18n key cho từng option
  value: string | number
}

export type CustomSelectProps = SelectProps & {
  label?: string
  labelKey?: string // Hỗ trợ i18n key cho label chính của select
  options: OptionType[]
  errorText?: string
  errorTextKey?: string // Hỗ trợ i18n key cho thông báo lỗi
}

const CustomSelect = ({
  label = '',
  labelKey,
  options,
  errorText,
  errorTextKey,
  value,
  onChange,
  ...props
}: CustomSelectProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  // Xử lý i18n ưu tiên theo key, fallback về text truyền vào
  const renderedLabel = labelKey ? t(labelKey) : label
  const renderedErrorText = errorTextKey ? t(errorTextKey) : errorText

  const labelId = `custom-select-${(renderedLabel || 'field').replace(/\s+/g, '-').toLowerCase()}`

  return (
    <FormControl fullWidth error={Boolean(renderedErrorText)}>
      {renderedLabel && <InputLabel id={labelId}>{renderedLabel}</InputLabel>}
      <Select
        labelId={labelId}
        value={value}
        onChange={onChange}
        label={renderedLabel}
        sx={{
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          '& .MuiSelect-select': {
            color: theme.palette.text.primary,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.primary,
          },
          ...props.sx,
        }}
        {...props}
      >
        {options.map((option) => {
          const renderedOptionLabel = option.labelKey ? t(option.labelKey) : option.label

          return (
            <MenuItem key={option.value} value={option.value}>
              {renderedOptionLabel}
            </MenuItem>
          )
        })}
      </Select>
      {renderedErrorText && <FormHelperText>{renderedErrorText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSelect