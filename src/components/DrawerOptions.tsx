/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HomeOutlined,
  LineChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  APPROVE_LAYOFFS,
  APPROVE_REASIGNATIONS,
  APROBAR_NOMINA,
  APROBAR_SOLICITUD_VACACIONES,
  AUMENTO_SUELDO,
  AUTORIZAR_NOMINA,
  CAMBIAR_DEPARTAMENTO,
  CANDIDATES_HISTORY,
  CANDIDATES_PATH,
  CANDIDATES_REPORT,
  CARTA_REGISTRO_EMPLEADOS,
  CHANGE_HISTORY_DEPARTMENTS,
  CHANGE_HISTORY_FAULTS,
  CHANGE_HISTORY_LAYOFFS,
  CHANGE_HISTORY_REASIGNATIONS,
  CONSULTAR_NOMINA,
  EMPLOYEES,
  EMPLOYEES_BIRTHDAY,
  EMPLOYEES_HISTORY,
  GENERAR_CONTRATO,
  HISTORIAL_NOMINA,
  HISTORY_OF_CONFIGURATION_CHANGES,
  INFO_EMPRESA,
  INFORME_DESPIDO,
  INFORME_FALTAS,
  INFORME_LICENCIA,
  INFORME_PERMISOS,
  INFORME_RENUNCIAS,
  INFORME_VACACIONES,
  PATH_LOGIN,
  PERMIT_OR_LICENSE_CHANGE_HISTORY,
  RECORD_PERMIT_OR_LICENSE,
  REGISTER_OR_MODIFY_CONFIGURATION,
  REGISTER_OR_MODIFY_DEPARTMENTS,
  REGISTER_OR_MODIFY_FAULTS,
  REGISTER_OR_MODIFY_LAYOFFS,
  REGISTER_OR_MODIFY_REASIGNATIONS,
  REGISTRAR_NOMINA,
  REVERSAR_NOMINA,
  SOLICITAR_VACACIONES,
  TIPOS_NOMINA,
  VACANCIES_PATH,
  VACATIONS_CHANGE_HISTORY,
  VACATIONS_CONSULTATION,
} from '../constants/Routes'
import CustomMenu from './CustomMenu'
import CustomMenuItem from './CustomMenuItem'
import CustomMenuItemGroup from './CustomMenuItemGroup'
import CustomSubMenu from './CustomSubMenu'
import { AnyType } from '../constants/types'
import { useAppDispatch, useResetStore } from '../hooks'
import {
  resetEmployeeState,
  setResetRegisterEmployee,
} from '../slicers/employee'
import { setNextLocation, setStepPositionReset } from '../slicers/general'
import { REPORTE_EMPLEADOS } from '../constants/Routes'
import { getSessionInfo } from '../utils/session'

const DrawerOptions = (): React.ReactElement => {
  const history = useNavigate()
  const [openKeys, setOpenKeys] = useState([''])
  const [resetStore, setResetStore] = useState(false)
  const dispatch = useAppDispatch()

  useResetStore(resetStore)
  const handleClick = (direction: string, key: string) => {
    // if (!isLoggedIn()) {
    //   removeSession()
    // }
    dispatch(setNextLocation(''))
    dispatch(resetEmployeeState())
    dispatch(setStepPositionReset())
    history(direction)
    setResetStore(true)
    window.sessionStorage.setItem('ID_ACTIVIDAD', key)
  }
  const onOpenChange = (keys: AnyType) => {
    if (`${keys[keys?.length - 1]}`?.length !== 3) {
      setOpenKeys([keys[keys?.length - 1]])
    } else {
      setOpenKeys(keys)
    }
  }
  return (
    <CustomMenu
      theme={'light'}
      mode={'inline'}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ border: 'none', outline: 'none', backgroundColor: '#fff' }}
    >
      {getSessionInfo().privilegios === 1 && (
        <>
          <CustomMenuItem
            key="1"
            icon={<TeamOutlined />}
            onClick={() => handleClick(EMPLOYEES, '1-1')}
          >
            CONSULTAS
          </CustomMenuItem>
        </>
      )}

      {getSessionInfo().privilegios === 2 && (
        <CustomSubMenu key="8" icon={<TeamOutlined />} title={'NOMINA'}>
          <CustomMenuItemGroup>
            <CustomMenuItem
              key="8-0"
              onClick={() => handleClick(CONSULTAR_NOMINA, '8-0')}
            >
              Consultar
            </CustomMenuItem>
            <CustomMenuItem
              key="8-1"
              onClick={() => handleClick(REGISTRAR_NOMINA, '8-1')}
            >
              Registrar / Modificar
            </CustomMenuItem>

            <CustomMenuItem
              key="8-2"
              onClick={() => handleClick(APROBAR_NOMINA, '8-2')}
            >
              Aprobar
            </CustomMenuItem>
            <CustomMenuItem
              key="8-3"
              onClick={() => handleClick(AUTORIZAR_NOMINA, '8-3')}
            >
              Autorizar
            </CustomMenuItem>
            <CustomMenuItem
              key="8-4"
              onClick={() => handleClick(REVERSAR_NOMINA, '8-4')}
            >
              Nominas Reversadas
            </CustomMenuItem>
            <CustomMenuItem
              key="8-5"
              onClick={() => handleClick(TIPOS_NOMINA, '8-5')}
            >
              Tipos de Nominas
            </CustomMenuItem>
            <CustomMenuItem
              key="8-6"
              onClick={() => handleClick(HISTORIAL_NOMINA, '8-6')}
            >
              Historial de cambios
            </CustomMenuItem>
          </CustomMenuItemGroup>
        </CustomSubMenu>
      )}

      {getSessionInfo().privilegios === 1 && (
        <CustomSubMenu key="9" icon={<HomeOutlined />} title={'DEPARTAMENTOS'}>
          <CustomMenuItemGroup>
            <CustomMenuItem
              key="9-1"
              onClick={() => handleClick(REGISTER_OR_MODIFY_DEPARTMENTS, '9-1')}
            >
              Registrar / Modificar
            </CustomMenuItem>
            <CustomMenuItem
              key="9-2"
              onClick={() => handleClick(CHANGE_HISTORY_DEPARTMENTS, '9-2')}
            >
              Historial de cambios
            </CustomMenuItem>
          </CustomMenuItemGroup>
        </CustomSubMenu>
      )}
      {getSessionInfo().privilegios === 3 && (
        <CustomSubMenu
          key="10"
          icon={<SettingOutlined />}
          title={'CONFIGURACIONES'}
        >
          <CustomMenuItemGroup>
            <CustomMenuItem
              key="10-1"
              onClick={() =>
                handleClick(REGISTER_OR_MODIFY_CONFIGURATION, '10-1')
              }
            >
              Registrar / Modificar
            </CustomMenuItem>

            <CustomMenuItem
              key="10-2"
              onClick={() => handleClick('asignar_permisos', '10-2')}
            >
              Asignar permiso
            </CustomMenuItem>
          </CustomMenuItemGroup>
        </CustomSubMenu>
      )}
    </CustomMenu>
  )
}
export default DrawerOptions
