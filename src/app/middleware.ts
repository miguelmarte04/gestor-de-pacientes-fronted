import { createListenerMiddleware, TypedStartListening } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './store'

export const listenerMiddleware = createListenerMiddleware()
export const listener = listenerMiddleware.middleware

// const startListening = listenerMiddleware.startListening

export type AppStartListening = TypedStartListening<RootState, AppDispatch>
