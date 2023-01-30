/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import { RelationshipType } from '../slicers/general'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export type ApiResponseType = {
  data: Record<string, unknown>

  response: RelationshipType[]
}
export type AnyType<T = any> = T
export type ValidatingType = '' | 'error' | 'success' | 'warning'
export type Steps = {
  description: string
  node: React.ReactNode
  title: React.ReactNode
  key?: React.Key
  validating?: ValidatingType
}

export type GeneralType<T = unknown> = {
  condition?: { [P in keyof Partial<T>]: T[P] }
  desc?: string
  select?: string[]
  value?: string
}

export type MaskType = {
  pasaporte: Array<string | RegExp>
  doc_identidad: Array<string | RegExp>
  telefono: Array<string | RegExp>
  email: Array<string | RegExp>
  date: Array<string | RegExp>
  id_cuenta: Array<string | RegExp>
}
export type FormatParameters = {
  value: string
  type: 'account' | 'cedula' | 'phone' | 'money'
  text?: string
  fix?: number
}

export type RequestStatusType = 'pending' | 'success' | 'error' | ''

export type FormatType =
  | 'account'
  | 'passport'
  | 'currency'
  | 'percent'
  | 'identity_doc'
  | 'plain_text'
  | 'phone'

export type FormatterParameters = {
  value: string | number
  type: FormatType
  textBefore?: string
  fix?: number
}

export type ResponseMetadata = {
  currentPage: number
  totalPages: number
  count: number
  totalRows: number
  pageSize: number
}

export type ApiReturnType<T = AnyType> = {
  data: T
  meta: ResponseMetadata
  message: string
}

export type ApiReturnPromise<T = AnyType> = Promise<
  AxiosResponse<ApiReturnType<T>>
>

export type DataSourceType = {
  color?: string
  id: React.Key
  label: React.ReactNode
  cambios: AnyType
}

export interface TabConfig {
  dataSource?: DataSourceType[]
  disabled?: boolean
  key: string
  label: string
  loading?: boolean
  title: string
  dot?: React.ReactNode
  dotColor?: string
}
