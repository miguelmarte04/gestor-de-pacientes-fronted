import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = (): ThunkDispatch<RootState, unknown, AnyAction> &
  Dispatch<AnyAction> => useDispatch<AppDispatch>()
