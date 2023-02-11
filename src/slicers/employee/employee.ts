import {
  AbsencesType,
  AcademicType,
  AddressType,
  ChargesType,
  ConfigPayload,
  DataEmployeeType,
  DelayType,
  DescuentosEmpleadosType,
  DetNominaType,
  DiscountsDescriptionType,
  DiscountsType,
  DocTypesType,
  DocumentsType,
  EmailType,
  EmergencyContactType,
  EmployeeHistoryNominasType,
  EmployeeHistoryType,
  EmployeeSummaryType,
  EmployeeType,
  EmploymentDataType,
  HistoryType,
  HolidaysType,
  IngresosEmpleadoType,
  LacksType,
  LayoffsType,
  NominaType,
  PermissionsType,
  PhoneType,
  ResignationType,
  SolicitarVacacionesType,
  SummaryType,
  TypeLacksType,
  TypeLayoffsType,
  TypePermissionType,
  TypeResignationsType,
  UpdateStateEmployeeType,
  ValidateIdType,
} from './types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeApiHelpers } from '../../utils/apis'
import { AnyType, GeneralType, RequestStatusType } from '../../constants/types'
import { RootState } from '../../app/store'
import { removeField, showNotification } from '../../utils/general'
import { AxiosError } from 'axios'
import { resetAction } from '../general'

export interface EmployeeState {
  academic: AcademicType[]
  AcademicUpdated: AcademicType
  contactEmergency: EmergencyContactType[]
  dataAbsences: AbsencesType[]
  dataDelay: DelayType[]
  dataDiscounts: DiscountsType[]
  dataEmployee: DataEmployeeType
  dataHolidays: HolidaysType[]
  dataPermissions: PermissionsType[]
  dataLack: LacksType[]
  dataLaidOff: LayoffsType[]
  dataResignation: ResignationType[]
  dataTypePermissions: TypePermissionType[]
  dataTypeLayoffs: TypeLayoffsType[]
  dataTypeResignations: TypeResignationsType[]
  dataTypeLacks: TypeLacksType[]
  dataTypeLicences: TypePermissionType[]
  dataLicences: PermissionsType[]
  direction: AddressType[]
  discounts: DiscountsType[]
  discountsDescription: DiscountsDescriptionType[]
  DiscountsUpdated: DiscountsType[]
  email: EmailType[]
  employee: EmployeeType[]
  nomina: NominaType[]
  detNomina: DetNominaType[]
  employeeHistoryChange: EmployeeHistoryType
  employeeHistoryChangeNominas: EmployeeHistoryNominasType
  historyChange: HistoryType[]
  EmployeeUpdated: EmployeeType
  employmentDataUpdated: EmploymentDataType
  solicitudVacaciones: SolicitarVacacionesType[]
  fetchingFromEmployee: boolean
  descuentos_fijos: GeneralType[]
  phone: PhoneType[]
  stateEmployeeUpdated: UpdateStateEmployeeType
  validateId: ValidateIdType
  employeeRequestStatus: RequestStatusType
  getDetNominasStatus: RequestStatusType
  updateCambioDepartamentoStatus: RequestStatusType
  aumentoRequestStatus: RequestStatusType
  nominaRequestStatus: RequestStatusType
  nominaDetRequestStatus: RequestStatusType
  employeeSummary: EmployeeSummaryType
  summary: SummaryType
  docTypes: DocTypesType[]
  document: DocumentsType
  descuentosEmpleados: DescuentosEmpleadosType[]
  ingresosEmpleado: DescuentosEmpleadosType[]
  documentsList: DocumentsType[]
  createLicencesRequestStatus: RequestStatusType
  createPermissionRequestStatus: RequestStatusType
  createLackRequestStatus: RequestStatusType
  getSolicitudVacacionesRequestStatus: RequestStatusType
  createLayoffRequestStatus: RequestStatusType
  createResignationRequestStatus: RequestStatusType
  updateHolidaysRequestStatus: RequestStatusType
  descuentoEmpleadosResponse: RequestStatusType
  detNominaEmpleadosResponse: RequestStatusType
  configurations: AnyType
}

const initialState: EmployeeState = {
  academic: new Array<AcademicType>(),
  descuentosEmpleados: new Array<DescuentosEmpleadosType>(),
  ingresosEmpleado: new Array<DescuentosEmpleadosType>(),
  AcademicUpdated: {} as AcademicType,
  createLicencesRequestStatus: '',
  descuentoEmpleadosResponse: '',
  detNominaEmpleadosResponse: '',
  updateHolidaysRequestStatus: '',
  createPermissionRequestStatus: '',
  createLackRequestStatus: '',
  getSolicitudVacacionesRequestStatus: '',
  createLayoffRequestStatus: '',
  createResignationRequestStatus: '',
  descuentos_fijos: new Array<GeneralType>(),
  contactEmergency: new Array<EmergencyContactType>(),
  dataAbsences: new Array<AbsencesType>(),
  dataDelay: new Array<DelayType>(),
  dataDiscounts: new Array<DiscountsType>(),
  dataEmployee: {} as DataEmployeeType,
  dataHolidays: new Array<HolidaysType>(),
  dataPermissions: new Array<PermissionsType>(),
  dataLack: new Array<LacksType>(),
  dataLaidOff: new Array<LayoffsType>(),
  dataResignation: new Array<ResignationType>(),
  dataTypePermissions: new Array<TypePermissionType>(),
  dataTypeLayoffs: new Array<TypeLayoffsType>(),
  dataTypeResignations: new Array<TypeResignationsType>(),
  dataTypeLacks: new Array<TypeLacksType>(),
  dataTypeLicences: new Array<TypePermissionType>(),
  dataLicences: new Array<PermissionsType>(),
  direction: new Array<AddressType>(),
  discounts: new Array<DiscountsType>(),
  discountsDescription: new Array<DiscountsDescriptionType>(),
  DiscountsUpdated: new Array<DiscountsType>(),
  email: new Array<EmailType>(),
  employee: new Array<EmployeeType>(),
  nomina: new Array<NominaType>(),
  detNomina: new Array<DetNominaType>(),
  solicitudVacaciones: new Array<SolicitarVacacionesType>(),
  employeeHistoryChange: {} as EmployeeHistoryType,
  employeeHistoryChangeNominas: {} as EmployeeHistoryNominasType,
  EmployeeUpdated: {} as EmployeeType,
  employmentDataUpdated: {} as EmploymentDataType,
  fetchingFromEmployee: false,
  phone: new Array<PhoneType>(),
  historyChange: new Array<HistoryType>(),
  stateEmployeeUpdated: {} as UpdateStateEmployeeType,
  validateId: {} as ValidateIdType,
  employeeRequestStatus: '',
  getDetNominasStatus: '',
  updateCambioDepartamentoStatus: '',
  aumentoRequestStatus: '',
  nominaRequestStatus: '',
  nominaDetRequestStatus: '',
  employeeSummary: {} as EmployeeSummaryType,
  summary: {} as SummaryType,
  docTypes: new Array<DocTypesType>(),
  document: {} as DocumentsType,
  documentsList: new Array<DocumentsType>(),
  configurations: new Array<AnyType>(),
}

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (data: GeneralType) => {
    const { data: response } = await EmployeeApiHelpers.createEmployee(
      removeField(data.condition, ['nacionalidad'])
    )

    const { data: dataEmployee } = response

    return dataEmployee[0]
  }
)

