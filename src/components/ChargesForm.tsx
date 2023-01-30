import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import { createCharges, updateCharges } from '../slicers/employee/employee'
import { ChargesType } from '../slicers/employee/types'
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from '../themes'
import { showNotification } from '../utils/general'
import { getSessionInfo } from '../utils/session'
import CustomCol from './CustomCol'
import CustomForm from './CustomForm'
import CustomFormItem from './CustomFormItem'
import CustomInput from './CustomInput'
import CustomInputNumber from './CustomInputNumber'
import CustomModal from './CustomModal'
import CustomRow from './CustomRow'
import CustomSelect from './CustomSelect'
import CustomSpin from './CustomSpin'
import CustomTitle from './CustomTitle'

interface ChargesFormProps {
  visible: boolean
  onCancel(): void
  data: ChargesType | undefined
}

const ChargesForm: React.FC<ChargesFormProps> = ({
  visible,
  onCancel,
  data: record,
}): React.ReactElement => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState<boolean>()
  const { departments } = useAppSelector((state) => state.general)
  const { fetchingFromEmployee } = useAppSelector((state) => state.employee)

  const isEditing = !!record?.id

  useEffect(() => {
    setShowModal(visible)
  }, [visible])

  useEffect(() => {
    form.setFieldsValue(record)

    return () => {
      form.resetFields()
    }
  }, [record])

  useEffect(() => {
    !fetchingFromEmployee && onCancel()
  }, [fetchingFromEmployee])

  const handleOnFinish = async () => {
    try {
      const data = (await form.validateFields()) as ChargesType

      data.usuario_insercion = getSessionInfo().usuario
      if (!isEditing) {
        dispatch(createCharges(data))
      } else {
        const newData = { ...record, ...data }

        delete newData.fecha_insercion
        delete newData['descripcion']

        dispatch(updateCharges(newData))
      }
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
      width={'55%'}
      onCancel={onCancel}
      onOk={handleOnFinish}
      open={showModal}
      title={
        <CustomTitle>{!isEditing ? 'Nuevo Cargo' : 'Editar Cargo'}</CustomTitle>
      }
    >
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow>
            <CustomCol xs={24}>
              <CustomFormItem
                label={'Nombre'}
                name={'cargo'}
                rules={[{ required: true }]}
                {...labelColFullWidth}
              >
                <CustomInput placeholder={'Nombre del Cargo'} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={'Departamento'}
                name={'id_departamento'}
                rules={[{ required: true }]}
                {...labelColFullWidth}
              >
                <CustomSelect
                  placeholder={'Seleccione el departamento'}
                  options={departments?.map((item) => ({
                    label: item.departamento,
                    value: item.id,
                  }))}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Sueldo Mínimo'}
                name={'sueldo_minimo'}
                rules={[{ required: true }]}
              >
                <CustomInputNumber
                  width={'100%'}
                  max={form.getFieldValue('sueldo_maximo') - 1}
                  format={{ format: 'money', coin: 'RD' }}
                  placeholder={'Sueldo Mínimo'}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Sueldo Máximo'}
                name={'sueldo_maximo'}
                rules={[{ required: true }]}
              >
                <CustomInputNumber
                  width={'100%'}
                  min={form.getFieldValue('sueldo_minimo')}
                  format={{ format: 'money', coin: 'RD' }}
                  placeholder={'Sueldo Máximo'}
                />
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  )
}

export default ChargesForm
