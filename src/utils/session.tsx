import Cookies from 'js-cookie'
import moment from 'moment'
// import { InfoEmpresaType } from '../slicers/general'
// import { AnyType } from '../constants/types'

const COOKIE_KEY_USER_NAME = 'hrAppUserName'
const COOKIE_KEY_SESSION_TOKEN = 'hrAppSessionToken'
const COOKIE_KEY_USER_DATA = 'hrUserData'
const COOKIE_KEY_BUSINESS_DATA = 'hrBusinessData'

export const isLoggedIn = (): boolean => {
  const requiredCookiesKeys = [COOKIE_KEY_SESSION_TOKEN, COOKIE_KEY_USER_DATA]

  return !requiredCookiesKeys?.some(
    (cookieKey) => Cookies?.get(cookieKey) === undefined
  )
}

// export const getDataInfoEmpresa = (): AnyType => {
//   const data: InfoEmpresaType = JSON.parse(
//     window.sessionStorage.getItem(COOKIE_KEY_BUSINESS_DATA) || '{}'
//   )
//   return data
// }

export type UserData = {
  usuario: string
  nombres: string
  // id_empresa: string
  apellidos: string
  // cargo: string
  // id_privilegios: string
  // id_departamento: number
  id: string
  imagen: string
  // empresa: {
  //   background_color: string
  //   logo: string
  //   nombre_empresa: string
  // }
  privilegios: number
  sessionCookie: {
    token: string
    expiracion: string
  }
}

export const createSession = (user: UserData): void => {
  const {
    sessionCookie,
    id,
    usuario,
    nombres,
    apellidos,
    // cargo,
    // id_privilegios,
    // id_departamento,
    // id_empresa,
    imagen,
    privilegios,
    // empresa,
  } = user
  const { token: sessionToken, expiracion: sessionExpiration } = sessionCookie
  const cookiesExpiration = new Date(sessionExpiration)
  const sessionInfo = JSON.stringify({
    usuario,
    id,
    nombres,
    apellidos,
    privilegios,
    // id_empresa,
    // cargo,
    // id_privilegios,
    // id_departamento,
  })

  // const { background_color, nombre_empresa } = empresa

  // sessionStorage.setItem(COOKIE_KEY_BUSINESS_DATA, JSON.stringify(empresa))
  sessionStorage.setItem(COOKIE_KEY_USER_DATA, JSON.stringify(imagen))

  // const businessInfo = JSON.stringify({ background_color, nombre_empresa })

  Cookies.set(COOKIE_KEY_USER_NAME, usuario, {
    expires: new Date(
      moment(cookiesExpiration).add(-50, 'minutes').toISOString()
    ),
  })

  Cookies.set(COOKIE_KEY_USER_DATA, sessionInfo, {
    expires: cookiesExpiration,
  })

  // Cookies.set(COOKIE_KEY_BUSINESS_DATA, businessInfo, {
  //   expires: cookiesExpiration,
  // })

  Cookies.set(COOKIE_KEY_SESSION_TOKEN, sessionToken, {
    expires: cookiesExpiration,
  })
}

export const removeSession = (): void => {
  const requiredCookiesKeys = [
    COOKIE_KEY_SESSION_TOKEN,
    COOKIE_KEY_USER_DATA,
    COOKIE_KEY_USER_NAME,
    COOKIE_KEY_BUSINESS_DATA,
  ]
  window.sessionStorage.clear()
  requiredCookiesKeys.forEach((cookieKey) => Cookies.remove(cookieKey))
  window.location.reload()
}

export const getSessionInfo = (): UserData => {
  if (!isLoggedIn()) {
    throw new Error('No session found')
  }

  const imagen = JSON.parse(
    sessionStorage.getItem(COOKIE_KEY_USER_DATA) as string
  )
  const data = isLoggedIn()
    ? JSON.parse(Cookies.get(COOKIE_KEY_USER_DATA) ?? '{}')
    : {}

  return { ...data, imagen }
}

export const getSessionToken = (): string => {
  return Cookies.get(COOKIE_KEY_SESSION_TOKEN) || ''
}
