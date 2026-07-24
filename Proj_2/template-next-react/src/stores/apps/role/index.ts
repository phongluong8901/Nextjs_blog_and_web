// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchRolesAsync, createRoleAsync, updateRoleAsync, deleteRoleAsync } from './actions'

interface RoleState {
  roles: any[]
  selectedRole: null | { [key: string]: any }
  loading: boolean
  error: string | null
}

const initialState: RoleState = {
  roles: [],
  selectedRole: null,
  loading: false,
  error: null
}

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    clearRoleError: state => {
      state.error = null
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload
    }
  },
  extraReducers: builder => {
    // --- Lấy danh sách Role ---
    builder
      .addCase(fetchRolesAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.loading = false
        const resData = action.payload

        // Hứng chuẩn dữ liệu trả về từ API backend của bạn
        state.roles = resData.data || resData.roles || resData || []
      })
      .addCase(fetchRolesAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Lấy danh sách vai trò thất bại'
      })

    // --- Tạo mới Role ---
    builder
      .addCase(createRoleAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createRoleAsync.fulfilled, (state, action: any) => {
        state.loading = false

        // 💡 Đẩy thẳng role vừa tạo vào mảng state.roles để UI tự cập nhật ngay lập tức
        const newRole = action.payload.data || action.payload
        if (newRole) {
          state.roles.unshift(newRole)
        }
      })
      .addCase(createRoleAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Thêm vai trò thất bại'
      })

    // --- Cập nhật Role ---
    builder
      .addCase(updateRoleAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateRoleAsync.fulfilled, (state, action: any) => {
        state.loading = false

        // 💡 Cập nhật lại item đã sửa trong mảng state.roles
        const updatedRole = action.payload.data || action.payload
        if (updatedRole) {
          state.roles = state.roles.map(role =>
            role._id === updatedRole._id || role.id === updatedRole.id ? updatedRole : role
          )
        }
      })
      .addCase(updateRoleAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Cập nhật vai trò thất bại'
      })

    // --- Xóa Role ---
    builder
      .addCase(deleteRoleAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteRoleAsync.fulfilled, (state, action) => {
        state.loading = false

        // 💡 Dùng cả _id lẫn id để phòng hờ dữ liệu MongoDB hoặc SQL
        state.roles = state.roles.filter(role => role._id !== action.payload && role.id !== action.payload)
      })
      .addCase(deleteRoleAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Xóa vai trò thất bại'
      })
  }
})

export const { clearRoleError, setSelectedRole } = roleSlice.actions
export default roleSlice.reducer
