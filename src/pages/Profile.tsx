/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'antd/lib/form/Form'
import React, { useEffect } from 'react'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomInput from '../components/CustomInput'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomRow from '../components/CustomRow'
import CustomTitle from '../components/CustomTitle'
import { defaultBreakpoints, formItemLayout } from '../themes'
import CustomButton from '../components/CustomButton'
import { getSessionInfo } from '../utils/session'
import { LockOutlined } from '@ant-design/icons'
import CustomPasswordInput from '../components/CustomPasswordInput'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
import { useAppDispatch, useAppSelector } from '../hooks'
import { formatter } from '../utils/general'

const Profile = (): React.ReactElement => {
  const [form] = useForm()
  const [form2] = useForm()
  const dispatch = useAppDispatch()
  const { pacientesRequestStatus } = useAppSelector((state) => state.general)
  useEffect(() => {
    if (pacientesRequestStatus === 'success') {
      form2.resetFields()
    }
  }, [pacientesRequestStatus])

  useEffect(() => {
    form.setFieldsValue({
      nombres: getSessionInfo().nombres,
      apellidos: getSessionInfo().apellidos,
      cedula: formatter({
        value: getSessionInfo().usuario,
        type: 'identity_doc',
      }),
    })
  }, [])
  const handleChangePass = async () => {
    const data = await form2.validateFields()
    CustomModalConfirmation({
      title: '¿Está seguro de cambiar su contraseña?',
      content: 'Se cambiará su contraseña',
      onOk: () => {
        // dispatch(
        //   updatePass({
        //     condition: {
        //       id: getSessionInfo().id,
        //       pass: data.nuevo_pass,
        //     },
        //   })
        // )
      },
    })
  }
  return (
    <CustomLayoutBoxShadow>
      <CustomDivider orientation={'center'}>
        <CustomTitle>Datos del Usuario</CustomTitle>
      </CustomDivider>

      <CustomForm form={form}>
        <CustomRow justify="center">
          <CustomCol {...defaultBreakpoints}>
            <CustomFormItem
              label={'Nombres'}
              name={'nombres'}
              rules={[{ required: true }]}
              {...formItemLayout}
            >
              <CustomInput placeholder="Nombres" readOnly />
            </CustomFormItem>
          </CustomCol>
          <CustomCol {...defaultBreakpoints}>
            <CustomFormItem
              label={'Apellidos'}
              name={'apellidos'}
              rules={[{ required: true }]}
              {...formItemLayout}
            >
              <CustomInput placeholder="Apellidos" readOnly />
            </CustomFormItem>
          </CustomCol>
          <CustomCol {...defaultBreakpoints}>
            <CustomFormItem
              label={'Cedula'}
              name={'cedula'}
              rules={[{ required: true }]}
              {...formItemLayout}
            >
              <CustomInput placeholder="cedula" readOnly />
            </CustomFormItem>
          </CustomCol>
          <CustomCol {...defaultBreakpoints} />
        </CustomRow>
      </CustomForm>
      <CustomForm form={form2}>
        <CustomRow justify="center" style={{ marginTop: '5%' }}>
          <CustomDivider orientation={'center'}>
            <CustomTitle>Cambiar Contraseña</CustomTitle>
          </CustomDivider>
          <CustomCol xs={12}>
            <CustomFormItem
              label={'Contraseña actual'}
              name={'pass_actual'}
              rules={[{ required: true }]}
              {...formItemLayout}
            >
              <CustomPasswordInput
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={'Contraseña actual'}
              />
            </CustomFormItem>
            <CustomFormItem
              label={'Nueva Contraseña'}
              name={'nuevo_pass'}
              rules={[{ required: true }]}
              {...formItemLayout}
            >
              <CustomPasswordInput
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={'Nueva Contraseña'}
              />
            </CustomFormItem>
            <CustomFormItem
              label={'Repetir Contraseña'}
              name={'repetir_pass'}
              rules={[{ required: true }]}
              {...formItemLayout}
            >
              <CustomPasswordInput
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={'Repetir Contraseña'}
              />
            </CustomFormItem>
          </CustomCol>
        </CustomRow>
        <CustomCol xs={24} pull={6}>
          <CustomRow justify="end" style={{ marginTop: '1%' }}>
            <CustomButton type="primary" onClick={handleChangePass}>
              Guardar
            </CustomButton>
          </CustomRow>
        </CustomCol>
      </CustomForm>
    </CustomLayoutBoxShadow>
  )
}

export default Profile
