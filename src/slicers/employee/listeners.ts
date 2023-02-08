import { isAnyOf } from '@reduxjs/toolkit'
import { getEmployeeSummary } from '.'
import { AppStartListening } from '../../app/middleware'
import {
  createCharges,
  createConfigurations,
  getConfigurations,
  updateCharges,
  updateConfigurations,
} from './employee'
import {
  generalSelector,
  setModalVisibilityStateForEmployeeSummary,
  setStepPosition,
} from '../general'
import {
  createEmployee,
  updateEmployee,
  updateEmploymentData,
} from './employee'

export const setEmployeeSummaryListener = (
  startListening: AppStartListening
): void => {
  startListening({
    matcher: isAnyOf(getEmployeeSummary.fulfilled),
    effect: (_, { dispatch }) => {
      dispatch(setModalVisibilityStateForEmployeeSummary(true))
    },
  })
}

export const createEmployeeListener = (
  startListening: AppStartListening
): void => {
  startListening({
    matcher: isAnyOf(
      createEmployee.fulfilled,
      updateEmployee.fulfilled,
      updateEmploymentData.fulfilled
    ),
    effect: (_, { dispatch, getState }) => {
      const { stepPosition } = generalSelector(getState())
      dispatch(setStepPosition(stepPosition + 1))
    },
  })
}

export const getConfigurationsListener = (
  startListening: AppStartListening
): void => {
  startListening({
    matcher: isAnyOf(
      createCharges.fulfilled,
      updateCharges.fulfilled,
      createConfigurations.fulfilled,
      updateConfigurations.fulfilled
    ),
    effect: (_, { dispatch }) => {
      dispatch(getConfigurations())
    },
  })
}
