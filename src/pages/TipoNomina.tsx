import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { defaultTheme } from '../themes'
import { searchInArray } from '../utils/general'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomInput from '../components/CustomInput'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomModal from '../components/CustomModal'
import CustomRadio from '../components/CustomRadio'
import CustomRadioGroup from '../components/CustomRadioGroup'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import { getSessionInfo } from '../utils/session'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import {
  actualizarTiposNomina,
  registarTiposNomina,
} from '../slicers/general/general'
import { getHistoryChange } from '../slicers/employee/employee'
import CustomCheckBox from '../components/CustomCheckbox'
import { HistoryType } from '../slicers/employee/types'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
const TipoNomina = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { fetchingGeneralData, registarTiposNominaResponse } = useAppSelector(
    (state) => state.general
  )
  const { historyChange } = useAppSelector((state) => state.employee)

  const getInitials = (name: string, lastName: string) => {
    return `${name?.charAt(0)?.toUpperCase()}${lastName
      ?.charAt(0)
      ?.toUpperCase()}`
  }
  useEffect(() => {
    dispatch(
      getHistoryChange({
        condition: {
          id: '1',
          tipo: 'tipos_nominas',
        },
      })
    )
  }, [])

  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<HistoryType>()
  const [view, setView] = useState(false)
  const [visible, setVisible] = useState(false)
  const [stateFilter, setStateFilter] = useState<string>('A')
  const [ingresos, setIngresos] = useState<boolean>()
  const [descuentosFijos, setDescuentosFijos] = useState<boolean>()
  const [descuentosAdicionales, setDescuentosAdicionales] = useState<boolean>()
  useEffect(() => {
    if (edit) {
      setIngresos(edit.ingresos_empleados === 'S' ? true : false)
      setDescuentosFijos(edit.descuentos_fijos === 'S' ? true : false)
      setDescuentosAdicionales(edit.descuentos_empleado === 'S' ? true : false)
    }
  }, [edit])

  useEffect(() => {
    if (registarTiposNominaResponse === 'success') {
      form.resetFields()
      setVisible(false)
      setIngresos(false)
      setDescuentosFijos(false)
      setDescuentosAdicionales(false)
      dispatch(
        getHistoryChange({
          condition: {
            id: '1',
            tipo: 'tipos_nominas',
          },
        })
      )
    }
  }, [registarTiposNominaResponse])

  const handleDelete = (record: HistoryType) => {
    dispatch(
      actualizarTiposNomina({
        condition: {
          ...record,
          estado: record.estado === 'A' ? 'I' : 'A',
        },
      })
    )
  }
  const handleEdit = (record: HistoryType) => {
    setVisible(true)
    setEdit(record)
    form.setFieldsValue({
      ...record,
    })
  }
  const handleView = (record: HistoryType) => {
    setView(true)
    setEdit(record)
    setVisible(true)
    form.setFieldsValue({
      ...record,
    })
  }

  const renderItem = (item: HistoryType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip
            key={'edit'}
            title={
              item.estado === 'A' || item.estado === 'U'
                ? 'Editar'
                : 'Inactivo, no permite edición'
            }
          >
            <CustomButton
              disabled={item.estado === 'I'}
              onClick={() => handleEdit(item)}
              type={'link'}
              icon={<EditOutlined style={{ fontSize: '18px' }} />}
              className={'editPhoneButton'}
            />
          </CustomTooltip>,

          <CustomTooltip key={'view'} title={'Ver'}>
            <CustomButton
              onClick={() => {
                handleView(item)
              }}
              type={'link'}
              icon={
                <EyeOutlined
                  style={{
                    fontSize: '18px',
                  }}
                />
              }
            />
          </CustomTooltip>,

          <CustomTooltip
            key={'delete'}
            title={
              item.estado === 'A' || item.estado === 'U'
                ? 'Inhabilitar'
                : 'Habilitar'
            }
          >
            <CustomButton
              onClick={() => {
                CustomModalConfirmation({
                  content:
                    item.estado === 'A'
                      ? '¿Está seguro que desea eliminar el registro?'
                      : '¿Está seguro que desea habilitar el registro?',
                  onOk: () => {
                    handleDelete(item)
                  },
                })
              }}
              type={'link'}
              icon={
                item.estado === 'A' || item.estado === 'U' ? (
                  <DeleteOutlined
                    style={{
                      fontSize: '18px',
                      color: defaultTheme.dangerColor,
                    }}
                  />
                ) : (
                  <StopOutlined
                    className="disabledColor"
                    style={{ fontSize: '18px' }}
                  />
                )
              }
            />
          </CustomTooltip>,
        ]}
      >
        <CustomListItemMeta
          avatar={
            <Avatar
              size={'large'}
              icon={
                <span
                  style={{
                    color: defaultTheme.primaryColor,
                    fontSize: 18,
                    fontFamily: 'comic sans',
                  }}
                >
                  {getInitials(
                    item.tipo_nomina?.split(' ')[0],
                    item.tipo_nomina?.split(' ')[1]
                  )}
                </span>
              }
            />
          }
          title={`${item.tipo_nomina}`}
          // description={`${}`}
        />
      </CustomListItem>
    )
  }

  const handleUpdate = async () => {
    const data = await form.validateFields()
    dispatch(
      actualizarTiposNomina({
        condition: {
          ...edit,
          ...data,
          descuentos_empleado: descuentosAdicionales ? 'S' : 'N',
          ingresos_empleados: ingresos ? 'S' : 'N',
          descuentos_fijos: descuentosFijos ? 'S' : 'N',
          usuario_insercion: getSessionInfo()?.usuario,
        },
      })
    )
  }
  const handleCreate = async () => {
    const data = await form.validateFields()
    dispatch(
      registarTiposNomina({
        condition: {
          tipo_nomina: data.tipo_nomina,
          descuentos_empleado: descuentosAdicionales ? 'S' : 'N',
          ingresos_empleados: ingresos ? 'S' : 'N',
          descuentos_fijos: descuentosFijos ? 'S' : 'N',
          usuario_insercion: getSessionInfo()?.usuario,
        },
      })
    )
  }
  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingGeneralData}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomForm form={form}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Tipos de Nominas</CustomTitle>
                </CustomDivider>

                <CustomCol xs={24} md={12} />
                <CustomCol xs={24} md={12}>
                  <CustomRow justify={'end'} gutter={[10, 0]}>
                    <CustomCol xs={20}>
                      <CustomFormItem noStyle name={'SEARCH'}>
                        <CustomSearch
                          className={'search'}
                          placeholder={'Buscar por tipo de nomina'}
                          onChange={(e) => {
                            setSearch(e.target.value)
                          }}
                        />
                      </CustomFormItem>
                    </CustomCol>

                    <CustomCol xs={4} md={2} lg={3} xl={2}>
                      <CustomTooltip title={'Nuevo Tipos de Nominas'}>
                        <CustomButton
                          icon={<PlusOutlined />}
                          shape={'circle'}
                          size={'middle'}
                          type={'primary'}
                          onClick={() => {
                            setVisible(true)
                          }}
                        />
                      </CustomTooltip>
                    </CustomCol>
                  </CustomRow>
                </CustomCol>

                <CustomCol span={12}>
                  <CustomRow justify={'end'}>
                    <CustomFormItem label={'Ver: '} className={'grupoPersona'}>
                      <CustomRadioGroup
                        value={stateFilter}
                        defaultValue={'A'}
                        onChange={(e) => {
                          setStateFilter(e.target.value)
                        }}
                      >
                        <CustomRadio value={'A'}>Activos</CustomRadio>
                        <CustomRadio value={'I'}>Inactivos</CustomRadio>
                      </CustomRadioGroup>
                    </CustomFormItem>
                  </CustomRow>
                </CustomCol>
              </CustomRow>

              <CustomList
                dataSource={
                  stateFilter === ''
                    ? searchInArray(
                        historyChange?.filter(
                          (item) => item.estado === 'A' || item.estado === 'I'
                        ),
                        ['nombres', 'doc_identidad'],
                        search
                      )
                    : searchInArray(
                        historyChange?.filter(
                          (item) => item.estado === 'A' || item.estado === 'I'
                        ),
                        ['nombres', 'doc_identidad'],
                        search
                      )?.filter((item) => item.estado === stateFilter)
                }
                pagination={{ pageSize: 5 }}
                renderItem={renderItem}
              />
              <CustomModal
                title={
                  <CustomTitle>
                    {edit?.id
                      ? 'Editar Tipos de Nomina'
                      : view
                      ? 'Tipos de Nomina'
                      : 'Registrar Tipos de Nomina'}
                  </CustomTitle>
                }
                width={'50%'}
                visible={visible}
                cancelText={view ? 'Salir' : 'Cancelar'}
                okButtonProps={{ hidden: view }}
                onCancel={() => {
                  setVisible(false)
                  setEdit(undefined)
                  setView(false)
                  setIngresos(false)
                  setDescuentosFijos(false)
                  setDescuentosAdicionales(false)
                  form.resetFields()
                }}
                onOk={() => {
                  edit?.id ? handleUpdate() : handleCreate()
                }}
              >
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Tipo de Nomina'}
                    name={'tipo_nomina'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInput placeholder="Tipo de Nomina" disabled={view} />
                  </CustomFormItem>
                </CustomCol>

                <CustomFormItem
                  label={'Descuentos Fijos'}
                  name={'descuentos_fijos'}
                  labelCol={{ span: 6 }}
                >
                  <CustomCheckBox
                    tooltip="Permite realizar descuentos fijos"
                    checked={descuentosFijos}
                    disabled={view}
                    onChange={(e) => {
                      setDescuentosFijos(e.target.checked)
                    }}
                  />
                </CustomFormItem>

                <CustomFormItem
                  label={'Descuentos Adicionales'}
                  name={'descuentos_empleado'}
                  labelCol={{ span: 6 }}
                >
                  <CustomCheckBox
                    tooltip="Permite realizar descuentos adicionales"
                    checked={descuentosAdicionales}
                    disabled={view}
                    onChange={(e) => {
                      setDescuentosAdicionales(e.target.checked)
                    }}
                  />
                </CustomFormItem>

                <CustomFormItem
                  label={'Ingresos Empleado'}
                  name={'descuentos_fijos'}
                  labelCol={{ span: 6 }}
                  initialValue={ingresos}
                >
                  <CustomCheckBox
                    tooltip="Permite realizar ingresos Empleado"
                    checked={ingresos}
                    disabled={view}
                    onChange={(e) => {
                      setIngresos(e.target.checked)
                    }}
                  />
                </CustomFormItem>
              </CustomModal>
            </CustomForm>
          </CustomCol>
        </CustomRow>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default TipoNomina
