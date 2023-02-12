import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { AnyType } from '../constants/types'
import { useAppSelector } from '../hooks'

import { formItemLayout } from '../themes'
import { showNotification } from '../utils/general'
import { getSessionInfo } from '../utils/session'
import CustomCol from './CustomCol'
import CustomForm from './CustomForm'
import CustomFormItem from './CustomFormItem'
import CustomInput from './CustomInput'
import CustomModal from './CustomModal'
import CustomRow from './CustomRow'
import CustomSpin from './CustomSpin'
import CustomTitle from './CustomTitle'

interface MultiConfigFormProps {
  visible: boolean
  data: AnyType | undefined
  onCancel(): void
  title: string
  key: string
  isEditing: boolean
}

const MultiConfigForm: React.FC<MultiConfigFormProps> = ({
  visible,
  onCancel,
  title,
  key,
  data: record,
  isEditing,
}): React.ReactElement => {
  // const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState<boolean>()
  const { fetchingFromPacientes } = useAppSelector((state) => state.general)

  useEffect(() => {
    setShowModal(visible)
  }, [visible])

  useEffect(() => {
    !fetchingFromPacientes && onCancel()
  }, [fetchingFromPacientes])

  useEffect(() => {
    form.setFieldsValue(record)

    return () => {
      sessionStorage.removeItem(key)
      form.resetFields()
    }
  }, [record])

  const handleOnFinish = async () => {
    try {
      const data = (await form.validateFields()) as AnyType

      // eslint-disable-next-line no-console
      console.log({ key })

      data.usuario_insercion = getSessionInfo().usuario
      data.tipo = key ?? sessionStorage.getItem('key')
      // if (!isEditing) {
      //   dispatch(createConfigurations(data))
      // } else {
      //   const newData = { ...record, ...data }
      //   dispatch(updateConfigurations(newData))
      // }
    } catch (error) {
      showNotification({
        type: 'error',
        description: 'Por favor, llenar todos los campos requeridos.',
        title: 'Error',
      })
    }
  }

  return (
    <CustomModal
      width={'30%'}
      onCancel={onCancel}
      onOk={handleOnFinish}
      open={showModal}
      title={
        <CustomTitle>
          {`${isEditing ? 'Editar' : 'Nuevo'} ${title}`}
        </CustomTitle>
      }
    >
      <CustomSpin>
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow>
            <CustomCol xs={24}>
              <CustomFormItem
                label={'Descripcion'}
                name={'descripcion'}
                rules={[{ required: true }]}
              >
                <CustomInput placeholder={'Descripcion'} />
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  )
}

export default MultiConfigForm
