import { isAnyOf } from '@reduxjs/toolkit'
import { AppStartListening } from '../../app/middleware'
import { setModalStateFormVacancy } from '../general'
import { createVacancy, getVacancies, updateVacancy } from './recruitment'

export const getVacanciesListener = (
  startListening: AppStartListening
): void => {
  startListening({
    matcher: isAnyOf(createVacancy.fulfilled, updateVacancy.fulfilled),
    effect: (_, { dispatch }) => {
      dispatch(setModalStateFormVacancy(false))
      dispatch(
        getVacancies({
          condition: {},
        })
      )
    },
  })
}
