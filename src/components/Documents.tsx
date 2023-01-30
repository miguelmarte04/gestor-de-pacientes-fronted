import { FormInstance } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import CustomForm from './CustomForm'
import CustomFormItem from './CustomFormItem'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import CustomButton from './CustomButton'
import CustomUpload from './CustomUpload'
import CustomRow from './CustomRow'
import CustomCol from './CustomCol'
import { defaultTheme, formItemLayout } from '../themes'
import CustomTooltip from './CustomTooltip'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  createDocuments,
  DocumentsType,
  getDocTypes,
} from '../slicers/employee'
import CustomSelect from './CustomSelect'
import CustomList from './CustomList'
import CustomListItem from './CustomListItem'
import CustomListItemMeta from './CustomListItemMeta'
import { Image } from 'antd'
import moment from 'moment'
import CustomModal from './CustomModal'
import CustomDivider from './CustomDivider'
import { getSessionInfo } from '../utils/session'
import { updateDocuments } from '../slicers/employee/employee'
import { CustomModalConfirmation } from './ConfirmModalMethod'

interface DocumentsProps {
  form: FormInstance
}

const Documents: React.FC<DocumentsProps> = ({ form }): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState<DocumentsType>()
  const { docTypes, documentsList, dataEmployee, employeeRequestStatus } =
    useAppSelector((state) => state.employee)

  useEffect(() => {
    !docTypes?.length && dispatch(getDocTypes({}))
  }, [])
  useEffect(() => {
    if (employeeRequestStatus === 'success') {
      setRecord(undefined)
      setVisible(false)
    }
  }, [employeeRequestStatus])

  useEffect(() => {
    form.setFieldsValue({ ...record })
  }, [record])

  useEffect(() => {
    !visible && form.resetFields()
  }, [visible])

  const handleCreateDocument = () => {
    const data = form.getFieldsValue()

    dispatch(
      createDocuments({
        id_empleado: Number(dataEmployee?.id),
        id_tipo_documento: data.id_tipo_documento,
        usuario_insercion: getSessionInfo().usuario,
        documento: data.documento,
      })
    )

    setVisible(false)
  }

  const handleEdit = () => {
    const data: DocumentsType = { ...record, ...form.getFieldsValue() }

    delete data.descripcion

    dispatch(
      updateDocuments({
        ...data,
      })
    )

    setRecord(undefined)
  }

  const handleDelete = (record: DocumentsType) => {
    CustomModalConfirmation({
      title: 'Eliminar Documento',
      content: '¿Está seguro de eliminar el documento?',
      onOk: () => {
        const data = { ...record }
        delete data.descripcion
        dispatch(
          updateDocuments({
            ...data,
            estado: 'I',
          })
        )
      },
    })
  }

  const renderItem = (item: DocumentsType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip
            key={'edit'}
            title={
              item.estado === 'A' || item.estado === 'U'
                ? 'Editar'
                : 'Empleado inactivo, no permite edición'
            }
          >
            <CustomButton
              disabled={item.estado === 'I'}
              onClick={() => {
                setVisible(true)
                setRecord(item)
              }}
              type={'link'}
              icon={<EditOutlined style={{ fontSize: '18px' }} />}
              className={'editPhoneButton'}
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
              onClick={() => handleDelete(item)}
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
          avatar={<Image width={'50px'} src={item.documento} />}
          description={`Agregado por: ${item.usuario_insercion.toUpperCase()} el ${moment(
            item.fecha_insercion
          ).format('D MMM YYYY')}`}
          title={
            docTypes?.find((doc) => doc.id === item.id_tipo_documento)
              ?.descripcion
          }
        />
      </CustomListItem>
    )
  }

  return (
    <>
      <CustomModal
        title={record?.id ? 'Editar Documento' : 'Nuevo Documento'}
        open={visible}
        onCancel={() => {
          setVisible(false)
          setRecord(undefined)
        }}
        onOk={record?.id ? handleEdit : handleCreateDocument}
      >
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow align={'top'} justify={'start'}>
            <CustomCol xs={24}>
              <CustomFormItem
                label={'Tipo Documento'}
                rules={[{ required: true }]}
                name={'id_tipo_documento'}
              >
                <CustomSelect
                  options={docTypes?.map((item) => ({
                    label: item.descripcion,
                    value: item.id,
                  }))}
                  placeholder={'Tipo de Documento'}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomUpload
                form={form}
                name={'documento'}
                previewTitle={'Documento'}
                required={true}
                label={'Archivo'}
              />
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomModal>

      <CustomRow justify={'end'}>
        <CustomDivider />
        <CustomCol xs={24}>
          <CustomList
            dataSource={documentsList?.filter((item) => item.estado === 'A')}
            pagination={{ pageSize: 5 }}
            renderItem={renderItem}
            header={
              <CustomRow justify={'end'}>
                <CustomButton
                  style={{ marginTop: '10px' }}
                  type={'primary'}
                  onClick={() => setVisible(true)}
                  icon={<PlusOutlined />}
                >
                  Agregar Documento
                </CustomButton>
              </CustomRow>
            }
          />
        </CustomCol>
      </CustomRow>
    </>
  )
}

export default Documents
