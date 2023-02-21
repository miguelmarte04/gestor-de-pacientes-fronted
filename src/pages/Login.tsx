import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Affix, Card, Image } from 'antd'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomInput from '../components/CustomInput'
import CustomRow from '../components/CustomRow'
import CustomTitle from '../components/CustomTitle'
import CustomCheckBox from '../components/CustomCheckbox'
import { Navigate } from 'react-router-dom'
import { isLoggedIn } from '../utils/session'
import { authenticateUser } from '../slicers/user'
import { PATH_MAIN } from '../constants/Routes'
import CustomPasswordInput from '../components/CustomPasswordInput'
import Darkreader from 'react-darkreader'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../hooks'

const Login = (): React.ReactElement => {
  const dispatch = useAppDispatch()

  const { fetchingUserData } = useAppSelector((state) => state.user)

  if (isLoggedIn()) {
    return <Navigate to={PATH_MAIN} />
  }

  return (
    <>
      <CustomRow
        justify="space-between"
        align="middle"
        className="login-card-container"
        style={{ backgroundColor: '#f0f2f5', height: '100vh' }}
      >
        <CustomCol xs={12}>
          <CustomRow justify="center">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              preview={false}
              width={'60%'}
            />
          </CustomRow>
        </CustomCol>
        <CustomCol
          xs={8}
          sm={10}
          xxl={8}
          style={{ margin: '20px 0px', marginRight: '5%' }}
        >
          <Card
            style={{
              paddingTop: '17vh',
              paddingBottom: '17vh',
              borderRadius: '8px',
              boxShadow: '5px 5px 10px #a6a6a6, -5px -5px 10px #ffffff',
            }}
          >
            <CustomForm
              autoComplete={'off'}
              className="login-form"
              onFinish={({ user, password }) => {
                dispatch(authenticateUser({ user, password }))
              }}
            >
              <CustomFormItem>
                <CustomRow
                  justify={'center'}
                  style={{
                    marginBottom: '5px',
                  }}
                >
                  <CustomCol xs={24}>
                    <CustomTitle style={{ textAlign: 'center' }}>
                      Inicio de sesión
                    </CustomTitle>
                  </CustomCol>
                </CustomRow>
              </CustomFormItem>
              <CustomFormItem
                name="user"
                rules={[
                  {
                    required: true,
                    message: 'Por favor introduzca la Cedula!',
                  },
                ]}
              >
                <CustomInput
                  style={{
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    marginBottom: '1rem',
                  }}
                  autoComplete={'off'}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Cedula"
                  maxLength={11}
                />
              </CustomFormItem>
              <CustomFormItem
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Por favor introduzca la contraseña!',
                  },
                ]}
              >
                <CustomPasswordInput
                  style={{
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    marginBottom: '1rem',
                  }}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder={'Contraseña'}
                />
              </CustomFormItem>
              <CustomFormItem name="remember" valuePropName="checked" noStyle>
                <CustomCheckBox>Recuérdate</CustomCheckBox>
              </CustomFormItem>
              <CustomFormItem>
                <CustomButton
                  type={'primary'}
                  loading={fetchingUserData}
                  htmlType={'submit'}
                  style={{ width: '100%', marginTop: '20px' }}
                >
                  Iniciar Sesión
                </CustomButton>
              </CustomFormItem>
            </CustomForm>
          </Card>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomRow justify="end">
            <Affix
              style={{
                position: 'fixed',
                left: '95%',
                top: '90%',
              }}
            >
              <Darkreader
                defaultDarken={
                  JSON.parse(Cookies.get('darkMode') ?? '{}') === true
                }
                onChange={() => {
                  Cookies.set(
                    'darkMode',
                    JSON.parse(Cookies.get('darkMode') ?? '{}') === true
                      ? 'false'
                      : 'true'
                  )
                }}
              />
            </Affix>
          </CustomRow>
        </CustomCol>
      </CustomRow>
    </>
  )
}

export default Login
