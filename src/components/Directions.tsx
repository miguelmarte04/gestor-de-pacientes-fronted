import {
  CheckCircleOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import CustomCol from './CustomCol'
import CustomDivider from './CustomDivider'
import CustomFormItem from './CustomFormItem'
import CustomModal from './CustomModal'
import CustomRow from './CustomRow'
import CustomSelect from './CustomSelect'
import CustomSpace from './CustomSpace'
import CustomTable from './CustomTable'
import CustomTitle from './CustomTitle'
import CustomTooltip from './CustomTooltip'
import CustomTextArea from './CustomTextArea'
import CustomInput from './CustomInput'
import { FormInstance, Select } from 'antd'
import { CountriesType, getProvinces, ProvincesType } from '../slicers/general'
import CustomSpin from './CustomSpin'
import {
  AddressType,
  createAddress,
  getAddress,
  updateAddress,
} from '../slicers/employee'
import { CustomModalConfirmation } from './ConfirmModalMethod'
import { getSessionInfo } from '../utils/session'
import { AnyType } from '../constants/types'
import { useAppDispatch, useAppSelector } from '../hooks'

const { Option } = Select
interface DirectionsProps {
  id: number
  form: FormInstance
}

const Directions: React.FC<DirectionsProps> = ({
  id,
  form,
}): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [directionModalOpen, setDirectionModalOpen] = useState(false)
  const [editableDireccion, setEditableDireccion] = useState<AddressType>()
  const [editable, setEditable] = useState(false)
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
  const { countries, provinces } = useAppSelector((state) => state.general)
  const { direction } = useAppSelector((state) => state.employee)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    dispatch(
      getProvinces({
        condition: {
          id_pais: 138,
        },
      })
    )
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(
        getAddress({
          condition: {
            id_empleado: id,
          },
        })
      )
    }
  }, [refresh])

  const title = () => {
    return (
      <CustomCol xs={24}>
        <CustomRow justify="end">
          <CustomTooltip title={'Nueva Dirección'}>
            <CustomButton
              icon={<PlusOutlined />}
              shape={'circle'}
              size={'middle'}
              type={'primary'}
              onClick={() => {
                form.resetFields([
                  'id_pais',
                  'id_provincia',
                  'calle',
                  'no_casa',
                  'info_adicional',
                ])
                setDirectionModalOpen(true)
              }}
            />
          </CustomTooltip>
        </CustomRow>
      </CustomCol>
    )
  }

  const onCancelModal = () => {
    setVisibleModalConfirm(true)
    CustomModalConfirmation({
      title: 'Cancelar',
      content: 'Desea cancelar esta operacion?',
      visible: visibleModalConfirm,
      onOk: () => {
        setDirectionModalOpen(!directionModalOpen)
        form.resetFields([
          'id_pais',
          'id_provincia',
          'calle',
          'no_casa',
          'info_adicional',
        ])
        setEditable(false)
      },
    })
  }

  const handleEdit = (record: AddressType) => {
    setEditable(true)
    setEditableDireccion(record)
    form.setFieldsValue({
      ...record,
    })
    setDirectionModalOpen(true)
  }

  const handleDelete = (record: AddressType) => {
    CustomModalConfirmation({
      title: 'Deshabilitar',
      content: 'Desea deshabilitar este registro?',
      visible: visibleModalConfirm,
      onOk: () => {
        delete record.pais
        delete record.provincia

        dispatch(
          updateAddress({
            condition: {
              ...record,
              estado: record.estado === 'A' ? 'I' : 'A',
              usuario_insercion: getSessionInfo().usuario,
            },
          })
        )
        setRefresh(!refresh)
      },
    })
  }
  const columns: ColumnType<AddressType>[] = [
    {
      key: 'DIRECCION',
      title: 'Dirección',
      dataIndex: 'DIRECCION',
      render: (_, record) => {
        return (
          <div
            style={{
              textTransform: 'uppercase',
              width: '800px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 'bold',
            }}
          >
            <label>{`CASA NO.${record.no_casa}, Calle ${record.calle}, ${record.provincia}, ${record.pais}, ${record.info_adicional}`}</label>
          </div>
        )
      },
    },
    {
      key: 'ACCIONES',
      title: 'Acciones',
      dataIndex: 'ACCIONES',
      width: '10%',
      render: (_, record) => {
        return (
          <CustomSpace>
            <CustomTooltip
              title={
                record.estado === 'A'
                  ? 'Editar'
                  : 'Direccion inactiva, no permite edición'
              }
            >
              <CustomButton
                disabled={record.estado === 'I'}
                onClick={() => {
                  handleEdit(record)
                }}
                type={'link'}
                icon={<EditOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>
            <CustomTooltip
              title={record.estado === 'A' ? 'Inhabilitar' : 'Habilitar'}
            >
              <CustomButton
                onClick={() => handleDelete(record)}
                type={'link'}
                icon={
                  record.estado === 'A' ? (
                    <CheckCircleOutlined style={{ fontSize: '18px' }} />
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
  const handleSubmit = async () => {
    const data = await form.validateFields()
    if (editable) {
      delete data.tipo_telefono
      dispatch(
        updateAddress({
          condition: {
            ...data,
            id: editableDireccion?.id,
            id_empleado: id,
            estado: editableDireccion?.estado,
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    } else {
      dispatch(
        createAddress({
          condition: {
            ...data,
            id_empleado: id,
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    }
    setEditable(false)
    setDirectionModalOpen(!directionModalOpen)
    setRefresh(!refresh)
    form.resetFields([
      'id_pais',
      'id_provincia',
      'calle',
      'no_casa',
      'info_adicional',
    ])
  }
  return (
    <CustomSpin>
      <CustomRow justify="start">
        <CustomDivider orientation={'left'}>
          <CustomTitle>Direcciones</CustomTitle>
        </CustomDivider>
        <CustomCol xs={24} style={{ marginBottom: '2%' }}>
          <CustomTable
            title={title}
            columns={columns}
            dataSource={direction}
            rowKey={(row) => row.id}
          />

          <CustomModal
            title={
              <CustomTitle>
                {editable ? 'Editar Direccion' : 'Registrar Direccion'}{' '}
              </CustomTitle>
            }
            width={'50%'}
            visible={directionModalOpen}
            onCancel={onCancelModal}
            onOk={handleSubmit}
            okText={editable ? 'Guardar' : 'Registrar'}
          >
            <CustomRow justify="start">
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'País'}
                  name={'id_pais'}
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  initialValue={138}
                >
                  <CustomSelect
                    defaultValue={138}
                    placeholder={'Seleccionar País'}
                    onSelect={(item: AnyType) =>
                      dispatch(
                        getProvinces({
                          condition: {
                            id_pais: item,
                          },
                        })
                      )
                    }
                  >
                    {countries?.map((item: CountriesType) => (
                      <Option key={item.id} title={item.pais} value={item.id}>
                        {item.pais}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Provincia o Estado'}
                  name={'id_provincia'}
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                >
                  <CustomSelect placeholder={'Seleccionar Provincia o Estado'}>
                    {provinces?.map((item: ProvincesType) => (
                      <Option
                        key={item.id}
                        title={item.provincia}
                        value={item.id}
                      >
                        {item.provincia}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>

              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Calle'}
                  name={'calle'}
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                >
                  <CustomInput placeholder="Calle" />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'No. Casa'}
                  name={'no_casa'}
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                >
                  <CustomInput placeholder="No. Casa" type={'number'} />
                </CustomFormItem>
              </CustomCol>

              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Información Adicional'}
                  name={'info_adicional'}
                  labelCol={{ span: 6 }}
                >
                  <CustomTextArea placeholder="Información Adicional (Opcional)" />
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomModal>
        </CustomCol>
      </CustomRow>
    </CustomSpin>
  )
}

export default Directions