export const getPacientes = createAsyncThunk(
  'Pacientes/getPacientes',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getPacientes(payload)
    const { data } = response.data

    return data
  }
)
export const getNominas = createAsyncThunk(
  'getNominas',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getNominas(payload)
    const { data } = response.data

    return data
  }
)
export const getDetNominas = createAsyncThunk(
  'getDetNominas',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getDetNominas(payload)
    const { data } = response.data

    return data
  }
)
export const getDescuentosFijos = createAsyncThunk(
  'getDescuentosFijos',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getDescuentosFijos(payload)
    const { data } = response.data

    return data
  }
)
export const registerNominas = createAsyncThunk(
  'registerNominas',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.registerNominas(payload)
    const { data } = response.data

    return data
  }
)
export const updateNominas = createAsyncThunk(
  'updateNominas',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateNominas(
      removeField(payload.condition, [
        'fecha_insercion',
        'sueldos_pagar',
        'tipo_nomina',
        'key',
        'index',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const updateDetNominas = createAsyncThunk(
  'updateDetNominas',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateDetNominas(
      removeField(payload.condition, [
        'fecha_insercion',
        'tipo_nomina',
        'key',
        'index',
      ])
    )
    const { data } = response.data

    return data
  }
)

export const getDataEmployee = createAsyncThunk(
  'employee/getDataEmployee',
  async (payload: GeneralType) => {
    const { data: response } = await EmployeeApiHelpers.getDataEmployee(payload)

    const [data] = response.data

    return data
  }
)

export const getValidateId = createAsyncThunk(
  'employee/getValidateId',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getValidateId(payload)
    const { data } = response.data

    return data
  }
)

export const getEmployeeHistoryChange = createAsyncThunk(
  'employee/getEmployeeHistoryChange',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getEmployeeHistoryChange(payload)
    const { data } = response.data

    return data
  }
)
export const getNominasHistoryChange = createAsyncThunk(
  'employee/getNominasHistoryChange',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getNominasHistoryChange(payload)
    const { data } = response.data

    return data
  }
)
export const getHistoryChange = createAsyncThunk(
  'employee/getHistoryChange',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getHistoryChange(payload)
    const { data } = response.data

    return data
  }
)

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateEmployee(
      removeField(payload?.condition, [
        'ultimo_inicio_sesion',
        'fecha_insercion',
        'id_nomina',
      ])
    )
    const { data } = response.data

    return data
  }
)

export const getContactEmergency = createAsyncThunk(
  'employee/getContactEmergency',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getContactEmergency(payload)
    const { data } = response.data

    return data
  }
)

export const createContactEmergency = createAsyncThunk(
  'employee/createContactEmergency',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createContactEmergency(payload)
    const { data } = response.data

    return data
  }
)

export const updateContactEmergency = createAsyncThunk(
  'employee/updateContactEmergency',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateContactEmergency(payload)
    const { data } = response.data

    return data
  }
)

export const getPhone = createAsyncThunk(
  'employee/getPhone',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getPhone(payload)
    const { data } = response.data

    return data
  }
)

export const createPhone = createAsyncThunk(
  'employee/createPhone',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createPhone(payload)
    const { data } = response.data

    return data
  }
)

export const updatePhone = createAsyncThunk(
  'employee/updatePhone',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updatePhone(
      removeField(payload.condition, ['fecha_insercion'])
    )
    const { data } = response.data

    return data
  }
)
export const updatePass = createAsyncThunk(
  'employee/updatePass',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updatePass(
      removeField(payload.condition, ['fecha_insercion'])
    )
    const { data } = response.data

    return data
  }
)

export const getAddress = createAsyncThunk(
  'employee/getAddress',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getAddress(payload)
    const { data } = response.data

    return data
  }
)

