export interface UserData {
  usuario: string
  id: string
  nombres: string
  imagen: string
  sessionCookie: {
    token: string
    expiracion: string
  }
}

export interface RequestHeaders {
  headers: {
    'Content-Type': 'application/json'
    Authorization: string
  }
}

export interface TabConfig {
  key: string
  node: React.ReactNode
  title: string
  path: string
}
