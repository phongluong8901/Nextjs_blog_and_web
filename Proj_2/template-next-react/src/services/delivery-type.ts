import instanceAxios from 'src/helpers/axios'
import { CONFIG_API } from 'src/configs/api'
import {
  TCreateDeliveryTypeBody,
  TUpdateDeliveryTypeBody,
  TGetAllDeliveryTypesResponse,
  TDeliveryTypeResponse
} from 'src/types/delivery-type'

export const getAllDeliveryTypes = async (params?: any): Promise<TGetAllDeliveryTypesResponse> => {
  const res = await instanceAxios.get(CONFIG_API.DELIVERY_TYPE.INDEX, { params })

  return res.data
}

export const getDetailDeliveryType = async (id: string | number): Promise<TDeliveryTypeResponse> => {
  const res = await instanceAxios.get(CONFIG_API.DELIVERY_TYPE.DETAIL(id))

  return res.data
}

export const createDeliveryType = async (data: TCreateDeliveryTypeBody): Promise<TDeliveryTypeResponse> => {
  const res = await instanceAxios.post(CONFIG_API.DELIVERY_TYPE.INDEX, data)

  return res.data
}

export const updateDeliveryType = async (
  id: string | number,
  data: TUpdateDeliveryTypeBody
): Promise<TDeliveryTypeResponse> => {
  const res = await instanceAxios.put(CONFIG_API.DELIVERY_TYPE.DETAIL(id), data)

  return res.data
}

export const deleteDeliveryType = async (id: string | number): Promise<TDeliveryTypeResponse> => {
  const res = await instanceAxios.delete(CONFIG_API.DELIVERY_TYPE.DETAIL(id))

  return res.data
}

export const deleteManyDeliveryTypes = async (data: { ids: (string | number)[] }): Promise<any> => {
  const res = await instanceAxios.delete(CONFIG_API.DELIVERY_TYPE.DELETE_MANY, { data })

  return res.data
}
