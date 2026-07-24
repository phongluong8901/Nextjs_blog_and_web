import { createSlice } from '@reduxjs/toolkit'
import {
  fetchPaymentTypesAsync,
  createPaymentTypeAsync,
  updatePaymentTypeAsync,
  deletePaymentTypeAsync,
  deleteManyPaymentTypesAsync
} from './actions'
import { TPaymentType } from 'src/types/payment-type'

interface PaymentTypeState {
  paymentTypes: TPaymentType[]
  total: number
  loading: boolean
  error: string | null
}

const initialState: PaymentTypeState = {
  paymentTypes: [],
  total: 0,
  loading: false,
  error: null
}

export const paymentTypeSlice = createSlice({
  name: 'paymentType',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // Fetch
      .addCase(fetchPaymentTypesAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPaymentTypesAsync.fulfilled, (state, action) => {
        state.loading = false
        state.paymentTypes = action.payload?.data?.paymentTypes || []
        state.total = action.payload?.data?.totalCount || 0
      })
      .addCase(fetchPaymentTypesAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Create
      .addCase(createPaymentTypeAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createPaymentTypeAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(createPaymentTypeAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Update
      .addCase(updatePaymentTypeAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePaymentTypeAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(updatePaymentTypeAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete
      .addCase(deletePaymentTypeAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePaymentTypeAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(deletePaymentTypeAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete Many
      .addCase(deleteManyPaymentTypesAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteManyPaymentTypesAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteManyPaymentTypesAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default paymentTypeSlice.reducer
