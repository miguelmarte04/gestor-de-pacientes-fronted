import React, { useEffect, useState } from 'react'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import { EmployeeType, getEmployeeHistoryChange } from '../slicers/employee'
import { AnyType } from '../constants/types'
import { useAppDispatch, useAppSelector } from '../hooks'
import HistoryChangeMultiple from '../components/HistoryChangeMultiple'
import { ColumnType } from 'antd/lib/table'
import moment from 'moment'
import { formatter, removeFieldNotCondition } from '../utils/general'

const columns: ColumnType<AnyType>[] = [
  {
    key: 'imagen',
    title: 'Imagen',
    dataIndex: 'imagen',
    align: 'center',
    render: (value: string) => (
      <img src={value} alt="imagen" style={{ width: '50px', height: '50px' }} />
    ),
  },
  {
    key: 'nombres',
    title: 'Nombres',
    dataIndex: 'nombres',
  },
  {
    key: 'apellidos',
    title: 'Apellidos',
    dataIndex: 'apellidos',
  },
  {
    key: 'apodo',
    title: 'Apodo',
    dataIndex: 'apodo',
  },
  {
    key: 'doc_identidad',
    title: 'Doc. Identidad',
    dataIndex: 'doc_identidad',
    render: (value: string) =>
      formatter({ value: value, type: 'identity_doc' }),
  },
  {
    key: 'cargo',
    title: 'Cargo',
    dataIndex: 'cargo',
  },
  {
    key: 'jornada_trabajo',
    title: 'Jornada de Trabajo',
    dataIndex: 'jornada_trabajo',
  },
  {
    key: 'lugar_nacimiento',
    title: 'Lugar de Nacimiento',
    dataIndex: 'lugar_nacimiento',
  },
  {
    key: 'pais',
    title: 'Pais',
    dataIndex: 'pais',
  },
  {
    key: 'sexo',
    title: 'Sexo',
    dataIndex: 'sexo',
    render: (value: string) => (value === 'M' ? 'Masculino' : 'Femenino'),
  },
  {
    key: 'sueldo',
    title: 'Sueldo',
    dataIndex: 'sueldo',
    render: (value: string) => formatter({ value: value, type: 'currency' }),
  },
  {
    key: 'tipo_sangre',
    title: 'Tipo de Sangre',
    dataIndex: 'tipo_sangre',
  },
  {
    key: 'usuario',
    title: 'Usuario',
    dataIndex: 'usuario',
  },
  {
    key: 'departamento',
    title: 'Departamento',
    dataIndex: 'departamento',
  },
  {
    key: 'estado_civil',
    title: 'Estado Civil',
    dataIndex: 'estado_civil',
  },
  {
    key: 'fecha_nacimiento',
    title: 'Fecha de Nacimiento',
    dataIndex: 'fecha_nacimiento',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },
  {
    key: 'honorifico',
    title: 'Honorifico',
    dataIndex: 'honorifico',
    render: (value: string) => (value === 'N' ? 'No' : 'Si'),
  },
  {
    key: 'fecha_contratacion',
    title: 'Fecha Contratacion',
    dataIndex: 'fecha_contratacion',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },
  {
    key: 'estado',
    title: 'Estado',
    dataIndex: 'estado',
  },
  {
    key: 'usuario',
    title: 'Usuario de Inserción',
    align: 'center',
    dataIndex: 'usuario',
    width: 110,
    fixed: 'right',
  },
  {
    key: 'fecha_cambio',
    title: 'Fecha de Cambio',
    align: 'center',
    dataIndex: 'fecha_cambio',
    width: 110,
    fixed: 'right',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },

  {
    key: 'accion',
    title: 'Acción',
    align: 'center',
    dataIndex: 'accion',
    width: 110,
    fixed: 'right',
  },
]
const columnsAddress: ColumnType<AnyType>[] = [
  {
    key: 'pais',
    title: 'Pais',
    dataIndex: 'pais',
  },
  {
    key: 'provincia',
    title: 'Provincia',
    dataIndex: 'provincia',
  },
  {
    key: 'calle',
    title: 'Calle',
    dataIndex: 'calle',
  },
  {
    key: 'no_casa',
    title: 'No. Casa',
    dataIndex: 'no_casa',
  },
  {
    key: 'info_adicional',
    title: 'Info. Adicional',
    dataIndex: 'info_adicional',
  },

  {
    key: 'estado',
    title: 'Estado',
    dataIndex: 'estado',
  },
  {
    key: 'usuario_insercion',
    title: 'Usuario de Inserción',
    align: 'center',
    dataIndex: 'usuario_insercion',
    width: 100,
    fixed: 'right',
  },
  {
    key: 'fecha_cambio',
    title: 'Fecha de Cambio',
    align: 'center',
    dataIndex: 'fecha_cambio',
    width: 100,
    fixed: 'right',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },

  {
    key: 'accion',
    title: 'Acción',
    align: 'center',
    dataIndex: 'accion',
    width: 110,
    fixed: 'right',
  },
]
const columnsPhones: ColumnType<AnyType>[] = [
  {
    key: 'telefono',
    title: 'Telefono',
    dataIndex: 'telefono',
  },
  {
    key: 'tipo_telefono',
    title: 'Tipo de Telefono',
    dataIndex: 'tipo_telefono',
  },
  {
    key: 'principal',
    title: 'Principal',
    dataIndex: 'principal',
    render: (value: number) => (value === 0 ? 'No' : 'Si'),
  },

  {
    key: 'estado',
    title: 'Estado',
    dataIndex: 'estado',
  },
  {
    key: 'usuario_insercion',
    title: 'Usuario de Inserción',
    align: 'center',
    dataIndex: 'usuario_insercion',
    width: 100,
    fixed: 'right',
  },
  {
    key: 'fecha_cambio',
    title: 'Fecha de Cambio',
    align: 'center',
    dataIndex: 'fecha_cambio',
    width: 100,
    fixed: 'right',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },

  {
    key: 'accion',
    title: 'Acción',
    align: 'center',
    dataIndex: 'accion',
    width: 110,
    fixed: 'right',
  },
]
const columnsEmails: ColumnType<AnyType>[] = [
  {
    key: 'correo_electronico',
    title: 'Correo Electronico',
    dataIndex: 'correo_electronico',
  },

  {
    key: 'principal',
    title: 'Principal',
    dataIndex: 'principal',
    render: (value: number) => (value === 0 ? 'No' : 'Si'),
  },

  {
    key: 'estado',
    title: 'Estado',
    dataIndex: 'estado',
  },
  {
    key: 'usuario_insercion',
    title: 'Usuario de Inserción',
    align: 'center',
    dataIndex: 'usuario_insercion',
    width: 100,
    fixed: 'right',
  },
  {
    key: 'fecha_cambio',
    title: 'Fecha de Cambio',
    align: 'center',
    dataIndex: 'fecha_cambio',
    width: 100,
    fixed: 'right',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },

  {
    key: 'accion',
    title: 'Acción',
    align: 'center',
    dataIndex: 'accion',
    width: 110,
    fixed: 'right',
  },
]
const columnsDocuments: ColumnType<AnyType>[] = [
  {
    key: 'documento',
    title: 'Documento',
    dataIndex: 'documento',
    render: (value: string) => (
      <img src={value} alt="imagen" style={{ width: '50px', height: '50px' }} />
    ),
  },

  {
    key: 'descripcion',
    title: 'Tipo de Documento',
    dataIndex: 'descripcion',
  },

  {
    key: 'estado',
    title: 'Estado',
    dataIndex: 'estado',
  },
  {
    key: 'usuario_insercion',
    title: 'Usuario de Inserción',
    align: 'center',
    dataIndex: 'usuario_insercion',
    width: 100,
    fixed: 'right',
  },
  {
    key: 'fecha_cambio',
    title: 'Fecha de Cambio',
    align: 'center',
    dataIndex: 'fecha_cambio',
    width: 100,
    fixed: 'right',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },

  {
    key: 'accion',
    title: 'Acción',
    align: 'center',
    dataIndex: 'accion',
    width: 110,
    fixed: 'right',
  },
]
const columnsAumentoSueldo: ColumnType<AnyType>[] = [
  {
    key: 'nombres',
    title: 'Nombres',
    dataIndex: 'nombres',
  },
  {
    key: 'apellidos',
    title: 'Apellidos',
    dataIndex: 'apellidos',
  },
  {
    key: 'anterior_sueldo',
    title: 'Sueldo Anterior',
    dataIndex: 'anterior_sueldo',
    render: (value: number) => formatter({ value: value, type: 'currency' }),
  },
  {
    key: 'nuevo_sueldo',
    title: 'Nuevo Sueldo',
    dataIndex: 'nuevo_sueldo',
    render: (value: number) => formatter({ value: value, type: 'currency' }),
  },

  {
    key: 'usuario_insercion',
    title: 'Usuario de Inserción',
    align: 'center',
    dataIndex: 'usuario_insercion',
    width: 100,
    fixed: 'right',
  },
  {
    key: 'fecha_insercion',
    title: 'Fecha de Inserción',
    align: 'center',
    dataIndex: 'fecha_insercion',
    width: 100,
    fixed: 'right',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },
  {
    key: 'estado',
    title: 'Estado',
    dataIndex: 'estado',
    fixed: 'right',
  },
]

