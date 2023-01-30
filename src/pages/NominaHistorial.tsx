import React, { useEffect, useState } from 'react'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import { EmployeeType } from '../slicers/employee'
import { AnyType } from '../constants/types'
import { useAppDispatch, useAppSelector } from '../hooks'
import HistoryChangeMultiple from '../components/HistoryChangeMultiple'
import { ColumnType } from 'antd/lib/table'
import moment from 'moment'
import { formatter, removeFieldNotCondition } from '../utils/general'
import { getNominasHistoryChange } from '../slicers/employee/employee'

const columns: ColumnType<AnyType>[] = [
  {
    key: 'id_nomina',
    title: 'ID',
    dataIndex: 'id_nomina',
  },
  {
    key: 'tipo_nomina',
    title: 'Tipo de Nómina',
    dataIndex: 'tipo_nomina',
  },

  {
    key: 'fecha_registro',
    title: 'Fecha de Registro',
    dataIndex: 'fecha_registro',
    render: (value: string) =>
      value !== null ? moment(value).format('DD/MM/YYYY') : 'No definida',
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
const columnsDetallesNomina: ColumnType<AnyType>[] = [
  {
    key: 'nombres',
    title: 'Nombre',
    dataIndex: 'nombres',
  },
  {
    key: 'apellidos',
    title: 'Apellido',
    dataIndex: 'apellidos',
  },
  {
    key: 'id_nomina',
    title: 'ID',
    dataIndex: 'id_nomina',
  },
  {
    key: 'salario_bruto',
    title: 'Salario Bruto',
    dataIndex: 'salario_bruto',
  },

  {
    key: 'fecha_registro',
    title: 'Fecha de Registro',
    dataIndex: 'fecha_registro',
    render: (value: string) =>
      value !== null ? moment(value).format('DD/MM/YYYY') : 'No definida',
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
    key: 'tipo_nomina',
    title: 'Tipo de Nomina',
    dataIndex: 'tipo_nomina',
  },
  {
    key: 'descuentos_fijos',
    title: 'Permite Descuentos Fijos',
    dataIndex: 'descuentos_fijos',
    render: (value: string) => (value === 'S' ? 'Si' : 'No'),
  },
  {
    key: 'descuentos_empleado',
    title: 'Permite agregarle descuentos',
    dataIndex: 'descuentos_empleado',
    render: (value: string) => (value === 'S' ? 'Si' : 'No'),
  },
  {
    key: 'ingresos_empleados',
    title: 'Permite agregarle Ingresos',
    dataIndex: 'ingresos_empleados',
    render: (value: string) => (value === 'S' ? 'Si' : 'No'),
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
    key: 'tipo_nomina',
    title: 'Tipo de Nomina',
    dataIndex: 'tipo_nomina',
  },
  {
    key: 'nombres',
    title: 'Nombre',
    dataIndex: 'nombres',
  },
  {
    key: 'apellidos',
    title: 'Apellido',
    dataIndex: 'apellidos',
  },
  {
    key: 'AFP',
    title: 'AFP',
    dataIndex: 'AFP',
    render: (value: string) => formatter({ value, type: 'currency' }),
  },
  {
    key: 'ISR',
    title: 'ISR',
    dataIndex: 'ISR',
    render: (value: string) => formatter({ value, type: 'currency' }),
  },
  {
    key: 'SFS',
    title: 'SFS',
    dataIndex: 'SFS',
    render: (value: string) => formatter({ value, type: 'currency' }),
  },
  {
    key: 'sueldo_anual',
    title: 'Sueldo Anual',
    dataIndex: 'sueldo_anual',
    render: (value: string) => formatter({ value, type: 'currency' }),
  },
  {
    key: 'sueldo_bruto',
    title: 'Sueldo Bruto',
    dataIndex: 'sueldo_bruto',
    render: (value: string) => formatter({ value, type: 'currency' }),
  },
  {
    key: 'sueldo_neto',
    title: 'Sueldo Neto',
    dataIndex: 'sueldo_neto',
    render: (value: string) => formatter({ value, type: 'currency' }),
  },
  {
    key: 'total_descuento',
    title: 'Total Descuento',
    dataIndex: 'total_descuento',
    render: (value: string) => formatter({ value, type: 'currency' }),
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
    key: 'nombres',
    title: 'Nombre',
    dataIndex: 'nombres',
  },
  {
    key: 'apellidos',
    title: 'Apellido',
    dataIndex: 'apellidos',
  },
  {
    key: 'nombre',
    title: 'Descuento',
    dataIndex: 'nombre',
  },
  {
    key: 'monto',
    title: 'Monto',
    dataIndex: 'monto',
    render: (value: string) => formatter({ value, type: 'currency' }),
  },
  {
    key: 'descripcion',
    title: 'Descripción',
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
const columnsDocuments: ColumnType<AnyType>[] = [
  {
    key: 'nombres',
    title: 'Nombre',
    dataIndex: 'nombres',
  },
  {
    key: 'apellidos',
    title: 'Apellido',
    dataIndex: 'apellidos',
  },
  {
    key: 'nombre',
    title: 'Descuento',
    dataIndex: 'nombre',
  },
  {
    key: 'monto',
    title: 'Monto',
    dataIndex: 'monto',
    render: (value: string) => formatter({ value, type: 'currency' }),
  },
  {
    key: 'descripcion',
    title: 'Descripción',
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

const makeHistory = (data: AnyType, type: string) => {
  const arr = [...(data ?? [])]

  return type === 'nomina'
    ? arr?.map((item) => ({
        id: item.id,
        label: `${item.usuario_insercion} - ${moment(item.fecha_cambio).format(
          'DD/MM/YYYY'
        )}`,
        date: item.ultima_fecha_insercion,
        cambios: removeFieldNotCondition(item.cambios, [
          'fecha_cambio',
          'fecha_insercion',
        ]),
      }))
    : type === 'detalle_nomina'
    ? arr?.map((item) => ({
        id: item.id,
        label: `${item.usuario_insercion} - ${moment(item.fecha_cambio).format(
          'DD/MM/YYYY'
        )}`,
        date: item.ultima_fecha_insercion,
        cambios: removeFieldNotCondition(item.cambios, [
          'fecha_cambio',
          'fecha_insercion',
        ]),
      }))
    : type === 'tipos_nominas'
    ? arr?.map((item) => ({
        id: item.id,
        label: `${item.tipo_nomina} - ${moment(item.fecha_cambio).format(
          'DD/MM/YYYY'
        )}`,
        date: item.fecha_insercion,
        cambios: removeFieldNotCondition(item.cambios, [
          'fecha_cambio',
          'fecha_insercion',
        ]),
      }))
    : type === 'descuentos_fijos'
    ? arr?.map((item) => ({
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
    : type === 'descuentos_variables'
    ? arr?.map((item) => ({
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
    : type === 'ingresos_empleados'
    ? arr?.map((item) => ({
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

const NominaHistorial = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const { employeeHistoryChangeNominas, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )
  const {
    historial_descuentos_empleados,
    historial_descuentos_fijos,
    historial_detalles_nomina,
    historial_ingresos_empleados,
    historial_nominas,
    historial_tipos_nominas,
  } = employeeHistoryChangeNominas

  useEffect(() => {
    employeeSelected?.doc_identidad &&
      dispatch(
        getNominasHistoryChange({
          condition: {
            id: 29,
          },
        })
      )
  }, [employeeSelected])

  const tabs: AnyType[] = [
    {
      key: 'nomina',
      label: 'Nomina',
      title: 'Nomina',
      loading: fetchingFromEmployee,
      dataSource: makeHistory(historial_nominas, 'nomina'),
      dataSourceTabla: historial_nominas,
      columns: [...columns],
      scrollSize: 800,
    },
    {
      key: 'detalle_nomina',
      label: 'Detalle Nomina',
      title: 'Detalle Nomina',
      loading: fetchingFromEmployee,
      dataSource: makeHistory(historial_detalles_nomina, 'detalle_nomina'),
      dataSourceTabla: historial_detalles_nomina,
      columns: [...columnsDetallesNomina],
      scrollSize: 1000,
    },
    {
      key: 'tipos_nominas',
      label: 'Tipos de Nominas',
      title: 'Tipos de Nominas',
      loading: fetchingFromEmployee,
      dataSource: makeHistory(historial_tipos_nominas, 'tipos_nominas'),
      dataSourceTabla: historial_tipos_nominas,
      columns: [...columnsAddress],
      scrollSize: 800,
    },
    {
      key: 'descuentos_fijos',
      label: 'Descuentos Fijos',
      title: 'Descuentos Fijos',
      dataSource: makeHistory(historial_descuentos_fijos, 'descuentos_fijos'),
      dataSourceTabla: historial_descuentos_fijos,
      columns: [...columnsPhones],
      scrollSize: 2000,
    },
    {
      key: 'descuentos_variables',
      label: 'Descuentos Variables',
      title: 'Descuentos Variables',
      dataSource: makeHistory(
        historial_descuentos_empleados,
        'descuentos_variables'
      ),
      dataSourceTabla: historial_descuentos_empleados,
      columns: [...columnsEmails],
      scrollSize: 1000,
    },
    {
      key: 'ingresos_empleados',
      label: 'Ingresos Empleados',
      title: 'Ingresos Empleados',
      dataSource: makeHistory(
        historial_ingresos_empleados,
        'ingresos_empleados'
      ),
      dataSourceTabla: historial_ingresos_empleados,
      columns: [...columnsDocuments],
      scrollSize: 1000,
    },
  ]

  return (
    <CustomLayoutBoxShadow>
      <HistoryChangeMultiple
        title="Historial de Cambios de Nomina"
        fetching={fetchingFromEmployee}
        tabs={tabs}
        timelineHistoryTitle={'prueba'}
        onChange={(value) => setEmployeeSelected(value)}
      />
    </CustomLayoutBoxShadow>
  )
}

export default NominaHistorial
