import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { GeneralType } from '../../constants/types'
import { recruitmentApiHelpers } from '../../utils/apis'
import { showNotification } from '../../utils/general'
import { CandidateType, VacancyType } from './types'

export interface RecruitmentState {
  vacancies: VacancyType[]
  candidates: CandidateType[]
  fetchingRecruitment: boolean
}

const initialState: RecruitmentState = {
  vacancies: [],
  candidates: [],
  fetchingRecruitment: false,
}

export const createVacancy = createAsyncThunk(
  'recruitment/createVacancy',
  async (payload: VacancyType, { rejectWithValue }) => {
    try {
      const { data: response } = await recruitmentApiHelpers.createVacancy({
        condition: { ...payload },
      })

      const { data, message } = response

      showNotification({
        type: 'success',
        description: message,
        title: 'Operacion exitosa',
      })
      return data
    } catch ({ message }) {
      showNotification({
        type: 'error',
        description: message,
        title: 'Error',
      })
      return rejectWithValue(message)
    }
  }
)

export const getVacancies = createAsyncThunk(
  'recruitment/getVacancies',
  async (payload: GeneralType<VacancyType>, { rejectWithValue }) => {
    try {
      const { data: response } = await recruitmentApiHelpers.getVacancies(
        payload
      )

      const { data } = response

      return data
    } catch ({ message }) {
      showNotification({
        type: 'error',
        description: message,
        title: 'Error',
      })
      return rejectWithValue(message)
    }
  }
)

export const updateVacancy = createAsyncThunk(
  'recruitment/updateVacancy',
  async (payload: VacancyType, { rejectWithValue }) => {
    try {
      delete payload.fecha_insercion
      delete payload.candidatos
      delete payload.key
      delete payload.index
      const { data: response } = await recruitmentApiHelpers.updateVacancy({
        condition: { ...payload },
      })

      const { data, message } = response

      showNotification({
        type: 'success',
        description: message,
        title: 'Operacion exitosa',
      })
      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response,
        title: 'Error',
      })
      return rejectWithValue(response)
    }
  }
)

export const getCandidates = createAsyncThunk(
  'recruitment/getCandidates',
  async (payload: GeneralType<CandidateType>, { rejectWithValue }) => {
    try {
      const { data: response } = await recruitmentApiHelpers.getCandidates(
        payload
      )

      const { data } = response

      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response,
        title: 'Error',
      })
      return rejectWithValue(response)
    }
  }
)

export const updateCandidates = createAsyncThunk(
  'recruitment/updateCandidates',
  async (payload: CandidateType, { rejectWithValue }) => {
    try {
      const { data: response } = await recruitmentApiHelpers.updateCandidates({
        condition: { ...payload },
      })

      const { data } = response

      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response,
        title: 'Error',
      })
      return rejectWithValue(response)
    }
  }
)

export const recruitmentSlice = createSlice({
  name: 'recruitment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVacancy.pending, (state) => {
        state.fetchingRecruitment = true
      })
      .addCase(createVacancy.fulfilled, (state) => {
        state.fetchingRecruitment = false
      })
      .addCase(createVacancy.rejected, (state) => {
        state.fetchingRecruitment = false
      })
      .addCase(getVacancies.pending, (state) => {
        state.fetchingRecruitment = true
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.fetchingRecruitment = false
        state.vacancies = action.payload
      })
      .addCase(getVacancies.rejected, (state) => {
        state.fetchingRecruitment = false
        state.vacancies = []
      })
      .addCase(updateVacancy.pending, (state) => {
        state.fetchingRecruitment = true
      })
      .addCase(updateVacancy.fulfilled, (state) => {
        state.fetchingRecruitment = false
      })
      .addCase(updateVacancy.rejected, (state) => {
        state.fetchingRecruitment = false
      })
      .addCase(getCandidates.pending, (state) => {
        state.fetchingRecruitment = true
      })
      .addCase(getCandidates.fulfilled, (state, action) => {
        state.fetchingRecruitment = false
        state.candidates = action.payload
      })
      .addCase(getCandidates.rejected, (state) => {
        state.fetchingRecruitment = false
      })
      .addCase(updateCandidates.pending, (state) => {
        state.fetchingRecruitment = true
      })
      .addCase(updateCandidates.fulfilled, (state) => {
        state.fetchingRecruitment = false
      })
      .addCase(updateCandidates.rejected, (state) => {
        state.fetchingRecruitment = false
      })
  },
})

export const recruitmentSelector = (state: RootState): RecruitmentState =>
  state.recruitment

export default recruitmentSlice?.reducer