const makeHistory = (data: AnyType, type: string) => {
  const arr = [...(data ?? [])]

  return type === 'general'
    ? arr.map((item) => ({
        id: item.id,
        label: `${item.usuario_insercion} - ${moment(item.fecha_cambio).format(
          'DD/MM/YYYY'
        )}`,
        date: item.ultima_fecha_insercion,
        cambios: removeFieldNotCondition(item.cambios, [
          'fecha_cambio',
          'fecha_insercion',
          'pass',
          'ultimo_inicio_sesion',
        ]),
      }))
    : type === 'address'
    ? arr.map((item) => ({
        id: item.id,
        label: item.pais,
        date: item.fecha_insercion,
        cambios: removeFieldNotCondition(item.cambios, [
          'fecha_cambio',
          'fecha_insercion',
        ]),
      }))
    : type === 'phones'
    ? arr.map((item) => ({
        id: item.id,
        label: `${item.usuario_insercion} - ${moment(item.fecha_cambio).format(
          'DD/MM/YYYY'
        )}`,
        date: item.fecha_insercion,
        cambios: removeFieldNotCondition(item.cambios, [
          'fecha_cambio',
          'fecha_insercion',
        ]),
      }))
    : type === 'emails'
    ? arr.map((item) => ({
        id: item.id,
        label: `${item.usuario_insercion} - ${moment(item.fecha_cambio).format(
          'DD/MM/YYYY'
        )}`,
        date: item.fecha_insercion,
        cambios: removeFieldNotCondition(item.cambios, [
          'fecha_cambio',
          'fecha_insercion',
        ]),
      }))
    : type === 'documents'
    ? arr.map((item) => ({
        id: item.id,
        label: `${item.usuario_insercion} - ${moment(item.fecha_cambio).format(
          'DD/MM/YYYY'
        )}`,
        date: item.fecha_insercion,
        cambios: removeFieldNotCondition(item.cambios, [
          'fecha_cambio',
          'fecha_insercion',
          'documento',
        ]),
      }))
    : type === 'aumento_sueldo'
    ? arr.map((item) => ({
        id: item.id,
        label: `${item.usuario_insercion} - ${moment(item.fecha_cambio).format(
          'DD/MM/YYYY'
        )}`,
        date: item.fecha_insercion,
        cambios: removeFieldNotCondition(item.cambios, [
          'fecha_cambio',
          'fecha_insercion',
          'documento',
        ]),
      }))
    : []
}

