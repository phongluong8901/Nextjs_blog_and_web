import instanceAxios from 'src/helpers/axios'
import { CONFIG_API } from 'src/configs/api'
import { TCreateRoleParams, TUpdateRoleParams } from 'src/types/role'

// Lấy danh sách role
export const getAllRoles = async (params?: any) => {
  const res = await instanceAxios.get(CONFIG_API.ROLE.INDEX, { params })

  return res.data
}

// Tạo mới role
export const createRole = async (data: TCreateRoleParams) => {
  const res = await instanceAxios.post(CONFIG_API.ROLE.INDEX, data)

  return res.data
}

// Cập nhật role
export const updateRole = async (id: string | number, data: TUpdateRoleParams) => {
  const res = await instanceAxios.put(CONFIG_API.ROLE.DETAIL(id), data)

  return res.data
}

// Xóa 1 role
export const deleteRole = async (id: string | number) => {
  const res = await instanceAxios.delete(CONFIG_API.ROLE.DETAIL(id))

  return res.data
}

// Xóa nhiều role
export const deleteManyRoles = async (data: { ids: (string | number)[] }) => {
  const res = await instanceAxios.delete(CONFIG_API.ROLE.DELETE_MANY, { data })

  return res.data
}
