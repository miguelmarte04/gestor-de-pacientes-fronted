import { FormatParameters } from './types'

export const validateMessages = {
  required: '${label} es requerido.',
  types: {
    email: '${label} no es un email válido.',
    number: '${label} no es un número válido.',
    regexp: '${label} formato no válido.',
  },
  pattern: {
    mismatch: '${label} formato no válido.',
  },
  number: {
    len: '"${label}" debe tener exactamente "${len}" caracteres.',
    min: '"${label}" debe ser mayor o igual a "${min}".',
    range: "'${label}' debe estar entre ${min} y ${max}",
  },
  string: {
    len: '"${label}" debe tener exactamente "${len}" caracteres.',
    range: "'${label}' debe tener entre ${min} y ${max} digitos",
    min: '"${label}" debe tener mínimo "${len}" caracteres',
  },
  min: '"${label}" debe tener mínimo "${len}" caracteres.',
}
export const systemMessage = {
  errorSignIn:
    'Ocurrió un error al iniciar sesión, por favor verifique sus datos.',
  loseSession: '¿Está seguro que desea perder la sesión?',
  successFullOperation: 'Operación Exitosa',
}

export function throwError(message: string): void {
  throw new Error(message)
}

export function assertIsError(error: unknown): asserts error is Error {
  // if you have nodejs assert:
  // assert(error instanceof Error);
  // otherwise
  if (!(error instanceof Error)) {
    throw error
  }
}
export const message = {
  notData: 'No se encontraron datos',
}

export const maskedInput = {
  date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  pasaporte: [
    /[A-Z a-z]/,
    /[A-Z a-z]/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /[1,9]/,
  ],
  doc_identidad: [
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
  ],
  telefono: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  email: [/^[0-9]^/],
  id_cuenta: [
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
  ],
}

export const format = ({
  value,
  type,
  text,
  fix,
}: FormatParameters): string => {
  if (typeof value?.replace === 'function') {
    switch (type) {
      case 'account':
        return value?.replace(/(\d{3})(\d{3})(\d{7})(\d{1})/, '$1-$2-$3-$4')
      case 'cedula':
        return value?.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3')
      case 'phone':
        return value?.replace(/(\d{3})(\d{6})(\d{1})/, '$1-$2-$3')
      case 'money': {
        return `${text}$ ${Number(value).toFixed(fix || 2)}`?.replace(
          /\B(?=(\d{3})+(?!\d)+([^,])\.?)/g,
          ','
        )
      }
      default:
        return value
    }
  }
  return value
}
export const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export const colors = {
  primary: '#1890ff',
  secondary: '#00A8E8',
  success: '#52c41a',
  danger: '#f5222d',
  warning: '#00A8E8',
  info: '#1890ff',
  light: '#00A8E8',
  dark: '#00A8E8',
}

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'
