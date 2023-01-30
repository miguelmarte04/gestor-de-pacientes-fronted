import {
  CheckCircleOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { defaultBreakpoints } from '../themes'
import CustomButton from './CustomButton'
import CustomCol from './CustomCol'
import CustomDivider from './CustomDivider'
import CustomFormItem from './CustomFormItem'
import CustomModal from './CustomModal'
import CustomRow from './CustomRow'
import CustomSpace from './CustomSpace'
import CustomTable from './CustomTable'
import CustomTitle from './CustomTitle'
import CustomTooltip from './CustomTooltip'
import CustomSelect from './CustomSelect'
import { FormInstance, Select } from 'antd'
import {
  createPhone,
  getPhone,
  PhoneType,
  updatePhone,
} from '../slicers/employee'
import { CustomModalConfirmation } from './ConfirmModalMethod'
import { format, maskedInput } from '../constants/general'
import CustomSpin from './CustomSpin'
import CustomMaskedInput from './CustomMaskedInput'
import { getSessionInfo } from '../utils/session'
import { useAppDispatch, useAppSelector } from '../hooks'
import { TableRowSelection } from 'antd/lib/table/interface'

type phone = {
  id: number
  form: FormInstance
}

const { Option } = Select

const Phone = ({ id, form }: phone): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const [editablePhone, setEditablePhone] = useState<PhoneType>()
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
  const { phoneTypes } = useAppSelector((state) => state.general)
  const [refresh, setRefresh] = useState(false)
  const [editable, setEditable] = useState(false)
  const { phone, fetchingFromEmployee, employeeRequestStatus } = useAppSelector(
    (state) => state.employee
  )
  useEffect(() => {
    employeeRequestStatus === 'success' && setRefresh(!refresh)
  }, [employeeRequestStatus])

  useEffect(() => {
    if (id) {
      dispatch(
        getPhone({
          condition: {
            id_empleado: id,
          },
        })
      )
    }
  }, [refresh])

  const handleEdit = (record: PhoneType) => {
    setEditable(true)
    setEditablePhone(record)
    form.setFieldsValue({
      ...record,
    })
    setPhoneModalOpen(true)
  }

  const handleSubmit = async () => {
    const data = await form.validateFields()
    if (editable) {
      delete data.tipo_telefono
      dispatch(
        updatePhone({
          condition: {
            ...data,
            id: editablePhone?.id,
            id_empleado: id,
            estado: editablePhone?.estado,
            telefono: `${data.telefono}`.replace(/[^0-9]/g, ''),
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    } else {
      dispatch(
        createPhone({
          condition: {
            ...data,
            id_empleado: id,
            telefono: `${data.telefono}`.replace(/[^0-9]/g, ''),
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    }
    setEditable(false)
    setPhoneModalOpen(!phoneModalOpen)
    setRefresh(!refresh)
    form.resetFields(['id_tipo_telefono', 'telefono'])
  }

  const title = () => {
    return (
      <CustomCol xs={24}>
        <CustomRow justify="end">
          <CustomTooltip title={'Nuevo Teléfono'}>
            <CustomButton
              icon={<PlusOutlined />}
              shape={'circle'}
              size={'middle'}
              type={'primary'}
              onClick={() => {
                form.resetFields(['id_tipo_telefono', 'telefono'])
                setEditable(false)
                setPhoneModalOpen(true)
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
      content: 'Desea detener el proceso de registro?',
      visible: visibleModalConfirm,
      onOk: () => {
        setPhoneModalOpen(!phoneModalOpen)
        form.resetFields(['id_tipo_telefono', 'telefono'])
      },
    })
  }

  const handleDelete = (record: PhoneType) => {
    CustomModalConfirmation({
      title: 'Deshabilitar',
      content: 'Desea deshabilitar este registro?',
      visible: visibleModalConfirm,
      onOk: () => {
        delete record.tipo_telefono
        dispatch(
          updatePhone({
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

  const rowSelection: TableRowSelection<PhoneType> = {
    type: 'radio',
    onSelect: (data) => {
      const record = { ...data }

      delete record.tipo_telefono
      dispatch(
        updatePhone({
          condition: {
            ...record,
            principal: 1,
          },
        })
      )
    },
    columnTitle: 'Principal',
    columnWidth: '5%',
    selectedRowKeys: phone
      ?.filter((item) => item.principal === 1)
      ?.map((item) => item.id),
  }

  const columns: ColumnType<PhoneType>[] = [
    {
      key: 'tipo_telefono',
      title: 'Tipo de Teléfono',
      dataIndex: 'tipo_telefono',
    },
    {
      key: 'telefono',
      title: 'Teléfono',
      dataIndex: 'telefono',
      render: (text: string) => {
        return format({ value: text, type: 'phone' })
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
                  : 'Teléfono inactivo, no permite edición'
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

  return (
    <CustomSpin spinning={fetchingFromEmployee}>
      <CustomRow justify={'start'}>
        <CustomDivider orientation={'left'}>
          <CustomTitle>Teléfonos</CustomTitle>
        </CustomDivider>
        <CustomCol xs={24} style={{ marginBottom: '2%' }}>
          <CustomTable
            title={title}
            columns={columns}
            rowSelection={rowSelection}
            dataSource={phone}
            rowKey={(row) => row.id}
          />

          <CustomModal
            title={
              <CustomTitle>
                {editable ? 'Editar Teléfono' : 'Registrar Teléfono'}
              </CustomTitle>
            }
            width={800}
            open={phoneModalOpen}
            onCancel={onCancelModal}
            onOk={handleSubmit}
            okText={editable ? 'Guardar' : 'Registrar'}
          >
            <CustomRow justify="start">
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={'Tipo de telefono'}
                  name={'id_tipo_telefono'}
                  rules={[{ required: true }]}
                  labelCol={{ span: 8 }}
                >
                  <CustomSelect placeholder={'Seleccionar Tipo de telefono'}>
                    {phoneTypes?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.tipo_telefono}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={'Teléfono'}
                  name={'telefono'}
                  rules={[
                    { required: true },
                    {
                      pattern:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: 'El telefono debe tener 10 dígitos',
                    },
                  ]}
                  labelCol={{ span: 8 }}
                >
                  <CustomMaskedInput
                    mask={maskedInput.telefono}
                    placeholder={'Teléfono'}
                    maxLength={14}
                    autoComplete={'off'}
                  />
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomModal>
        </CustomCol>
      </CustomRow>
    </CustomSpin>
  )
}

export default Phone
