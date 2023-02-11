import axios, { AxiosResponse } from 'axios'
import { getSessionToken } from './session'
import {
  WEB_SERVICE_API_ASSIGN_USER,
  WEB_SERVICE_API_BLOOD_TYPES,
  WEB_SERVICE_API_CIVIL_STATUS,
  WEB_SERVICE_API_CREATE_DATA_ACADEMIC,
  WEB_SERVICE_API_CREATE_UPDATE_ABSENCES,
  WEB_SERVICE_API_CREATE_UPDATE_AUMENTO_SUELDO,
  WEB_SERVICE_API_CREATE_UPDATE_CHARGES,
  WEB_SERVICE_API_CREATE_UPDATE_CONFIGURATIONS,
  WEB_SERVICE_API_CREATE_UPDATE_DELAY,
  WEB_SERVICE_API_CREATE_UPDATE_DIRECTION,
  WEB_SERVICE_API_CREATE_UPDATE_DISCOUNTS,
  WEB_SERVICE_API_CREATE_UPDATE_DOCUMENTS,
  WEB_SERVICE_API_CREATE_UPDATE_EMAIL,
  WEB_SERVICE_API_CREATE_UPDATE_EMPLOYEE,
  WEB_SERVICE_API_CREATE_UPDATE_HOLIDAYS,
  WEB_SERVICE_API_CREATE_UPDATE_LACKS,
  WEB_SERVICE_API_CREATE_UPDATE_LAYOFFS,
  WEB_SERVICE_API_CREATE_UPDATE_LICENCES,
  WEB_SERVICE_API_CREATE_UPDATE_PERMISSION,
  WEB_SERVICE_API_CREATE_UPDATE_PERMISSIONS,
  WEB_SERVICE_API_CREATE_UPDATE_PHONE,
  WEB_SERVICE_API_CREATE_UPDATE_REASIGNATIONS,
  WEB_SERVICE_API_CREATE_UPDATE_SOLICITUD_VACACIONES,
  WEB_SERVICE_API_CREATE_UPDATE_SOLICITUDES_VACACIONES,
  WEB_SERVICE_API_CREATE_UPDATE_VACANCY,
  WEB_SERVICE_API_GET_ABSENCES,
  WEB_SERVICE_API_GET_ACADEMIC_LEVEL,
  WEB_SERVICE_API_GET_CANDIDATES,
  WEB_SERVICE_API_GET_CARGOS,
  WEB_SERVICE_API_GET_CHANGE_HISTORY,
  WEB_SERVICE_API_GET_CHANGE_HISTORY_EMPLOYEE,
  WEB_SERVICE_API_GET_CHANGE_HISTORY_NOMINAS,
  WEB_SERVICE_API_GET_CONFIGURATIONS,
  WEB_SERVICE_API_GET_CONSULTAS,
  WEB_SERVICE_API_GET_CONTACT_EMERGENCY,
  WEB_SERVICE_API_GET_COUNTRIES,
  WEB_SERVICE_API_GET_DATA_EMPLOYEE,
  WEB_SERVICE_API_GET_DELAY,
  WEB_SERVICE_API_GET_DESCUENTOS_EMPLEADO,
  WEB_SERVICE_API_GET_DESCUENTOS_FIJOS,
  WEB_SERVICE_API_GET_DET_NOMINAS,
  WEB_SERVICE_API_GET_DIRECTION,
  WEB_SERVICE_API_GET_DISCOUNTS,
  WEB_SERVICE_API_GET_DISCOUNTS_DESCRIPTION,
  WEB_SERVICE_API_GET_DOC_TYPES,
  WEB_SERVICE_API_GET_DOCTORES,
  WEB_SERVICE_API_GET_DOCUMENTS,
  WEB_SERVICE_API_GET_EMAIL,
  WEB_SERVICE_API_GET_EMAILS_TYPES,
  WEB_SERVICE_API_GET_HOLIDAYS,
  WEB_SERVICE_API_GET_INFO_EMPRESA,
  WEB_SERVICE_API_GET_INGRESOS_EMPLEADO,
  WEB_SERVICE_API_GET_LACKS,
  WEB_SERVICE_API_GET_LAYOFFS,
  WEB_SERVICE_API_GET_LICENCES,
  WEB_SERVICE_API_GET_NOMINAS,
  WEB_SERVICE_API_GET_PACIENTES,
  WEB_SERVICE_API_GET_PARAMETROS,
  WEB_SERVICE_API_GET_PAYMENT_TYPE,
  WEB_SERVICE_API_GET_PAYROLL,
  WEB_SERVICE_API_GET_PERMISSION,
  WEB_SERVICE_API_GET_PERMISSIONS,
  WEB_SERVICE_API_GET_PERSON_DATA,
  WEB_SERVICE_API_GET_PHONE,
  WEB_SERVICE_API_GET_PHONE_TYPES,
  WEB_SERVICE_API_GET_PROVINCES,
  WEB_SERVICE_API_GET_REASIGNATIONS,
  WEB_SERVICE_API_GET_RELATIONSHIP,
  WEB_SERVICE_API_GET_TYPE_ABSENCES,
  WEB_SERVICE_API_GET_TYPE_LACKS,
  WEB_SERVICE_API_GET_TYPE_LAYOFFS,
  WEB_SERVICE_API_GET_TYPE_LICENCES,
  WEB_SERVICE_API_GET_TYPE_PERMISSION,
  WEB_SERVICE_API_GET_TYPE_REASIGNATIONS,
  WEB_SERVICE_API_GET_TYPES_PERMISSIONS,
  WEB_SERVICE_API_GET_UPDATE_DATA_ACADEMIC,
  WEB_SERVICE_API_GET_USER_SUMMARY,
  WEB_SERVICE_API_GET_VACANCY,
  WEB_SERVICE_API_GET_VALIDATE_ID,
  WEB_SERVICE_API_LOGIN,
  WEB_SERVICE_API_PERSON_DATA,
  WEB_SERVICE_API_REGISTER_UPDATE_DESCUENTOS_EMPLEADO,
  WEB_SERVICE_API_REGISTER_UPDATE_DET_NOMINAS,
  WEB_SERVICE_API_REGISTER_UPDATE_INGRESOS_EMPLEADO,
  WEB_SERVICE_API_REGISTER_UPDATE_NOMINAS,
  WEB_SERVICE_API_REGISTER_UPDATE_NOMINAS_ESTADO,
  WEB_SERVICE_API_TIPOS_NOMINAS,
  WEB_SERVICE_API_UPDATE_CAMBIO_DEPARTAMENTO,
  WEB_SERVICE_API_UPDATE_CANDIDATES,
  WEB_SERVICE_API_UPDATE_CREATE_CONSULTAS,
  WEB_SERVICE_API_UPDATE_CREATE_CONTACT_EMERGENCY,
  WEB_SERVICE_API_UPDATE_EMPLOYMENT_DATA,
  WEB_SERVICE_API_UPDATE_PASS,
  WEB_SERVICE_API_UPDATE_STATE_EMPLOYEE,
} from '../constants/Routes'
import { ApiReturnPromise, GeneralType } from '../constants/types'
import {
  DataEmployeeType,
  DocTypesType,
  DocumentsType,
} from '../slicers/employee'
import { removeNullFields } from './general'
import { CandidateType, VacancyType } from '../slicers/recruitment'
type RequestHeaders = {
  headers: {
    'Content-Type': string
    Authorization: string
  }
}
const getResponseParams = (): RequestHeaders => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getSessionToken(),
    },
  }
}
export function postRequest<T>(
  url: string,
  data: Record<string, unknown> | unknown[]
): Promise<AxiosResponse<T>> {
  const config = getResponseParams()

  const result = axios.post(url, removeNullFields(data), config)
  return result
}

