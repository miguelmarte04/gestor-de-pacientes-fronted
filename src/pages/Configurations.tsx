import React, { useEffect, useState } from 'react'
import CustomDivider from '../components/CustomDivider'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomRow from '../components/CustomRow'
import CustomSpin from '../components/CustomSpin'
import CustomTitle from '../components/CustomTitle'
import { AnyType, TabConfig } from '../constants/types'
import BaseConfigurations from '../components/BaseConfigurations'
import CustomTabs from '../components/CustomTabs'
import CustomCol from '../components/CustomCol'
import { useDispatch } from 'react-redux'
import { getDepartments } from '../slicers/general'
import ChargesForm from '../components/ChargesForm'
import MultiConfigForm from '../components/MultiConfigForm'
import ConditionalComponent from '../components/ConditionalComponent'
import { ChargesType, ConfigPayload } from '../slicers/employee'
import {
  getConfigurations,
  updateCharges,
  updateConfigurations,
} from '../slicers/employee/employee'
import { useAppSelector } from '../hooks'
import { getSessionInfo } from '../utils/session'

const options = {
  cargo: 'Cargos',
  tipo_razones_depidos: 'Razones de Despido',
  tipo_razones_renuncias: 'Razones de Renuncias',
  tipo_documentos: 'Tipo Documento',
  tipo_falta: 'Tipo de Faltas',
  tipo_licencia: 'Tipo de Licencia',
  tipo_permiso: 'Tipo de Permisos',
}

type OptionsType = keyof typeof options

type ConfigType = Record<OptionsType, boolean>

const multiConfigKeys: Partial<Record<OptionsType, string>> = {
  tipo_razones_depidos: 'tipo_razon',
  tipo_razones_renuncias: 'tipo_razon',
  tipo_documentos: 'descripcion',
  tipo_falta: 'tipo_falta',
  tipo_licencia: 'tipo_licencia',
  tipo_permiso: 'tipo_permiso',
}

const initialStates: ConfigType = {
  cargo: false,
  tipo_documentos: false,
  tipo_permiso: false,
  tipo_licencia: false,
  tipo_falta: false,
  tipo_razones_depidos: false,
  tipo_razones_renuncias: false,
}

const Configurations = (): React.ReactElement => {
  const dispatch = useDispatch()
  const [editableConfig, setEditableConfig] = useState<boolean>()
  const [currentSelected, setCurrentSelected] = useState<
    ChargesType | ConfigPayload
  >()
  const [currentConfig, setCurrentConfig] = useState<OptionsType>('cargo')
  const [visibleConf, setVisibleConf] =
    useState<Partial<ConfigType>>(initialStates)

  const { configurations } = useAppSelector((state) => state.employee)

  useEffect(() => {
    dispatch(getDepartments({}))
    dispatch(getConfigurations())
  }, [])

  const handleCancel = (key: OptionsType) => {
    setVisibleConf({ [key]: false })
    setEditableConfig(false)
  }

  const handleDelete = (record: AnyType, key: OptionsType) => {
    if (multiConfigKeys[key]) {
      dispatch(
        updateConfigurations({
          descripcion: record.descripcion,
          estado: record.estado === 'A' ? 'I' : 'A',
          tipo: key,
          usuario_insercion: getSessionInfo().usuario,
          id: record.id,
        })
      )
    } else {
      delete record.fecha_insercion
      delete record.descripcion
      dispatch(updateCharges({ ...record, estado: 'I' }))
    }
  }
  const optionsKeys = Object.keys(options)

  const tabs: TabConfig[] = optionsKeys?.map((item) => ({
    key: item,
    label: options[item],
    title: options[item],
  }))

  return (
    <>
      <CustomLayoutBoxShadow>
        <CustomSpin>
          <CustomRow justify={'center'}>
            <CustomDivider>
              <CustomTitle>Configuraciones</CustomTitle>
            </CustomDivider>

            <CustomCol xs={24}>
              <CustomTabs
                defaultActiveKey={currentConfig}
                onChange={(key) => {
                  sessionStorage.setItem('key', key)
                  setCurrentConfig(key as OptionsType)
                }}
                items={tabs?.map((item) => ({
                  key: item.key,
                  label: item.label,
                  title: item.title,
                  children: (
                    <BaseConfigurations
                      dataIndex={'descripcion'}
                      title={item.title}
                      onVisibility={() => setVisibleConf({ [item.key]: true })}
                      dataSource={
                        configurations[item.key]?.filter(
                          (item) => item.estado === 'A'
                        ) ??
                        configurations['cargos']?.filter(
                          (item) => item.estado === 'A'
                        )
                      }
                      onDelete={(record) =>
                        handleDelete({ ...record }, item.key as never)
                      }
                      onEdit={(record) => {
                        setEditableConfig(true)
                        setCurrentSelected(record)
                        setVisibleConf({ [item.key]: true })
                      }}
                    />
                  ),
                }))}
              />
            </CustomCol>
          </CustomRow>
        </CustomSpin>
      </CustomLayoutBoxShadow>

      <ConditionalComponent condition={currentConfig === 'cargo'}>
        <ChargesForm
          visible={visibleConf.cargo}
          onCancel={() => handleCancel('cargo')}
          data={currentSelected as ChargesType}
        />
      </ConditionalComponent>

      <ConditionalComponent
        condition={Object.keys(multiConfigKeys).includes(currentConfig)}
      >
        <MultiConfigForm
          isEditing={editableConfig}
          key={currentConfig}
          title={options[currentConfig]}
          visible={visibleConf[currentConfig]}
          data={currentSelected as ConfigPayload}
          onCancel={() => handleCancel(currentConfig)}
        />
      </ConditionalComponent>
    </>
  )
}

export default Configurations
