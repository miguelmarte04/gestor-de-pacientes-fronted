import {
  BarChartOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  ProfileOutlined,
  TagOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PATH_ADMINISTRADORES,
  PATH_CONSULTAS,
  PATH_CONSULTAS_DOCTORES,
  PATH_CONSULTAS_PACIENTES,
  PATH_DOCTORES,
  PATH_ESPECIALIDADES,
  PATH_HISTORIAL_CONSULTAS,
  PATH_HISTORIAL_DOCTORES,
  PATH_HISTORIAL_PACIENTES,
  PATH_HORARIOS,
  PATH_MAIN,
  PATH_PACIENTES,
  PATH_RECEPCIONISTAS,
} from '../constants/Routes'
import CustomMenu from './CustomMenu'
import CustomMenuItem from './CustomMenuItem'
import CustomSubMenu from './CustomSubMenu'
import { AnyType } from '../constants/types'
import { useResetStore } from '../hooks'
import { getSessionInfo } from '../utils/session'

const DrawerOptions = (): React.ReactElement => {
  const history = useNavigate()
  const [openKeys, setOpenKeys] = useState([''])
  const [resetStore, setResetStore] = useState(false)

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
      <CustomMenuItem
        key="01"
        icon={<BarChartOutlined />}
        onClick={() => handleClick(PATH_MAIN, '01')}
      >
        PANEL PRINCIPAL
      </CustomMenuItem>
      {getSessionInfo().privilegios === 1 && (
        <>
          <CustomSubMenu
            key="sub1"
            icon={<ProfileOutlined />}
            title="CONSULTAS"
          >
            <CustomMenuItem
              key="1-1"
              icon={<ProfileOutlined />}
              onClick={() => handleClick(PATH_CONSULTAS, '1-1')}
            >
              AGREGAR CONSULTAS
            </CustomMenuItem>
            <CustomMenuItem
              key="1-2"
              icon={<FieldTimeOutlined />}
              onClick={() => handleClick(PATH_HISTORIAL_CONSULTAS, '1-2')}
            >
              HISTORIAL DE CONSULTA
            </CustomMenuItem>
          </CustomSubMenu>

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
            key="7"
            icon={<TeamOutlined />}
            onClick={() => handleClick(PATH_RECEPCIONISTAS, '7')}
          >
            RECEPCIONISTAS
          </CustomMenuItem>
          <CustomMenuItem
            key="4"
            icon={<TagOutlined />}
            onClick={() => handleClick(PATH_ESPECIALIDADES, '4')}
          >
            ESPECIALIDADES
          </CustomMenuItem>
          <CustomMenuItem
            key="5"
            icon={<CalendarOutlined />}
            onClick={() => handleClick(PATH_HORARIOS, '5')}
          >
            HORARIOS
          </CustomMenuItem>
          <CustomMenuItem
            key="6"
            icon={<TeamOutlined />}
            onClick={() => handleClick(PATH_ADMINISTRADORES, '6')}
          >
            ADMINISTRADORES
          </CustomMenuItem>
        </>
      )}
      {getSessionInfo().privilegios === 4 && (
        <>
          <CustomSubMenu
            key="sub1"
            icon={<ProfileOutlined />}
            title="CONSULTAS"
          >
            <CustomMenuItem
              key="1-1"
              icon={<ProfileOutlined />}
              onClick={() => handleClick(PATH_CONSULTAS, '1-1')}
            >
              CONSULTAS
            </CustomMenuItem>
            <CustomMenuItem
              key="1-2"
              icon={<FieldTimeOutlined />}
              onClick={() => handleClick(PATH_HISTORIAL_CONSULTAS, '1-2')}
            >
              HISTORIAL DE CONSULTA
            </CustomMenuItem>
          </CustomSubMenu>

          <CustomMenuItem
            key="2"
            icon={<TeamOutlined />}
            onClick={() => handleClick(PATH_PACIENTES, '2')}
          >
            PACIENTES
          </CustomMenuItem>

          <CustomMenuItem
            key="4"
            icon={<TagOutlined />}
            onClick={() => handleClick(PATH_ESPECIALIDADES, '4')}
          >
            ESPECIALIDADES
          </CustomMenuItem>
          <CustomMenuItem
            key="5"
            icon={<CalendarOutlined />}
            onClick={() => handleClick(PATH_HORARIOS, '5')}
          >
            HORARIOS
          </CustomMenuItem>
        </>
      )}
      {getSessionInfo().privilegios === 2 && (
        <>
          <CustomMenuItem
            key="1"
            icon={<ProfileOutlined />}
            onClick={() => handleClick(PATH_CONSULTAS_PACIENTES, '1')}
          >
            MIS CONSULTAS
          </CustomMenuItem>
          <CustomMenuItem
            key="2"
            icon={<FieldTimeOutlined />}
            onClick={() => handleClick(PATH_HISTORIAL_PACIENTES, '2')}
          >
            HISTORIAL
          </CustomMenuItem>
        </>
      )}
      {getSessionInfo().privilegios === 3 && (
        <>
          <CustomMenuItem
            key="1"
            icon={<ProfileOutlined />}
            onClick={() => handleClick(PATH_CONSULTAS_DOCTORES, '1')}
          >
            MIS CONSULTAS
          </CustomMenuItem>
          <CustomMenuItem
            key="2"
            icon={<FieldTimeOutlined />}
            onClick={() => handleClick(PATH_HISTORIAL_DOCTORES, '2')}
          >
            HISTORIAL
          </CustomMenuItem>
        </>
      )}
    </CustomMenu>
  )
}
export default DrawerOptions
