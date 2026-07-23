// ** Redux Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Instance Axios Imports
import instanceAxios from 'src/helpers/axios'

// ** Config API
import { CONFIG_API } from 'src/configs/api'

interface RoleParams {
  name: string
  code: string
  description?: string
  [key: string]: any
}

// ** Lấy danh sách Role (GET)
export const fetchRolesAsync = createAsyncThunk('role/fetchRoles', async (_, { rejectWithValue }) => {
  try {
    const response = await instanceAxios.get(CONFIG_API.ROLE.INDEX)

    return response.data // Trả về danh sách roles từ server
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Không thể lấy danh sách vai trò')
  }
})

// ** Tạo mới Role (POST)
export const createRoleAsync = createAsyncThunk('role/createRole', async (data: RoleParams, { rejectWithValue }) => {
  try {
    const response = await instanceAxios.post(CONFIG_API.ROLE.INDEX, data)

    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Thêm vai trò thất bại')
  }
})

// ** Cập nhật Role (PUT)
export const updateRoleAsync = createAsyncThunk(
  'role/updateRole',
  async ({ id, data }: { id: string | number; data: RoleParams }, { rejectWithValue }) => {
    try {
      const response = await instanceAxios.put(CONFIG_API.ROLE.DETAIL(id), data)

      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Cập nhật vai trò thất bại')
    }
  }
)

// ** Xóa 1 Role (DELETE)
export const deleteRoleAsync = createAsyncThunk('role/deleteRole', async (id: string | number, { rejectWithValue }) => {
  try {
    await instanceAxios.delete(CONFIG_API.ROLE.DETAIL(id))

    return id // Trả về id để lọc bỏ trên state store
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Xóa vai trò thất bại')
  }
})