export const createAddress = createAsyncThunk(
  'employee/createAddress',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createAddress(payload)
    const { data } = response.data

    return data
  }
)
export const createAumentoSueldo = createAsyncThunk(
  'employee/createAumentoSueldo',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createAumentoSueldo(
      removeField(payload.condition, [
        'fecha_insercion',
        'sueldo_actual',
        'nombres',
        'doc_identidad',
        'SEARCH_EMPLOYEE',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const createSolicitudVacaciones = createAsyncThunk(
  'employee/createSolicitudVacaciones',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createSolicitudVacaciones(
      removeField(payload.condition, [
        'fecha_insercion',
        'sueldo_actual',
        'nombres',
        'doc_identidad',
        'SEARCH_EMPLOYEE',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const updateSolicitudVacaciones = createAsyncThunk(
  'employee/updateSolicitudVacaciones',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateSolicitudVacaciones(
      removeField(payload.condition, [
        'fecha_insercion',
        'sueldo_actual',
        'apellidos',
        'key',
        'index',
        'nombres',
        'doc_identidad',
        'SEARCH_EMPLOYEE',
      ])
    )
    const { data } = response.data

    return data
  }
)

export const getEmail = createAsyncThunk(
  'employee/getEmail',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getEmail(payload)
    const { data } = response.data

    return data
  }
)

export const createEmail = createAsyncThunk(
  'employee/createEmail',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createEmail(payload)
    const { data } = response.data

    return data
  }
)

export const updateEmail = createAsyncThunk(
  'employee/updateEmail',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateEmail(
      removeField(payload.condition, ['fecha_insercion'])
    )
    const { data } = response.data

    return data
  }
)
export const getPermission = createAsyncThunk(
  'employee/getPermission',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getPermission(payload)
    const { data } = response.data

    return data
  }
)
export const getTypePermission = createAsyncThunk(
  'employee/getTypePermission',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getTypePermission(payload)
    const { data } = response.data

    return data
  }
)
export const getTypeLacks = createAsyncThunk(
  'employee/getTypeLacks',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getTypeLacks(payload)
    const { data } = response.data

    return data
  }
)
export const getTypeLayoffs = createAsyncThunk(
  'employee/getTypeLayoffs',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getTypeLayoffs(payload)
    const { data } = response.data

    return data
  }
)
export const getTypeResignations = createAsyncThunk(
  'employee/getTypeResignations',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getTypeResignations(payload)
    const { data } = response.data

    return data
  }
)
export const getLicences = createAsyncThunk(
  'employee/getLicences',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getLicences(payload)
    const { data } = response.data

    return data
  }
)
export const getTypeLicences = createAsyncThunk(
  'employee/getTypeLicences',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getTypeLicences(payload)
    const { data } = response.data

    return data
  }
)

export const createPermission = createAsyncThunk(
  'employee/createPermission',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createPermission(
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

export const updatePermission = createAsyncThunk(
  'employee/updatePermission',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updatePermission(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'nombres',
        'fecha',
        'apellidos',
        'id_departamento',
        'fecha_insercion',
        'imagen_Empleado',
        'key',
        'index',
        'nombres',
        'tipo_permiso',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const getLack = createAsyncThunk(
  'employee/getLack',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getLacks(payload)
    const { data } = response.data

    return data
  }
)
export const createLack = createAsyncThunk(
  'employee/createLack',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createLacks(
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
export const getSolicitudVacaciones = createAsyncThunk(
  'employee/getSolicitudVacaciones',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getSolicitudVacaciones(
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

export const updateLack = createAsyncThunk(
  'employee/updateLack',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateLacks(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'nombres',
        'fecha',
        'apellidos',
        'id_departamento',
        'fecha_insercion',
        'imagen_Empleado',
        'key',
        'index',
        'nombres',
        'tipo_falta',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const getLaidOff = createAsyncThunk(
  'employee/getLaidOff',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getLaidOff(payload)
    const { data } = response.data

    return data
  }
)
export const createLayoff = createAsyncThunk(
  'employee/createLayoff',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createLayoffs(
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

export const updateLayoff = createAsyncThunk(
  'employee/updateLayoff',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateLayoffs(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'nombres',
        'fecha',
        'apellidos',
        'fecha_insercion',
        'imagen_Empleado',
        'id_departamento',
        'key',
        'index',
        'tipo_razon',
        'nombres',
        'tipo_falta',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const getResignation = createAsyncThunk(
  'employee/getResignation',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getResignations(payload)
    const { data } = response.data

    return data
  }
)
export const createResignation = createAsyncThunk(
  'employee/createResignation',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createResignations(
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

export const updateResignation = createAsyncThunk(
  'employee/updateResignation',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateResignations(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'nombres',
        'fecha',
        'apellidos',
        'fecha_insercion',
        'imagen_Empleado',
        'key',
        'index',
        'tipo_razon',
        'nombres',
        'tipo_falta',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)
export const createLicences = createAsyncThunk(
  'employee/createLicences',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createLicences(
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

export const updateLicences = createAsyncThunk(
  'employee/updateLicences',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateLicences(
      removeField(payload.condition, [
        'dias',
        'SEARCH_EMPLOYEE',
        'doc_identidad',
        'nombres',
        'fecha',
        'tipo_licencia',
        'apellidos',
        'id_departamento',
        'fecha_insercion',
        'imagen_Empleado',
        'key',
        'index',
        'nombres',
        'tipo_permiso',
        'documento',
      ])
    )
    const { data } = response.data

    return data
  }
)

export const getAbsences = createAsyncThunk(
  'employee/getAbsences',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getAbsences(payload)
    const { data } = response.data

    return data
  }
)

export const createAbsences = createAsyncThunk(
  'employee/createAbsences',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createAbsences(payload)
    const { data } = response.data

    return data
  }
)

export const updateAbsences = createAsyncThunk(
  'employee/updateAbsences',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateAbsences(payload)
    const { data } = response.data

    return data
  }
)

export const getHolidays = createAsyncThunk(
  'employee/getHolidays',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getHolidays(payload)
    const { data } = response.data

    return data
  }
)

// export const createHolidays = createAsyncThunk(
//   'employee/createHolidays',
//   async (payload: GeneralType) => {
//     const response = await EmployeeApiHelpers.createHolidays(payload)
//     const { data } = response.data

//     return data
//   }
// )

export const updateHolidays = createAsyncThunk(
  'employee/updateHolidays',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateHolidays(
      removeField(payload.condition, [
        'imgen',
        'nombres',
        'apellidos',
        'doc_identidad',
        'sueldo_vacaciones',
        'imagen',
        'fecha',
        'dias',
        'fecha_insercion',
        'key',
        'index',
      ])
    )
    const { data } = response.data

    return data
  }
)

export const getPermissions = createAsyncThunk(
  'employee/getPermissions',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getPermissions(payload)
    const { data } = response.data

    return data
  }
)

export const createPermissions = createAsyncThunk(
  'employee/createPermissions',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createPermissions(payload)
    const { data } = response.data

    return data
  }
)

export const updatePermissions = createAsyncThunk(
  'employee/updatePermissions',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updatePermissions(payload)
    const { data } = response.data

    return data
  }
)

export const getDelay = createAsyncThunk(
  'employee/getDelay',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getDelay(payload)
    const { data } = response.data

    return data
  }
)

export const createDelay = createAsyncThunk(
  'employee/createDelay',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createDelay(payload)
    const { data } = response.data

    return data
  }
)

export const updateDelay = createAsyncThunk(
  'employee/updateDelay',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateDelay(payload)
    const { data } = response.data

    return data
  }
)

export const getAcademic = createAsyncThunk(
  'employee/getAcademic',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getAcademic(payload)
    const { data } = response.data

    return data
  }
)

export const createAcademic = createAsyncThunk(
  'employee/createAcademic',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createAcademic(payload)
    const { data } = response.data

    return data
  }
)

export const updateAcademic = createAsyncThunk(
  'employee/updateAcademic',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateAcademic(payload)
    const { data } = response.data

    return data
  }
)

export const getDiscounts = createAsyncThunk(
  'employee/getDiscounts',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getDiscounts(payload)
    const { data } = response.data

    return data
  }
)

