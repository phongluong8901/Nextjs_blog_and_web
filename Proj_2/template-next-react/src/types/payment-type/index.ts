export type TPaymentType = {
  _id: string
  name: string
  type: string
  createdAt?: string
  updatedAt?: string
}

export type TCreatePaymentTypeParams = {
  name: string
  type: string
}

export type TUpdatePaymentTypeParams = {
  name?: string
  type?: string
}
