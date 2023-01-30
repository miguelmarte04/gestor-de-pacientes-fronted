import { AnyType } from '../../constants/types'

export type ChangesHistory = {
  id: number
  fecha_cambio: string
  cambio: string
}

export type EmployeeHistoryType = {
  historial_empleado: ChangesHistory[]
  historial_licencias: ChangesHistory[]
  historial_permisos: ChangesHistory[]
  historial_info_academica: ChangesHistory[]
  historial_contacto_emergencia: ChangesHistory[]
  historial_direcciones_empleado: ChangesHistory[]
  historial_telefonos_empleado: ChangesHistory[]
  historial_correos_electronicos_empleado: ChangesHistory[]
  historial_documentos_empleado: ChangesHistory[]
  historial_aumentos_sueldo: ChangesHistory[]
}
export type EmployeeHistoryNominasType = {
  historial_nominas: ChangesHistory[]
  historial_detalles_nomina: ChangesHistory[]
  historial_tipos_nominas: ChangesHistory[]
  historial_descuentos_empleados: ChangesHistory[]
  historial_descuentos_fijos: ChangesHistory[]
  historial_ingresos_empleados: ChangesHistory[]
}
export type HistoryType = {
  id?: number
  id_falta?: number
  id_tipo_nomina?: number
  id_empleado?: number
  id_tipo_falta?: number
  tipo_nomina?: string
  observaciones?: string
  banco?: string
  descuentos_empleado?: string
  ingresos_empleados?: string
  descuentos_fijos?: string
  fecha_insercion?: string
  fecha_cambio?: string
  usuario_insercion?: string
  estado?: string
  accion?: string
  tipo_falta?: string
  nombres?: string
  apellidos?: string
  doc_identidad?: string
  cambios?: AnyType
}

export type EmployeeType = {
  apellidos: string
  apodo: string
  cargo: string
  nivel_academico: string
  doc_identidad: string
  estado: string
  fecha_contratacion: string
  fecha_insercion: string
  fecha_nacimiento: string
  honorifico: string
  estado_civil: string
  id: number
  departamento?: number
  id_cargo: number
  id_departamento: number
  id_estado_civil: number
  id_jornada_trabajo: number
  id_pais: number
  id_privilegios: number
  id_tipo_pago: number
  id_tipo_sangre: number
  imagen: string
  lugar_nacimiento: string
  nombres: string
  sexo: string
  sueldo: number
  tipo_doc_identidad: string
  ultimo_inicio_sesion: string
  usuario: string
  usuario_insercion: string
  pass?: string
}
export type NominaType = {
  id: number
  estado: string
  fecha_insercion: string
  estado_nomina: string
  descripcion: string
  fecha_registro: string
  id_tipo_nomina: number
  tipo_nomina: string
  nomina: string
  usuario_insercion: string
  sueldos_pagar: string
}
export type DetNominaType = {
  apellidos: string
  AFP: number
  SFS: number
  ISR: number
  preaviso: number
  cesantia: number
  regalia: number
  descuento: number
  departamento: string
  cargo: string
  doc_identidad: string
  estado: string
  fecha_insercion: string
  id: number
  id_empleado: number
  id_nomina: number
  imagen: string
  ingresos: number
  nombres: string
  sexo: string
  fecha_nacimiento: string
  salario_bruto: number
  sueldo_neto: number
  usuario_insercion: string
  total_descuento: number
}
export type SolicitarVacacionesType = {
  id: number
  id_empleado: number
  fecha_inicio: string
  fecha_fin: string
  solicitudVacaciones: string
  apellidos: string
  nombres: string
  usuario_insercion: string
  fecha_insercion: string
  estado_solicitud: string
  estado: string
}
export type DataEmployeeType = {
  id?: string
  id_empresa: number
  nombres: string
  honorifico?: string
  id_tipo_pago?: number
  numero_cuenta_electronica?: string
  apellidos: string
  id_tipo_sangre: number
  sexo: string
  doc_identidad: string
  lugar_nacimiento: string
  fecha_nacimiento: string
  nacionalidad: string
  id_pais: number
  id_estado_civil: number
  id_nivel_academico: number
  sueldo: number
  id_cargo: number
  pass?: string
  puesto: string
  id_jornada_trabajo: number
  id_departamento: number
  cedula_cara1?: string
  cedula_cara2?: string
  privilegios: string
  pasaporte: string
  usuario: string
  fecha_contratacion: string
  usuario_insercion?: string
  estado?: string
  ultima_fecha_insercion?: string
  hora_entrada?: string
}

