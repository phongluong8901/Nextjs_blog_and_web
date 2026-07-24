// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/stores/apps/user'
import auth from 'src/stores/apps/auth'
import role from 'src/stores/apps/role'
import city from 'src/stores/apps/city'
import deliveryType from 'src/stores/apps/delivery-type'
import paymenType from 'src/stores/apps/payment-type'

export const store = configureStore({
  reducer: {
    user,
    auth,
    role,
    city,
    deliveryType,
    paymenType
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
