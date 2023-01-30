import {
  CheckCircleOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { FormInstance } from 'antd'
import { ColumnType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import CustomCol from './CustomCol'
import CustomDivider from './CustomDivider'
import CustomRow from './CustomRow'
import CustomSpace from './CustomSpace'
import CustomSpin from './CustomSpin'
import CustomTable from './CustomTable'
import CustomTitle from './CustomTitle'
import CustomTooltip from './CustomTooltip'
import {
  createEmail,
  EmailType,
  getEmail,
  updateEmail,
} from '../slicers/employee'
import { CustomModalConfirmation } from './ConfirmModalMethod'
import { getSessionInfo } from '../utils/session'
import { useAppDispatch, useAppSelector } from '../hooks'
import { TableRowSelection } from 'antd/lib/table/interface'
import CustomModal from './CustomModal'
import { defaultFullBreakpoints } from '../themes'
import CustomFormItem from './CustomFormItem'
import CustomInput from './CustomInput'

interface EmailsProps {
  id: number
  form: FormInstance
}

const Emails: React.FC<EmailsProps> = ({ id, form }): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [editable, setEditable] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [editableEmail, setEditableEmail] = useState<EmailType>()
  const { email, fetchingFromEmployee, employeeRequestStatus } = useAppSelector(
    (state) => state.employee
  )

  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    employeeRequestStatus === 'success' && setRefresh(!refresh)
  }, [employeeRequestStatus])

  useEffect(() => {
    if (id) {
      dispatch(
        getEmail({
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
          <CustomTooltip title={'Nuevo Correo Electrónico'}>
            <CustomButton
              icon={<PlusOutlined />}
              shape={'circle'}
              size={'middle'}
              type={'primary'}
              onClick={() => {
                setEditable(false)
                setEmailModalOpen(true)
              }}
            />
          </CustomTooltip>
        </CustomRow>
      </CustomCol>
    )
  }
  const handleDelete = (record: EmailType) => {
    CustomModalConfirmation({
      title: 'Deshabilitar',
      content: 'Desea deshabilitar este registro?',
      onOk: () => {
        delete record.tipo_correo_electronico
        dispatch(
          updateEmail({
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
  const handleEdit = (record: EmailType) => {
    setEditable(true)
    setEditableEmail(record)
    form.setFieldsValue({
      ...record,
    })
    setEmailModalOpen(true)
  }

  const rowSelection: TableRowSelection<EmailType> = {
    type: 'radio',
    onSelect: (data) => {
      const record = { ...data }

      dispatch(
        updateEmail({
          condition: {
            ...record,
            principal: 1,
          },
        })
      )
    },
    columnTitle: 'Principal',
    columnWidth: '5%',
    selectedRowKeys: email
      ?.filter((item) => item.principal === 1)
      ?.map((item) => item.id),
  }

  const columns: ColumnType<EmailType>[] = [
    {
      key: 'correo_electronico',
      title: 'Correo Electronico',
      dataIndex: 'correo_electronico',
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
                  : 'Correo inactivo, no permite edición'
              }
            >
              <CustomButton
                disabled={record.estado === 'I'}
                onClick={() => {
                  handleEdit(record)
                }}
                type={'link'}
                icon={<EditOutlined style={{ fontSize: '18px' }} />}
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
      dispatch(
        updateEmail({
          condition: {
            ...data,
            id: editableEmail?.id,
            id_empleado: id,
            estado: editableEmail?.estado,
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    } else {
      dispatch(
        createEmail({
          condition: {
            ...data,
            id_empleado: id,
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    }
    setEditable(false)
    setEmailModalOpen(!emailModalOpen)
    setRefresh(!refresh)
    form.resetFields(['correo_electronico'])
  }
  const onCancelModal = () => {
    setEditable(false)
    setEmailModalOpen(!emailModalOpen)

    form.resetFields(['correo_electronico'])
  }
  return (
    <CustomSpin spinning={fetchingFromEmployee}>
      <CustomRow justify="start">
        <CustomDivider orientation={'left'}>
          <CustomTitle>Correo Electrónico</CustomTitle>
        </CustomDivider>
        <CustomCol xs={24} style={{ marginBottom: '2%' }}>
          <CustomTable
            title={title}
            columns={columns}
            dataSource={email}
            rowSelection={rowSelection}
            rowKey={(row) => row.id}
          />
        </CustomCol>
      </CustomRow>
      <CustomModal
        title={
          <CustomTitle>
            {editable
              ? 'Editar Correo Electrónico'
              : 'Registrar Correo Electrónico'}
          </CustomTitle>
        }
        width={700}
        visible={emailModalOpen}
        onCancel={onCancelModal}
        onOk={handleSubmit}
        okText={editable ? 'Guardar' : 'Registrar'}
      >
        <CustomRow justify="start">
          <CustomCol {...defaultFullBreakpoints}>
            <CustomFormItem
              label={'Correo Electrónico'}
              name={'correo_electronico'}
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Ingrese un correo electrónico válido',
                },
              ]}
            >
              <CustomInput
                placeholder="Correo Electrónico"
                style={{ width: '80%' }}
              />
            </CustomFormItem>
          </CustomCol>
        </CustomRow>
      </CustomModal>
    </CustomSpin>
  )
}

export default Emails