function putRequest<T>(
  url: string,
  data: Record<string, unknown>
): Promise<AxiosResponse<T>> {
  const config = getResponseParams()

  const result = axios.put(url, removeNullFields(data), config)

  return result
}

function unauthorizedPostRequest<T>(
  url: string,
  data: T
): Promise<AxiosResponse<T>> {
  const config = getResponseParams()

  return axios.post(url, data, config)
}

export type getGeneralPayload = {
  payload: GeneralType
}

const getPersonData = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_PERSON_DATA}`, payload)
}
const getCivilState = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CIVIL_STATUS}`, payload)
}
const getPersona = (
  payload: GeneralType
): Promise<AxiosResponse<getGeneralPayload>> => {
  return postRequest(`${WEB_SERVICE_API_GET_PERSON_DATA}`, payload)
}
const getBloodType = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_BLOOD_TYPES}`, payload)
}

const getCountries = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_COUNTRIES}`, payload)
}
export type AuthenticateUserPayload = {
  user: string
  password: string
}

const authenticateUser = (
  data: AuthenticateUserPayload
): Promise<AxiosResponse> => {
  return unauthorizedPostRequest<AuthenticateUserPayload>(
    WEB_SERVICE_API_LOGIN,
    data
  )
}

const getAcademicLevel = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_ACADEMIC_LEVEL}`, payload)
}

const getTypesPermissions = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_TYPES_PERMISSIONS}`, payload)
}

