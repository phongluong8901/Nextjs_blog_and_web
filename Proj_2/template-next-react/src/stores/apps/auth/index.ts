// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, updateAuthMeAsync, getAuthMeAsync, changePassword } from './actions'
import { TUserEntity } from 'src/types/auth'

interface AuthState {
  user: TUserEntity | null
  token: string | null
  loading: boolean
  error: string | null
  registeredEmail: string
  registeredPassword: string
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  registeredEmail: '',
  registeredPassword: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null
      state.token = null
      state.error = null
      state.registeredEmail = ''
      state.registeredPassword = ''
    },
    clearError: state => {
      state.error = null
    },
    clearRegisteredCredentials: state => {
      state.registeredEmail = ''
      state.registeredPassword = ''
    }
  },
  extraReducers: builder => {
    // --- Xử lý Register ---
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.registeredEmail = action.payload.email || ''
        state.registeredPassword = action.payload.password || ''
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Đăng ký thất bại'
      })

    // --- Xử lý Login ---
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Đăng nhập thất bại'
      })

    // --- Xử lý Update Me ---
    builder
      .addCase(updateAuthMeAsync.fulfilled, (state, action) => {
        state.user = action.payload.data || action.payload.user || action.payload
      })
      .addCase(updateAuthMeAsync.rejected, (state, action: any) => {
        state.error = action.payload?.message || 'Cập nhật thông tin thất bại'
      })

    // --- Xử lý Get Me ---
    builder
      .addCase(getAuthMeAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getAuthMeAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.data || action.payload.user || action.payload
      })
      .addCase(getAuthMeAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Lấy thông tin thất bại'
      })

    // --- Xử lý Change Password ---
    builder
      .addCase(changePassword.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(changePassword.fulfilled, state => {
        state.loading = false
      })
      .addCase(changePassword.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Đổi mật khẩu thất bại'
      })
  }
})

export const { logout, clearError, clearRegisteredCredentials } = authSlice.actions
export default authSlice.reducer
