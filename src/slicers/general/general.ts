import {
  ConsultasType,
  CustomUploadFileType,
  DoctoresType,
  EspecilidadesType,
  HorariosType,
  NacionalidadesType,
  PacientesType,
  SegurosType,
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
  nacionalidades: NacionalidadesType[]
  especialidades: EspecilidadesType[]
  seguros: SegurosType[]
  horarios: HorariosType[]
  fetchingFromPacientes: boolean
  pacientesRequestStatus: RequestStatusType
  createConsultasRequestStatus: RequestStatusType
  createPacientesRequestStatus: RequestStatusType
  createDoctorRequestStatus: RequestStatusType
  createEspecialidadRequestStatus: RequestStatusType
  createHorariosRequestStatus: RequestStatusType
  fileList: CustomUploadFileType[]
  fetchingGeneralData: boolean
}

const initialState: GeneralState = {
  Consultas: [],
  doctores: [],
  pacientes: new Array<PacientesType>(),
  nacionalidades: new Array<NacionalidadesType>(),
  especialidades: new Array<EspecilidadesType>(),
  seguros: new Array<SegurosType>(),
  horarios: new Array<HorariosType>(),
  fetchingFromPacientes: false,
  pacientesRequestStatus: '',
  createConsultasRequestStatus: '',
  createEspecialidadRequestStatus: '',
  createHorariosRequestStatus: '',
  createPacientesRequestStatus: '',
  createDoctorRequestStatus: '',
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
export const createConsultas = createAsyncThunk(
  'general/createConsultas',
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
  'general/updateConsultas',
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
export const getPacientes = createAsyncThunk(
  'general/getPacientes',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getPacientes(payload)

    const { data } = response.data

    return data
  }
)
export const getNacionalidades = createAsyncThunk(
  'general/getNacionalidades',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getNacionalidades(payload)

    const { data } = response.data

    return data
  }
)
export const getEspecialidades = createAsyncThunk(
  'general/getEspecialidades',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getEspecialidades(payload)

    const { data } = response.data

    return data
  }
)
export const getSeguros = createAsyncThunk(
  'general/getSeguros',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getSeguros(payload)

    const { data } = response.data

    return data
  }
)
export const createPacientes = createAsyncThunk(
  'general/createPacientes',
  async (payload: GeneralType) => {
    const response = await userApiHelper.createPacientes(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'fecha',
        'seguro',
        'nacionalidad',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const updatePacientes = createAsyncThunk(
  'general/updatePacientes',
  async (payload: GeneralType) => {
    const response = await userApiHelper.updatePacientes(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'fecha_insercion',
        'key',
        'index',
        'nombre_paciente',
        'apellido_paciente',
        'nombre_doctor',
        'apellido_doctor',
        'fecha',
        'documento',
        'seguro',
        'nacionalidad',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const createDoctor = createAsyncThunk(
  'general/createDoctor',
  async (payload: GeneralType) => {
    const response = await userApiHelper.createDoctor(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'fecha',
        'seguro',
        'nacionalidad',
        'especialidad',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const updateDoctor = createAsyncThunk(
  'general/updateDoctor',
  async (payload: GeneralType) => {
    const response = await userApiHelper.updateDoctor(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'fecha_insercion',
        'key',
        'index',
        'nombre_paciente',
        'apellido_paciente',
        'nombre_doctor',
        'apellido_doctor',
        'fecha',
        'documento',
        'seguro',
        'clave',
        'especialidad',
        'nacionalidad',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const createEspecialidad = createAsyncThunk(
  'general/createEspecialidad',
  async (payload: GeneralType) => {
    const response = await userApiHelper.createEspecialidad(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'fecha',
        'seguro',
        'nacionalidad',
        'especialidad',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const updateEspecialidad = createAsyncThunk(
  'general/updateEspecialidad',
  async (payload: GeneralType) => {
    const response = await userApiHelper.updateEspecialidad(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'fecha_insercion',
        'key',
        'index',
        'nombre_paciente',
        'apellido_paciente',
        'nombre_doctor',
        'apellido_doctor',
        'fecha',
        'documento',
        'seguro',
        'clave',
        'especialidad',
        'nacionalidad',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const getHorarios = createAsyncThunk(
  'general/getHorarios',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getHorarios(payload)
    const { data } = response.data
    return data
  }
)
export const createHorarios = createAsyncThunk(
  'general/createHorarios',
  async (payload: GeneralType) => {
    const response = await userApiHelper.createHorarios(
      removeField(payload.condition, [
        // 'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'fecha',
        'seguro',
        'horario',
        'nacionalidad',
        'especialidad',
        'documento',
      ])
    )
    const { data } = response.data
    return data
  }
)
export const updateHorarios = createAsyncThunk(
  'general/updateHorarios',
  async (payload: GeneralType) => {
    const response = await userApiHelper.updateHorarios(
      removeField(payload.condition, [
        'horario',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'fecha_insercion',
        'key',
        'index',
        'nombre_paciente',
        'apellido_paciente',
        'nombre_doctor',
        'apellido_doctor',
        'fecha',
        'documento',
        'seguro',
        'clave',
        'especialidad',
        'nacionalidad',
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
        state.Consultas = initialState.Consultas
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
        state.fetchingGeneralData = true
      })
      .addCase(getPacientes.fulfilled, (state, action) => {
        state.pacientes = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getPacientes.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getNacionalidades.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getNacionalidades.fulfilled, (state, action) => {
        state.nacionalidades = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getNacionalidades.rejected, (state) => {
        state.fetchingGeneralData = false
        state.nacionalidades = initialState.nacionalidades
      })
      .addCase(getEspecialidades.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getEspecialidades.fulfilled, (state, action) => {
        state.especialidades = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getEspecialidades.rejected, (state) => {
        state.fetchingGeneralData = false
        state.especialidades = initialState.especialidades
      })
      .addCase(getSeguros.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getSeguros.fulfilled, (state, action) => {
        state.seguros = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getSeguros.rejected, (state) => {
        state.fetchingGeneralData = false
        state.seguros = initialState.seguros
      })
      .addCase(createPacientes.pending, (state) => {
        state.fetchingGeneralData = true
        state.createPacientesRequestStatus = 'pending'
      })
      .addCase(createPacientes.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createPacientesRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Paciente Insertado correctamente',
          type: 'success',
        })
      })
      .addCase(createPacientes.rejected, (state) => {
        state.createPacientesRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo Insertar el Paciente',
          type: 'error',
        })
      })
      .addCase(createDoctor.pending, (state) => {
        state.fetchingGeneralData = true
        state.createDoctorRequestStatus = 'pending'
      })
      .addCase(createDoctor.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createDoctorRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Doctor Insertado correctamente',
          type: 'success',
        })
      })
      .addCase(createDoctor.rejected, (state) => {
        state.createDoctorRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo Insertar el Doctor',
          type: 'error',
        })
      })
      .addCase(createEspecialidad.pending, (state) => {
        state.fetchingGeneralData = true
        state.createEspecialidadRequestStatus = 'pending'
      })
      .addCase(createEspecialidad.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createEspecialidadRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Especialidad Insertado correctamente',
          type: 'success',
        })
      })
      .addCase(createEspecialidad.rejected, (state) => {
        state.createEspecialidadRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo Insertar el Especialidad',
          type: 'error',
        })
      })
      .addCase(updatePacientes.pending, (state) => {
        state.fetchingGeneralData = true
        state.createPacientesRequestStatus = 'pending'
      })
      .addCase(updatePacientes.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createPacientesRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Paciente actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updatePacientes.rejected, (state) => {
        state.createPacientesRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar el Paciente',
          type: 'error',
        })
      })
      .addCase(updateDoctor.pending, (state) => {
        state.fetchingGeneralData = true
        state.createDoctorRequestStatus = 'pending'
      })
      .addCase(updateDoctor.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createDoctorRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Doctor actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updateDoctor.rejected, (state) => {
        state.createDoctorRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar el Doctor',
          type: 'error',
        })
      })
      .addCase(updateEspecialidad.pending, (state) => {
        state.fetchingGeneralData = true
        state.createEspecialidadRequestStatus = 'pending'
      })
      .addCase(updateEspecialidad.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createEspecialidadRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Especialidad actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updateEspecialidad.rejected, (state) => {
        state.createEspecialidadRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar el Especialidad',
          type: 'error',
        })
      })
      .addCase(getHorarios.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getHorarios.fulfilled, (state, action) => {
        state.horarios = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getHorarios.rejected, (state) => {
        state.fetchingGeneralData = false
        state.horarios = initialState.horarios
      })
      .addCase(updateHorarios.pending, (state) => {
        state.fetchingGeneralData = true
        state.createHorariosRequestStatus = 'pending'
      })
      .addCase(updateHorarios.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createHorariosRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Horarios actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updateHorarios.rejected, (state) => {
        state.createHorariosRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar el Horarios',
          type: 'error',
        })
      })
      .addCase(createHorarios.pending, (state) => {
        state.fetchingGeneralData = true
        state.createHorariosRequestStatus = 'pending'
      })
      .addCase(createHorarios.fulfilled, (state) => {
        state.fetchingGeneralData = false
        state.createHorariosRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Horarios actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(createHorarios.rejected, (state) => {
        state.createHorariosRequestStatus = 'error'
        state.fetchingGeneralData = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar el Horarios',
          type: 'error',
        })
      })
  },
})

export const generalSelector = (state: RootState): GeneralState => state.general

export default generalSlice?.reducer
