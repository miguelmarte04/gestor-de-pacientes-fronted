import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Form } from 'antd'
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
import CustomModal from '../components/CustomModal'
import CustomRadio from '../components/CustomRadio'
import CustomRadioGroup from '../components/CustomRadioGroup'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomSearchEmployee from '../components/CustomSearchPacientes'
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
import CustomTable from '../components/CustomTable'
import { ColumnType } from 'antd/lib/table'
import { AnyType } from '../constants/types'
import CustomSpace from '../components/CustomSpace'
import moment from 'moment'
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
      // nombres: `${record?.nombres} ${record?.apellidos}`,
      // doc_identidad: formatter({
      //   value: record?.doc_identidad,
      //   type: 'identity_doc',
      // }),
    })
  }

  const columns: ColumnType<ConsultasType>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'paciente',
      title: 'Paciente',
      dataIndex: 'paciente',
      render: (_, record) => {
        return `${record.nombre_paciente} ${record.apellido_paciente}`
      },
    },
    {
      key: 'doctor',
      title: 'Doctor',
      dataIndex: 'doctor',
      render: (_, record) => {
        return `${record.nombre_doctor} ${record.apellido_doctor}`
      },
    },
    {
      key: 'asunto',
      title: 'Asunto',
      dataIndex: 'asunto',
    },
    {
      key: 'inicio',
      title: 'Inicio',
      width: '10%',
      dataIndex: 'inicio',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
      },
    },
    {
      key: 'fin',
      title: 'Fin',
      width: '10%',
      dataIndex: 'fin',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
      },
    },

    {
      key: 'acciones',
      title: 'Acciones',
      align: 'center',
      width: '10%',
      render: (_, item: AnyType) => {
        return (
          <CustomSpace>
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
            </CustomTooltip>

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
            </CustomTooltip>
          </CustomSpace>
        )
      },
    },
  ]
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
              <CustomTable
                columns={columns}
                dataSource={
                  stateFilter === ''
                    ? searchInArray(
                        Consultas?.filter(
                          (item) => item.estado === 'A' || item.estado === 'I'
                        ),
                        ['nombre_paciente', 'apellido_paciente', 'asunto'],
                        search
                      )
                    : searchInArray(
                        Consultas?.filter(
                          (item) => item.estado === 'A' || item.estado === 'I'
                        ),
                        ['nombre_paciente', 'apellido_paciente', 'asunto'],
                        search
                      )?.filter((item) => item.estado === stateFilter)
                }
                pagination={{ pageSize: 5 }}
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
