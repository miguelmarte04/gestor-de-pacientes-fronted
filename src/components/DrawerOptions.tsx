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
import { PATH_CONSULTAS } from '../constants/Routes'
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
import { getSessionInfo } from '../utils/session'

const DrawerOptions = (): React.ReactElement => {
  const history = useNavigate()
  const [openKeys, setOpenKeys] = useState([''])
  const [resetStore, setResetStore] = useState(false)
  const dispatch = useAppDispatch()

  useResetStore(resetStore)
  const handleClick = (direction: string, key: string) => {
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
            onClick={() => handleClick(PATH_CONSULTAS, '1-1')}
          >
            CONSULTAS
          </CustomMenuItem>
        </>
      )}

      {/* {getSessionInfo().privilegios === 2 && (
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
      )} */}
    </CustomMenu>
  )
}
export default DrawerOptions
