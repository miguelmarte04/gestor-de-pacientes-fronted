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
import CustomRow from './CustomRow'
import CustomSpace from './CustomSpace'
import CustomTable from './CustomTable'
import CustomTitle from './CustomTitle'
import CustomTooltip from './CustomTooltip'
import CustomModal from './CustomModal'
import CustomFormItem from './CustomFormItem'
import { defaultBreakpoints } from '../themes'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import { FormInstance, Select } from 'antd'
import {
  createContactEmergency,
  getContactEmergency,
  updateContactEmergency,
} from '../slicers/employee'
import { EmergencyContactType } from '../slicers/employee'
import { CustomModalConfirmation } from './ConfirmModalMethod'
import { format, maskedInput } from '../constants/general'
import CustomMaskedInput from './CustomMaskedInput'
import { getSessionInfo } from '../utils/session'
import { useAppDispatch, useAppSelector } from '../hooks'
import { AnyType } from '../constants/types'

type emergencyType = {
  id: number
  form: FormInstance
}
const EmergencyDataEmployee = ({
  id,
  form,
}: emergencyType): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false)
  const { relationShip } = useAppSelector((state) => state.general)
  const [editable, setEditable] = useState(false)
  const [editableContact, setEditableContact] = useState<EmergencyContactType>()
  const [refresh, setRefresh] = useState(false)
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
  const { contactEmergency } = useAppSelector((state) => state.employee)
  const { Option } = Select
  useEffect(() => {
    if (id) {
      dispatch(
        getContactEmergency({
          condition: {
            id_empleado: id,
          },
        })
      )
    }
  }, [refresh])

  const handleEdit = (record: EmergencyContactType) => {
    setEditable(true)
    setEditableContact(record)
    form.setFieldsValue({
      ...record,
    })
    setEmergencyModalOpen(true)
  }

  const handleDelete = (record: EmergencyContactType) => {
    CustomModalConfirmation({
      title: 'Deshabilitar',
      content: 'Desea deshabilitar este registro?',
      visible: visibleModalConfirm,
      onOk: () => {
        delete record.parentesco
        dispatch(
          updateContactEmergency({
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
  const columns: ColumnType<EmergencyContactType>[] = [
    {
      key: 'nombre',
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      key: 'telefono',
      title: 'Teléfono',
      dataIndex: 'telefono',
      width: '30%',
      render: (text: string) => {
        return format({ value: text, type: 'phone' })
      },
    },
    {
      key: 'direccion',
      title: 'Dirección',
      dataIndex: 'direccion',
    },
    {
      key: 'parentesco',
      title: 'Parentesco',
      dataIndex: 'parentesco',
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
                  : 'Moneda inactiva, no permite edición'
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
  const title = () => {
    return (
      <CustomCol xs={24}>
        <CustomRow justify="end">
          <CustomTooltip title={'Nuevo Contacto de emergencia'}>
            <CustomButton
              icon={<PlusOutlined />}
              shape={'circle'}
              size={'middle'}
              type={'primary'}
              onClick={() => setEmergencyModalOpen(true)}
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
        setEmergencyModalOpen(!emergencyModalOpen)
        form.resetFields(['nombre', 'telefono', 'direccion', 'id_parentesco'])
      },
    })
  }
  const handleSubmit = async () => {
    const data = await form.validateFields()
    if (editable) {
      dispatch(
        updateContactEmergency({
          condition: {
            ...data,
            id: editableContact?.id,
            estado: editableContact?.estado,
            id_empleado: id,
            telefono: `${data?.telefono}`
              .replace(/\s/g, '')
              .replace(/[()]/g, ''),
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    } else {
      dispatch(
        createContactEmergency({
          condition: {
            ...data,
            id_empleado: id,
            telefono: `${data.telefono}`
              .replace(/\s/g, '')
              .replace(/[()]/g, ''),
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    }
    setEditable(false)
    setEmergencyModalOpen(!emergencyModalOpen)
    setRefresh(!refresh)
    form.resetFields(['nombre', 'telefono', 'direccion', 'id_parentesco'])
  }
  return (
    <CustomRow justify="start">
      <CustomDivider orientation={'left'}>
        <CustomTitle>Contactos de Emergencia</CustomTitle>
      </CustomDivider>
      <CustomCol xs={24} style={{ marginBottom: '2%' }}>
        <CustomTable
          title={title}
          columns={columns}
          dataSource={contactEmergency}
          rowKey={(row) => row.id}
        />
      </CustomCol>
      <CustomCol xs={24}>
        <CustomModal
          title={
            <CustomTitle>
              {editable
                ? 'Editar Contacto de Emergencia'
                : 'Registrar Contacto de Emergencia'}
            </CustomTitle>
          }
          width={700}
          visible={emergencyModalOpen}
          onCancel={onCancelModal}
          onOk={handleSubmit}
          okText={editable ? 'Guardar' : 'Registrar'}
        >
          <CustomRow justify="start">
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Nombre'}
                name={'nombre'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomInput placeholder="Nombre" />
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
                    message: 'El telefono debe tener 10 digitos',
                  },
                ]}
                labelCol={{ span: 8 }}
              >
                <CustomMaskedInput
                  mask={maskedInput.telefono}
                  placeholder="Teléfono"
                  maxLength={14}
                  autoComplete="off"
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Dirección'}
                name={'direccion'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomInput placeholder="Dirección" />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Parentesco'}
                name={'id_parentesco'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomSelect placeholder={'Seleccione el Parentesco'}>
                  {relationShip?.map((item: AnyType) => (
                    <Option key={item.id} value={item.id}>
                      {item.parentesco}
                    </Option>
                  ))}
                </CustomSelect>
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomModal>
      </CustomCol>
    </CustomRow>
  )
}

export default EmergencyDataEmployee
