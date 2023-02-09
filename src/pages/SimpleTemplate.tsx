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
import { EmployeeType } from '../slicers/employee/types'
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
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import { getSessionInfo } from '../utils/session'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import {
  createConsultas,
  getConsultas,
  updateConsultas,
} from '../slicers/general/general'
import { ConsultasType } from '../slicers/general'
interface TemplateProps {
  State: string
}

const SimpleTemplate: React.FC<TemplateProps> = ({
  State,
}): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { Consultas, fetchingGeneralData, createConsultasRequestStatus } =
    useAppSelector((state) => state.general)

  useEffect(() => {
    State === 'C' && dispatch(getConsultas({}))
  }, [])

  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<ConsultasType>()
  const [view, setView] = useState(false)
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const [visible, setVisible] = useState(false)
  const [stateFilter, setStateFilter] = useState<string>('A')

  const title = {
    C: {
      title: 'Consultas',
      titleModal: 'Registrar Consulta',
      titleModalEdit: 'Editar Consulta',
    },
  }

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
    if (createConsultasRequestStatus === 'success') {
      dispatch(getConsultas({}))
      form.resetFields()
      setVisible(false)
      setEdit(undefined)
      setView(false)
    }
  }, [createConsultasRequestStatus])

  const handleDelete = (record: ConsultasType) => {
    dispatch(
      updateConsultas({
        condition: {
          ...record,
          estado: record.estado === 'A' ? 'I' : 'A',
        },
      })
    )
  }
  const handleEdit = (record: ConsultasType) => {
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
  const handleView = (record: ConsultasType) => {
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

  const renderItem = (item: ConsultasType) => {
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
                  {`${item.departamento?.charAt(0)?.toUpperCase()}`}
                </span>
              }
            />
          }
          title={`${item.departamento}`}
          description={`Encargado: ${item?.nombres} ${
            item?.apellidos
          } - ${formatter({
            value: item?.doc_identidad,
            type: 'identity_doc',
          })}`}
        />
      </CustomListItem>
    )
  }
  const handleUpdate = async () => {
    const data = await form.validateFields()
    dispatch(updateConsultas({ condition: { ...edit, ...data } }))
  }
  const handleCreate = async () => {
    const data = await form.validateFields()
    State === 'C' &&
      dispatch(
        createConsultas({
          condition: {
            ...data,
            id_empleado_encargado: employeeSelected?.id,
            usuario_insercion: getSessionInfo().usuario,
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
                  <CustomTitle>{title[`${State}`]?.title}</CustomTitle>
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
                      <CustomTooltip title={'Nuevo Departamento'}>
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
                        Consultas?.filter(
                          (item) => item.estado === 'A' || item.estado === 'I'
                        ),
                        ['nombres', 'doc_identidad'],
                        search
                      )
                    : searchInArray(
                        Consultas?.filter(
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
                      ? title[`${State}`]?.titleModalEdit
                      : title[`${State}`]?.titleModal}
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
                    label={'Empleado Encargado'}
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
                    label={'Departamento'}
                    name={'departamento'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInput placeholder="Departamento" />
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

export default SimpleTemplate
