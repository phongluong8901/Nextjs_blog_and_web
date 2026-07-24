import { createAsyncThunk } from '@reduxjs/toolkit'
import * as paymentTypeService from 'src/services/payment-type'
import { TCreatePaymentTypeParams, TUpdatePaymentTypeParams } from 'src/types/payment-type'

export const fetchPaymentTypesAsync = createAsyncThunk(
  'paymentType/fetchPaymentTypesAsync',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await paymentTypeService.getAllPaymentTypes(params)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const createPaymentTypeAsync = createAsyncThunk(
  'paymentType/createPaymentTypeAsync',
  async (data: TCreatePaymentTypeParams, { rejectWithValue }) => {
    try {
      const response = await paymentTypeService.createPaymentType(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updatePaymentTypeAsync = createAsyncThunk(
  'paymentType/updatePaymentTypeAsync',
  async ({ id, data }: { id: string | number; data: TUpdatePaymentTypeParams }, { rejectWithValue }) => {
    try {
      const response = await paymentTypeService.updatePaymentType(id, data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deletePaymentTypeAsync = createAsyncThunk(
  'paymentType/deletePaymentTypeAsync',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await paymentTypeService.deletePaymentType(id)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteManyPaymentTypesAsync = createAsyncThunk(
  'paymentType/deleteManyPaymentTypesAsync',
  async (data: { ids: (string | number)[] }, { rejectWithValue }) => {
    try {
      const response = await paymentTypeService.deleteManyPaymentTypes(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)
