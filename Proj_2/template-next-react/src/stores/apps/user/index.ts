import { createSlice } from '@reduxjs/toolkit'
import { fetchUsersAsync, createUserAsync, updateUserAsync, deleteUserAsync, deleteManyUsersAsync } from './actions'
import { TUserEntity } from 'src/types/user'

interface UserState {
  users: TUserEntity[]
  total: number
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  users: [],
  total: 0,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // Fetch
      .addCase(fetchUsersAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload?.data?.users || []
        state.total = action.payload?.data?.totalCount || 0
      })
      .addCase(fetchUsersAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Create
      .addCase(createUserAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createUserAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(createUserAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Update
      .addCase(updateUserAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(updateUserAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete
      .addCase(deleteUserAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUserAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteUserAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete Many
      .addCase(deleteManyUsersAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteManyUsersAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteManyUsersAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default userSlice.reducer