export const createDiscounts = createAsyncThunk(
  'employee/createDiscounts',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.createDiscounts(payload)
    const { data } = response.data

    return data
  }
)

export const updateDiscounts = createAsyncThunk(
  'employee/updateDiscounts',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateDiscounts(payload)
    const { data } = response.data

    return data
  }
)

export const getDiscountsDescription = createAsyncThunk(
  'employee/getDiscountsDescription',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.getDiscountsDescription(payload)
    const { data } = response.data

    return data
  }
)

export const updateEmploymentData = createAsyncThunk(
  'employee/updateEmploymentData',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateEmploymentData(payload)
    const { data } = response.data

    return data
  }
)
export const updateCambioDepartamento = createAsyncThunk(
  'employee/updateCambioDepartamento',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateCambioDepartamento(payload)
    const { data } = response.data

    return data
  }
)

export const updateStateEmployee = createAsyncThunk(
  'employee/updateStateEmployee',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateStateEmployee(
      removeField(payload.condition, [
        'ultima_fecha_insercion',
        'pass',
        'pasaporte',
        'puesto',
      ])
    )
    return response?.data?.message
  }
)

export const updateAddress = createAsyncThunk(
  'employee/updateAddress',
  async (payload: GeneralType) => {
    const response = await EmployeeApiHelpers.updateAddress(payload)
    const { data } = response.data

    return data
  }
)

export const getEmployeeSummary = createAsyncThunk(
  'employee/getEmployeeSummary',
  async (payload: GeneralType, { rejectWithValue }) => {
    try {
      const { data: response } = await EmployeeApiHelpers.getEmployeeSummary(
        payload
      )

      const {
        contacto_emergencia,
        correos_electronicos_empleado,
        direcciones_empleado,
        empleado,
        info_academica,
        telefonos_empleado,
      } = response.data ?? {}

      const [data] = empleado ?? []

      const summary: SummaryType = {
        ...data,
        nombre: `${data.nombres} ${data.apellidos}`,
        pais: data.pais ?? '',
        sexo: data.sexo === 'M' ? 'Masculino' : 'Femenino',
        nivel_academico: info_academica?.[0]?.nivel_academico,
        info_academica,
        contacto_emergencia,
        direcciones: direcciones_empleado,
        emails: correos_electronicos_empleado,
        telefonos: telefonos_empleado,
      }

      return summary
    } catch (error) {
      const { response } = error as AxiosError
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
      return rejectWithValue(response?.data)
    }
  }
)

export const getDocTypes = createAsyncThunk(
  'employee/getDocTypes',
  async (payload: GeneralType) => {
    try {
      const { data: response } = await EmployeeApiHelpers.getDocTypes(payload)

      const { data } = response

      return data
    } catch (error) {
      const { response } = error as AxiosError
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
    }
  }
)

export const createDocuments = createAsyncThunk(
  'employee/createDocuments',
  async (payload: Partial<DocumentsType>) => {
    try {
      const { data: response } = await EmployeeApiHelpers.createDocuments({
        condition: {
          ...payload,
        },
      })

      const { data } = response

      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
    }
  }
)

export const updateDocuments = createAsyncThunk(
  'employee/updateDocuments',
  async (payload: Partial<DocumentsType>) => {
    try {
      const { data: response } = await EmployeeApiHelpers.updateDocuments(
        removeField(payload, ['fecha_insercion'])
      )

      const { data } = response
      showNotification({
        type: 'success',
        description: 'Documento actualizado correctamente',
        title: 'Exito',
      })
      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
    }
  }
)

export const getDocuments = createAsyncThunk(
  'employee/getDocuments',
  async (payload: Partial<DocumentsType>) => {
    const { data: response } = await EmployeeApiHelpers.getDocuments({
      condition: {
        ...payload,
      },
    })
    const { data } = response
    return data
  }
)
export const createDescuentosEmpleados = createAsyncThunk(
  'employee/createDescuentosEmpleados',
  async (payload: Partial<DescuentosEmpleadosType>) => {
    try {
      const { data: response } =
        await EmployeeApiHelpers.createDescuentosEmpleado({
          condition: {
            ...payload,
          },
        })

      const { data } = response

      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
    }
  }
)

export const updateDescuentosEmpleados = createAsyncThunk(
  'employee/updateDescuentosEmpleados',
  async (payload: Partial<DescuentosEmpleadosType>) => {
    try {
      const { data: response } =
        await EmployeeApiHelpers.updateDescuentosEmpleado(
          removeField(payload, ['fecha_insercion'])
        )

      const { data } = response
      showNotification({
        type: 'success',
        description: 'Descuento actualizado correctamente',
        title: 'Exito',
      })
      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
    }
  }
)

export const getDescuentosEmpleados = createAsyncThunk(
  'employee/getDescuentosEmpleados',
  async (payload: Partial<DescuentosEmpleadosType>) => {
    const { data: response } = await EmployeeApiHelpers.getDescuentosEmpleado({
      condition: {
        ...payload,
      },
    })
    const { data } = response
    return data
  }
)
export const createIngresosEmpleado = createAsyncThunk(
  'employee/createIngresosEmpleado',
  async (payload: GeneralType) => {
    try {
      const { data: response } =
        await EmployeeApiHelpers.createIngresosEmpleado({
          ...payload,
        })

      const { data } = response

      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
    }
  }
)
export const createDetNomina = createAsyncThunk(
  'employee/createDetNomina',
  async (payload: GeneralType) => {
    try {
      const { data: response } = await EmployeeApiHelpers.createDetNomina({
        ...payload,
      })

      const { data } = response

      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
    }
  }
)

