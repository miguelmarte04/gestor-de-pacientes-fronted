import React, { useState } from 'react'
import BaseConfigurations from '../components/BaseConfigurations'
import CustomModal from '../components/CustomModal'
import CustomDivider from '../components/CustomDivider'
import CustomTitle from '../components/CustomTitle'
import CustomForm from '../components/CustomForm'
import { Form } from 'antd'
import CustomRow from '../components/CustomRow'
import CustomFormItem from '../components/CustomFormItem'
import CustomInput from '../components/CustomInput'
import CustomCol from '../components/CustomCol'

const BloodType = (): React.ReactElement => {
  const [form] = Form.useForm()
  const [visibility, setVisibility] = useState<boolean>()

  const onVisibilityChange = () => {
    setVisibility(!visibility)
  }

  return (
    <>
      <BaseConfigurations
        dataIndex={'tipo_sangre'}
        dataSource={[]}
        onVisibility={onVisibilityChange}
        title={'Tipo de Sangre'}
      />

      <CustomModal visible={visibility} onCancel={onVisibilityChange}>
        <CustomDivider>
          <CustomTitle>Agregar Tipo de Sangre</CustomTitle>
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

export default BloodType
