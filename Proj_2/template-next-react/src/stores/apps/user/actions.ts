import { createAsyncThunk } from '@reduxjs/toolkit'
import * as userService from 'src/services/user'
import { TCreateUserParams, TAdminUpdateUserParams } from 'src/types/user'

export const fetchUsersAsync = createAsyncThunk('user/fetchUsersAsync', async (params: any, { rejectWithValue }) => {
  try {
    const response = await userService.getAllUsers(params)

    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message)
  }
})

export const createUserAsync = createAsyncThunk(
  'user/createUserAsync',
  async (data: TCreateUserParams, { rejectWithValue }) => {
    try {
      const response = await userService.createUser(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateUserAsync = createAsyncThunk(
  'user/updateUserAsync',
  async ({ id, data }: { id: string | number; data: TAdminUpdateUserParams }, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(id, data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteUserAsync = createAsyncThunk(
  'user/deleteUserAsync',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await userService.deleteUser(id)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteManyUsersAsync = createAsyncThunk(
  'user/deleteManyUsersAsync',
  async (data: { ids: (string | number)[] }, { rejectWithValue }) => {
    try {
      const response = await userService.deleteManyUsers(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)
