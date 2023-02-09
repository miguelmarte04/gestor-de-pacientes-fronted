import {
  AcademicLevelType,
  CargosType,
  ConsultasType,
  CountriesType,
  CustomUploadFileType,
  InfoEmpresaType,
  PayrollType,
  PersonDataType,
  ProvincesType,
  WorkingDayType,
} from './types'
import { AnyType, GeneralType, RequestStatusType } from '../../constants/types'
import { AbsencesType } from '../employee'
import { EmailType, PhoneType } from '../employee/types'
import {
  BloodType,
  CivilStateType,
  PaymentType,
  RelationshipType,
  TypesPermissions,
} from './types'
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { userApiHelper } from '../../utils/apis'
import { RootState } from '../../app/store'
import { removeField, showNotification } from '../../utils/general'

export interface GeneralState {
  academicLevel: AcademicLevelType[]
  bloodType: BloodType[]
  cargos: CargosType[]
  civilState: CivilStateType[]
  countries: CountriesType[]
  deleteNullValuesBeforeRequest: boolean
  Consultas: ConsultasType[]
  emailsTypes: EmailType[]
  fetchingGeneralData: boolean
  createConsultasRequestStatus: RequestStatusType
  fileList: CustomUploadFileType[]
  infoEmpresa: InfoEmpresaType
  isEditing: boolean
  modalVisibilityStateForEmployeeSummary: boolean
  modalStateFormVacancy: boolean
  nextLocation: string
  parametros: AnyType
  paymentType: PaymentType[]
  Payroll: PayrollType[]
  personData: PersonDataType
  phoneTypes: PhoneType[]
  provinces: ProvincesType[]
  relationShip: RelationshipType[]
  stepPosition: number
  typeAbsences: AbsencesType[]
  typesPermissions: TypesPermissions[]
  workingDay: WorkingDayType[]
  registarTiposNominaResponse: AnyType
}

const initialState: GeneralState = {
  academicLevel: [],
  bloodType: [],
  createConsultasRequestStatus: '',
  cargos: [],
  fileList: new Array<CustomUploadFileType>(),
  civilState: [],
  countries: [],
  deleteNullValuesBeforeRequest: true,
  Consultas: [],
  emailsTypes: [],
  fetchingGeneralData: false,
  infoEmpresa: {} as InfoEmpresaType,
  isEditing: false,
  modalVisibilityStateForEmployeeSummary: false,
  modalStateFormVacancy: false,
  nextLocation: '',
  parametros: {} as AnyType,
  paymentType: [],
  Payroll: [],
  personData: {} as PersonDataType,
  phoneTypes: [],
  provinces: [],
  relationShip: [],
  stepPosition: 0,
  typeAbsences: [],
  typesPermissions: [],
  workingDay: [],
  registarTiposNominaResponse: '',
}

export const resetAction = createAction<boolean>('general/resetStore')

export const getPersonData = createAsyncThunk(
  'general/getPersonData',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getPersonData(payload)

    const { data } = response.data

    return data
  }
)

export const getCivilState = createAsyncThunk(
  'general/getCivilState',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getCivilState(payload)

    const { data } = response.data

    return data
  }
)

export const getPhoneTypes = createAsyncThunk(
  'general/getPhoneTypes',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getPhoneTypes(payload)

    const { data } = response.data

    return data
  }
)

export const getEmailsTypes = createAsyncThunk(
  'general/getEmailsTypes',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getEmailsTypes(payload)

    const { data } = response.data

    return data
  }
)

export const getWorkingDay = createAsyncThunk(
  'general/getWorkingDay',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getWorkingDay(payload)

    const { data } = response.data

    return data
  }
)

export const getPayroll = createAsyncThunk(
  'general/getPayroll',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getPayroll(payload)

    const { data } = response.data

    return data
  }
)

export const getRelationShip = createAsyncThunk(
  'general/getRelationShip',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getRelationShip(payload)

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
        'fecha',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)

export const getPaymentType = createAsyncThunk(
  'general/getPaymentType',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getPaymentType(payload)

    const { data } = response.data

    return data
  }
)
export const registarTiposNomina = createAsyncThunk(
  'general/registarTiposNomina',
  async (payload: GeneralType) => {
    const response = await userApiHelper.registarTiposNomina(payload)

    const { data } = response.data

    return data
  }
)
export const actualizarTiposNomina = createAsyncThunk(
  'general/actualizarTiposNomina',
  async (payload: GeneralType) => {
    const response = await userApiHelper.actualizarTiposNomina(
      removeField(payload.condition, [
        'fecha_insercion',
        'cambios',
        'key',
        'index',
      ])
    )

    const { data } = response.data

    return data
  }
)

export const getCargos = createAsyncThunk(
  'general/getCargos',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getCargos(payload)

    const { data } = response.data

    return data
  }
)

export const getBloodType = createAsyncThunk(
  'general/getBloodType',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getBloodType(payload)

    const { data } = response.data

    return data
  }
)

export const getAcademicLevel = createAsyncThunk(
  'general/getAcademicLevel',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getAcademicLevel(payload)

    const { data } = response.data

    return data
  }
)