export type AcademicType = {
  id?: string
  id_empleado?: string
  id_empresa: number
  id_nivel_academico?: number
  institucion?: string
  fecha_finalizacion?: string
  observaciones?: string
  estado?: string
}

export type EmailType = {
  id?: number
  id_empleado?: number
  correo_electronico?: string
  estado?: string
  tipo_correo_electronico?: string
  principal: 0 | 1
}
export type PermissionType = {
  apellidos: string
  doc_identidad: string
  estado: string
  fecha_fin: string
  fecha_inicio: string
  fecha_insercion: string
  id: number
  id_empleado: number
  id_tipo_permiso?: number
  id_tipo_licencia?: number
  imagen_Empleado: string
  imagenes: string
  nombres: string
  observaciones: string
  tipo_permiso: string
  tipo_licencia: string
  usuario_insercion: string
}
export type TypePermissionType = {
  estado: string
  fecha_insercion: string
  id: number
  tipo_permiso?: string
  tipo_licencia?: string
  usuario_insercion: string
}
export type LayoffsType = {
  id: number
  id_empleado: number
  id_departamento: number
  id_tipo_razon_despido: number
  doc_identidad: number
  nombres: string
  apellidos: string
  preaviso: number
  regalia: number
  cesantia: number
  total_prestaciones: number
  usuario_insercion: string
  tipo_razon: string
  imagen_Empleado: string
  fecha_insercion: string
  estado: string
}
export type ResignationType = {
  id: number
  id_empleado: number
  id_tipo_razon_renuncia: number
  id_departamento: number
  doc_identidad: number
  nombres: string
  apellidos: string
  sueldo_vacaciones: number
  regalia: number
  total_prestaciones: number
  usuario_insercion: string
  tipo_razon: string
  imagen_Empleado: string
  imagen: string
  fecha_insercion: string
  estado: string
}
export type TypeLayoffsType = {
  id: number
  tipo_razon: string
  usuario_insercion: string
  fecha_insercion: string
  estado: string
}
export type TypeResignationsType = {
  id: number
  tipo_razon: string
  usuario_insercion: string
  fecha_insercion: string
  estado: string
}
export type TypeLacksType = {
  estado: string
  fecha_insercion: string
  id: number
  tipo_falta?: string
  usuario_insercion: string
}

export type EmergencyContactType = {
  id: number
  id_empleado: number
  id_parentesco: number
  nombre: string
  parentesco?: string
  direccion: string
  telefono: string
  estado: string
  accion?: string
}

export type EmploymentDataType = {
  id_departamento?: number
  id_jornada_trabajo?: number
  id_cargo?: number

  sueldo?: string
  fecha_contratacion?: string
  id?: number
}

export type PhoneType = {
  id_empleado: number
  id?: number
  telefono: string
  id_tipo_telefono?: number
  tipo_telefono?: string
  estado: string
  principal: 0 | 1
}

export type ValidateIdType = {
  existe: number
  datosEmpleado: EmployeeType
}

export type UpdateStateEmployeeType = {
  id_empleado: number
  id?: number
  estado: string
}

export type AddressType = {
  id: number
  id_empleado: number
  id_pais: number
  id_provincia: number
  calle: string
  no_casa: number
  info_adicional: string
  estado: string
  pais?: string
  provincia?: string
}

export type AbsencesType = {
  id: number
  id_empleado: number
  id_tipo_ausencia: number
  tipo_ausencia?: string
  fecha: string
  observacion: string
  usuario_insercion: string
  estado: string
}

export type DelayType = {
  id: number
  id_empleado: number
  fecha: string
  motivo: string
  hora_llegada: string
  observacion: string
  usuario_insercion: string
  estado: string
}

