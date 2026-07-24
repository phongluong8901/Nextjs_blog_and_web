export const PAYMENT_TYPES = {
  PAYMENT_LATER: 'PAYMENT_LATER',
  VN_PAYMENT: 'VN_PAYMENT',
  PAYPAL: 'PAYPAL'
} as const

export const PAYMENT_TYPE_OPTIONS = [
  { value: PAYMENT_TYPES.PAYMENT_LATER, labelKey: 'payment.types.paymentLater', defaultLabel: 'Payment Later' },
  { value: PAYMENT_TYPES.VN_PAYMENT, labelKey: 'payment.types.vnPayment', defaultLabel: 'VN Payment' },
  { value: PAYMENT_TYPES.PAYPAL, labelKey: 'payment.types.paypal', defaultLabel: 'Paypal' }
]
