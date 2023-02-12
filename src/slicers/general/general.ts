import {
  ConsultasType,
  CustomUploadFileType,
  DoctoresType,
  PacientesType,
} from './types'
import { GeneralType, RequestStatusType } from '../../constants/types'

import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userApiHelper } from '../../utils/apis'
import { RootState } from '../../app/store'
import { removeField, showNotification } from '../../utils/general'

export interface GeneralState {
  Consultas: ConsultasType[]
  doctores: DoctoresType[]
  pacientes: PacientesType[]
  fetchingFromPacientes: boolean
  pacientesRequestStatus: RequestStatusType
  createConsultasRequestStatus: RequestStatusType
  fileList: CustomUploadFileType[]
  fetchingGeneralData: boolean
}

const initialState: GeneralState = {
  Consultas: [],
  doctores: [],
  pacientes: new Array<PacientesType>(),
  fetchingFromPacientes: false,
  pacientesRequestStatus: '',
  createConsultasRequestStatus: '',
  fileList: new Array<CustomUploadFileType>(),
  fetchingGeneralData: false,
}

export const resetAction = createAction<boolean>('general/resetStore')

export const getDoctores = createAsyncThunk(
  'general/getDoctores',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getDoctores(payload)

    const { data } = response.data

    return data
  }
)

export const getConsultas = createAsyncThunk(
  'general/getConsultas',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getConsultas(payload)

    const { data } = response.data

    return data
  }
)
export const getPacientes = createAsyncThunk(
  'Pacientes/getPacientes',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getPacientes(payload)
    const { data } = response.data

    return data
  }
)
export const createConsultas = createAsyncThunk(
  'employee/createConsultas',
  async (payload: GeneralType) => {
    const response = await userApiHelper.createConsultas(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'nombres',
        'fecha',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const updateConsultas = createAsyncThunk(
  'employee/updateConsultas',
  async (payload: GeneralType) => {
    const response = await userApiHelper.updateConsultas(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'fecha_insercion',
        'apellidos',
        'key',
        'index',
        'nombres',
        'nombre_paciente',
        'apellido_paciente',
        'nombre_doctor',
        'apellido_doctor',
        'fecha',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)

export const setFileList = createAction(
  'general/setFileList',
  function prepare(fileList: CustomUploadFileType[]) {
    return {
      payload: fileList?.map((file) => {
        return {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: file.url,
          thumbUrl: file.url,
        } as CustomUploadFileType
      }),
    }
  }
)

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(setFileList, (state, action) => {
        state.fileList = action.payload
      })
      .addCase(resetAction, () => initialState)

      .addCase(getDoctores.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getDoctores.fulfilled, (state, action) => {
        state.doctores = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getDoctores.rejected, (state) => {
        state.fetchingGeneralData = false
      })

      .addCase(getConsultas.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getConsultas.fulfilled, (state, action) => {
        state.Consultas = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getConsultas.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(createConsultas.pending, (state) => {
        state.fetchingGeneralData = true
        state.createConsultasRequestStatus = 'pending'
      })
      .addCase(createConsultas.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createConsultasRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Consulta Insertado correctamente',
          type: 'success',
        })
      })
      .addCase(createConsultas.rejected, (state) => {
        state.createConsultasRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo Insertar el Consulta',
          type: 'error',
        })
      })
      .addCase(updateConsultas.pending, (state) => {
        state.fetchingGeneralData = true
        state.createConsultasRequestStatus = 'pending'
      })
      .addCase(updateConsultas.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createConsultasRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Consulta actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updateConsultas.rejected, (state) => {
        state.createConsultasRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar el Consulta',
          type: 'error',
        })
      })
      .addCase(getPacientes.pending, (state) => {
        state.fetchingFromPacientes = true
        state.pacientesRequestStatus = 'pending'
      })
      .addCase(getPacientes.fulfilled, (state, action) => {
        state.pacientesRequestStatus = 'success'
        state.fetchingFromPacientes = false
        state.pacientes = action.payload
      })
      .addCase(getPacientes.rejected, (state) => {
        state.pacientesRequestStatus = 'error'
        state.fetchingFromPacientes = false
        state.pacientes = [] as PacientesType[]
      })
  },
})

export const generalSelector = (state: RootState): GeneralState => state.general

export default generalSlice?.reducer