export type HolidaysType = {
  id: number
  id_empleado: number
  fecha_fin: string
  fecha_inicio: string
  sueldo_vacaciones: number
  observacion: string
  estado_vacaciones: string
  fecha_insercion: string
  usuario_insercion: string
  estado: string
  doc_identidad: string
  nombres: string
  apellidos: string
  imagen: string
}

export type DiscountsType = {
  id: number
  id_empleado: number
  id_tipo_nomina: number
  sueldo_bruto: number
  sueldo_anual: number
  ISR: number
  AFP: number
  SFS: number
  total_descuento: number
  sueldo_neto: number
  fecha_insercion: string
  usuario_insercion: string
  estado: string
}

export type DescuentosFijosType = {
  descripcion?: string
  empleado: number
  fecha_inicio: string
  fecha_vence: string
  id: number
  id_descripcion_descuento: number
  id_empleado: number
  institucion: number
  pendiente: number
  estado: string
}

export type DiscountsDescriptionType = {
  id: number
  descripcion: string
  estado: string
}

export type PermissionsType = {
  id: number
  id_empleado: number
  fecha_fin: string
  id_tipo_permiso: number
  id_departamento: number
  fecha_inicio: string
  fecha_insercion: string
  observacion: string
  usuario_insercion: string
  estado: string
  nombres: string
  tipo_permiso: string
  tipo_licencia: string
  apellidos: string
  doc_identidad: string
}
export type LacksType = {
  id: number
  id_empleado: number
  id_tipo_falta: number
  fecha_insercion: string
  tipo_falta: string
  observaciones: string
  usuario_insercion: string
  estado: string
  nombres: string
  apellidos: string
  imagen_Empleado: string
  doc_identidad: string
}

export type EmployeeSummaryType = {
  contacto_emergencia: EmergencyContactType[]
  correos_electronicos_empleado: EmailType[]
  direcciones_empleado: AddressType[]
  empleado: EmployeeType[]
  info_academica: AcademicType[]
  telefonos_empleado: PhoneType[]
}

export type SummaryType = {
  apodo: string
  cargo: string
  cedula: string
  departamento: string
  direccion: string
  doc_identidad: string
  email: string
  estado_civil: string
  estado: string
  fecha_contratacion: string
  fecha_ingreso: string
  fecha_nacimiento: string
  habilidades: string
  imagen: string
  jornada_trabajo: string
  nacionalidad: string
  nivel_academico: string
  nombre: string
  tipo_nomina: string
  pais: string
  privilegios: string
  sexo: string
  sueldo: string
  supervisor: string
  tipo_sangre: string
  telefonos: PhoneType[]
  info_academica: AcademicType[]
  emails: EmailType[]
  direcciones: AddressType[]
  contacto_emergencia: EmergencyContactType[]
}

export type DocTypesType = {
  id: number
  descripcion: string
  estado: string
}

export type DocumentsType = {
  documento: string
  estado: string
  fecha_insercion?: string
  id_empleado: number
  id_tipo_documento: number
  id: number
  usuario_insercion?: string
  descripcion?: string
}
export type DescuentosEmpleadosType = {
  id?: number
  id_nomina?: number
  id_empleado?: number
  nombre?: string
  monto?: number
  descripcion?: string
  usuario_insercion?: string
  fecha_insercion?: string
  estado?: string
}
export type IngresosEmpleadoType = {
  id?: number
  id_nomina?: number
  id_empleado?: number
  nombre?: string
  monto?: number
  descripcion?: string
  usuario_insercion?: string
  fecha_insercion?: string
  estado?: string
}

export type ChargesType = {
  cargo: string
  estado: string
  fecha_insercion?: string
  id: number
  id_departamento: number
  sueldo_maximo: number
  sueldo_minimo: number
  usuario_insercion?: string
}

export interface ConfigPayload {
  estado: string
  descripcion: string
  tipo: string
  usuario_insercion: string
  id?: number
  tipo_razon?: string
  tipo_falta?: string
  tipo_licencia?: string
  tipo_permiso?: string
  fecha_insercion?: number
}
