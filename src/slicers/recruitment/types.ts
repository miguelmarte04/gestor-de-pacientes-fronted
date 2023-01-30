export type VacancyType = {
  id: number
  nombre: string
  descripcion: string
  estado_publicacion: string
  fecha_insercion?: string
  estado: string
  puesto: string
  candidatos: number
  id_departamento: number
  correo_contacto?: string
  fecha_limite?: string
  usuario_insercion?: string
  key?: string
  index?: string
}

export type CandidateType = {
  id: number
  experiencia: number
  estado: string
  nombres?: string
  apellidos?: string
  id_vacante?: number
  nivel_academico?: string
  nombre: string
  fecha_insercion?: string
  telefono?: string
  comentario?: string
}
