import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchRolesAsync, createRoleAsync, updateRoleAsync, deleteRoleAsync, deleteManyRolesAsync } from './actions'
import { TRoleEntity } from 'src/types/role'

interface RoleState {
  roles: TRoleEntity[]
  total: number
  selectedRole: TRoleEntity | null
  loading: boolean
  error: string | null
}

const initialState: RoleState = {
  roles: [],
  total: 0,
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
    setSelectedRole: (state, action: PayloadAction<TRoleEntity | null>) => {
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
        state.roles = resData?.data?.roles || []
        state.total = resData?.data?.totalCount || 0
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
        const newRole = action.payload?.data || action.payload
        if (newRole) {
          state.roles.unshift(newRole)
          state.total += 1
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
        const updatedRole = action.payload?.data || action.payload
        if (updatedRole) {
          state.roles = state.roles.map(role => (role._id === updatedRole._id ? updatedRole : role))
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
        state.roles = state.roles.filter(role => role._id !== action.payload)
        state.total = Math.max(0, state.total - 1)
      })
      .addCase(deleteRoleAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Xóa vai trò thất bại'
      })

    // --- Xóa nhiều Role ---
    builder
      .addCase(deleteManyRolesAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteManyRolesAsync.fulfilled, (state, action) => {
        state.loading = false
        const deletedIds = action.payload.ids
        state.roles = state.roles.filter(role => !deletedIds.includes(role._id))
        state.total = Math.max(0, state.total - deletedIds.length)
      })
      .addCase(deleteManyRolesAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Xóa nhiều vai trò thất bại'
      })
  }
})

export const { clearRoleError, setSelectedRole } = roleSlice.actions
export default roleSlice.reducer