const getConsultas = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_CONSULTAS}`, payload)
}
const createConsultas = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_UPDATE_CREATE_CONSULTAS}`, payload)
}
const updateConsultas = (payload: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CREATE_CONSULTAS}`, payload)
}

const getPaymentType = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PAYMENT_TYPE}`, payload)
}
const registarTiposNomina = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_TIPOS_NOMINAS}`, payload)
}
const actualizarTiposNomina = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_TIPOS_NOMINAS}`, payload)
}

const getInfoEmpresa = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_INFO_EMPRESA}`, payload)
}

const getCargos = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_CARGOS}`, payload)
}

const getDoctores = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DOCTORES}`, payload)
}

const getPayroll = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PAYROLL}`, payload)
}

const getRelationShip = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_RELATIONSHIP}`, payload)
}

const getPhoneTypes = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PHONE_TYPES}`, payload)
}

const getEmailsTypes = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_EMAILS_TYPES}`, payload)
}

const getProvinces = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PROVINCES}`, payload)
}

const getTypeAbsences = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_TYPE_ABSENCES}`, payload)
}

const getParametros = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PARAMETROS}`, payload)
}

export const userApiHelper = {
  authenticateUser,
  getParametros,
  getTypesPermissions,
  getPersonData,
  getInfoEmpresa,
  getCivilState,
  getBloodType,
  getTypeAbsences,
  getPersona,
  getCountries,
  getPaymentType,
  registarTiposNomina,
  getAcademicLevel,
  actualizarTiposNomina,
  getConsultas,
  createConsultas,
  updateConsultas,
  getCargos,
  getDoctores,
  getPayroll,
  getRelationShip,
  getPhoneTypes,
  getProvinces,
  getEmailsTypes,
}

const createEmployee = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_EMPLOYEE}`, parameters)
}

const updateEmployee = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_EMPLOYEE}`, parameters)
}

const createContactEmergency = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(
    `${WEB_SERVICE_API_UPDATE_CREATE_CONTACT_EMERGENCY}`,
    parameters
  )
}

const updateContactEmergency = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(
    `${WEB_SERVICE_API_UPDATE_CREATE_CONTACT_EMERGENCY}`,
    parameters
  )
}

const getContactEmergency = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_CONTACT_EMERGENCY}`, payload)
}

const updateEmploymentData = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_EMPLOYMENT_DATA}`, parameters)
}
const updateCambioDepartamento = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CAMBIO_DEPARTAMENTO}`, parameters)
}

const getPacientes = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PACIENTES}`, payload)
}

const createAcademic = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_DATA_ACADEMIC}`, parameters)
}

const updateAcademic = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_GET_UPDATE_DATA_ACADEMIC}`, parameters)
}

const getAcademic = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_UPDATE_DATA_ACADEMIC}`, payload)
}

const createAddress = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_DIRECTION}`, parameters)
}
const createAumentoSueldo = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(
    `${WEB_SERVICE_API_CREATE_UPDATE_AUMENTO_SUELDO}`,
    parameters
  )
}
const createSolicitudVacaciones = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(
    `${WEB_SERVICE_API_CREATE_UPDATE_SOLICITUD_VACACIONES}`,
    parameters
  )
}
const updateSolicitudVacaciones = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(
    `${WEB_SERVICE_API_CREATE_UPDATE_SOLICITUD_VACACIONES}`,
    parameters
  )
}

const updateAddress = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_DIRECTION}`, parameters)
}

const getAddress = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DIRECTION}`, payload)
}

const getEmployeeHistoryChange = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_CHANGE_HISTORY_EMPLOYEE}`, payload)
}
const getNominasHistoryChange = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_CHANGE_HISTORY_NOMINAS}`, payload)
}

const createPhone = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_PHONE}`, parameters)
}
const getHistoryChange = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_CHANGE_HISTORY}`, parameters)
}
const getNominas = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_NOMINAS}`, parameters)
}
const getDetNominas = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DET_NOMINAS}`, parameters)
}
const getDescuentosFijos = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DESCUENTOS_FIJOS}`, parameters)
}
const registerNominas = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_REGISTER_UPDATE_NOMINAS}`, parameters)
}
const updateNominas = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_REGISTER_UPDATE_NOMINAS}`, parameters)
}
const updateDetNominas = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(
    `${WEB_SERVICE_API_REGISTER_UPDATE_NOMINAS_ESTADO}`,
    parameters
  )
}

const updatePhone = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_PHONE}`, parameters)
}
const updatePass = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_PASS}`, parameters)
}

const getPhone = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PHONE}`, payload)
}

