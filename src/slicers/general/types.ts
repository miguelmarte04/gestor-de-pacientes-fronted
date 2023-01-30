import { UploadFile } from 'antd'

export type PersonDataType = {
  person_id: number
  identification: string
  name: string
  last_name_one: string
  last_name_two: string
  date_birth: string
  place_birth: string
  nationality: string
  category: string
  province: string
  municipality: string
  sector: string
  address: string
}

export type BloodType = {
  id: number
  tipo_sangre: string
  estado: string
}

export type AcademicLevelType = {
  id: number
  nivel_academico: string
  estado: string
}

export type TypesPermissions = {
  id: number
  tipo_permiso: string
  estado: string
}

export type CivilStateType = {
  id: number
  estado_civil: string
  estado: string
}

export type CountriesType = {
  id: number
  pais: string
  estado: string
}

export type DepartmentsType = {
  id: number
  departamento: string
  estado: string
  nombres: string
  apellidos: string
  tipo_nomina?: string
  doc_identidad: string
}

export type PaymentType = {
  id: number
  tipo_pago: string
  estado: string
}

export type CargosType = {
  cargo: string
  estado: string
  fecha_insercion: string
  id: number
  id_departamento: number
  sueldo_maximo: number
  sueldo_minimo: number
  usuario_insercion: string
}
export type CustomUploadFileType = UploadFile & {
  id?: React.Key
}
export type PayrollType = {
  id: number
  nomina: string
  estado: string
}

export type WorkingDayType = {
  id: number
  jornada_trabajo: string
  estado: string
}
export type TiposNominasType = {
  id: number
  tipo_nomina: string
  estado: string
}

export type ElationShipType = {
  id: number
  parentesco: string
  estado: string
}

export type ProvincesType = {
  id: number
  id_pais?: number
  provincia: number
  estado: string
}

export type InfoEmpresaType = {
  id: number
  nombre_empresa: string
  logo: string
  estado: string
  background_color: string
}

export type RelationshipType = {
  DESC_PARENTESCO?: string
  ESTADO?: string
  FECHA_ACTUALIZACION?: string
  FECHA_INSERCION?: string
  ID_EMPRESA?: string
  ID_LISTA_TIPO_PARENTESCO?: number
  ID_PARENTESCO?: string
  ID_TIPO_PARENTESCO?: string
  TR_ORIGEN?: string
  USUARIO_ACTUALIZACION?: string
  USUARIO_INSERCION?: string
}
