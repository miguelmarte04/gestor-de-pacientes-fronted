import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import {
  AcademicType,
  AddressType,
  DiscountsType,
  EmailType,
  EmergencyContactType,
  EmployeeType,
  getEmployeeHistoryChange,
} from '../slicers/employee'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomRow from '../components/CustomRow'
import CustomTable from '../components/CustomTable'
import CustomTitle from '../components/CustomTitle'
import { colors, format } from '../constants/general'
import { ColumnType } from 'antd/lib/table'
import CustomSpin from '../components/CustomSpin'
import moment from 'moment'
import { AnyType } from '../constants/types'
import { ArrayOrderBy, isEqual } from '../utils/general'
import CustomCollapse from '../components/CustomCollapse'
import CustomPanel from '../components/CustomPanel'
import CustomColorLegendSquared from '../components/CustomColorLegendSquared'
import CustomSearchEmployee from '../components/CustomSearchEmployee'
import CustomForm from '../components/CustomForm'
import { useForm } from 'antd/lib/form/Form'
import CustomFormItem from '../components/CustomFormItem'
import { useAppDispatch, useAppSelector } from '../hooks'

const HistoryChangeEmployee = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [form] = useForm()
  const { employeeHistoryChange, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  useEffect(() => {
    employeeSelected?.doc_identidad &&
      dispatch(
        getEmployeeHistoryChange({
          condition: {
            doc_identidad: employeeSelected?.doc_identidad?.replaceAll('-', ''),
          },
        })
      )
  }, [employeeSelected])

  const columns: ColumnType<EmployeeType>[] = [
    {
      key: 'id',
      title: 'id',
      dataIndex: 'id',
      fixed: 'left',
      align: 'center',
      width: 100,
      render: (text: string) => text.replace('*', ''),
    },
    {
      key: 'fecha_cambio',
      title: 'Fecha de Cambio',
      align: 'center',
      dataIndex: 'fecha_cambio',
      fixed: 'left',
      render: (text: string) => {
        return moment(text?.replace('*', '')).format('DD/MM/YYYY: hh:mm a')
      },
      width: 100,
    },
    {
      key: 'nombres',
      title: 'Nombres',
      align: 'center',
      dataIndex: 'nombres',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'apellidos',
      title: 'Apellidos',
      align: 'center',
      dataIndex: 'apellidos',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'doc_identidad',
      title: 'Doc. Identidad',
      align: 'center',
      dataIndex: 'doc_identidad',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: (
                  <div>
                    {format({ value: text.replace('*', ''), type: 'cedula' })}
                  </div>
                ),
              }
            : format({ value: text, type: 'cedula' })
        } else {
          return ''
        }
      },
    },
    {
      key: 'cedula_cara1',
      title: 'Cedula Cara 1',
      dataIndex: 'cedula_cara1',
      align: 'center',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*') ? (
            {
              props: {
                style: {
                  border: `5px dotted ${colors.danger}`,
                  fontWeight: 'bold',
                },
              },
              children: (
                <div>
                  <Image width={'80px'} src={text.replace('*', '')} />
                </div>
              ),
            }
          ) : (
            <Image width={'80px'} src={text} />
          )
        } else {
          return ''
        }
      },
    },
    {
      key: 'cedula_cara2',
      title: 'Cedula Cara 2',
      align: 'center',
      dataIndex: 'cedula_cara2',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*') ? (
            {
              props: {
                style: {
                  border: `5px dotted ${colors.danger}`,
                  fontWeight: 'bold',
                },
              },
              children: (
                <div>
                  <Image width={'80px'} src={text.replace('*', '')} />
                </div>
              ),
            }
          ) : (
            <Image width={'80px'} src={text} />
          )
        } else {
          return ''
        }
      },
    },
    {
      key: 'lugar_nacimiento',
      title: 'Lugar de Nacimiento',
      align: 'center',
      dataIndex: 'lugar_nacimiento',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'fecha_nacimiento',
      title: 'Fecha de Nacimiento',
      align: 'center',
      dataIndex: 'fecha_nacimiento',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: (
                  <div>
                    {moment(text.replace('*', '')).format('DD/MM/YYYY')}
                  </div>
                ),
              }
            : moment(text.replace('*', '')).format('DD/MM/YYYY')
        } else {
          return ''
        }
      },
    },
    {
      key: 'nacionalidad',
      title: 'País',
      dataIndex: 'nacionalidad',
      width: 100,
      align: 'center',

      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'tipo_sangre',
      title: 'Tipo de Sangre',
      dataIndex: 'tipo_sangre',
      width: 100,
      align: 'center',

      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'sexo',
      title: 'Sexo',
      align: 'center',
      dataIndex: 'sexo',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: (
                  <div>
                    {text.replace('*', '') === 'M' ? 'Masculino' : 'Femenino'}
                  </div>
                ),
              }
            : text === 'M'
            ? 'Masculino'
            : 'Femenino'
        } else {
          return ''
        }
      },
    },
    {
      key: 'sueldo',
      title: 'Sueldo',
      align: 'center',
      dataIndex: 'sueldo',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: (
                  <div>
                    {format({
                      value: text.replace('*', ''),
                      type: 'money',
                      text: 'RD',
                    })}
                  </div>
                ),
              }
            : format({
                value: text,
                type: 'money',
                text: 'RD',
              })
        } else {
          return ''
        }
      },
    },
    {
      key: 'puesto',
      title: 'Puesto',
      align: 'center',
      dataIndex: 'puesto',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'departamento',
      title: 'Departamento',
      align: 'center',
      dataIndex: 'departamento',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'estado_civil',
      title: 'Estado Civil',
      align: 'center',
      dataIndex: 'estado_civil',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'jornada_trabajo',
      title: 'Jornada de Trabajo',
      align: 'center',
      dataIndex: 'jornada_trabajo',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'hora_entrada',
      title: 'Hora de Entrada',
      align: 'center',
      dataIndex: 'hora_entrada',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: (
                  <div>
                    {moment(text.replace('*', ''), 'h:mm').format('h:mm a')}
                  </div>
                ),
              }
            : moment(text, 'h:mm').format('h:mm a')
        } else {
          return ''
        }
      },
    },
    {
      key: 'privilegios',
      title: 'Privilegios',
      align: 'center',
      dataIndex: 'privilegios',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'nomina',
      title: 'Nomina',
      align: 'center',
      dataIndex: 'nomina',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'cargo',
      title: 'Cargo',
      align: 'center',
      dataIndex: 'cargo',
      width: 100,
      render: (text: string) => {
        if (text?.length > 0) {
          return text.includes('*')
            ? {
                props: {
                  style: {
                    border: `5px dotted ${colors.danger}`,
                    fontWeight: 'bold',
                  },
                },
                children: <div>{text.replace('*', '')}</div>,
              }
            : text
        } else {
          return ''
        }
      },
    },
    {
      key: 'pasaporte',
      title: 'Pasaporte',
      align: 'center',
      dataIndex: 'pasaporte',
      width: 100,
      render: (text: string) => {
        if (text === null) {
          return ''
        } else {
          if (text?.length > 0) {
            return text.includes('*')
              ? {
                  props: {
                    style: {
                      border: `5px dotted ${colors.danger}`,
                      fontWeight: 'bold',
                    },
                  },
                  children: <div>{text.replace('*', '')}</div>,
                }
              : text
          } else {
            return ''
          }
        }
      },
    },
    {
      key: 'usuario_insercion',
      title: 'Usuario de Inserción',
      align: 'center',
      dataIndex: 'usuario_insercion',
      width: 100,
      fixed: 'right',
      render: (text: string) => {
        return text.replace('*', '')
      },
    },
    {
      key: 'accion',
      title: 'Acción',
      align: 'center',
      dataIndex: 'accion',
      width: 100,
      fixed: 'right',
      render: (text: string) => {
        return text?.replace('*', '')
      },
    },
  ]

  const columnsAcademic: ColumnType<AcademicType>[] = [
    {
      key: 'fecha_cambio',
      title: 'Fecha de Cambio',
      align: 'center',
      dataIndex: 'fecha_cambio',
      fixed: 'left',
      render: (text: string) => {
        return moment(text).format('DD/MM/YYYY: hh:mm a')
      },
      width: 170,
    },
    {
      key: 'nivel_academico',
      title: 'Nivel Academico',
      dataIndex: 'nivel_academico',
      width: 130,
    },
    {
      key: 'institucion',
      title: 'Institución',
      dataIndex: 'institucion',
      width: '30%',
    },

    {
      key: 'fecha_finalizacion',
      title: 'Fecha Finalización',
      dataIndex: 'fecha_finalizacion',
      width: 100,
      render: (text: string) => {
        return moment(text).format('DD/MM/YYYY')
      },
    },
    {
      key: 'observaciones',
      title: 'Observaciones',
      dataIndex: 'observaciones',
      width: 200,
    },
    {
      key: 'estado',
      title: 'Estado',
      dataIndex: 'estado',
      width: 100,
    },
    {
      key: 'usuario_insercion',
      title: 'Usuario de Inserción',
      dataIndex: 'usuario_insercion',
      width: 110,
      fixed: 'right',
    },
    {
      key: 'accion',
      title: 'Acción',
      align: 'center',
      dataIndex: 'accion',
      width: 100,
      fixed: 'right',
      render: (text: string) => {
        return text?.replace('*', '')
      },
    },
  ]
  const columnsContactEmergency: ColumnType<EmergencyContactType>[] = [
    {
      key: 'fecha_cambio',
      title: 'Fecha de Cambio',
      align: 'center',
      dataIndex: 'fecha_cambio',
      fixed: 'left',
      render: (text: string) => {
        return moment(text?.replace('*', '')).format('DD/MM/YYYY: hh:mm a')
      },
      width: 160,
    },
    {
      key: 'nombre',
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      key: 'telefono',
      title: 'Teléfono',
      dataIndex: 'telefono',
      width: '30%',
      render: (text: string) => {
        return format({ value: text, type: 'phone' })
      },
    },
    {
      key: 'direccion',
      title: 'Dirección',
      dataIndex: 'direccion',
    },
    {
      key: 'parentesco',
      title: 'Parentesco',
      dataIndex: 'parentesco',
    },
    {
      key: 'usuario_insercion',
      title: 'Usuario de Inserción',
      align: 'center',
      dataIndex: 'usuario_insercion',
      width: 110,
      fixed: 'right',
      render: (text: string) => {
        return text.replace('*', '')
      },
    },
    {
      key: 'accion',
      title: 'Acción',
      align: 'center',
      dataIndex: 'accion',
      width: 110,
      fixed: 'right',
      render: (text: string) => {
        return text?.replace('*', '')
      },
    },
  ]

  const columnsDirection: ColumnType<AddressType>[] = [
    {
      key: 'fecha_cambio',
      title: 'Fecha de Cambio',
      align: 'center',
      dataIndex: 'fecha_cambio',
      fixed: 'left',
      width: 25,
      render: (text: string) => {
        return moment(text).format('DD/MM/YYYY: hh:mm a')
      },
    },
    {
      key: 'DIRECCION',
      title: 'Dirección',
      width: 100,
      dataIndex: 'DIRECCION',
      render: (_, record) => {
        return (
          <div
            style={{
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 'bold',
            }}
          >
            <label>{`CASA NO.${record.no_casa}, Calle ${record.calle}, ${record.provincia}, ${record.pais}, ${record.info_adicional}`}</label>
          </div>
        )
      },
    },
    {
      key: 'usuario_insercion',
      title: 'Usuario de Inserción',
      align: 'center',
      dataIndex: 'usuario_insercion',
      fixed: 'right',
      width: 15,
    },
    {
      key: 'accion',
      title: 'Acción',
      align: 'center',
      dataIndex: 'accion',
      width: 20,
      fixed: 'right',
      render: (text: string) => {
        return text?.replace('*', '')
      },
    },
  ]
  const columnsPhone: ColumnType<AnyType>[] = [
    {
      key: 'fecha_cambio',
      title: 'Fecha de Cambio',
      align: 'center',
      dataIndex: 'fecha_cambio',
      fixed: 'left',
      width: 50,
      render: (text: string) => {
        return moment(text).format('DD/MM/YYYY: hh:mm a')
      },
    },
    {
      key: 'tipo_telefono',
      title: 'Tipo de Teléfono',
      dataIndex: 'tipo_telefono',
      width: 70,
    },
    {
      key: 'telefono',
      title: 'Teléfono',
      dataIndex: 'telefono',
      width: 60,
      render: (text: string) => {
        return format({ value: text, type: 'phone' })
      },
    },
    {
      key: 'usuario_insercion',
      title: 'Usuario de Inserción',
      align: 'center',
      dataIndex: 'usuario_insercion',
      fixed: 'right',
      width: 50,
    },
  ]
  const columnsCorreo: ColumnType<EmailType>[] = [
    {
      key: 'fecha_cambio',
      title: 'Fecha de Cambio',
      align: 'center',
      dataIndex: 'fecha_cambio',
      fixed: 'left',
      width: 30,
      render: (text: string) => {
        return moment(text).format('DD/MM/YYYY: hh:mm a')
      },
    },
    {
      key: 'correo_electronico',
      title: 'Correo Electrónico',
      dataIndex: 'correo_electronico',
      render: (text: string, record) => (
        <span>{`${text}@${record.tipo_correo_electronico}`}</span>
      ),
      width: 75,
    },
    {
      key: 'usuario_insercion',
      title: 'Usuario de Inserción',
      align: 'center',
      dataIndex: 'usuario_insercion',
      fixed: 'right',
      width: 30,
    },
  ]
  const columnsDescuentos: ColumnType<DiscountsType>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      key: 'fecha_cambio',
      title: 'Fecha de Cambio',
      align: 'center',
      dataIndex: 'fecha_cambio',
      fixed: 'left',

      render: (text: string) => {
        return moment(text).format('DD/MM/YYYY: hh:mm a')
      },
    },
    {
      key: 'descripcion',
      title: 'Descripción',
      dataIndex: 'descripcion',
    },

    {
      key: 'inicio',
      title: 'Inicio',
      dataIndex: 'inicio',
      render(fecha: string) {
        return moment(fecha).format('DD/MM/YYYY')
      },
    },
    {
      key: 'vence',
      title: 'Vence',
      dataIndex: 'vence',
      render(fecha: string) {
        return moment(fecha).format('DD/MM/YYYY')
      },
    },
    {
      key: 'empleado',
      title: 'Empleado',
      dataIndex: 'empleado',
      render(empleado: string) {
        return format({
          value: `${empleado}`,
          type: 'money',
          text: 'RD',
        })
      },
    },
    {
      key: 'institucion',
      title: 'Institución',
      dataIndex: 'institucion',
      render(institucion: string) {
        return format({
          value: `${institucion}`,
          type: 'money',
          text: 'RD',
        })
      },
    },
    {
      key: 'pendiente',
      title: 'Pendiente',
      dataIndex: 'pendiente',
      render(pendiente: string) {
        return format({
          value: `${pendiente}`,
          type: 'money',
          text: 'RD',
        })
      },
    },
    {
      key: 'estado',
      title: 'Estado',
      dataIndex: 'estado',
      align: 'center',
    },
    {
      key: 'usuario_insercion',
      title: 'Usuario de Inserción',
      align: 'center',
      dataIndex: 'usuario_insercion',
      width: 100,
      fixed: 'right',
      render: (text: string) => {
        return text.replace('*', '')
      },
    },
    {
      key: 'accion',
      title: 'Acción',
      align: 'center',
      dataIndex: 'accion',
      width: 100,
      fixed: 'right',
      render: (text: string) => {
        return text.replace('*', '')
      },
    },
  ]

  const dataSourceEmployee =
    employeeHistoryChange.historial_empleado?.length > 0
      ? isEqual(employeeHistoryChange.historial_empleado)
      : []

  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomForm form={form}>
          <CustomRow justify="space-between">
            <CustomDivider orientation={'left'}>
              <CustomTitle>Historial de Cambios</CustomTitle>
            </CustomDivider>
            <CustomCol xs={24}>
              <CustomRow justify="space-between">
                <h3>
                  {employeeSelected?.doc_identidad !== undefined
                    ? `${format({
                        value: employeeSelected?.doc_identidad,
                        type: 'cedula',
                      })} | ${employeeSelected?.nombres} ${
                        employeeSelected?.apellidos
                      }`
                    : null}
                </h3>
                {/* <CustomFormItem name={'SEARCH_EMPLOYEE'} noStyle>
                  <CustomSearchEmployee
                    width={'40%'}
                    showInitialValue
                    style={{ marginBottom: '2%' }}
                    placeholder={'Buscar por: documento de identidad o nombres'}
                    onSelect={(_, employee) => {
                      // eslint-disable-next-line no-console
                      console.log(employee)
                      setEmployeeSelected(employee)
                    }}
                  />
                </CustomFormItem> */}
                <CustomFormItem name={'SEARCH_EMPLOYEE'} noStyle>
                  <CustomSearchEmployee
                    width={'40%'}
                    showInitialValue
                    style={{ marginBottom: '2%' }}
                    placeholder={'Buscar por: documento de identidad o nombres'}
                    onSelect={(_, employee) => {
                      setEmployeeSelected(employee)
                    }}
                  />
                </CustomFormItem>
              </CustomRow>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomRow justify={'start'} gutter={[10, 0]}>
                <CustomColorLegendSquared
                  color={colors.danger}
                  label="Datos Alterados"
                />
              </CustomRow>
            </CustomCol>
            <CustomCollapse style={{ width: '100%', marginTop: '2%' }}>
              <CustomPanel
                key={'1'}
                header={<CustomTitle>Datos Generales</CustomTitle>}
              >
                <CustomCol xs={24}>
                  <CustomTable
                    columns={columns}
                    dataSource={ArrayOrderBy(dataSourceEmployee, 'id', 'desc')}
                    rowKey={(row) => row.id}
                    scroll={{ x: 2000 }}
                    // pagination={{ pageSize: 3 }}
                  />
                </CustomCol>
              </CustomPanel>
            </CustomCollapse>
            <CustomCollapse style={{ width: '100%', marginTop: '2%' }}>
              <CustomPanel
                key={'2'}
                header={<CustomTitle>Datos Académicos</CustomTitle>}
              >
                <CustomCol xs={24}>
                  <CustomTable
                    columns={columnsAcademic}
                    dataSource={
                      employeeHistoryChange.historial_empleado?.length > 0
                        ? ArrayOrderBy(
                            employeeHistoryChange?.historial_info_academica,
                            'id',
                            'desc'
                          )
                        : []
                    }
                    rowKey={(row) => row.id}
                    scroll={{ x: 1000 }}
                    // pagination={{ pageSize: 5 }}
                  />
                </CustomCol>
              </CustomPanel>
            </CustomCollapse>
            <CustomCollapse style={{ width: '100%', marginTop: '2%' }}>
              <CustomPanel
                key={'2'}
                header={<CustomTitle>Descuentos</CustomTitle>}
              >
                <CustomCol xs={24}>
                  <CustomTable
                    columns={columnsDescuentos}
                    rowKey={(row) => row.id}
                    scroll={{ x: 1000 }}
                    // pagination={{ pageSize: 5 }}
                  />
                </CustomCol>
              </CustomPanel>
            </CustomCollapse>
            <CustomCollapse style={{ width: '100%', marginTop: '2%' }}>
              <CustomPanel
                key={'3'}
                header={<CustomTitle>Contactos de Emergencia</CustomTitle>}
              >
                <CustomCol xs={24}>
                  <CustomTable
                    columns={columnsContactEmergency}
                    scroll={{ x: 1000 }}
                    dataSource={
                      employeeHistoryChange?.historial_contacto_emergencia
                        ?.length > 0
                        ? ArrayOrderBy(
                            employeeHistoryChange?.historial_contacto_emergencia,
                            'id',
                            'desc'
                          )
                        : []
                    }
                    rowKey={(row) => row.id}
                    // pagination={{ pageSize: 5 }}
                  />
                </CustomCol>
              </CustomPanel>
            </CustomCollapse>
            <CustomCollapse style={{ width: '100%', marginTop: '2%' }}>
              <CustomPanel
                key={'4'}
                header={<CustomTitle>Direcciones</CustomTitle>}
              >
                <CustomCol xs={24}>
                  <CustomTable
                    columns={columnsDirection}
                    scroll={{ x: 1000 }}
                    dataSource={
                      employeeHistoryChange?.historial_direcciones_empleado
                        ?.length > 0
                        ? ArrayOrderBy(
                            employeeHistoryChange?.historial_direcciones_empleado,
                            'id',
                            'desc'
                          )
                        : []
                    }
                    rowKey={(row) => row.id}
                    // pagination={{ pageSize: 5 }}
                  />
                </CustomCol>
              </CustomPanel>
            </CustomCollapse>
            <CustomCollapse style={{ width: '100%', marginTop: '2%' }}>
              <CustomPanel
                key={'5'}
                header={<CustomTitle>Datos de Contacto</CustomTitle>}
              >
                <CustomCol xs={24}>
                  <CustomRow justify="space-between" align="top">
                    <CustomCol xs={11}>
                      <CustomDivider orientation={'left'}>
                        <CustomTitle>Teléfonos</CustomTitle>
                      </CustomDivider>

                      <CustomTable
                        columns={columnsPhone}
                        dataSource={
                          employeeHistoryChange?.historial_telefonos_empleado
                            ?.length > 0
                            ? ArrayOrderBy(
                                employeeHistoryChange?.historial_telefonos_empleado,
                                'id',
                                'desc'
                              )
                            : []
                        }
                        scroll={{ x: 500 }}
                        rowKey={(row) => row.id}
                        // pagination={{ pageSize: 5 }}
                      />
                    </CustomCol>
                    <CustomCol xs={11}>
                      <CustomDivider orientation={'left'}>
                        <CustomTitle>Correo Electrónico</CustomTitle>
                      </CustomDivider>

                      <CustomTable
                        columns={columnsCorreo}
                        scroll={{ x: 500 }}
                        dataSource={
                          employeeHistoryChange
                            ?.historial_correos_electronicos_empleado?.length >
                          0
                            ? ArrayOrderBy(
                                employeeHistoryChange?.historial_correos_electronicos_empleado,
                                'id',
                                'desc'
                              )
                            : []
                        }
                        rowKey={(row) => row.id}
                        // pagination={{ pageSize: 5 }}
                      />
                    </CustomCol>
                  </CustomRow>
                </CustomCol>
              </CustomPanel>
            </CustomCollapse>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default HistoryChangeEmployee
