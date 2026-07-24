import { createSlice } from '@reduxjs/toolkit'
import {
  fetchDeliveryTypesAsync,
  createDeliveryTypeAsync,
  updateDeliveryTypeAsync,
  deleteDeliveryTypeAsync,
  deleteManyDeliveryTypesAsync
} from './actions'
import { TDeliveryType } from 'src/types/delivery-type'

interface DeliveryTypeState {
  deliveryTypes: TDeliveryType[]
  total: number
  loading: boolean
  error: string | null
}

const initialState: DeliveryTypeState = {
  deliveryTypes: [],
  total: 0,
  loading: false,
  error: null
}

export const deliveryTypeSlice = createSlice({
  name: 'deliveryType',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // Fetch
      .addCase(fetchDeliveryTypesAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDeliveryTypesAsync.fulfilled, (state, action) => {
        state.loading = false
        state.deliveryTypes = action.payload?.data?.deliveryTypes || []
        state.total = action.payload?.data?.totalCount || 0
      })
      .addCase(fetchDeliveryTypesAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Create
      .addCase(createDeliveryTypeAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createDeliveryTypeAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(createDeliveryTypeAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Update
      .addCase(updateDeliveryTypeAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateDeliveryTypeAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(updateDeliveryTypeAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete
      .addCase(deleteDeliveryTypeAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteDeliveryTypeAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteDeliveryTypeAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete Many
      .addCase(deleteManyDeliveryTypesAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteManyDeliveryTypesAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteManyDeliveryTypesAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default deliveryTypeSlice.reducer
