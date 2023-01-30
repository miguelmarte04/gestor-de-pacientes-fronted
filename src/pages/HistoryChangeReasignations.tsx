import React from 'react'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getHistoryChange } from '../slicers/employee/employee'
import { HistoryType } from '../slicers/employee/types'
import moment from 'moment'
import { formatter, removeFieldNotCondition } from '../utils/general'
import HistoryChangeSimple from '../components/HistoryChangeSimple'
import { ColumnType } from 'antd/lib/table'

const makeHistory = (data: HistoryType[]) => {
  const arr = [...(data ?? [])]

  return arr?.map((item) => ({
    id: item.id,
    label: ` Fecha Mod.: ${moment(item.fecha_cambio).format('DD/MM/YYYY')}`,
    cambios: removeFieldNotCondition(item.cambios, [
      'fecha_cambio',
      'fecha_insercion',
    ]),
  }))
}

const HistoryChangeReasignations = (): React.ReactElement => {
  const dispatch = useAppDispatch()

  const { historyChange, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )
  const columns: ColumnType<HistoryType>[] = [
    {
      key: 'fecha_cambio',
      title: 'Fecha de Cambio',
      align: 'center',
      dataIndex: 'fecha_cambio',
      fixed: 'left',
      render: (value) => moment(value).format('DD/MM/YYYY'),
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
      key: 'fecha_inicio',
      title: 'Fecha Inicio',
      dataIndex: 'fecha_inicio',
      render: (value) => moment(value).format('DD/MM/YYYY'),
    },
    {
      key: 'fecha_fin',
      title: 'Fecha Fin',
      dataIndex: 'fecha_fin',
      render: (value) => moment(value).format('DD/MM/YYYY'),
    },
    {
      key: 'sueldo_vacaciones',
      title: 'Sueldo Vacaciones',
      dataIndex: 'sueldo_vacaciones',
      render: (value) => moment(value).format('DD/MM/YYYY'),
    },
    {
      key: 'estado_vacaciones',
      title: 'Estado Vacaciones',
      dataIndex: 'estado_vacaciones',
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
      key: 'accion',
      title: 'Acción',
      align: 'center',
      dataIndex: 'accion',
      width: 110,
      fixed: 'right',
    },
  ]

  return (
    <CustomLayoutBoxShadow>
      <HistoryChangeSimple
        title="Historial de Cambios de Renuncias"
        fetching={fetchingFromEmployee}
        makeHistory={makeHistory}
        dataSource={historyChange}
        timelineHistoryTitle={
          historyChange[0]?.nombres
            ? `${historyChange[0]?.nombres} ${historyChange[0]?.apellidos}
          - ${formatter({
            value: historyChange[0]?.doc_identidad,
            type: 'identity_doc',
          })}`
            : ''
        }
        columns={columns}
        onChange={(employee) => {
          dispatch(
            getHistoryChange({
              condition: {
                id: employee?.id,
                tipo: 'renuncias',
              },
            })
          )
        }}
      />
    </CustomLayoutBoxShadow>
  )
}

export default HistoryChangeReasignations
