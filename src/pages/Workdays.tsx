import { Form } from 'antd'
import React, { useState } from 'react'
import BaseConfigurations from '../components/BaseConfigurations'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomInput from '../components/CustomInput'
import CustomModal from '../components/CustomModal'
import CustomRow from '../components/CustomRow'
import CustomTitle from '../components/CustomTitle'

const Workdays = (): React.ReactElement => {
  const [form] = Form.useForm()
  const [visibility, setVisibility] = useState<boolean>()

  const onVisibilityChange = () => {
    setVisibility(!visibility)
  }

  return (
    <>
      <BaseConfigurations
        dataIndex={'jornada_trabajo'}
        dataSource={[]}
        onVisibility={onVisibilityChange}
        title={'Jornadas de Trabajo'}
      />

      <CustomModal visible={visibility} onCancel={onVisibilityChange}>
        <CustomDivider>
          <CustomTitle>Agregar Jornadas de Trabajo</CustomTitle>
        </CustomDivider>

        <CustomForm form={form}>
          <CustomRow>
            <CustomCol xs={24}>
              <CustomFormItem label={'Descripción'} name={'tipo_sangre'}>
                <CustomInput placeholder={'Descripción'} />
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomModal>
    </>
  )
}

export default Workdays
