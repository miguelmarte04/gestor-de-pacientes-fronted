import { notification } from 'antd'
import moment from 'moment'
import {
  AnyType,
  FormatterParameters,
  NotificationType,
} from '../constants/types'
import { PacientesType } from '../slicers/general/types'

type NotificationParametersType = {
  title: string
  description: React.ReactNode
  type: NotificationType
  duration?: number
  onClick?: () => void
}
export const getActivityId = (): string =>
  `${window.sessionStorage.getItem('ID_ACTIVIDAD')}`
export const customModalButtonProps = {
  style: { borderRadius: '5px' },
  size: 'small' as const,
}
declare global {
  interface Array<T> {
    unique(key: keyof T): Array<T>
    orderBy(key: keyof T, order?: 'asc' | 'desc'): Array<T>
  }
}
Array.prototype.unique = function <T>(key: keyof T): Array<T> {
  if (key) {
    return this?.filter(
      (item: T, index: number) =>
        this?.findIndex((i: T) => i[key] === item[key]) === index
    )
  } else {
    return this?.filter(
      (item: T, index: number, self: T[]) => self.indexOf(item) === index
    )
  }
}

Array.prototype.orderBy = function <T>(key: keyof T, order = 'asc'): Array<T> {
  return this.sort((a: AnyType, b: AnyType) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
}
export const showNotification = (
  parameters: NotificationParametersType
): void => {
  notification[parameters.type]({
    message: parameters.title,
    description: parameters.description,
    onClick: parameters.onClick,
    duration: parameters.duration ? parameters.duration : 10,
  })
}
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 4 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
}

export const getAge = (date: string): number => {
  const today = new Date()
  const birthDate = new Date(date)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
export const ArrayOrderBy = (
  array: AnyType[],
  field: string,
  order: 'asc' | 'desc'
): AnyType[] => {
  return array?.sort((a, b) => {
    if (order === 'asc') {
      return a[field] > b[field] ? 1 : -1
    } else {
      return a[field] < b[field] ? 1 : -1
    }
  })
}

export function isEqual<T>(array: T[]): T[] {
  array.sort((a, b) => {
    return a['id'] > b['id'] ? 1 : -1
  })
  const keysArray = Object.keys(array[0])
  let previousChange = array[0]
  const finalArray: T[] = []

  for (let a = 0; a < array?.length; a++) {
    const currentObject = new Object() as T
    for (let i = 0; i < keysArray?.length; i++) {
      if (previousChange[keysArray[i]] === array[a][keysArray[i]]) {
        currentObject[`${keysArray[i]}`] = `${array[a][keysArray[i]]}`
      } else {
        currentObject[`${keysArray[i]}`] = `${array[a][keysArray[i]]}*`
      }
    }

    finalArray.push(currentObject)
    previousChange = array[a]
  }
  return finalArray
}

export const getDays = (start: AnyType, end: AnyType): number => {
  const startDate = moment(start)
  const endDate = moment(end)
  const days = endDate.diff(startDate, 'days')
  return days + 1
}

export const getOnlyUnique = (record: PacientesType[]): PacientesType[] => {
  //eliminar los null de la lista
  const filtered = record?.filter((el) => {
    return el?.id != null
  })
  for (let i = 0; i <= filtered?.length; i++)
    try {
      if (filtered?.[i]?.id === filtered?.[i - 1]?.id) {
        delete filtered?.[i]
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e, record)
    }

  return record
}

// recortar array a una longitud especifica
export const truncate = (array: AnyType, length: number): AnyType[] => {
  if (array?.length > length) {
    return array.slice(0, length)
  } else {
    return array
  }
}
export function addKeyToArray<T>(array: T[]): T[] {
  const newArray: T[] = []
  array?.forEach((item, index) => {
    newArray.push({ ...item, key: index })
  })
  return newArray
}
export const replaceAll = (
  str: string, // string a reemplazar
  find: string, // string a buscar
  replace: string // string por el que se reemplazara
): string => {
  return str?.replace(new RegExp(find, 'g'), replace)
}
export const deleteSpecialCharacters = (value: string): string => {
  return replaceAll(value, '-', '')
    ?.trimStart()
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, '')
    ?.replace(/[^a-zA-Z0-9 ]/g, '')
    ?.replace(/\s{2,}/g, ' ')
}
export function searchInArray<T, K extends keyof T>(
  array: T[],
  keys: K[],
  search: string,
  maxResults?: number,
  deleteSpecialChars = true
): T[] {
  const arraySearch = new Array<T>()

  addKeyToArray(array)?.forEach((item, index) => {
    keys?.forEach?.((key) => {
      const condition = String(item[key])?.trim()?.toLowerCase()
      if (
        deleteSpecialChars
          ? deleteSpecialCharacters(condition).search(
              deleteSpecialCharacters(search)?.toLowerCase()
            ) !== -1
          : condition?.search(search?.trim()?.toLowerCase()) !== -1
      ) {
        arraySearch.push({ ...item, index })
      }
    })
  })
  return maxResults
    ? arraySearch?.slice(0, maxResults)?.unique('key' as never)
    : arraySearch?.unique('key' as never)
}
//searchInArray para multiples keys y multiples search
export function searchInArrayMultiple<T, K extends keyof T>(
  array: T[],
  keys: K[],
  search: string[],
  maxResults?: number,
  deleteSpecialChars = true
): T[] {
  const arraySearch = new Array<T>()
  if (search?.length > 0) {
    addKeyToArray(array)?.forEach((item, index) => {
      keys?.forEach?.((key) => {
        const condition = String(item[key])?.trim()?.toLowerCase()
        search?.forEach((searchItem) => {
          if (
            deleteSpecialChars
              ? deleteSpecialCharacters(condition).search(
                  deleteSpecialCharacters(searchItem)?.toLowerCase()
                ) !== -1
              : condition?.search(searchItem?.trim()?.toLowerCase()) !== -1
          ) {
            arraySearch.push({ ...item, index })
          }
        })
      })
    })
    return maxResults
      ? arraySearch?.slice(0, maxResults)?.unique('key' as never)
      : arraySearch?.unique('key' as never)
  } else {
    return array
  }
}

