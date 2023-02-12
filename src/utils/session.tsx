import Cookies from 'js-cookie'
import moment from 'moment'

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

export type UserData = {
  usuario: string
  nombres: string
  apellidos: string
  id: string
  imagen: string
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
    imagen,
    privilegios,
  } = user
  const { token: sessionToken, expiracion: sessionExpiration } = sessionCookie
  const cookiesExpiration = new Date(sessionExpiration)
  const sessionInfo = JSON.stringify({
    usuario,
    id,
    nombres,
    apellidos,
    privilegios,
  })

  sessionStorage.setItem(COOKIE_KEY_USER_DATA, JSON.stringify(imagen))

  Cookies.set(COOKIE_KEY_USER_NAME, usuario, {
    expires: new Date(
      moment(cookiesExpiration).add(-50, 'minutes').toISOString()
    ),
  })

  Cookies.set(COOKIE_KEY_USER_DATA, sessionInfo, {
    expires: cookiesExpiration,
  })

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
