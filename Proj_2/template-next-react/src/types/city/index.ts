export type TCityEntity = {
  _id: string
  name: string
  code?: string
  slug?: string
  status?: number
  createdAt?: string
  updatedAt?: string
  [key: string]: any // Cho phép mở rộng thêm các trường khác nếu schema City của bạn có thêm thuộc tính
}

export type TCreateCityParams = {
  name: string
  code?: string
  status?: number
}

export type TUpdateCityParams = {
  name?: string
  code?: string
  status?: number
}
