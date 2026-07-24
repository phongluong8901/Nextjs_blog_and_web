// ** Redux Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Import CONFIG_API của bạn
import { CONFIG_API } from 'src/configs/api'
import { changePasswordAuth, getAuthMe, updateAuthMe } from 'src/services/auth'
import { TChangePasswordParams, TLoginAuth, TRegisterAuth, TUpdateAuthMeParams } from 'src/types/auth'
import instanceAxios from 'src/helpers/axios'

// ** Đăng ký tài khoản (Register)
export const registerUser = createAsyncThunk('auth/registerUser', async (data: TRegisterAuth, { rejectWithValue }) => {
  try {
    const response = await instanceAxios.post(CONFIG_API.AUTH.REGISTER, data)

    return {
      ...response.data,
      email: data.email,
      password: data.password
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Đăng ký thất bại')
  }
})

// ** Đăng nhập tài khoản (Login)
export const loginUser = createAsyncThunk('auth/loginUser', async (data: TLoginAuth, { rejectWithValue }) => {
  try {
    const response = await instanceAxios.post(CONFIG_API.AUTH.INDEX, data)

    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Đăng nhập thất bại')
  }
})

// ** Cập nhật thông tin User (Update Profile)
export const updateAuthMeAsync = createAsyncThunk(
  'auth/update-me',
  async (data: TUpdateAuthMeParams, { rejectWithValue }) => {
    try {
      const response = await updateAuthMe(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Cập nhật thất bại')
    }
  }
)

// ** Lấy thông tin tài khoản hiện tại (Get Me)
export const getAuthMeAsync = createAsyncThunk('auth/get-me', async (_, { rejectWithValue }) => {
  try {
    const response = await getAuthMe()

    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Lấy thông tin thất bại')
  }
})

// ** Đổi mật khẩu
export const changePassword = createAsyncThunk(
  'auth/change-password',
  async (data: TChangePasswordParams, { rejectWithValue }) => {
    try {
      const response = await changePasswordAuth(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Đổi mật khẩu thất bại')
    }
  }
)