export const updateIngresosEmpleado = createAsyncThunk(
  'employee/updateIngresosEmpleado',
  async (payload: Partial<IngresosEmpleadoType>) => {
    try {
      const { data: response } =
        await EmployeeApiHelpers.updateIngresosEmpleado(
          removeField(payload, ['fecha_insercion'])
        )

      const { data } = response
      showNotification({
        type: 'success',
        description: 'Descuento actualizado correctamente',
        title: 'Operación exitosa',
      })
      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
    }
  }
)

export const getIngresosEmpleado = createAsyncThunk(
  'employee/getIngresosEmpleado',
  async (payload: Partial<IngresosEmpleadoType>) => {
    const { data: response } = await EmployeeApiHelpers.getIngresosEmpleado({
      condition: {
        ...payload,
      },
    })
    const { data } = response
    return data
  }
)

export const assignUser = createAsyncThunk(
  'employee/assignUser',
  async (
    payload: Partial<EmployeeType & { id_empleado: number }>,
    { rejectWithValue }
  ) => {
    try {
      const { data: response } = await EmployeeApiHelpers.assignUser({
        condition: { ...payload },
      })

      const { data, message } = response
      showNotification({
        type: 'success',
        description: message,
        title: 'Operación exitosa',
      })
      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
      return rejectWithValue(response)
    }
  }
)

export const createCharges = createAsyncThunk(
  'employee/createCharges',
  async (payload: ChargesType, { rejectWithValue }) => {
    try {
      const { data: response } = await EmployeeApiHelpers.createCharges({
        condition: { ...payload },
      })

      const { data, message } = response

      showNotification({
        type: 'success',
        description: message,
        title: 'Operación exitosa',
      })
      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
      return rejectWithValue(response)
    }
  }
)

export const updateCharges = createAsyncThunk(
  'employee/updateCharges',
  async (payload: ChargesType, { rejectWithValue }) => {
    try {
      const { data: response } = await EmployeeApiHelpers.updateCharges({
        condition: { ...payload },
      })

      const { data, message } = response

      showNotification({
        type: 'success',
        description: message,
        title: 'Operación exitosa',
      })
      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
      return rejectWithValue(response)
    }
  }
)

export const createConfigurations = createAsyncThunk(
  'employee/createConfigurations',
  async (payload: ConfigPayload, { rejectWithValue }) => {
    try {
      const { data: response } = await EmployeeApiHelpers.createConfigurations({
        condition: { ...payload },
      })

      const { data, message } = response
      showNotification({
        type: 'success',
        description: message,
        title: 'Operación exitosa',
      })
      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
      return rejectWithValue(response)
    }
  }
)

export const updateConfigurations = createAsyncThunk(
  'employee/updateConfigurations',
  async (payload: ConfigPayload, { rejectWithValue }) => {
    try {
      delete payload.tipo_razon
      delete payload.fecha_insercion
      delete payload.tipo_licencia
      delete payload.tipo_permiso
      delete payload.tipo_falta
      const { data: response } = await EmployeeApiHelpers.updateConfigurations({
        condition: { ...payload },
      })

      const { data, message } = response

      showNotification({
        type: 'success',
        description: message,
        title: 'Operación exitosa',
      })
      return data
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
      return rejectWithValue(response)
    }
  }
)

export const getConfigurations = createAsyncThunk(
  'employee/getConfigurations',
  async (_, { rejectWithValue }) => {
    try {
      const { data: response } = await EmployeeApiHelpers.getConfigurations()

      const {
        tipo_razones_renuncias,
        tipo_falta,
        tipo_licencia,
        tipo_permiso,
        tipo_razones_depidos,
        tipo_documentos,
        cargos,
      } = response.data

      return {
        tipo_razones_renuncias,
        tipo_falta,
        tipo_licencia,
        tipo_permiso,
        tipo_razones_depidos,
        tipo_documentos,
        cargos: cargos.map((item) => ({ ...item, descripcion: item.cargo })),
      }
    } catch ({ response }) {
      showNotification({
        type: 'error',
        description: response?.data?.message,
        title: 'Error',
      })
      return rejectWithValue(response)
    }
  }
)

