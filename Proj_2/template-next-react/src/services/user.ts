import instanceAxios from 'src/helpers/axios'
import { CONFIG_API } from 'src/configs/api'
import { TCreateUserParams, TAdminUpdateUserParams } from 'src/types/user'

export const getAllUsers = async (params?: any) => {
  const res = await instanceAxios.get(CONFIG_API.USER.INDEX, { params })

  return res.data
}

export const getDetailUser = async (id: string | number) => {
  const res = await instanceAxios.get(CONFIG_API.USER.DETAIL(id))

  return res.data
}

export const createUser = async (data: TCreateUserParams) => {
  const res = await instanceAxios.post(CONFIG_API.USER.INDEX, data)

  return res.data
}

export const updateUser = async (id: string | number, data: TAdminUpdateUserParams) => {
  const res = await instanceAxios.put(CONFIG_API.USER.DETAIL(id), data)

  return res.data
}

export const deleteUser = async (id: string | number) => {
  const res = await instanceAxios.delete(CONFIG_API.USER.DETAIL(id))

  return res.data
}

export const deleteManyUsers = async (data: { ids: (string | number)[] }) => {
  const res = await instanceAxios.delete(CONFIG_API.USER.DELETE_MANY, { data })

  return res.data
}
