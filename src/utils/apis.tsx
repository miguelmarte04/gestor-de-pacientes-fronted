import axios, { AxiosResponse } from 'axios'
import { getSessionToken } from './session'
import {
  WEB_SERVICE_API_GET_ADMINISTRADORES,
  WEB_SERVICE_API_GET_COLOR_LESION,
  WEB_SERVICE_API_GET_CONSULTAS,
  WEB_SERVICE_API_GET_DET_CITAS,
  WEB_SERVICE_API_GET_DOCTORES,
  WEB_SERVICE_API_GET_ENFERMEDADES,
  WEB_SERVICE_API_GET_ESPECILIDADES,
  WEB_SERVICE_API_GET_HORARIOS,
  WEB_SERVICE_API_GET_NACIONALIDADES,
  WEB_SERVICE_API_GET_PACIENTES,
  WEB_SERVICE_API_GET_SEGUROS,
  WEB_SERVICE_API_GET_TIPO_LESION,
  WEB_SERVICE_API_LOGIN,
  WEB_SERVICE_API_UPDATE_CREATE_ADMINISTRADORES,
  WEB_SERVICE_API_UPDATE_CREATE_CONSULTAS,
  WEB_SERVICE_API_UPDATE_CREATE_DET_CITAS,
  WEB_SERVICE_API_UPDATE_CREATE_DOCTORES,
  WEB_SERVICE_API_UPDATE_CREATE_ESPECIALIDAD,
  WEB_SERVICE_API_UPDATE_CREATE_HORARIOS,
  WEB_SERVICE_API_UPDATE_CREATE_PACIENTES,
} from '../constants/Routes'
import { GeneralType } from '../constants/types'
import { removeNullFields } from './general'
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

const getConsultas = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_CONSULTAS}`, payload)
}
const createConsultas = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_UPDATE_CREATE_CONSULTAS}`, payload)
}
const updateConsultas = (payload: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CREATE_CONSULTAS}`, payload)
}
const getAdministradores = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_ADMINISTRADORES}`, payload)
}
const createAdministradores = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return postRequest(
    `${WEB_SERVICE_API_UPDATE_CREATE_ADMINISTRADORES}`,
    payload
  )
}
const updateAdministradores = (
  payload: GeneralType
): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CREATE_ADMINISTRADORES}`, payload)
}
const getDetCitas = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DET_CITAS}`, payload)
}
const getTipoLesion = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_TIPO_LESION}`, payload)
}
const getColorLesion = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_COLOR_LESION}`, payload)
}
const getEnfermedades = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_ENFERMEDADES}`, payload)
}
const createDetCitas = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_UPDATE_CREATE_DET_CITAS}`, payload)
}
const updateDetCitas = (payload: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CREATE_DET_CITAS}`, payload)
}

const getDoctores = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_DOCTORES}`, payload)
}

const getPacientes = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_PACIENTES}`, payload)
}
const getNacionalidades = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_NACIONALIDADES}`, payload)
}

const getSeguros = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_SEGUROS}`, payload)
}
const createPacientes = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_UPDATE_CREATE_PACIENTES}`, payload)
}
const updatePacientes = (payload: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CREATE_PACIENTES}`, payload)
}
const createDoctor = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_UPDATE_CREATE_DOCTORES}`, payload)
}
const updateDoctor = (payload: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CREATE_DOCTORES}`, payload)
}
const getEspecialidades = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_ESPECILIDADES}`, payload)
}
const createEspecialidad = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_UPDATE_CREATE_ESPECIALIDAD}`, payload)
}
const updateEspecialidad = (payload: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CREATE_ESPECIALIDAD}`, payload)
}
const getHorarios = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_GET_HORARIOS}`, payload)
}
const createHorarios = (payload: GeneralType): Promise<AxiosResponse> => {
  return postRequest(`${WEB_SERVICE_API_UPDATE_CREATE_HORARIOS}`, payload)
}
const updateHorarios = (payload: GeneralType): Promise<AxiosResponse> => {
  return putRequest(`${WEB_SERVICE_API_UPDATE_CREATE_HORARIOS}`, payload)
}

export const userApiHelper = {
  getPacientes,
  getHorarios,
  createHorarios,
  updateHorarios,
  getEspecialidades,
  createEspecialidad,
  updateEspecialidad,
  getNacionalidades,
  getSeguros,
  createPacientes,
  updatePacientes,
  createDoctor,
  updateDoctor,
  authenticateUser,
  getConsultas,
  createConsultas,
  updateConsultas,
  getDoctores,
  getAdministradores,
  createAdministradores,
  updateAdministradores,
  getDetCitas,
  createDetCitas,
  getTipoLesion,
  getColorLesion,
  getEnfermedades,
  updateDetCitas,
}
