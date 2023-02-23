// Internal routes
export const PATH_LOGIN = '/'
export const PATH_MAIN = '/dashboard'
export const PATH_ERROR = '/404'
export const PATH_PROFILE = '/account'
export const PATH_CONSULTAS = '/consultas'
export const PATH_CONSULTAS_PACIENTES = '/consultas_pacientes'
export const PATH_CONSULTAS_DOCTORES = '/consultas_doctores'
export const PATH_HISTORIAL_DOCTORES = '/historial_doctores'
export const PATH_HISTORIAL_PACIENTES = '/historial_pacientes'
export const PATH_HORARIOS = '/horarios'
export const PATH_DOCTORES = '/doctores'
export const PATH_ADMINISTRADORES = '/administradores'
export const PATH_ESPECIALIDADES = '/especialidades'
export const PATH_PACIENTES = '/pacientes'
export const PATH_PACIENTES_DOCTORES = '/pacientes_doctores'

// external routes API
export const WEB_SERVICE_API = process.env.REACT_APP_WEB_SERVICE_API
export const WEB_SERVICE_API_LOGIN = `${WEB_SERVICE_API}/login`
export const WEB_SERVICE_API_GET_PACIENTES = `${WEB_SERVICE_API}/pacientes`
export const WEB_SERVICE_API_GET_NACIONALIDADES = `${WEB_SERVICE_API}/nacionalidades`
export const WEB_SERVICE_API_GET_ESPECILIDADES = `${WEB_SERVICE_API}/especialidades`
export const WEB_SERVICE_API_GET_HORARIOS = `${WEB_SERVICE_API}/horarios`
export const WEB_SERVICE_API_GET_SEGUROS = `${WEB_SERVICE_API}/seguros`
export const WEB_SERVICE_API_GET_CONSULTAS = `${WEB_SERVICE_API}/consultas`
export const WEB_SERVICE_API_GET_ADMINISTRADORES = `${WEB_SERVICE_API}/administradores`
export const WEB_SERVICE_API_GET_DET_CITAS = `${WEB_SERVICE_API}/detcitas`
export const WEB_SERVICE_API_GET_TIPO_LESION = `${WEB_SERVICE_API}/tipo_lesion`
export const WEB_SERVICE_API_GET_COLOR_LESION = `${WEB_SERVICE_API}/color_lesion`
export const WEB_SERVICE_API_GET_DOCTORES = `${WEB_SERVICE_API}/doctores`
export const WEB_SERVICE_API_UPDATE_CREATE_CONSULTAS = `${WEB_SERVICE_API}/consultas/consulta`
export const WEB_SERVICE_API_UPDATE_CREATE_ADMINISTRADORES = `${WEB_SERVICE_API}/administradores/administrador`
export const WEB_SERVICE_API_UPDATE_CREATE_DET_CITAS = `${WEB_SERVICE_API}/detcitas/detcita`
export const WEB_SERVICE_API_UPDATE_CREATE_PACIENTES = `${WEB_SERVICE_API}/pacientes/paciente`
export const WEB_SERVICE_API_UPDATE_CREATE_DOCTORES = `${WEB_SERVICE_API}/doctores/doctor`
export const WEB_SERVICE_API_UPDATE_CREATE_ESPECIALIDAD = `${WEB_SERVICE_API}/especialidades/especialidad`
export const WEB_SERVICE_API_UPDATE_CREATE_HORARIOS = `${WEB_SERVICE_API}/horarios/horario`
