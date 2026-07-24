// ** React Imports
import React from 'react'

// ** i18n Hook
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { useTheme } from '@mui/material/styles'

export type CustomSwitchProps = SwitchProps & {
    label?: string
    labelKey?: string // Hỗ trợ i18n key cho label
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom'
}

const CustomSwitch = ({
    label = '',
    labelKey,
    labelPlacement = 'end',
    ...props
}: CustomSwitchProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    // Xử lý i18n ưu tiên theo key, fallback về label truyền vào
    const renderedLabel = labelKey ? t(labelKey) : label

    const switchComponent = (
        <Switch
            {...props}
            sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                    color: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: theme.palette.primary.main,
                },
                ...props.sx,
            }}
        />
    )

    if (!renderedLabel) {
        return switchComponent
    }

    return (
        <FormControlLabel
            control={switchComponent}
            label={renderedLabel}
            labelPlacement={labelPlacement}
            sx={{
                color: theme.palette.text.primary,
                '& .MuiTypography-root': {
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                },
            }}
        />
    )
}

export default CustomSwitch