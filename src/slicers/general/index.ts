import generalReducer, {
  generalSelector,
  GeneralState,
  getConsultas,
  getDoctores,
  resetAction,
} from './general'

import {
  AcademicLevelType,
  BloodType,
  CargosType,
  CivilStateType,
  ConsultasType,
  CountriesType,
  DoctoresType,
  ElationShipType,
  InfoEmpresaType,
  PaymentType,
  PayrollType,
  PersonDataType,
  ProvincesType,
  RelationshipType,
  TypesPermissions,
} from './types'

export { getConsultas, getDoctores, resetAction, generalSelector }

export type {
  PersonDataType,
  BloodType,
  AcademicLevelType,
  TypesPermissions,
  CivilStateType,
  CountriesType,
  ConsultasType,
  PaymentType,
  CargosType,
  PayrollType,
  DoctoresType,
  ElationShipType,
  ProvincesType,
  InfoEmpresaType,
  RelationshipType,
  GeneralState,
}

export default generalReducer
