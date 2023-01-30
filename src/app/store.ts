import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import reducers from '../slicers'
import { listener } from './middleware'

const store = configureStore({
  reducer: reducers,
  middleware: (middleware) => middleware().concat(listener),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