const createEmail = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_EMAIL}`, parameters)
}

const updateEmail = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_EMAIL}`, parameters)
}

const getEmail = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_EMAIL}`, payload)
}
const createPermission = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_PERMISSION}`, parameters)
}

const updatePermission = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_PERMISSION}`, parameters)
}

const getPermission = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PERMISSION}`, payload)
}
const getTypePermission = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_TYPE_PERMISSION}`, payload)
}
const getTypeLacks = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_TYPE_LACKS}`, payload)
}
const getTypeLayoffs = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_TYPE_LAYOFFS}`, payload)
}
const getTypeResignations = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_TYPE_REASIGNATIONS}`, payload)
}
const createLicences = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_LICENCES}`, parameters)
}

const updateLicences = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_LICENCES}`, parameters)
}

const getLicences = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_LICENCES}`, payload)
}
const getTypeLicences = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_TYPE_LICENCES}`, payload)
}

const createAbsences = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_ABSENCES}`, parameters)
}

const updateAbsences = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_ABSENCES}`, parameters)
}

const getAbsences = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_ABSENCES}`, payload)
}

const createDelay = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_DELAY}`, parameters)
}

const updateDelay = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_DELAY}`, parameters)
}

const getDelay = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DELAY}`, payload)
}

// const createHolidays = (parameters: GeneralType): Promise<AxiosResponse> => {
//   return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_HOLIDAYS}`, parameters)
// }

const updateHolidays = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_HOLIDAYS}`, parameters)
}

const getHolidays = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_HOLIDAYS}`, payload)
}

const createPermissions = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_PERMISSIONS}`, parameters)
}

const updatePermissions = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_PERMISSIONS}`, parameters)
}

const getPermissions = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PERMISSIONS}`, payload)
}
const createLacks = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_LACKS}`, parameters)
}
const getSolicitudVacaciones = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(
    `${WEB_SERVICE_API_CREATE_UPDATE_SOLICITUDES_VACACIONES}`,
    parameters
  )
}

const updateLacks = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_LACKS}`, parameters)
}

const getLacks = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_LACKS}`, payload)
}
const createLayoffs = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_LAYOFFS}`, parameters)
}

const updateLayoffs = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_LAYOFFS}`, parameters)
}
const createResignations = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(
    `${WEB_SERVICE_API_CREATE_UPDATE_REASIGNATIONS}`,
    parameters
  )
}

const updateResignations = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(
    `${WEB_SERVICE_API_CREATE_UPDATE_REASIGNATIONS}`,
    parameters
  )
}

const getLaidOff = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_LAYOFFS}`, payload)
}
const getResignations = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_REASIGNATIONS}`, payload)
}
const createDiscounts = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_DISCOUNTS}`, parameters)
}

const updateDiscounts = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_DISCOUNTS}`, parameters)
}

const getDiscounts = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DISCOUNTS}`, payload)
}

const getDiscountsDescription = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DISCOUNTS_DESCRIPTION}`, payload)
}

const getValidateId = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_VALIDATE_ID}`, payload)
}

const getDataEmployee = (
  payload: GeneralType
): ApiReturnPromise<DataEmployeeType[]> => {
  return postRequest(`${WEB_SERVICE_API_GET_DATA_EMPLOYEE}`, payload)
}

const updateStateEmployee = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_STATE_EMPLOYEE}`, parameters)
}

const getEmployeeSummary = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_USER_SUMMARY}`, payload)
}

const getDocTypes = (
  payload: GeneralType
): ApiReturnPromise<DocTypesType[]> => {
  return postRequest(`${WEB_SERVICE_API_GET_DOC_TYPES}`, payload)
}

const createDocuments = (
  payload: GeneralType<DocumentsType>
): ApiReturnPromise<DocumentsType> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_DOCUMENTS}`, payload)
}

const getDocuments = (
  payload: GeneralType<DocumentsType>
): ApiReturnPromise<DocumentsType[]> => {
  return postRequest(`${WEB_SERVICE_API_GET_DOCUMENTS}`, payload)
}