export const getTypesPermissions = createAsyncThunk(
  'general/getTypesPermissions',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getTypesPermissions(payload)

    const { data } = response.data

    return data
  }
)

export const getProvinces = createAsyncThunk(
  'general/getProvinces',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getProvinces(payload)

    const { data } = response.data

    return data
  }
)

export const getCountries = createAsyncThunk(
  'general/getCountries',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getCountries(payload)

    const { data } = response.data

    return data
  }
)

export const getParametros = createAsyncThunk(
  'general/getParametros',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getParametros(payload)

    const { data } = response.data

    return data
  }
)

export const getInfoEmpresa = createAsyncThunk(
  'general/getInfoEmpresa',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getInfoEmpresa(payload)

    const { data } = response.data

    return data
  }
)

export const getTypeAbsences = createAsyncThunk(
  'general/getTypeAbsences',
  async (payload: GeneralType) => {
    const response = await userApiHelper.getTypeAbsences(payload)

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
  reducers: {
    setDeleteNullValuesBeforeRequest: (state, action) => {
      state.deleteNullValuesBeforeRequest = action.payload
    },
    setModalVisibilityStateForEmployeeSummary: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.modalVisibilityStateForEmployeeSummary = action.payload
    },
    setModalStateFormVacancy: (state, action: PayloadAction<boolean>) => {
      state.modalStateFormVacancy = action.payload
    },
    setEditingMode: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload
    },
    setNextLocation: (state, action: PayloadAction<string>) => {
      state.nextLocation = action.payload
    },
    setStepPosition: (state, action: PayloadAction<number>) => {
      state.stepPosition = action.payload
    },
    setStepPositionReset: (state) => {
      state.stepPosition = initialState.stepPosition
    },
  },
  extraReducers: (build) => {
    build
      .addCase(setFileList, (state, action) => {
        state.fileList = action.payload
      })
      .addCase(resetAction, () => initialState)
      .addCase(getPersonData.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getPersonData.fulfilled, (state, action) => {
        state.personData = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getPersonData.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getCivilState.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getCivilState.fulfilled, (state, action) => {
        state.civilState = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getCivilState.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getPhoneTypes.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getPhoneTypes.fulfilled, (state, action) => {
        state.phoneTypes = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getPhoneTypes.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getEmailsTypes.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getEmailsTypes.fulfilled, (state, action) => {
        state.emailsTypes = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getEmailsTypes.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getWorkingDay.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getWorkingDay.fulfilled, (state, action) => {
        state.workingDay = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getWorkingDay.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getPayroll.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getPayroll.fulfilled, (state, action) => {
        state.Payroll = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getPayroll.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getRelationShip.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getRelationShip.fulfilled, (state, action) => {
        state.relationShip = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getRelationShip.rejected, (state) => {
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
      .addCase(getPaymentType.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getPaymentType.fulfilled, (state, action) => {
        state.paymentType = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getPaymentType.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(registarTiposNomina.pending, (state) => {
        state.fetchingGeneralData = true
        state.registarTiposNominaResponse = 'pending'
      })
      .addCase(registarTiposNomina.fulfilled, (state) => {
        state.registarTiposNominaResponse = 'success'
        state.fetchingGeneralData = false
      })
      .addCase(registarTiposNomina.rejected, (state) => {
        state.fetchingGeneralData = false
        state.registarTiposNominaResponse = 'failure'
      })
      .addCase(actualizarTiposNomina.pending, (state) => {
        state.fetchingGeneralData = true
        state.registarTiposNominaResponse = 'pending'
      })
      .addCase(actualizarTiposNomina.fulfilled, (state) => {
        state.registarTiposNominaResponse = 'success'
        state.fetchingGeneralData = false
      })
      .addCase(actualizarTiposNomina.rejected, (state) => {
        state.fetchingGeneralData = false
        state.registarTiposNominaResponse = 'failure'
      })
      .addCase(getCargos.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getCargos.fulfilled, (state, action) => {
        state.cargos = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getCargos.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getBloodType.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getBloodType.fulfilled, (state, action) => {
        state.bloodType = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getBloodType.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getAcademicLevel.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getAcademicLevel.fulfilled, (state, action) => {
        state.academicLevel = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getAcademicLevel.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getTypesPermissions.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getTypesPermissions.fulfilled, (state, action) => {
        state.typesPermissions = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getTypesPermissions.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getProvinces.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getProvinces.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getCountries.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getCountries.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getParametros.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getParametros.fulfilled, (state, action) => {
        state.parametros = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getParametros.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getInfoEmpresa.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getInfoEmpresa.fulfilled, (state, action) => {
        state.infoEmpresa = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getInfoEmpresa.rejected, (state) => {
        state.fetchingGeneralData = false
      })
      .addCase(getTypeAbsences.pending, (state) => {
        state.fetchingGeneralData = true
      })
      .addCase(getTypeAbsences.fulfilled, (state, action) => {
        state.typeAbsences = action.payload
        state.fetchingGeneralData = false
      })
      .addCase(getTypeAbsences.rejected, (state) => {
        state.fetchingGeneralData = false
      })
  },
})

export const generalSelector = (state: RootState): GeneralState => state.general

export default generalSlice?.reducer
