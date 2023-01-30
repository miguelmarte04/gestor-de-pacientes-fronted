import {
  CheckOutlined,
  DollarOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createPermission } from '../slicers/employee/employee'
import { EmployeeType, HolidaysType } from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import {
  filterArray,
  filterByDate,
  formatter,
  getActivityId,
} from '../utils/general'
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
import CustomRangePicker from '../components/CustomRangePicker'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomSearchEmployee from '../components/CustomSearchEmployee'
import CustomTextArea from '../components/CustomTextArea'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import { getSessionInfo } from '../utils/session'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import { getHolidays, updateHolidays } from '../slicers/employee/employee'
import CustomSpin from '../components/CustomSpin'
import CustomRadioGroup from '../components/CustomRadioGroup'
import CustomRadio from '../components/CustomRadio'
import { getParametros } from '../slicers/general'
import CustomDatePicker from '../components/CustomRangePicker'
import CustomCollapse from '../components/CustomCollapse'
import CustomPanel from '../components/CustomPanel'
import CustomSelect from '../components/CustomSelect'

export const estadoVacaciones = {
  G: 'Generada',
  T: 'Tomada',
  P: 'Pagada',
}

const Holidays = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { dataHolidays, fetchingFromEmployee, updateHolidaysRequestStatus } =
    useAppSelector((state) => state.employee)
  const [stateFilter, setStateFilter] = useState<string>('G')
  const { parametros, departments } = useAppSelector((state) => state.general)
  const [searchDepartamento, setSearchDepartamento] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])

  const { PERMITE_EDITAR_VACIONES } = parametros

  useEffect(() => {
    dispatch(
      getHolidays({
        condition: {
          estado: 'A',
        },
      })
    )
    dispatch(
      getParametros({
        condition: {
          id_actividad: getActivityId(),
        },
      })
    )
  }, [])

  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
  }
  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<HolidaysType>()
  const [view, setView] = useState(false)
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (updateHolidaysRequestStatus === 'success') {
      dispatch(getHolidays({ condition: { estado: 'A' } }))
      form.resetFields()
      setVisible(false)
    }
  }, [updateHolidaysRequestStatus])

  const handleToState = (record: HolidaysType, estado: string) => {
    dispatch(
      updateHolidays({
        condition: {
          ...record,
          estado_vacaciones: estado,
        },
      })
    )
  }

  const handleEdit = (record: HolidaysType) => {
    setVisible(true)
    setEdit(record)
    form.setFieldsValue({
      ...record,
      nombres: `${record?.nombres} ${record?.apellidos}`,
      doc_identidad: formatter({
        value: record?.doc_identidad,
        type: 'identity_doc',
      }),
      fecha: [moment(record?.fecha_inicio), moment(record?.fecha_fin)],
      dias: `${
        moment(record?.fecha_fin).diff(moment(record?.fecha_inicio), 'days') + 1
      } dias`,
      estado_vacaciones: estadoVacaciones[record?.estado_vacaciones],
    })
  }
  const handleView = (record: HolidaysType) => {
    setView(true)
    setVisible(true)
    form.setFieldsValue({
      ...record,
      nombres: `${record?.nombres} ${record?.apellidos}`,
      doc_identidad: formatter({
        value: record?.doc_identidad,
        type: 'identity_doc',
      }),
      fecha: [moment(record?.fecha_inicio), moment(record?.fecha_fin)],
      dias: `${moment(record?.fecha_fin).diff(
        moment(record?.fecha_inicio),
        'days'
      )} dias`,
      estado_vacaciones: estadoVacaciones[record?.estado_vacaciones],
    })
  }

  const renderItem = (item: HolidaysType) => {
    return (
      <CustomListItem
        actions={[
          <>
            {item.estado_vacaciones === 'G' && (
              <CustomTooltip
                key={'edit'}
                title={
                  PERMITE_EDITAR_VACIONES === 'N'
                    ? 'No permite edición, debido a un parámetro'
                    : 'Editar'
                }
              >
                <CustomButton
                  disabled={
                    item.estado === 'I' || PERMITE_EDITAR_VACIONES === 'N'
                  }
                  onClick={() => handleEdit(item)}
                  type={'link'}
                  icon={<EditOutlined style={{ fontSize: '18px' }} />}
                  className={'editPhoneButton'}
                />
              </CustomTooltip>
            )}
          </>,

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

          <>
            {item.estado_vacaciones === 'G' && (
              <CustomTooltip key={'pagar'} title={'Pagar vacaciones'}>
                <CustomButton
                  onClick={() => {
                    CustomModalConfirmation({
                      content:
                        '¿Está seguro que desea pagar las vacaciones de este empleado?',
                      onOk: () => {
                        handleToState(item, 'P')
                      },
                    })
                  }}
                  type={'link'}
                  icon={
                    <DollarOutlined
                      style={{
                        color: defaultTheme.primaryColor,
                        fontSize: 18,
                        fontFamily: 'comic sans',
                      }}
                    />
                  }
                />
              </CustomTooltip>
            )}
          </>,
          <>
            {item.estado_vacaciones === 'G' && (
              <CustomTooltip key={'tomar'} title={'Tomar vacaciones'}>
                <CustomButton
                  onClick={() => {
                    CustomModalConfirmation({
                      content:
                        '¿Está seguro que desea tomar las vacaciones de este empleado?',
                      onOk: () => {
                        handleToState(item, 'T')
                      },
                    })
                  }}
                  type={'link'}
                  icon={
                    <CheckOutlined
                      style={{
                        fontSize: 18,
                      }}
                    />
                  }
                />
              </CustomTooltip>
            )}
          </>,
        ]}
      >
        <CustomListItemMeta
          avatar={
            <Avatar
              size={'large'}
              src={item.imagen}
              icon={
                item.imagen ? null : (
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
          description={`Días: ${
            moment(item?.fecha_fin).diff(moment(item?.fecha_inicio), 'days') + 1
          } - Inicio: ${moment(item.fecha_inicio).format(
            'DD/MM/YYYY'
          )} - Fin: ${moment(item.fecha_fin).format('DD/MM/YYYY')} - Estado: ${
            estadoVacaciones[item?.estado_vacaciones]
          }`}
        />
      </CustomListItem>
    )
  }
  const handleUpdate = async () => {
    const data = await form.validateFields()
    data.fecha_inicio = moment(data.fecha[0])
    data.fecha_fin = moment(data.fecha[1])
    data.usuario_insercion = getSessionInfo()?.usuario
    dispatch(updateHolidays({ condition: { ...edit, ...data } }))
  }
  const handleCreate = async () => {
    const data = await form.validateFields()

    dispatch(
      createPermission({
        condition: {
          ...data,
          id_empleado: employeeSelected?.id,
          fecha_inicio: moment(data.fecha[0]),
          fecha_fin: moment(data.fecha[1]),
          imagenes: data?.documento?.file?.url ?? data?.documento,
          usuario_insercion: getSessionInfo().usuario,
        },
      })
    )
  }
  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(
            dataHolidays,
            [search, searchDepartamento],
            ['nombres']
          )?.filter((item) => item.estado_vacaciones === stateFilter),
          'fecha_insercion',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(
          dataHolidays,
          [search, searchDepartamento],
          ['nombres', 'apellidos']
        )?.filter((item) => item.estado_vacaciones === stateFilter)
  }, [search, searchDate, searchDepartamento, stateFilter, dataHolidays])
  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomForm form={form}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Vacaciones</CustomTitle>
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
                  </CustomRow>
                </CustomCol>

                <CustomCol span={12}>
                  <CustomRow justify={'end'}>
                    <CustomFormItem label={'Ver: '} className={'grupoPersona'}>
                      <CustomRadioGroup
                        value={stateFilter}
                        defaultValue={'G'}
                        onChange={(e) => {
                          setStateFilter(e.target.value)
                        }}
                      >
                        <CustomRadio value={'G'}>Generadas</CustomRadio>
                        <CustomRadio value={'T'}>Tomadas</CustomRadio>
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
              <CustomDivider />
              <CustomList
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                renderItem={renderItem}
              />
              <CustomModal
                title={
                  <CustomTitle>
                    {edit?.id
                      ? 'Editar Vacación'
                      : view
                      ? 'Ver Vacación'
                      : 'Registrar Vacación'}
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
                    label={'Fecha Inicio/Fin'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInputGroup compact>
                      <CustomFormItem
                        name={'fecha'}
                        label={'Fecha'}
                        rules={[{ required: true }]}
                        noStyle
                      >
                        <CustomRangePicker
                          size="small"
                          disabled={view}
                          onChange={(e) => {
                            form.setFieldValue(
                              'dias',
                              `${moment(e[1]).diff(moment(e[0]), 'days')} dias`
                            )
                          }}
                        />
                      </CustomFormItem>
                      <CustomFormItem name={'dias'} noStyle>
                        <CustomInput
                          placeholder="Dias"
                          disabled
                          style={{ width: '15%' }}
                        />
                      </CustomFormItem>
                    </CustomInputGroup>
                  </CustomFormItem>
                </CustomCol>

                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Sueldo Vacaciones'}
                    name={'sueldo_vacaciones'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInput placeholder="Sueldo Vacaciones" disabled />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Estado Vacaciones'}
                    name={'estado_vacaciones'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInput placeholder="Estado Vacaciones" disabled />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Observaciones'}
                    name={'observacion'}
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

export default Holidays
