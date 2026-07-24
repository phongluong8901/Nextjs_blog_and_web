import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Card, Typography, Divider, Paper, useTheme, Button } from '@mui/material'
import { Icon } from '@iconify/react'
import { PAYMENT_TYPE_OPTIONS } from 'src/configs/payment'

interface TPaymentTypeTemplatesProps {
    onSelectTemplate: (item: typeof PAYMENT_TYPE_OPTIONS[number]) => void
}

const PaymentTypeTemplates: React.FC<TPaymentTypeTemplatesProps> = ({ onSelectTemplate }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                {t('payment.availableTemplates', 'Available Templates')}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {PAYMENT_TYPE_OPTIONS.map((item) => (
                    <Paper
                        key={item.value}
                        variant="outlined"
                        onClick={() => onSelectTemplate(item)}
                        sx={{
                            p: 2.5,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s ease-in-out',
                            borderColor: theme.palette.divider,
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                backgroundColor: theme.palette.action.hover,
                            }
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                {t(item.labelKey, item.defaultLabel)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                Code: {item.value}
                            </Typography>
                        </Box>
                        <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}>
                            <Icon icon="mdi:arrow-right" fontSize={20} />
                        </Button>
                    </Paper>
                ))}
            </Box>
        </Card>
    )
}

export default PaymentTypeTemplates