export const employeeSlicer = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployee(state: EmployeeState, action: PayloadAction<EmployeeType[]>) {
      state.employee = action.payload
    },
    setAcademic(state: EmployeeState, action: PayloadAction<AcademicType[]>) {
      state.academic = action.payload
    },
    setContactEmergency(
      state: EmployeeState,
      action: PayloadAction<EmergencyContactType[]>
    ) {
      state.contactEmergency = action.payload
    },
    setPhone(state: EmployeeState, action: PayloadAction<PhoneType[]>) {
      state.phone = action.payload
    },
    setEmail(state: EmployeeState, action: PayloadAction<EmailType[]>) {
      state.email = action.payload
    },
    setDelay(state: EmployeeState, action: PayloadAction<DelayType[]>) {
      state.dataDelay = action.payload
    },
    setAbsences(state: EmployeeState, action: PayloadAction<AbsencesType[]>) {
      state.dataAbsences = action.payload
    },
    setHolidays(state: EmployeeState, action: PayloadAction<HolidaysType[]>) {
      state.dataHolidays = action.payload
    },
    setPermissions(
      state: EmployeeState,
      action: PayloadAction<PermissionsType[]>
    ) {
      state.dataPermissions = action.payload
    },
    setDiscounts(state: EmployeeState, action: PayloadAction<DiscountsType[]>) {
      state.dataDiscounts = action.payload
    },
    setDiscountsDescription(
      state: EmployeeState,
      action: PayloadAction<DiscountsDescriptionType[]>
    ) {
      state.discountsDescription = action.payload
    },
    setRequestStatus(
      state: EmployeeState,
      action: PayloadAction<RequestStatusType>
    ) {
      state.employeeRequestStatus = action.payload
    },
    setEmployeeSummary(
      state: EmployeeState,
      action: PayloadAction<EmployeeSummaryType>
    ) {
      state.employeeSummary = action.payload
    },
    setSummary: (state, action: PayloadAction<SummaryType>) => {
      state.summary = action.payload
    },
    setDetNominas: (state) => {
      state.detNomina = initialState.detNomina
    },
    setResetRegisterEmployee: (state) => {
      state.dataEmployee = initialState.dataEmployee
    },
    resetEmployeeState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPacientes.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getPacientes.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.employee = action.payload
      })
      .addCase(getPacientes.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.employee = [] as EmployeeType[]
      })
      .addCase(getNominas.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getNominas.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'error'
        state.nomina = initialState.nomina
      })
      .addCase(getNominas.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.nomina = action.payload
      })
      .addCase(getDetNominas.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
        state.getDetNominasStatus = 'pending'
      })
      .addCase(getDetNominas.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'error'
        state.getDetNominasStatus = 'error'
        state.detNomina = initialState.detNomina
      })
      .addCase(getDetNominas.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.detNomina = action.payload
        state.getDetNominasStatus = 'success'
      })
      .addCase(getDescuentosFijos.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getDescuentosFijos.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'error'
        state.descuentos_fijos = initialState.descuentos_fijos
      })
      .addCase(getDescuentosFijos.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.descuentos_fijos = action.payload
      })
      .addCase(registerNominas.pending, (state) => {
        state.fetchingFromEmployee = true
        state.nominaRequestStatus = 'pending'
      })
      .addCase(registerNominas.fulfilled, (state) => {
        state.nominaRequestStatus = 'success'
        state.fetchingFromEmployee = false
      })
      .addCase(registerNominas.rejected, (state) => {
        state.nominaRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateNominas.pending, (state) => {
        state.fetchingFromEmployee = true
        state.nominaRequestStatus = 'pending'
      })
      .addCase(updateNominas.fulfilled, (state) => {
        state.nominaRequestStatus = 'success'
        state.fetchingFromEmployee = false
        showNotification({
          title: 'Exitoso',
          description: 'Nomina actualizada correctamente',
          type: 'success',
        })
      })
      .addCase(updateNominas.rejected, (state) => {
        state.nominaRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateDetNominas.pending, (state) => {
        state.fetchingFromEmployee = true
        state.nominaDetRequestStatus = 'pending'
      })
      .addCase(updateDetNominas.fulfilled, (state) => {
        state.nominaDetRequestStatus = 'success'
        state.fetchingFromEmployee = false
      })
      .addCase(updateDetNominas.rejected, (state) => {
        state.nominaDetRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getDataEmployee.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getDataEmployee.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataEmployee = action.payload
      })
      .addCase(getDataEmployee.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getValidateId.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getValidateId.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.validateId = action.payload as ValidateIdType
      })
      .addCase(getValidateId.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getEmployeeHistoryChange.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getEmployeeHistoryChange.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.employeeHistoryChange = action.payload
      })
      .addCase(getEmployeeHistoryChange.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.employeeHistoryChange = initialState.employeeHistoryChange
      })
      .addCase(getNominasHistoryChange.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getNominasHistoryChange.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.employeeHistoryChangeNominas = action.payload
      })
      .addCase(getNominasHistoryChange.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.employeeHistoryChangeNominas =
          initialState.employeeHistoryChangeNominas
      })
      .addCase(getHistoryChange.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getHistoryChange.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.historyChange = action.payload
      })
      .addCase(getHistoryChange.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.historyChange = initialState.historyChange
      })
      .addCase(updateEmployee.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'error'
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'success'
      })
      .addCase(getContactEmergency.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getContactEmergency.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.contactEmergency = action.payload
      })
      .addCase(getContactEmergency.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getAcademic.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getAcademic.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.academic = action.payload
      })
      .addCase(getAcademic.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getPhone.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getPhone.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.phone = action.payload
      })
      .addCase(getPhone.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.phone = initialState.phone
      })
      .addCase(getEmail.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getEmail.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.email = action.payload
      })
      .addCase(getEmail.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.email = initialState.email
      })
      .addCase(getPermission.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getPermission.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataPermissions = action.payload
      })
      .addCase(getPermission.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getLack.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getLack.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataLack = action.payload
      })
      .addCase(getLack.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getLaidOff.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getLaidOff.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataLaidOff = action.payload
      })
      .addCase(getLaidOff.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getResignation.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getResignation.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataResignation = action.payload
      })
      .addCase(getResignation.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getTypePermission.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getTypePermission.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataTypePermissions = action.payload
      })
      .addCase(getTypePermission.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getTypeLayoffs.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getTypeLayoffs.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataTypeLayoffs = action.payload
      })
      .addCase(getTypeLayoffs.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getTypeResignations.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getTypeResignations.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataTypeResignations = action.payload
      })
      .addCase(getTypeResignations.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getTypeLacks.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getTypeLacks.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataTypeLacks = action.payload
      })
      .addCase(getTypeLacks.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getLicences.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getLicences.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataLicences = action.payload
      })
      .addCase(getLicences.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getTypeLicences.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getTypeLicences.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataTypeLicences = action.payload
      })
      .addCase(getTypeLicences.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getDelay.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getDelay.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataDelay = action.payload
      })
      .addCase(getDelay.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getAbsences.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getAbsences.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataAbsences = action.payload
      })
      .addCase(getAbsences.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getHolidays.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getHolidays.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataHolidays = action.payload
      })
      .addCase(getHolidays.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getPermissions.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataPermissions = action.payload
      })
      .addCase(getPermissions.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getDiscounts.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.dataDiscounts = action.payload
      })
      .addCase(getDiscounts.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getDiscountsDescription.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getDiscountsDescription.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.discountsDescription = action.payload
      })
      .addCase(getDiscountsDescription.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createContactEmergency.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createContactEmergency.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createContactEmergency.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createAcademic.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createAcademic.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createAcademic.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createPhone.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createPhone.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createPhone.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createEmail.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createEmail.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createEmail.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createPermission.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createPermissionRequestStatus = 'pending'
      })
      .addCase(createPermission.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createPermissionRequestStatus = 'success'
      })
      .addCase(createPermission.rejected, (state) => {
        state.createPermissionRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createLack.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createLackRequestStatus = 'pending'
      })
      .addCase(createLack.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createLackRequestStatus = 'success'
      })
      .addCase(createLack.rejected, (state) => {
        state.createLackRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getSolicitudVacaciones.pending, (state) => {
        state.fetchingFromEmployee = true
        state.getSolicitudVacacionesRequestStatus = 'pending'
      })
      .addCase(getSolicitudVacaciones.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        state.getSolicitudVacacionesRequestStatus = 'success'
        state.solicitudVacaciones = action.payload
      })
      .addCase(getSolicitudVacaciones.rejected, (state) => {
        state.getSolicitudVacacionesRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.solicitudVacaciones = initialState.solicitudVacaciones
      })
      .addCase(createLayoff.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createLayoffRequestStatus = 'pending'
      })
      .addCase(createLayoff.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createLayoffRequestStatus = 'success'
      })
      .addCase(createLayoff.rejected, (state) => {
        state.createLayoffRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createResignation.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createResignationRequestStatus = 'pending'
      })
      .addCase(createResignation.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createResignationRequestStatus = 'success'
      })
      .addCase(createResignation.rejected, (state) => {
        state.createLayoffRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createLicences.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createLicencesRequestStatus = 'pending'
      })
      .addCase(createLicences.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createLicencesRequestStatus = 'success'
      })
      .addCase(createLicences.rejected, (state) => {
        state.createLicencesRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createDelay.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createDelay.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createDelay.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createAbsences.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createAbsences.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createAbsences.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      // .addCase(createHolidays.pending, (state) => {
      //   state.fetchingFromEmployee = true
      //   state.employeeRequestStatus = 'pending'
      // })
      // .addCase(createHolidays.fulfilled, (state) => {
      //   state.fetchingFromEmployee = false
      // })
      // .addCase(createHolidays.rejected, (state) => {
      //   state.employeeRequestStatus = 'error'
      //   state.fetchingFromEmployee = false
      // })
      .addCase(createPermissions.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createPermissions.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createPermissions.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createDiscounts.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createDiscounts.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createDiscounts.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateEmail.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateEmail.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'success'
      })
      .addCase(updateEmail.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updatePermission.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createPermissionRequestStatus = 'pending'
      })
      .addCase(updatePermission.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createPermissionRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Permiso actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updatePermission.rejected, (state) => {
        state.createPermissionRequestStatus = 'error'
        state.fetchingFromEmployee = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar el permiso',
          type: 'error',
        })
      })
      .addCase(updateLack.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createLackRequestStatus = 'pending'
      })
      .addCase(updateLack.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createLackRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Falta actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updateLack.rejected, (state) => {
        state.createLackRequestStatus = 'error'
        state.fetchingFromEmployee = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar la falta',
          type: 'error',
        })
      })
      .addCase(updateLayoff.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createLayoffRequestStatus = 'pending'
      })
      .addCase(updateLayoff.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createLayoffRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Despido actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updateLayoff.rejected, (state) => {
        state.createLayoffRequestStatus = 'error'
        state.fetchingFromEmployee = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar el Despido',
          type: 'error',
        })
      })
      .addCase(updateResignation.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createResignationRequestStatus = 'pending'
      })
      .addCase(updateResignation.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createResignationRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Renuncia actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updateResignation.rejected, (state) => {
        state.createResignationRequestStatus = 'error'
        state.fetchingFromEmployee = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar la Renuncia',
          type: 'error',
        })
      })
      .addCase(updateLicences.pending, (state) => {
        state.fetchingFromEmployee = true
        state.createLicencesRequestStatus = 'pending'
      })
      .addCase(updateLicences.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.createLicencesRequestStatus = 'success'
        showNotification({
          title: 'Exitoso',
          description: 'Permiso actualizado correctamente',
          type: 'success',
        })
      })
      .addCase(updateLicences.rejected, (state) => {
        state.createLicencesRequestStatus = 'error'
        state.fetchingFromEmployee = false
        showNotification({
          title: 'Error',
          description: 'No se pudo actualizar el permiso',
          type: 'error',
        })
      })
      .addCase(updatePhone.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updatePhone.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'success'
      })
      .addCase(updatePhone.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updatePass.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updatePass.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'success'
        showNotification({
          type: 'success',
          description: 'Contraseña actualizada correctamente',
          title: 'Exitoso',
        })
      })
      .addCase(updatePass.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        showNotification({
          type: 'error',
          description: 'No se pudo actualizar la contraseña',
          title: 'Error',
        })
      })
      .addCase(updateAcademic.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateAcademic.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateAcademic.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateContactEmergency.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateContactEmergency.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateContactEmergency.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateDelay.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateDelay.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateDelay.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateAbsences.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateAbsences.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateAbsences.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateHolidays.pending, (state) => {
        state.fetchingFromEmployee = true
        state.updateHolidaysRequestStatus = 'pending'
      })
      .addCase(updateHolidays.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.updateHolidaysRequestStatus = 'success'
        showNotification({
          type: 'success',
          description: 'Vacaciones actualizadas correctamente',
          title: 'Exitoso',
        })
      })
      .addCase(updateHolidays.rejected, (state) => {
        state.updateHolidaysRequestStatus = 'error'
        state.fetchingFromEmployee = false
        showNotification({
          type: 'error',
          description: 'No se pudo actualizar las vacaciones',
          title: 'Error',
        })
      })
      .addCase(updatePermissions.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updatePermissions.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updatePermissions.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(createAddress.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createAddress.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createAddress.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })

      .addCase(createAumentoSueldo.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
        state.aumentoRequestStatus = 'pending'
      })
      .addCase(createAumentoSueldo.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'success'
        state.aumentoRequestStatus = 'success'
        showNotification({
          type: 'success',
          description: 'Aumento de sueldo creado correctamente',
          title: 'Exitoso',
        })
      })
      .addCase(createAumentoSueldo.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.aumentoRequestStatus = 'error'
      })
      .addCase(createSolicitudVacaciones.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
        state.aumentoRequestStatus = 'pending'
      })
      .addCase(createSolicitudVacaciones.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'success'
        state.aumentoRequestStatus = 'success'
        showNotification({
          type: 'success',
          description: 'Solicitud de vacaciones creada correctamente',
          title: 'Exitoso',
        })
      })
      .addCase(createSolicitudVacaciones.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.aumentoRequestStatus = 'error'
      })
      .addCase(updateSolicitudVacaciones.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
        state.aumentoRequestStatus = 'pending'
      })
      .addCase(updateSolicitudVacaciones.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'success'
        state.aumentoRequestStatus = 'success'
        showNotification({
          type: 'success',
          description: 'Solicitud de vacaciones creada correctamente',
          title: 'Exitoso',
        })
      })
      .addCase(updateSolicitudVacaciones.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.aumentoRequestStatus = 'error'
        showNotification({
          type: 'error',
          description: 'No se pudo actualizar la solicitud de vacaciones',
          title: 'Error',
        })
      })
      .addCase(getAddress.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        state.direction = action.payload
      })
      .addCase(getAddress.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateDiscounts.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateDiscounts.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateDiscounts.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateEmploymentData.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateEmploymentData.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateEmploymentData.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateCambioDepartamento.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
        state.updateCambioDepartamentoStatus = 'pending'
      })
      .addCase(updateCambioDepartamento.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.updateCambioDepartamentoStatus = 'success'
        showNotification({
          type: 'success',
          description: 'Cambio de departamento actualizado correctamente',
          title: 'Exitoso',
        })
      })
      .addCase(updateCambioDepartamento.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.updateCambioDepartamentoStatus = 'error'
      })
      .addCase(createEmployee.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.employee = action.payload
        state.dataEmployee = action.payload
      })
      .addCase(createEmployee.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(updateAddress.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateAddress.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
      })
      .addCase(getEmployeeSummary.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
        state.summary = {} as SummaryType
      })
      .addCase(getEmployeeSummary.fulfilled, (state, action) => {
        state.employeeRequestStatus = 'success'
        state.fetchingFromEmployee = false
        state.summary = action.payload
      })
      .addCase(getEmployeeSummary.rejected, (state) => {
        state.employeeRequestStatus = 'error'
        state.fetchingFromEmployee = false
        state.summary = {} as SummaryType
      })
      .addCase(getDocTypes.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(getDocTypes.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        state.docTypes = action.payload
      })
      .addCase(getDocTypes.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateStateEmployee.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(updateStateEmployee.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        showNotification({
          type: 'success',
          description: action.payload,
          title: 'Exitoso',
        })
      })
      .addCase(updateStateEmployee.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createDocuments.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(createDocuments.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        state.document = action.payload
      })
      .addCase(createDocuments.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateDocuments.pending, (state) => {
        state.fetchingFromEmployee = true
        state.employeeRequestStatus = 'pending'
      })
      .addCase(updateDocuments.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        state.document = action.payload
        state.employeeRequestStatus = 'success'
      })
      .addCase(updateDocuments.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.employeeRequestStatus = 'error'
      })
      .addCase(getDocuments.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        state.documentsList = action.payload
      })
      .addCase(getDocuments.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createDescuentosEmpleados.pending, (state) => {
        state.fetchingFromEmployee = true
        state.descuentoEmpleadosResponse = 'pending'
      })
      .addCase(createDescuentosEmpleados.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.descuentoEmpleadosResponse = 'success'
      })
      .addCase(createDescuentosEmpleados.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.descuentoEmpleadosResponse = 'error'
      })
      .addCase(updateDescuentosEmpleados.pending, (state) => {
        state.fetchingFromEmployee = true
        state.descuentoEmpleadosResponse = 'pending'
      })
      .addCase(updateDescuentosEmpleados.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.descuentoEmpleadosResponse = 'success'
      })
      .addCase(updateDescuentosEmpleados.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.descuentoEmpleadosResponse = 'error'
      })
      .addCase(getDescuentosEmpleados.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(getDescuentosEmpleados.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        state.descuentosEmpleados = action.payload
      })
      .addCase(getDescuentosEmpleados.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.descuentosEmpleados = initialState.descuentosEmpleados
      })
      .addCase(createIngresosEmpleado.pending, (state) => {
        state.fetchingFromEmployee = true
        state.descuentoEmpleadosResponse = 'pending'
      })
      .addCase(createIngresosEmpleado.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.descuentoEmpleadosResponse = 'success'
      })
      .addCase(createIngresosEmpleado.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.descuentoEmpleadosResponse = 'error'
      })
      .addCase(createDetNomina.pending, (state) => {
        state.fetchingFromEmployee = true
        state.detNominaEmpleadosResponse = 'pending'
      })
      .addCase(createDetNomina.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.detNominaEmpleadosResponse = 'success'
      })
      .addCase(createDetNomina.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.detNominaEmpleadosResponse = 'error'
      })
      .addCase(updateIngresosEmpleado.pending, (state) => {
        state.fetchingFromEmployee = true
        state.descuentoEmpleadosResponse = 'pending'
      })
      .addCase(updateIngresosEmpleado.fulfilled, (state) => {
        state.fetchingFromEmployee = false
        state.descuentoEmpleadosResponse = 'success'
      })
      .addCase(updateIngresosEmpleado.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.descuentoEmpleadosResponse = 'error'
      })
      .addCase(getIngresosEmpleado.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(getIngresosEmpleado.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        state.ingresosEmpleado = action.payload
      })
      .addCase(getIngresosEmpleado.rejected, (state) => {
        state.fetchingFromEmployee = false
        state.ingresosEmpleado = initialState.ingresosEmpleado
      })
      .addCase(assignUser.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(assignUser.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(assignUser.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createCharges.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(createCharges.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createCharges.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateCharges.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(updateCharges.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateCharges.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createConfigurations.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(createConfigurations.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(createConfigurations.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateConfigurations.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(updateConfigurations.fulfilled, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(updateConfigurations.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addCase(getConfigurations.pending, (state) => {
        state.fetchingFromEmployee = true
      })
      .addCase(getConfigurations.fulfilled, (state, action) => {
        state.fetchingFromEmployee = false
        state.configurations = action.payload
      })
      .addCase(getConfigurations.rejected, (state) => {
        state.fetchingFromEmployee = false
      })
      .addMatcher(resetAction.match, () => initialState)
  },
})

export const employeeSelector = (state: RootState): EmployeeState =>
  state.employee

export default employeeSlicer.reducer
