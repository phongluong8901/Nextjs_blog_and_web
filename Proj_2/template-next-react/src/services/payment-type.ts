import instanceAxios from 'src/helpers/axios'
import { CONFIG_API } from 'src/configs/api'
import { TCreatePaymentTypeParams, TUpdatePaymentTypeParams } from 'src/types/payment-type'

export const getAllPaymentTypes = async (params?: any) => {
  const res = await instanceAxios.get(CONFIG_API.PAYMENT_TYPE.INDEX, { params })

  return res.data
}

export const getDetailPaymentType = async (id: string | number) => {
  const res = await instanceAxios.get(CONFIG_API.PAYMENT_TYPE.DETAIL(id))

  return res.data
}

export const createPaymentType = async (data: TCreatePaymentTypeParams) => {
  const res = await instanceAxios.post(CONFIG_API.PAYMENT_TYPE.INDEX, data)

  return res.data
}

export const updatePaymentType = async (id: string | number, data: TUpdatePaymentTypeParams) => {
  const res = await instanceAxios.put(CONFIG_API.PAYMENT_TYPE.DETAIL(id), data)

  return res.data
}

export const deletePaymentType = async (id: string | number) => {
  const res = await instanceAxios.delete(CONFIG_API.PAYMENT_TYPE.DETAIL(id))

  return res.data
}

export const deleteManyPaymentTypes = async (data: { ids: (string | number)[] }) => {
  const res = await instanceAxios.delete(CONFIG_API.PAYMENT_TYPE.DELETE_MANY, { data })

  return res.data
}
