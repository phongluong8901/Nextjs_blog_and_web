import { createAsyncThunk } from '@reduxjs/toolkit'
import * as cityService from 'src/services/city' // Đảm bảo đường dẫn tới file service city của bạn
import { TCreateCityParams, TUpdateCityParams } from 'src/types/city'

export const fetchCitiesAsync = createAsyncThunk('city/fetchCitiesAsync', async (params: any, { rejectWithValue }) => {
  try {
    const response = await cityService.getAllCities(params)

    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message)
  }
})

export const createCityAsync = createAsyncThunk(
  'city/createCityAsync',
  async (data: TCreateCityParams, { rejectWithValue }) => {
    try {
      const response = await cityService.createCity(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateCityAsync = createAsyncThunk(
  'city/updateCityAsync',
  async ({ id, data }: { id: string | number; data: TUpdateCityParams }, { rejectWithValue }) => {
    try {
      const response = await cityService.updateCity(id, data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteCityAsync = createAsyncThunk(
  'city/deleteCityAsync',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await cityService.deleteCity(id)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteManyCitiesAsync = createAsyncThunk(
  'city/deleteManyCitiesAsync',
  async (data: { ids: (string | number)[] }, { rejectWithValue }) => {
    try {
      const response = await cityService.deleteManyCities(data)

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)