//array de objetos eliminar objetos vacios
export const removeEmpty = (array: AnyType[]): AnyType[] => {
  const arrayClean: AnyType[] = []
  array.forEach((item) => {
    if (Object.keys(item)?.length > 0) {
      arrayClean.push(item)
    }
  })
  return arrayClean
}

export const formatMoneyNoDecimals = (
  number: number | string,
  decimalSeparator = '.',
  coin = 'RD$',
  thousandsSeparator = ','
): string => {
  const parts = `${number}`.split('.')
  return (
    `${coin} ` +
    parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator) +
    (parts[1] ? decimalSeparator + parts[1] : '')
  )
}

// 244765
export const styles = (backgroundColor = 'f0f2f5'): string => {
  const background = backgroundColor
  const backgroundTransparente = backgroundColor
    ? backgroundColor + 40
    : undefined
  const backgroundTransparente2 = backgroundColor
    ? backgroundColor + 80
    : undefined

  const style = `
  .ant-menu-inline .ant-menu-item:after,
.ant-menu-vertical-left .ant-menu-item:after,
.ant-menu-vertical-right .ant-menu-item:after,
.ant-menu-vertical .ant-menu-item:after {
  border-right: 3px solid ${background} !important;
}
thead[class*='ant-table-thead'] th {
  background-color:${background}  !important;
  font-weight: bold !important;
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
  background-color:${backgroundTransparente}  !important;
  color:${background} !important;

}
.ant-menu-light .ant-menu-item-active, .ant-menu-light .ant-menu-item:hover, .ant-menu-light .ant-menu-submenu-active, .ant-menu-light .ant-menu-submenu-title:hover, .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open {
  color:${background}  !important;
}
.ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow, .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-expand-icon{
  color:${background}  !important;
}
.ant-menu-submenu-selected{
  color:${background}  !important;
}
.ant-radio-inner::after{
  background-color: ${background} !important
}
.ant-radio-checked .ant-radio-inner{
  border-color: ${background} !important;
}
.ant-btn-primary{
  background-color: ${background} !important;
  border-color: ${background} !important;
}

.ant-pagination-item-active a,.ant-pagination-item-active{
  color: ${background} !important;
  border-color: ${background} !important;
}
.ant-input-search .ant-input:focus, .ant-input-search .ant-input:hover{
  border-color: ${background} !important;
}
.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today{
  border-color: ${background} !important;
}
.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date-today{
  background-color: ${backgroundTransparente2} !important;
}
.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date-today .ant-picker-calendar-date-value, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date .ant-picker-calendar-date-value, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date-today .ant-picker-calendar-date-value, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date .ant-picker-calendar-date-value{
  color: ${background} !important;
}
.ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-icon{
  background-color: ${background} !important;
  border-color: ${background} !important;
}
button.ant-btn.ant-btn-link.ant-btn-lg{
  color: white !important;
}
.ant-steps-item-finish .ant-steps-item-icon{
  border-color: ${background} !important;
}
.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon{
  color: ${background} !important;
}
.ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-description, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-subtitle, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-title{
  color: ${background} !important;
}
.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-icon{
  border-color: ${background} !important;
}
.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-icon .ant-steps-icon{
  color: ${background} !important;
}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after{
  background-color: ${background} !important;
}
.ant-input:hover{
  border-color: ${background} !important;
}
.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector{
  border-color: ${background} !important;
}
.ant-select-item-option-selected:not(.ant-select-item-option-disabled){

  background-color: ${backgroundTransparente2} !important;
}
.ant-select:not(.ant-select-disabled):hover .ant-select-selector{
  border-color: ${background} !important;
}
.ant-checkbox-checked .ant-checkbox-inner{
  background-color: ${background} !important;
  border-color: ${background} !important;
}
.ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner{
  background-color: ${backgroundTransparente2} !important;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
  color: ${background} !important;
  border-color: ${background} !important;
}
.ant-alert-info{
  background-color: ${background} !important;
  border-color: ${background} !important;
}
.ant-menu-item:active, .ant-menu-submenu-title:active{
  background-color: ${backgroundTransparente2} !important;
}
.ant-btn-link{
  color: ${background} !important;
}
.ant-btn-link[disabled]{
    color:rgb(69, 72, 71) !important    
}

  `
  return style
}

