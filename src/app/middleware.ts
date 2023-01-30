import { createListenerMiddleware, TypedStartListening } from '@reduxjs/toolkit'
import {
  createDocumentListener,
  createEmployeeListener,
  getConfigurationsListener,
  getDataEmployeeListener,
  setEmployeeSummaryListener,
} from '../slicers/employee/listeners'
import { getVacanciesListener } from '../slicers/recruitment/listeners'
import { AppDispatch, RootState } from './store'

export const listenerMiddleware = createListenerMiddleware()
export const listener = listenerMiddleware.middleware

const startListening = listenerMiddleware.startListening

setEmployeeSummaryListener(startListening)
getDataEmployeeListener(startListening)
createEmployeeListener(startListening)
createDocumentListener(startListening)

getVacanciesListener(startListening)
getConfigurationsListener(startListening)

export type AppStartListening = TypedStartListening<RootState, AppDispatch>
