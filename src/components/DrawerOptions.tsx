/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CalendarOutlined,
  HomeOutlined,
  LineChartOutlined,
  ProfileOutlined,
  SettingOutlined,
  TagOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PATH_CONSULTAS,
  PATH_DOCTORES,
  PATH_PACIENTES,
} from '../constants/Routes'
import CustomMenu from './CustomMenu'
import CustomMenuItem from './CustomMenuItem'
import CustomMenuItemGroup from './CustomMenuItemGroup'
import CustomSubMenu from './CustomSubMenu'
import { AnyType } from '../constants/types'
import { useAppDispatch, useResetStore } from '../hooks'
import { getSessionInfo } from '../utils/session'

const DrawerOptions = (): React.ReactElement => {
  const history = useNavigate()
  const [openKeys, setOpenKeys] = useState([''])
  const [resetStore, setResetStore] = useState(false)
  const dispatch = useAppDispatch()

  useResetStore(resetStore)
  const handleClick = (direction: string, key: string) => {
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
            icon={<ProfileOutlined />}
            onClick={() => handleClick(PATH_CONSULTAS, '1')}
          >
            CONSULTAS
          </CustomMenuItem>
          <CustomMenuItem
            key="2"
            icon={<TeamOutlined />}
            onClick={() => handleClick(PATH_PACIENTES, '2')}
          >
            PACIENTES
          </CustomMenuItem>
          <CustomMenuItem
            key="3"
            icon={<TeamOutlined />}
            onClick={() => handleClick(PATH_DOCTORES, '3')}
          >
            DOCTORES
          </CustomMenuItem>
          <CustomMenuItem
            key="4"
            icon={<TagOutlined />}
            onClick={() => handleClick(PATH_CONSULTAS, '4')}
          >
            ESPECIALIDADES
          </CustomMenuItem>
          <CustomMenuItem
            key="5"
            icon={<CalendarOutlined />}
            onClick={() => handleClick(PATH_CONSULTAS, '5')}
          >
            HORARIOS
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
