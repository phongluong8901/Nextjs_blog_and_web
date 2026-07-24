import { createSlice } from '@reduxjs/toolkit'
import { fetchCitiesAsync, createCityAsync, updateCityAsync, deleteCityAsync, deleteManyCitiesAsync } from './actions'
import { TCityEntity } from 'src/types/city'

interface CityState {
  cities: TCityEntity[]
  total: number
  loading: boolean
  error: string | null
}

const initialState: CityState = {
  cities: [],
  total: 0,
  loading: false,
  error: null
}

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // Fetch
      .addCase(fetchCitiesAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCitiesAsync.fulfilled, (state, action) => {
        state.loading = false
        state.cities = action.payload?.data?.cities || []
        state.total = action.payload?.data?.totalCount || 0
      })
      .addCase(fetchCitiesAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Create
      .addCase(createCityAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createCityAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(createCityAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Update
      .addCase(updateCityAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCityAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(updateCityAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete
      .addCase(deleteCityAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCityAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteCityAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete Many
      .addCase(deleteManyCitiesAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteManyCitiesAsync.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteManyCitiesAsync.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default citySlice.reducer