const ChangeHistory = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const { employeeHistoryChange, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )

  const {
    historial_empleado: general,
    historial_correos_electronicos_empleado: emails,
    historial_telefonos_empleado: phones,
    historial_direcciones_empleado: addresses,
    historial_documentos_empleado: documents,
    historial_aumentos_sueldo: aumento_sueldo,
  } = employeeHistoryChange

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

  const tabs: AnyType[] = [
    {
      key: 'datos_generales',
      label: 'Empleado',
      title: 'Datos Generales',
      loading: fetchingFromEmployee,
      dataSource: makeHistory(general, 'general'),
      dataSourceTabla: general,
      columns: [...columns],
    },
    {
      key: 'direcciones',
      label: 'Direcciones',
      title: 'Direcciones',
      loading: fetchingFromEmployee,
      dataSource: makeHistory(addresses, 'address'),
      dataSourceTabla: addresses,
      columns: [...columnsAddress],
      scrollSize: 1000,
    },
    {
      key: 'telefonos',
      label: 'Telefonos',
      title: 'Telefonos',
      dataSource: makeHistory(phones, 'phones'),
      dataSourceTabla: phones,
      columns: [...columnsPhones],
      scrollSize: 900,
    },
    {
      key: 'emails',
      label: 'Correos',
      title: 'Correos',
      dataSource: makeHistory(emails, 'emails'),
      dataSourceTabla: emails,
      columns: [...columnsEmails],
      scrollSize: 800,
    },
    {
      key: 'documentos',
      label: 'Documentos',
      title: 'Documentos',
      dataSource: makeHistory(documents, 'documents'),
      dataSourceTabla: documents,
      columns: [...columnsDocuments],
      scrollSize: 700,
    },
    {
      key: 'aumento_sueldo',
      label: 'Aumento de Sueldo',
      title: 'Aumento de Sueldo',
      dataSource: makeHistory(aumento_sueldo, 'aumento_sueldo'),
      dataSourceTabla: aumento_sueldo,
      columns: [...columnsAumentoSueldo],
      scrollSize: 700,
    },
  ]

  return (
    <CustomLayoutBoxShadow>
      <HistoryChangeMultiple
        title="Historial de Cambios de Empleados"
        fetching={fetchingFromEmployee}
        tabs={tabs}
        timelineHistoryTitle={'prueba'}
        onChange={(value) => setEmployeeSelected(value)}
      />
    </CustomLayoutBoxShadow>
  )
}

export default ChangeHistory
