import React, { useEffect, useState } from 'react'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import { EmployeeType, getEmployeeHistoryChange } from '../slicers/employee'
import { AnyType } from '../constants/types'
import { useAppDispatch, useAppSelector } from '../hooks'
import HistoryChangeMultiple from '../components/HistoryChangeMultiple'
import { ColumnType } from 'antd/lib/table'
import moment from 'moment'
import { removeFieldNotCondition } from '../utils/general'

const columns: ColumnType<AnyType>[] = [
  {
    key: 'imagenes',
    title: 'Imagen',
    dataIndex: 'imagenes',
    align: 'center',
    render: (value: string) => (
      <img src={value} alt="imagen" style={{ width: '50px', height: '50px' }} />
    ),
  },
  {
    key: 'tipo_permiso',
    title: 'Tipo de Permiso',
    dataIndex: 'tipo_permiso',
  },
  {
    key: 'observaciones',
    title: 'Observaciones',
    dataIndex: 'observaciones',
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
const columnsLicences: ColumnType<AnyType>[] = [
  {
    key: 'imagenes',
    title: 'Imagen',
    dataIndex: 'imagenes',
    align: 'center',
    render: (value: string) => (
      <img src={value} alt="imagen" style={{ width: '50px', height: '50px' }} />
    ),
  },
  {
    key: 'tipo_licencia',
    title: 'Tipo de Licencia',
    dataIndex: 'tipo_licencia',
  },
  {
    key: 'observaciones',
    title: 'Observaciones',
    dataIndex: 'observaciones',
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

const makeHistory = (data: AnyType, type: string) => {
  const arr = [...(data ?? [])]

  return type === 'permisos'
    ? arr.map((item) => ({
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
    : type === 'licencias'
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
    : []
}

const ChangeHistory = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const { employeeHistoryChange, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )

  const { historial_permisos: permisos, historial_licencias: licencias } =
    employeeHistoryChange

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
      key: 'permisos',
      label: 'Permisos',
      title: 'Permisos',
      loading: fetchingFromEmployee,
      dataSource: makeHistory(permisos, 'permisos'),
      dataSourceTabla: permisos,
      columns: [...columns],
      scrollSize: 800,
    },
    {
      key: 'Licencias',
      label: 'Licencias',
      title: 'Licencias',
      loading: fetchingFromEmployee,
      dataSource: makeHistory(licencias, 'licencias'),
      dataSourceTabla: licencias,
      columns: [...columnsLicences],
      scrollSize: 800,
    },
  ]

  return (
    <CustomLayoutBoxShadow>
      <HistoryChangeMultiple
        title="Historial de Cambios de Permisos y Licencias"
        fetching={fetchingFromEmployee}
        tabs={tabs}
        timelineHistoryTitle={'prueba'}
        onChange={(value) => setEmployeeSelected(value)}
      />
    </CustomLayoutBoxShadow>
  )
}

export default ChangeHistory
