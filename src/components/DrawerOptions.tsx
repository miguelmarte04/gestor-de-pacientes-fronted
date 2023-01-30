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
      {getSessionInfo().id_privilegios?.toString() === '1' && (
        <>
          <CustomSubMenu key="1" icon={<UserOutlined />} title={'EMPLEADOS'}>
            <CustomMenuItemGroup>
              <CustomMenuItem
                key="1-1"
                onClick={() => handleClick(EMPLOYEES, '1-1')}
              >
                Registro del empleado
              </CustomMenuItem>
              <CustomMenuItem
                key="1-2"
                onClick={() => handleClick(GENERAR_CONTRATO, '1-2')}
              >
                Generar Contratos
              </CustomMenuItem>
              <CustomMenuItem
                key="1-7-2"
                onClick={() => handleClick(CARTA_REGISTRO_EMPLEADOS, '1-7-2')}
              >
                Carta Registro de Empleados
              </CustomMenuItem>
              <CustomMenuItem
                key="1-3"
                onClick={() => handleClick(AUMENTO_SUELDO, '1-3')}
              >
                Aumento de sueldo
              </CustomMenuItem>
              <CustomMenuItem
                key="1-4"
                onClick={() => handleClick(CAMBIAR_DEPARTAMENTO, '1-4')}
              >
                Cambiar de departamento
              </CustomMenuItem>
              <CustomMenuItem
                key="1-5"
                onClick={() => handleClick(EMPLOYEES_HISTORY, '1-5')}
              >
                Historial de Cambios
              </CustomMenuItem>
              <CustomSubMenu key="1-6" title={'Informe'}>
                <CustomMenuItemGroup>
                  <CustomMenuItem
                    key="1-6-1"
                    onClick={() => handleClick(EMPLOYEES_BIRTHDAY, '1-6-1')}
                  >
                    Cumpleaños
                  </CustomMenuItem>
                  <CustomMenuItem
                    key="1-6-2"
                    onClick={() => handleClick(REPORTE_EMPLEADOS, '1-6-2')}
                  >
                    Reporte de Empleados
                  </CustomMenuItem>
                </CustomMenuItemGroup>
              </CustomSubMenu>
            </CustomMenuItemGroup>
          </CustomSubMenu>

          <CustomSubMenu
            key="2"
            icon={<TeamOutlined />}
            title={'RECLUTAMIENTO'}
          >
            <CustomMenuItemGroup>
              <CustomMenuItem
                key="2-1"
                onClick={() => handleClick(VACANCIES_PATH, '2-1')}
              >
                Crear / Modificar Vacante
              </CustomMenuItem>
              <CustomMenuItem
                key="2-2"
                onClick={() => handleClick(CANDIDATES_PATH, '2-2')}
              >
                Candidatos
              </CustomMenuItem>
              <CustomMenuItem
                key="2-3"
                onClick={() => handleClick(CANDIDATES_HISTORY, '2-3')}
              >
                Historial de Cambios
              </CustomMenuItem>

              <CustomSubMenu key="2-4" title={'Informes'}>
                <CustomMenuItemGroup>
                  <CustomMenuItem
                    key="2-4-1"
                    onClick={() => handleClick(CANDIDATES_REPORT, '2-4-1')}
                  >
                    Candidatos
                  </CustomMenuItem>
                </CustomMenuItemGroup>
              </CustomSubMenu>
            </CustomMenuItemGroup>
          </CustomSubMenu>

          <CustomSubMenu
            key="3"
            icon={<TeamOutlined />}
            title={'PERMISOS Y LICENCIAS'}
          >
            <CustomMenuItemGroup>
              <CustomMenuItem
                key="3-1"
                onClick={() => handleClick(RECORD_PERMIT_OR_LICENSE, '3-1')}
              >
                Registrar / Modificar
              </CustomMenuItem>

              <CustomMenuItem
                key="3-2"
                onClick={() =>
                  handleClick(PERMIT_OR_LICENSE_CHANGE_HISTORY, '3-2')
                }
              >
                Historial de cambios
              </CustomMenuItem>
              <CustomSubMenu key="3-3" title={'Informe'}>
                <CustomMenuItemGroup>
                  <CustomMenuItem
                    key="3-3"
                    onClick={() => handleClick(INFORME_LICENCIA, '3-3')}
                  >
                    Informe Licencias
                  </CustomMenuItem>
                  <CustomMenuItem
                    key="3-4"
                    onClick={() => handleClick(INFORME_PERMISOS, '3-4')}
                  >
                    Informe Permisos
                  </CustomMenuItem>
                </CustomMenuItemGroup>
              </CustomSubMenu>
            </CustomMenuItemGroup>
          </CustomSubMenu>
          <CustomSubMenu key="4" icon={<TeamOutlined />} title={'VACACIONES'}>
            <CustomMenuItemGroup>
              <CustomMenuItem
                key="4-1"
                onClick={() => handleClick(VACATIONS_CONSULTATION, '4-1')}
              >
                Consultar / Modificar
              </CustomMenuItem>
              <CustomMenuItem
                key="4-2"
                onClick={() => handleClick(SOLICITAR_VACACIONES, '4-2')}
              >
                Solicitar
              </CustomMenuItem>
              <CustomMenuItem
                key="4-3"
                onClick={() => handleClick(APROBAR_SOLICITUD_VACACIONES, '4-3')}
              >
                Aprobar
              </CustomMenuItem>
              <CustomMenuItem
                key="4-4"
                onClick={() => handleClick(VACATIONS_CHANGE_HISTORY, '4-4')}
              >
                Historial de cambios
              </CustomMenuItem>
              <CustomSubMenu key="4-5" title={'Informes'}>
                <CustomMenuItemGroup>
                  <CustomMenuItem
                    key="4-5-1"
                    onClick={() => handleClick(INFORME_VACACIONES, '4-5-1')}
                  >
                    Informe Vacaciones
                  </CustomMenuItem>
                </CustomMenuItemGroup>
              </CustomSubMenu>
            </CustomMenuItemGroup>
          </CustomSubMenu>
          <CustomSubMenu key="5" icon={<TeamOutlined />} title={'FALTAS'}>
            <CustomMenuItemGroup>
              <CustomMenuItem
                key="5-1"
                onClick={() => handleClick(REGISTER_OR_MODIFY_FAULTS, '5-1')}
              >
                Registrar / Modificar
              </CustomMenuItem>
              <CustomMenuItem
                key="5-2"
                onClick={() => handleClick(CHANGE_HISTORY_FAULTS, '5-2')}
              >
                Historial de cambios
              </CustomMenuItem>
              <CustomSubMenu key="5-3" title={'Informes'}>
                <CustomMenuItemGroup>
                  <CustomMenuItem
                    key="5-3-1"
                    onClick={() => handleClick(INFORME_FALTAS, '5-3-1')}
                  >
                    Reporte de Faltas
                  </CustomMenuItem>
                </CustomMenuItemGroup>
              </CustomSubMenu>
            </CustomMenuItemGroup>
          </CustomSubMenu>
          <CustomSubMenu key="6" icon={<TeamOutlined />} title={'DESPIDOS'}>
            <CustomMenuItemGroup>
              <CustomMenuItem
                key="6-1"
                onClick={() => handleClick(REGISTER_OR_MODIFY_LAYOFFS, '6-1')}
              >
                Solicitar / Modificar
              </CustomMenuItem>
              <CustomMenuItem
                key="6-2"
                onClick={() => handleClick(APPROVE_LAYOFFS, '6-2')}
              >
                Aprobar
              </CustomMenuItem>
              {/* <CustomMenuItem
                key="6-3"
                onClick={() => handleClick(CHANGE_HISTORY_LAYOFFS, '6-3')}
              >
                Historial de cambios
              </CustomMenuItem> */}
              <CustomSubMenu key="6-4" title={'Informes'}>
                <CustomMenuItemGroup>
                  <CustomMenuItem
                    key="6-4-1"
                    onClick={() => handleClick(INFORME_DESPIDO, '6-4-1')}
                  >
                    Informe de Despidos
                  </CustomMenuItem>
                </CustomMenuItemGroup>
              </CustomSubMenu>
            </CustomMenuItemGroup>
          </CustomSubMenu>
          <CustomSubMenu key="7" icon={<TeamOutlined />} title={'RENUNCIAS'}>
            <CustomMenuItemGroup>
              <CustomMenuItem
                key="7-1"
                onClick={() =>
                  handleClick(REGISTER_OR_MODIFY_REASIGNATIONS, '7-1')
                }
              >
                Solicitar / Modificar
              </CustomMenuItem>
              <CustomMenuItem
                key="7-2"
                onClick={() => handleClick(APPROVE_REASIGNATIONS, '7-2')}
              >
                Aprobar
              </CustomMenuItem>
              {/* <CustomMenuItem
                key="7-3"
                onClick={() => handleClick(CHANGE_HISTORY_REASIGNATIONS, '7-3')}
              >
                Historial de cambios
              </CustomMenuItem> */}
              <CustomSubMenu key="7-4" title={'Informes'}>
                <CustomMenuItemGroup>
                  <CustomMenuItem
                    key="7-4-1"
                    onClick={() => handleClick(INFORME_RENUNCIAS, '7-4-1')}
                  >
                    Informe de Renuncias
                  </CustomMenuItem>
                </CustomMenuItemGroup>
              </CustomSubMenu>
            </CustomMenuItemGroup>
          </CustomSubMenu>
        </>
      )}

      {getSessionInfo().id_privilegios?.toString() === '2' && (
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

      {getSessionInfo().id_privilegios?.toString() === '1' && (
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
      {getSessionInfo().id_privilegios?.toString() === '3' && (
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
