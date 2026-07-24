// Định nghĩa cấu trúc của một Delivery Type
export interface TDeliveryType {
  _id: string
  name: string
  price: number
  createdAt?: string
  updatedAt?: string
}

// Payload dùng để tạo mới Delivery Type
export type TCreateDeliveryTypeBody = {
  name: string
  price: number
}

// Payload dùng để cập nhật Delivery Type (các trường đều có thể tùy chọn)
export type TUpdateDeliveryTypeBody = {
  name?: string
  price?: number
}

// Cấu trúc response trả về danh sách có phân trang từ API getAll
export type TGetAllDeliveryTypesResponse = {
  status: number
  message: string
  typeError: string
  statusMessage: string
  data: {
    deliveryTypes: TDeliveryType[]
    totalPage: number
    totalCount: number
  }
}

// Cấu trúc response trả về chi tiết một bản ghi hoặc khi tạo/sửa/xóa thành công
export type TDeliveryTypeResponse = {
  status: number
  message: string
  typeError: string
  statusMessage: string
  data: TDeliveryType | null
}
