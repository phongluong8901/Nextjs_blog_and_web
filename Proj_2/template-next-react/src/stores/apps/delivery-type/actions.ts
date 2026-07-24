import { createAsyncThunk } from '@reduxjs/toolkit'
import * as deliveryService from 'src/services/delivery-type' // Điều chỉnh lại đường dẫn service nếu cần
import { TCreateDeliveryTypeBody, TUpdateDeliveryTypeBody } from 'src/types/delivery-type'

export const fetchDeliveryTypesAsync = createAsyncThunk(
  'deliveryType/fetchDeliveryTypesAsync',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await deliveryService.getAllDeliveryTypes(params)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const createDeliveryTypeAsync = createAsyncThunk(
  'deliveryType/createDeliveryTypeAsync',
  async (data: TCreateDeliveryTypeBody, { rejectWithValue }) => {
    try {
      const response = await deliveryService.createDeliveryType(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateDeliveryTypeAsync = createAsyncThunk(
  'deliveryType/updateDeliveryTypeAsync',
  async ({ id, data }: { id: string | number; data: TUpdateDeliveryTypeBody }, { rejectWithValue }) => {
    try {
      const response = await deliveryService.updateDeliveryType(id, data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteDeliveryTypeAsync = createAsyncThunk(
  'deliveryType/deleteDeliveryTypeAsync',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await deliveryService.deleteDeliveryType(id)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteManyDeliveryTypesAsync = createAsyncThunk(
  'deliveryType/deleteManyDeliveryTypesAsync',
  async (data: { ids: (string | number)[] }, { rejectWithValue }) => {
    try {
      const response = await deliveryService.deleteManyDeliveryTypes(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)
