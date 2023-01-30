import { isAnyOf } from '@reduxjs/toolkit'
import { getDataEmployee, getEmployeeSummary } from '.'
import { AppStartListening } from '../../app/middleware'
import { REGISTER_EMPLOYEE } from '../../constants/Routes'
import {
  createCharges,
  createConfigurations,
  employeeSelector,
  getConfigurations,
  updateCharges,
  updateConfigurations,
} from './employee'
import {
  generalSelector,
  setEditingMode,
  setModalVisibilityStateForEmployeeSummary,
  setNextLocation,
  setStepPosition,
} from '../general'
import {
  createDocuments,
  createEmployee,
  getDocuments,
  updateDocuments,
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

export const getDataEmployeeListener = (
  startListening: AppStartListening
): void => {
  startListening({
    matcher: isAnyOf(getDataEmployee.fulfilled),
    effect: (_, { dispatch }) => {
      dispatch(setEditingMode(true))
      dispatch(setNextLocation(REGISTER_EMPLOYEE))
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

export const createDocumentListener = (
  startListening: AppStartListening
): void => {
  startListening({
    matcher: isAnyOf(
      createDocuments.fulfilled,
      updateDocuments.fulfilled,
      getDataEmployee.fulfilled
    ),
    effect: (_, { dispatch, getState }) => {
      const { dataEmployee } = employeeSelector(getState())
      dispatch(
        getDocuments({
          id_empleado: Number(dataEmployee.id),
        })
      )
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
