// ** Redux Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Instance Axios Imports
import instanceAxios from 'src/helpers/axios'

// ** Import CONFIG_API của bạn
import { CONFIG_API } from 'src/configs/api'
import { getAuthMe, updateAuthMe } from 'src/services/auth'

interface RegisterParams {
  email: string
  password: string
  fullName?: string
  [key: string]: any
}

interface LoginParams {
  email: string
  password: string
}

// ** Đăng ký tài khoản (Register)
export const registerUser = createAsyncThunk('auth/registerUser', async (data: RegisterParams, { rejectWithValue }) => {
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
export const loginUser = createAsyncThunk('auth/loginUser', async (data: LoginParams, { rejectWithValue }) => {
  try {
    const response = await instanceAxios.post(CONFIG_API.AUTH.INDEX, data)

    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Đăng nhập thất bại')
  }
})

// ** Cập nhật thông tin User (Update Profile)
export const updateAuthMeAsync = createAsyncThunk('auth/update-me', async (data: any, { rejectWithValue }) => {
  try {
    const response = await updateAuthMe(data)

    return response // Trả về data khi thành công
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Cập nhật thất bại')
  }
})

// ** Lấy thông tin tài khoản hiện tại (Get Me)
export const getAuthMeAsync = createAsyncThunk('auth/get-me', async (_, { rejectWithValue }) => {
  try {
    const response = await getAuthMe()

    return response // Trả về data user lấy được từ server
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Lấy thông tin thất bại')
  }
})
