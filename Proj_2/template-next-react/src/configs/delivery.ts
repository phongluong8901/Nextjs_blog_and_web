export interface DeliveryConfigItem {
  name: string
  price: number
  description?: string
}

export const CONFIG_DELIVERY_TYPES: DeliveryConfigItem[] = [
  {
    name: 'Giao hàng tiết kiệm (Standard)',
    price: 15000,
    description: 'Giao hàng trong 3-5 ngày làm việc'
  },
  {
    name: 'Giao hàng nhanh (Express)',
    price: 30000,
    description: 'Giao hàng trong 1-2 ngày'
  },
  {
    name: 'Giao hàng hỏa tốc (Same Day)',
    price: 50000,
    description: 'Nhận hàng ngay trong ngày'
  },
  {
    name: 'Nhận tại cửa hàng (Pickup)',
    price: 0,
    description: 'Miễn phí vận chuyển'
  }
]
