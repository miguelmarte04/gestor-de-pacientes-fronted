// Internal routes
export const PATH_LOGIN = '/'
export const PATH_MAIN = '/dashboard'
export const PATH_ERROR = '/404'
export const PATH_PROFILE = '/account'
export const PATH_CONSULTAS = '/consultas'
export const PATH_DOCTORES = '/doctores'
export const PATH_PACIENTES = '/pacientes'

// external routes API
export const WEB_SERVICE_API = process.env.REACT_APP_WEB_SERVICE_API
export const WEB_SERVICE_API_LOGIN = `${WEB_SERVICE_API}/login`
export const WEB_SERVICE_API_GET_PACIENTES = `${WEB_SERVICE_API}/pacientes`
export const WEB_SERVICE_API_GET_NACIONALIDADES = `${WEB_SERVICE_API}/nacionalidades`
export const WEB_SERVICE_API_GET_ESPECILIDADES = `${WEB_SERVICE_API}/especialidades`
export const WEB_SERVICE_API_GET_SEGUROS = `${WEB_SERVICE_API}/seguros`
export const WEB_SERVICE_API_GET_CONSULTAS = `${WEB_SERVICE_API}/consultas`
export const WEB_SERVICE_API_GET_DOCTORES = `${WEB_SERVICE_API}/doctores`
export const WEB_SERVICE_API_UPDATE_CREATE_CONSULTAS = `${WEB_SERVICE_API}/consultas/consulta`
export const WEB_SERVICE_API_UPDATE_CREATE_PACIENTES = `${WEB_SERVICE_API}/pacientes/paciente`
export const WEB_SERVICE_API_UPDATE_CREATE_DOCTORES = `${WEB_SERVICE_API}/doctores/doctor`
