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
import CustomInputDate from './CustomInputDate'
import CustomTextArea from './CustomTextArea'
import { getAcademicLevel } from '../slicers/general'
import { Select } from 'antd'
import { CustomModalConfirmation } from './ConfirmModalMethod'
import CustomForm from './CustomForm'
import { useForm } from 'antd/lib/form/Form'
import {
  createAcademic,
  getAcademic,
  updateAcademic,
} from '../slicers/employee'
import moment from 'moment'
import { AcademicType } from '../slicers/employee'
import { getSessionInfo } from '../utils/session'
import { useAppDispatch, useAppSelector } from '../hooks'

interface AcademicDataEmployeeProps {
  id: number
}

const { Option } = Select

const AcademicDataEmployee: React.FC<AcademicDataEmployeeProps> = ({
  id,
}): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [academicModalOpen, setAcademicModalOpen] = useState(false)
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [editable, setEditable] = useState(false)
  const [editableAcademic, setEditableAcademic] = useState<AcademicType>()
  const { academicLevel } = useAppSelector((state) => state.general)
  const { academic } = useAppSelector((state) => state.employee)
  const [form] = useForm()
  useEffect(() => {
    dispatch(getAcademicLevel({}))
    form.resetFields([
      'id_nivel_academico',
      'institucion',
      'fecha_finalizacion',
      'observaciones',
    ])
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(
        getAcademic({
          condition: {
            id_empleado: id,
          },
        })
      )
    }
  }, [refresh])

  const handleEdit = (record: AcademicType) => {
    setEditable(true)
    setEditableAcademic(record)
    form.setFieldsValue({
      ...record,
      fecha_finalizacion: moment(record.fecha_finalizacion).format(
        'DD/MM/YYYY'
      ),
    })

    setAcademicModalOpen(true)
  }
  const handleDelete = (record: AcademicType) => {
    CustomModalConfirmation({
      title: 'Deshabilitar',
      content: 'Desea deshabilitar este registro?',
      visible: visibleModalConfirm,
      onOk: () => {
        dispatch(
          updateAcademic({
            condition: {
              id: record.id,
              id_nivel_academico: record.id_nivel_academico,
              id_empleado: id,
              estado: record.estado === 'A' ? 'I' : 'A',
              institucion: record.institucion,
              fecha_finalizacion: record.fecha_finalizacion,
              observaciones: record.observaciones,
              usuario_insercion: getSessionInfo().usuario,
            },
          })
        )
        setRefresh(!refresh)
      },
    })
  }

  const columns: ColumnType<AcademicType>[] = [
    {
      key: 'nivel_academico',
      title: 'Nivel Académico',
      dataIndex: 'nivel_academico',
    },

    {
      key: 'institucion',
      title: 'Institución',
      dataIndex: 'institucion',
      width: '30%',
    },

    {
      key: 'fecha_finalizacion',
      title: 'Fecha Finalizarían',
      dataIndex: 'fecha_finalizacion',
      render(fecha: string) {
        return moment(fecha).format('DD/MM/YYYY')
      },
    },
    {
      key: 'observaciones',
      title: 'Observaciones',
      dataIndex: 'observaciones',
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
  const handleSubmit = async () => {
    const data = await form.validateFields()
    if (editable) {
      dispatch(
        updateAcademic({
          condition: {
            id: editableAcademic?.id,
            id_nivel_academico: data.id_nivel_academico,
            id_empleado: id,
            estado: editableAcademic?.estado,
            institucion: data.institucion,
            fecha_finalizacion: moment(
              data.fecha_finalizacion,
              'DD/MM/YYYY',
              true
            ).toISOString(),
            observaciones: data.observaciones,
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    } else {
      dispatch(
        createAcademic({
          condition: {
            id_empleado: id,
            id_nivel_academico: Number(data.id_nivel_academico),
            fecha_finalizacion: moment(
              data.fecha_finalizacion,
              'DD/MM/YYYY',
              true
            ).toISOString(),
            observaciones: data.observaciones,
            institucion: data.institucion,
            usuario_insercion: getSessionInfo().usuario,
          },
        })
      )
    }
    setEditable(false)
    setAcademicModalOpen(false)
    setRefresh(!refresh)
    form.resetFields([
      'id_nivel_academico',
      'institucion',
      'fecha_finalizacion',
      'observaciones',
    ])
  }
  const title = () => {
    return (
      <CustomCol xs={24}>
        <CustomRow justify="end">
          <CustomTooltip title={'Agregar Datos Académicos'}>
            <CustomButton
              icon={<PlusOutlined />}
              shape={'circle'}
              size={'middle'}
              type={'primary'}
              onClick={() => {
                setAcademicModalOpen(true)
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
        setAcademicModalOpen(!academicModalOpen)
        form.resetFields([
          'id_nivel_academico',
          'institucion',
          'fecha_finalizacion',
          'observaciones',
        ])
        setEditable(false)
      },
    })
  }
  return (
    <CustomRow justify="start">
      <CustomDivider orientation={'left'}>
        <CustomTitle>Datos Académicos</CustomTitle>
      </CustomDivider>
      <CustomCol xs={24} style={{ marginBottom: '2%' }}>
        <CustomTable
          title={title}
          columns={columns}
          dataSource={academic}
          rowKey={(row) => row.id}
        />
      </CustomCol>
      <CustomCol xs={24}>
        <CustomModal
          title={
            <CustomTitle>
              {editable
                ? 'Editar Información Académica'
                : 'Registrar Información Académica'}
            </CustomTitle>
          }
          width={900}
          visible={academicModalOpen}
          onCancel={onCancelModal}
          onOk={handleSubmit}
          okText={editable ? 'Guardar' : 'Registrar'}
        >
          <CustomForm form={form}>
            <CustomRow justify="start">
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={'Estudios'}
                  name={'id_nivel_academico'}
                  rules={[{ required: true }]}
                  labelCol={{ span: 8 }}
                >
                  <CustomSelect placeholder={'Seleccione el nivel Académico'}>
                    {academicLevel?.map((item) => (
                      <Option
                        key={item.id}
                        title={item.nivel_academico}
                        value={item.id}
                      >
                        {item.nivel_academico}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>

              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={'Realizados en'}
                  name={'institucion'}
                  rules={[{ required: true }]}
                  labelCol={{ span: 8 }}
                >
                  <CustomInput placeholder="Institución" />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={'Fecha de finalización'}
                  name={'fecha_finalizacion'}
                  rules={[{ required: true }]}
                  labelCol={{ span: 8 }}
                >
                  <CustomInputDate mask={false} maxDate={moment()} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={'Observaciones'}
                  name={'observaciones'}
                  labelCol={{ span: 8 }}
                >
                  <CustomTextArea placeholder="Observaciones (Opcional)" />
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomForm>
        </CustomModal>
      </CustomCol>
    </CustomRow>
  )
}

export default AcademicDataEmployee
