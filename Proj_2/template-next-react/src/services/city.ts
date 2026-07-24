import instanceAxios from 'src/helpers/axios'
import { CONFIG_API } from 'src/configs/api'
import { TCreateCityParams, TUpdateCityParams } from 'src/types/city'

export const getAllCities = async (params?: any) => {
  const res = await instanceAxios.get(CONFIG_API.CITY.INDEX, { params })

  return res.data
}

export const getDetailCity = async (id: string | number) => {
  const res = await instanceAxios.get(CONFIG_API.CITY.DETAIL(id))

  return res.data
}

export const createCity = async (data: TCreateCityParams) => {
  const res = await instanceAxios.post(CONFIG_API.CITY.INDEX, data)

  return res.data
}

export const updateCity = async (id: string | number, data: TUpdateCityParams) => {
  const res = await instanceAxios.put(CONFIG_API.CITY.DETAIL(id), data)

  return res.data
}

export const deleteCity = async (id: string | number) => {
  const res = await instanceAxios.delete(CONFIG_API.CITY.DETAIL(id))

  return res.data
}

export const deleteManyCities = async (data: { ids: (string | number)[] }) => {
  const res = await instanceAxios.delete(CONFIG_API.CITY.DELETE_MANY, { data })

  return res.data
}