const updateDocuments = (
  payload: GeneralType<DocumentsType>
): ApiReturnPromise<DocumentsType> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_DOCUMENTS}`, payload)
}
const getDescuentosEmpleado = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DESCUENTOS_EMPLEADO}`, payload)
}
const createDescuentosEmpleado = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(
    `${WEB_SERVICE_API_REGISTER_UPDATE_DESCUENTOS_EMPLEADO}`,
    payload
  )
}
const updateDescuentosEmpleado = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(
    `${WEB_SERVICE_API_REGISTER_UPDATE_DESCUENTOS_EMPLEADO}`,
    payload
  )
}
const getIngresosEmpleado = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_INGRESOS_EMPLEADO}`, payload)
}
const createIngresosEmpleado = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(
    `${WEB_SERVICE_API_REGISTER_UPDATE_INGRESOS_EMPLEADO}`,
    payload
  )
}
const createDetNomina = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_REGISTER_UPDATE_DET_NOMINAS}`, payload)
}
const updateIngresosEmpleado = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(
    `${WEB_SERVICE_API_REGISTER_UPDATE_INGRESOS_EMPLEADO}`,
    payload
  )
}

const assignUser = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_ASSIGN_USER}`, payload)
}

const createCharges = (parameters: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_CHARGES}`, parameters)
}

const updateCharges = (parameters: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_CHARGES}`, parameters)
}

const createConfigurations = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(
    `${WEB_SERVICE_API_CREATE_UPDATE_CONFIGURATIONS}`,
    parameters
  )
}

const updateConfigurations = (
  parameters: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(
    `${WEB_SERVICE_API_CREATE_UPDATE_CONFIGURATIONS}`,
    parameters
  )
}

const getConfigurations = (): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_CONFIGURATIONS}`, {})
}

export const EmployeeApiHelpers = {
  assignUser,
  createAbsences,
  createAcademic,
  createAddress,
  createAumentoSueldo,
  createCharges,
  createConfigurations,
  createContactEmergency,
  createDelay,
  createDescuentosEmpleado,
  createDetNomina,
  createDiscounts,
  createDocuments,
  createEmail,
  createEmployee,
  createIngresosEmpleado,
  createLacks,
  createLayoffs,
  createLicences,
  createPermission,
  createPermissions,
  createPhone,
  createResignations,
  createSolicitudVacaciones,
  getAbsences,
  getAcademic,
  getAddress,
  getConfigurations,
  getContactEmergency,
  getDataEmployee,
  getDelay,
  getDescuentosEmpleado,
  getDescuentosFijos,
  getDetNominas,
  getDiscounts,
  getDiscountsDescription,
  getDocTypes,
  getDocuments,
  getEmail,
  getPacientes,
  getEmployeeHistoryChange,
  getEmployeeSummary,
  getHistoryChange,
  getHolidays,
  getIngresosEmpleado,
  getLacks,
  getLaidOff,
  getLicences,
  getNominas,
  getNominasHistoryChange,
  getPermission,
  getPermissions,
  getPhone,
  getResignations,
  getSolicitudVacaciones,
  getTypeLacks,
  getTypeLayoffs,
  getTypeLicences,
  getTypePermission,
  getTypeResignations,
  getValidateId,
  registerNominas,
  updateAbsences,
  updateAcademic,
  updateAddress,
  updateCambioDepartamento,
  updateCharges,
  updateConfigurations,
  updateContactEmergency,
  updateDelay,
  updateDescuentosEmpleado,
  updateDetNominas,
  updateDiscounts,
  updateDocuments,
  updateEmail,
  updateEmployee,
  updateEmploymentData,
  updateHolidays,
  updateIngresosEmpleado,
  updateLacks,
  updateLayoffs,
  updateLicences,
  updateNominas,
  updatePass,
  updatePermission,
  updatePermissions,
  updatePhone,
  updateResignations,
  updateSolicitudVacaciones,
  updateStateEmployee,
}

const createVacancy = (
  payload: GeneralType<VacancyType>
): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_CREATE_UPDATE_VACANCY}`, payload)
}

const updateVacancy = (
  payload: GeneralType<VacancyType>
): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_CREATE_UPDATE_VACANCY}`, payload)
}

const getVacancies = (
  payload: GeneralType<VacancyType>
): ApiReturnPromise<VacancyType[]> => {
  return postRequest(`${WEB_SERVICE_API_GET_VACANCY}`, payload)
}

const getCandidates = (
  payload: GeneralType<CandidateType>
): ApiReturnPromise<CandidateType[]> => {
  return postRequest(`${WEB_SERVICE_API_GET_CANDIDATES}`, payload)
}

const updateCandidates = (
  payload: GeneralType<CandidateType>
): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CANDIDATES}`, payload)
}

export const recruitmentApiHelpers = {
  createVacancy,
  getVacancies,
  updateVacancy,
  getCandidates,
  updateCandidates,
}
