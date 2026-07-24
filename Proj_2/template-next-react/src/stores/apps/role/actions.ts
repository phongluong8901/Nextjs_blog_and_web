import { createAsyncThunk } from '@reduxjs/toolkit'
import { createRole, deleteRole, deleteManyRoles, getAllRoles, updateRole } from 'src/services/role'
import { TCreateRoleParams, TUpdateRoleParams } from 'src/types/role'

// ** Lấy danh sách Role (GET)
export const fetchRolesAsync = createAsyncThunk('role/fetchRoles', async (params: any, { rejectWithValue }) => {
  try {
    const data = await getAllRoles(params)

    return data
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Không thể lấy danh sách vai trò')
  }
})

// ** Tạo mới Role (POST)
export const createRoleAsync = createAsyncThunk(
  'role/createRole',
  async (data: TCreateRoleParams, { rejectWithValue }) => {
    try {
      const response = await createRole(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Thêm vai trò thất bại')
    }
  }
)

// ** Cập nhật Role (PUT)
export const updateRoleAsync = createAsyncThunk(
  'role/updateRole',
  async ({ id, data }: { id: string | number; data: TUpdateRoleParams }, { rejectWithValue }) => {
    try {
      const response = await updateRole(id, data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Cập nhật vai trò thất bại')
    }
  }
)

// ** Xóa 1 Role (DELETE)
export const deleteRoleAsync = createAsyncThunk('role/deleteRole', async (id: string | number, { rejectWithValue }) => {
  try {
    await deleteRole(id)

    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Xóa vai trò thất bại')
  }
})

// ** Xóa nhiều Role (DELETE MANY)
export const deleteManyRolesAsync = createAsyncThunk(
  'role/deleteManyRoles',
  async (data: { ids: (string | number)[] }, { rejectWithValue }) => {
    try {
      const response = await deleteManyRoles(data)

      return { response, ids: data.ids }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Xóa nhiều vai trò thất bại')
    }
  }
)
