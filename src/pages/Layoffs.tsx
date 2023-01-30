import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  createLayoff,
  getLaidOff,
  getTypeLayoffs,
  updateLayoff,
} from '../slicers/employee/employee'
import { EmployeeType, LayoffsType } from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import { filterArray, filterByDate, formatter } from '../utils/general'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomInput from '../components/CustomInput'
import CustomInputGroup from '../components/CustomInputGroup'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomModal from '../components/CustomModal'
import CustomRadio from '../components/CustomRadio'
import CustomRadioGroup from '../components/CustomRadioGroup'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomSearchEmployee from '../components/CustomSearchEmployee'
import CustomSelect from '../components/CustomSelect'
import CustomTextArea from '../components/CustomTextArea'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import { getSessionInfo } from '../utils/session'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import CustomCollapse from '../components/CustomCollapse'
import CustomPanel from '../components/CustomPanel'
import CustomDatePicker from '../components/CustomRangePicker'
import { getDepartments } from '../slicers/general/general'
const Layoffs = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const {
    dataLaidOff,
    dataTypeLayoffs,
    createLayoffRequestStatus,
    fetchingFromEmployee,
  } = useAppSelector((state) => state.employee)
  const { departments } = useAppSelector((state) => state.general)
  useEffect(() => {
    dispatch(getTypeLayoffs({}))
    dispatch(getLaidOff({}))
    dispatch(getDepartments({}))
  }, [])

  const getInitials = (name: string, lastName: string) => {
    return `${name?.charAt(0)?.toUpperCase()}${lastName
      ?.charAt(0)
      ?.toUpperCase()}`
  }
  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<LayoffsType>()
  const [view, setView] = useState(false)
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const [visible, setVisible] = useState(false)
  const [stateFilter, setStateFilter] = useState<string>('A')
  const [searchDepartamento, setSearchDepartamento] = useState('')
  const [searchCargo, setSearchCargo] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])
  useEffect(() => {
    employeeSelected &&
      form.setFieldsValue({
        ...employeeSelected,
        nombres: `${employeeSelected?.nombres} ${employeeSelected?.apellidos}`,
        doc_identidad: formatter({
          value: employeeSelected?.doc_identidad,
          type: 'identity_doc',
        }),
      })
  }, [employeeSelected])
  useEffect(() => {
    if (createLayoffRequestStatus === 'success') {
      dispatch(getLaidOff({}))
      form.resetFields()
      setVisible(false)
      setEdit(undefined)
    }
  }, [createLayoffRequestStatus])

  const handleDelete = (record: LayoffsType) => {
    dispatch(
      updateLayoff({
        condition: {
          ...record,
          estado: record.estado === 'A' ? 'I' : 'A',
        },
      })
    )
  }
  const handleEdit = (record: LayoffsType) => {
    setVisible(true)
    setEdit(record)
    form.setFieldsValue({
      ...record,
      nombres: `${record?.nombres} ${record?.apellidos}`,
      doc_identidad: formatter({
        value: record?.doc_identidad,
        type: 'identity_doc',
      }),
    })
  }
  const handleView = (record: LayoffsType) => {
    setView(true)
    setVisible(true)
    form.setFieldsValue({
      ...record,
      nombres: `${record?.nombres} ${record?.apellidos}`,
      doc_identidad: formatter({
        value: record?.doc_identidad,
        type: 'identity_doc',
      }),
    })
  }

  const renderItem = (item: LayoffsType) => {
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
              src={item.imagen_Empleado}
              icon={
                item.imagen_Empleado ? null : (
                  <span
                    style={{
                      color: defaultTheme.primaryColor,
                      fontSize: 18,
                      fontFamily: 'comic sans',
                    }}
                  >
                    {getInitials(item.nombres, item.apellidos)}
                  </span>
                )
              }
            />
          }
          title={`${item.nombres} ${item.apellidos}`}
          description={`Razón: ${item?.tipo_razon}`}
        />
      </CustomListItem>
    )
  }
  const handleUpdate = async () => {
    const data = await form.validateFields()
    dispatch(updateLayoff({ condition: { ...edit, ...data } }))
  }
  const handleCreate = async () => {
    const data = await form.validateFields()

    dispatch(
      createLayoff({
        condition: {
          ...data,
          id_empleado: employeeSelected?.id,
          usuario_insercion: getSessionInfo().usuario,
        },
      })
    )
  }
  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(
            dataLaidOff,
            [search, searchDepartamento, searchCargo],
            ['nombres', 'id_departamento', 'apellidos', 'id_tipo_razon_despido']
          )?.filter((item) => item.estado === stateFilter),
          'fecha_insercion',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(
          dataLaidOff,
          [search, searchDepartamento, searchCargo],
          ['nombres', 'apellidos', 'id_departamento', 'id_tipo_razon_despido']
        )?.filter((item) => item.estado === stateFilter)
  }, [
    search,
    stateFilter,
    searchDepartamento,
    searchDate,
    dataLaidOff,
    searchCargo,
  ])
  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomForm form={form}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Solicitudes de Despidos</CustomTitle>
                </CustomDivider>

                <CustomCol xs={24} md={12} />
                <CustomCol xs={24} md={12}>
                  <CustomRow justify={'end'} gutter={[10, 0]}>
                    <CustomCol xs={20}>
                      <CustomFormItem noStyle name={'SEARCH'}>
                        <CustomSearch
                          className={'search'}
                          placeholder={
                            'Buscar por nombre o documento de identidad'
                          }
                          onChange={(e) => {
                            setSearch(e.target.value)
                          }}
                        />
                      </CustomFormItem>
                    </CustomCol>

                    <CustomCol xs={4} md={2} lg={3} xl={2}>
                      <CustomTooltip title={'Nueva Solicitud de Despido'}>
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
              <CustomCollapse
                style={{ width: '100%', marginTop: '2%', marginBottom: '1%' }}
              >
                <CustomPanel
                  key={'1'}
                  header={<CustomTitle>Filtros </CustomTitle>}
                >
                  <CustomRow justify="start">
                    <CustomCol xs={6} style={{ marginRight: '1%' }}>
                      <CustomSelect
                        placeholder={'Razón de despido'}
                        allowClear
                        onClear={() => setSearchCargo('')}
                        onSelect={(value) => {
                          setSearchCargo(value)
                        }}
                        options={dataTypeLayoffs?.map((item) => {
                          return {
                            label: item.tipo_razon,
                            value: item.id,
                          }
                        })}
                      />
                    </CustomCol>
                    <CustomCol xs={6} style={{ marginRight: '1%' }}>
                      <CustomSelect
                        placeholder={'Departamento'}
                        allowClear
                        onClear={() => setSearchDepartamento('')}
                        onSelect={(value) => {
                          setSearchDepartamento(value)
                        }}
                        options={departments?.map((item) => {
                          return {
                            label: item.departamento,
                            value: item.id,
                          }
                        })}
                      />
                    </CustomCol>
                    <CustomCol xs={6}>
                      <CustomDatePicker
                        allowClear
                        style={{ marginLeft: '2%' }}
                        onChange={(_, dateString) => {
                          setSearchDate(dateString)
                        }}
                      />
                    </CustomCol>
                  </CustomRow>
                </CustomPanel>
              </CustomCollapse>

              <CustomList
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                renderItem={renderItem}
              />
              <CustomModal
                title={
                  <CustomTitle>
                    {edit?.id
                      ? 'Editar Despido'
                      : view
                      ? 'Despido'
                      : 'Registrar Despido'}
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
                  form.resetFields()
                }}
                onOk={() => {
                  edit?.id ? handleUpdate() : handleCreate()
                }}
              >
                {!(edit?.id || view) && (
                  <CustomCol xs={24}>
                    <CustomRow justify="end">
                      <CustomFormItem name={'SEARCH_EMPLOYEE'} noStyle>
                        <CustomSearchEmployee
                          width={'40%'}
                          showInitialValue
                          style={{ marginBottom: '2%' }}
                          placeholder={
                            'Buscar por: documento de identidad o nombres'
                          }
                          onSelect={(_, employee) => {
                            setEmployeeSelected(employee)
                          }}
                        />
                      </CustomFormItem>
                    </CustomRow>
                  </CustomCol>
                )}

                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Empleado'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInputGroup compact>
                      <CustomFormItem
                        label={'Documento Identidad'}
                        noStyle
                        name={'doc_identidad'}
                        rules={[{ required: true }]}
                      >
                        <CustomInput
                          placeholder="Documento Identidad"
                          style={{ width: '30%' }}
                          disabled
                        />
                      </CustomFormItem>

                      <CustomFormItem
                        label={'Nombre'}
                        noStyle
                        name={'nombres'}
                        rules={[{ required: true }]}
                      >
                        <CustomInput
                          placeholder="Nombre"
                          style={{ width: '70%' }}
                          disabled
                        />
                      </CustomFormItem>
                    </CustomInputGroup>
                  </CustomFormItem>
                </CustomCol>

                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Razón del despido'}
                    name={'id_tipo_razon_despido'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomSelect
                      placeholder={'Seleccione una razón'}
                      disabled={view}
                      options={dataTypeLayoffs?.map((item) => ({
                        label: item.tipo_razon,
                        value: item.id,
                      }))}
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Observaciones'}
                    name={'observaciones'}
                    labelCol={{ span: 6 }}
                  >
                    <CustomTextArea
                      placeholder="Observaciones"
                      disabled={view}
                    />
                  </CustomFormItem>
                </CustomCol>
              </CustomModal>
            </CustomForm>
          </CustomCol>
        </CustomRow>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default Layoffs