export const formatter = ({
  value: input,
  type,
  fix = 2,
  textBefore = 'RD',
}: FormatterParameters): string => {
  const value = input?.toString()
  const coinsRegexp =
    fix > 2 ? /\B(?=(\d{3})+(?!\d)+([^,])\.?)/g : /\B(?=(\d{3})+(?!\d)\.?)/g
  if (typeof value?.replace === 'function') {
    switch (type) {
      case 'account':
        return value?.length >= 11
          ? value?.replace(/(\d{3})(\d{3})(\d{7})(\d{1})/, '$1-$2-$3-$4')
          : value
      case 'passport':
      case 'identity_doc':
        if (value?.length === 11)
          return value?.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3')
        else if (!isNaN(Number(value)) && value?.length === 9)
          return value?.replace(/(\d{3})(\d{3})(\d{1})/, '$1-$2-$3')
        else return value?.toUpperCase()
      case 'currency': {
        return `${textBefore ? textBefore + '$' : ''} ${Number(
          value || 0
        ).toFixed(fix)}`?.replace(coinsRegexp, ',')
      }
      case 'percent':
        return `${Number(value).toFixed(fix)}%`
      case 'plain_text':
      case 'phone':
        return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      default:
        return value
    }
  }
  return value as string
}

// eliminar campo de un objeto
export const removeField = (obj: AnyType, field: string[]): AnyType => {
  const newObj = { ...obj }
  field?.forEach((item) => {
    delete newObj?.[item]
  })
  return { condition: { ...newObj } }
}
// remover campos de un objeto en un array
export const removeFieldArray = (obj: AnyType, field: string[]): AnyType => {
  const newObj = { ...obj }
  field?.forEach((item) => {
    delete newObj?.[item]
  })
  return { ...newObj }
}
export const removeFieldNotCondition = (
  obj: AnyType,
  field: string[]
): AnyType => {
  const newObj = { ...obj }
  field?.forEach((item) => {
    delete newObj?.[item]
  })
  return { ...newObj }
}

// eliminar los campos de un objeto que esten null o undefined
export const removeNullFields = (obj: AnyType): AnyType => {
  const newObj = { ...(obj?.condition ?? { ...obj }) }
  Object?.keys(newObj)?.forEach((key) => {
    if (newObj[key] === null || newObj[key] === undefined) {
      delete newObj[key]
    }
  })
  return obj?.condition ? { condition: { ...newObj } } : { ...newObj }
}

