import {
  CheckOutlined,
  DeleteOutlined,
  EyeOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  getLaidOff,
  getTypeLayoffs,
  updateLayoff,
} from '../slicers/employee/employee'
import { EmployeeType, LayoffsType } from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import { formatter, searchInArray } from '../utils/general'
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
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import CustomInputNumber from '../components/CustomInputNumber'
const ApproveLayoffs = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const {
    dataLaidOff,
    dataTypeLayoffs,
    createLayoffRequestStatus,
    fetchingFromEmployee,
  } = useAppSelector((state) => state.employee)
  useEffect(() => {
    dispatch(getTypeLayoffs({}))
    dispatch(getLaidOff({}))
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
    }
  }, [createLayoffRequestStatus])

  const handleDelete = (record: LayoffsType) => {
    dispatch(
      updateLayoff({
        condition: {
          ...record,
          estado: 'R',
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
          <>
            {item.estado === 'A' && (
              <CustomTooltip key={'aprobar'} title={'Aprobar'}>
                <CustomButton
                  onClick={() => handleEdit(item)}
                  type={'link'}
                  icon={<CheckOutlined style={{ fontSize: '18px' }} />}
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
            {item.estado === 'A' && (
              <CustomTooltip
                key={'delete'}
                title={
                  item.estado === 'A' || item.estado === 'U'
                    ? 'Rechazar'
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
              </CustomTooltip>
            )}
          </>,
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
          description={`Razón: ${item?.tipo_razon} - Estado: ${
            item?.estado === 'A'
              ? 'Pendiente'
              : item?.estado === 'R'
              ? 'Rechazado'
              : 'Aprobado'
          }`}
        />
      </CustomListItem>
    )
  }
  const handleUpdate = async () => {
    const data = await form.validateFields()
    dispatch(updateLayoff({ condition: { ...edit, ...data, estado: 'U' } }))
  }
  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomForm
              form={form}
              onChange={() => {
                const data = form.getFieldsValue()
                const prestaciones =
                  Number(data?.preaviso) +
                  Number(data?.regalia) +
                  Number(data?.cesantia)
                form.setFieldValue('total_prestaciones', prestaciones)
              }}
            >
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Aprobar / Rechazar Despidos</CustomTitle>
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
                        defaultValue={'A'}
                        onChange={(e) => {
                          setStateFilter(e.target.value)
                        }}
                      >
                        <CustomRadio value={'A'}>Pendientes</CustomRadio>
                        <CustomRadio value={'U'}>Aprobados</CustomRadio>
                        <CustomRadio value={'R'}>Rechazados</CustomRadio>
                      </CustomRadioGroup>
                    </CustomFormItem>
                  </CustomRow>
                </CustomCol>
              </CustomRow>

              <CustomList
                dataSource={
                  stateFilter === ''
                    ? searchInArray(
                        dataLaidOff?.filter((item) => item?.estado !== 'I'),
                        ['nombres', 'doc_identidad'],
                        search
                      )
                    : searchInArray(
                        dataLaidOff?.filter((item) => item?.estado !== 'I'),
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
                      ? 'Aprobar Despido'
                      : view
                      ? 'Ver Despido'
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
                  handleUpdate()
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
                      disabled
                      options={dataTypeLayoffs?.map((item) => ({
                        label: item.tipo_razon,
                        value: item.id,
                      }))}
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Cesantía'}
                    name={'cesantia'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInputNumber
                      placeholder="Cesantía"
                      style={{ width: '50%' }}
                      format={{ format: 'money', coin: 'RD' }}
                      readOnly={view}
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Preaviso'}
                    name={'preaviso'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInputNumber
                      placeholder="Preaviso"
                      style={{ width: '50%' }}
                      format={{ format: 'money', coin: 'RD' }}
                      readOnly={view}
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Regalia'}
                    name={'regalia'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInputNumber
                      placeholder="Regalia"
                      style={{ width: '50%' }}
                      format={{ format: 'money', coin: 'RD' }}
                      readOnly={view}
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Total a pagar'}
                    name={'total_prestaciones'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInputNumber
                      readOnly
                      placeholder="Total a pagar"
                      style={{ width: '50%' }}
                      format={{ format: 'money', coin: 'RD' }}
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

export default ApproveLayoffs
