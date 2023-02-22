import { UploadFile } from 'antd'

export type PacientesType = {
  apellidos: string
  cedula: string
  email: string
  estado: string
  fecha_insercion: string
  fecha_nacimiento: string
  id: number
  id_nacionalidad: number
  id_seguro: number
  imagen: string
  nacionalidad: string
  nombres: string
  seguro: string
  sexo: string
  telefono: string
}
export type NacionalidadesType = {
  id: number
  nombre: string
  estado: string
}
export type EspecilidadesType = {
  id: number
  nombre: string
  fecha_insercion: string
  estado: string
}
export type SegurosType = {
  id: number
  nombre: string
  fecha_insercion: string
  estado: string
}
export type HorariosType = {
  id: number
  id_doctor: number
  nombre: string
  nombre_doctor: string
  tanda_manana: string
  tanda_tarde: string
  fecha_insercion: string
  estado: string
}
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

export type ConsultasType = {
  apellido_doctor: string
  apellido_paciente: string
  asunto: string
  cedula: string
  estado: string
  fecha_insercion: string
  fin: string
  id: number
  id_doctor: number
  id_paciente: number
  inicio: string
  nombre_doctor: string
  nombre_paciente: string
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

export type DoctoresType = {
  apellido: string
  cedula: string
  clave: string
  correo: string
  nacionalidad: string
  especialidad: string
  estado: string
  fecha_insercion: string
  fecha_nacimiento: string
  id: number
  id_especialidad: number
  id_nacionalidad: number
  imagen: string
  nombre: string
  sexo: string
  telefono: string
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