// generar id unico
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// unir varios base64 a string
export const base64ToString = (base64: AnyType[]): string => {
  let string = ''
  base64?.forEach((item) => {
    if (item.url !== undefined) {
      string += `${item?.url}->`
    }
  })
  return string
}

/**
 *  function to take the initials of the name and last name of the employee
 * and return it in uppercase
 */
export const getInitials = (name: string, lastName: string): string => {
  return `${name?.charAt(0)?.toUpperCase()}${lastName
    ?.charAt(0)
    ?.toUpperCase()}`
}
// elimianr los duplicados de un array de objetos por un campo
export function removeDuplicates<T, K extends keyof T>(
  array: T[],
  key: K
): T[] {
  const newArray = [...array]
  return newArray?.filter(
    (item, index, self) =>
      index === self?.findIndex((t) => t[key as string] === item[key as string])
  )
}
// filtrar un array de objetos por varios campos y valores de un objeto de busqueda omitiendo los campos search vacios
export function filterArray<T, K extends keyof T>(
  array: T[],
  search: AnyType[],
  fields: K[]
): T[] {
  const newArray = [...array]
  const newSearch = { ...search }
  const newFields = [...fields]
  const searchFields = Object?.keys(newSearch)?.filter(
    (item) => newSearch[item] !== ''
  )
  const searchValues = Object?.values(newSearch)?.filter((item) => item !== '')
  const searchFieldsValues = searchFields?.map((item, index) => {
    return { field: item, value: searchValues[index] }
  })
  const filterArray = newArray?.filter((item) => {
    return searchFieldsValues?.every((search) => {
      return newFields?.some((field) => {
        return item[field]
          ?.toString()
          ?.toLowerCase()
          ?.includes(search.value?.toString()?.toLowerCase())
      })
    })
  })
  return removeDuplicates(filterArray, 'id' as K)
}

/**
 * Esta función ordena un array de objetos por fecha, el nombre de la fecha sera indicada por la key
 * @param array array de objetos
 * @param key nombre de la key que contiene la fecha
 * @returns array de objetos ordenado por fecha
 */
export function sortByDate<T, K extends keyof T>(array: T[], key: K): T[] {
  const newArray = array?.[0] ? [...array] : []
  return newArray?.sort((a, b) => {
    const dateA = new Date(a[key as string]).getMonth()
    const dateB = new Date(b[key as string]).getMonth()

    return dateA - dateB
  })
}

export function filterByDate<T, K extends keyof T>(
  array: T[],
  key: K,
  startDate: string,
  endDate: string
): T[] {
  const newArray = [...array]
  return removeDuplicates(
    newArray?.filter((item) => {
      const date = new Date(item[key as string])
      return moment(date).isBetween(startDate, moment(endDate).add(1, 'days'))
    }),
    'id' as K
  )
}

// funcion para generar contraseña aleatoria de 8 caracteres apartir del nombre y apellido
export const generatePassword = (name: string, lastName: string): string => {
  const password = `${name?.charAt(0)?.toLowerCase()}${lastName
    ?.charAt(0)
    ?.toLowerCase()}${Math.random().toString(36).substr(2, 6)}`
  return password
}

export const removeFilters = (columns: AnyType[]): AnyType[] => {
  const newColumns = [...columns]
  return newColumns?.map((item) => {
    return {
      ...item,
      filters: undefined,
      align: 'center',
      className: 'print-column',
    }
  })
}

// filtrar array por fecha inicial
export const filterByDates = (
  array: AnyType[],
  keyInicio: string,
  keyFin: string,
  date: [moment.Moment, moment.Moment]
): AnyType[] => {
  const newArray = [...array]
  return newArray?.filter((item) => {
    const dateItemInicio = new Date(item[keyInicio])
    const dateItemFin = new Date(item[keyFin])
    return (
      moment(dateItemInicio).isSameOrAfter(date?.[0]) &&
      moment(dateItemFin).isSameOrBefore(date?.[1])
    )
  })
}

// [s: string] obtener el key y value de un objeto y retornarlos en un array
export const getKeyValue = (obj: AnyType): AnyType[] => {
  const newObj = { ...obj }
  return Object?.keys(newObj)?.map((key) => {
    return { key, value: newObj[key]?.[0] }
  })
}
