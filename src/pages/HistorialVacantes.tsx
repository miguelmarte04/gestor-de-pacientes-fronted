import React from 'react'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import { useAppSelector } from '../hooks'
import { HistoryType } from '../slicers/employee/types'
import moment from 'moment'
import { formatter, removeFieldNotCondition } from '../utils/general'
import HistoryChangeSimple from '../components/HistoryChangeSimple'
import { ColumnType } from 'antd/lib/table'
import { useDispatch } from 'react-redux'
import { getHistoryChange } from '../slicers/employee/employee'

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

const HistorialVacantes = (): React.ReactElement => {
  const dispatch = useDispatch()
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
      key: 'nombre',
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      key: 'puesto',
      title: 'Puesto',
      dataIndex: 'puesto',
    },
    {
      key: 'correo_contacto',
      title: 'Correo de Contacto',
      dataIndex: 'correo_contacto',
    },
    {
      key: 'estado_publicacion',
      title: 'Estado de Publicación',
      dataIndex: 'estado_publicacion',
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
        title="Historial de Cambios Reclutamiento"
        fetching={fetchingFromEmployee}
        makeHistory={makeHistory}
        tipo="vacantes"
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
        onChange={(item) => {
          dispatch(
            getHistoryChange({
              condition: {
                id: item.id,
                tipo: 'vacantes',
              },
            })
          )
        }}
      />
    </CustomLayoutBoxShadow>
  )
}

export default HistorialVacantes
