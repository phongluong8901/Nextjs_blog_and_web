// ** Import instanceAxios đã config sẵn baseURL và token interceptor
import instanceAxios from 'src/helpers/axios'
// ** Config
import { CONFIG_API } from 'src/configs/api'

// ** Types
import { TLoginAuth, TRegisterAuth } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const res = await instanceAxios.post(CONFIG_API.AUTH.INDEX, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const registerAuth = async (data: TRegisterAuth) => {
  try {
    const res = await instanceAxios.post(CONFIG_API.AUTH.REGISTER, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const logoutAuth = async () => {
  try {
    return { success: true }
  } catch (error) {
    throw error
  }
}

export const updateAuthMe = async (data: any) => {
  try {
    // Thường cập nhật thông tin sẽ dùng phương thức PUT hoặc PATCH
    const res = await instanceAxios.put(CONFIG_API.AUTH.ME, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getAuthMe = async () => {
  try {
    const res = await instanceAxios.get(CONFIG_API.AUTH.ME)
    return res.data
  } catch (error) {
    throw error
  }
}

export const forgotPasswordAuth = async (data: { email: string }) => {
  try {
    const res = await instanceAxios.post(CONFIG_API.AUTH.FORGOT_PASSWORD, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const resetPasswordAuth = async (data: { secretKey: string; newPassword: string }) => {
  try {
    const res = await instanceAxios.post(CONFIG_API.AUTH.RESET_PASSWORD, data)
    return res.data
  } catch (error) {
    throw error
  }
}
