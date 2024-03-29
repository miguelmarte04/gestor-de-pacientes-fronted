import React, { useState } from 'react'
import { Affix, Avatar, Image, Layout } from 'antd'
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import CustomLayout from './CustomLayout'
import CustomSider from './CustomSider'
import CustomMenu from './CustomMenu'
import CustomContainer from './CustomContainer'
import CustomRow from './CustomRow'
import CustomButton from './CustomButton'
import CustomTooltip from './CustomTooltip'
import CustomDropdown from './CustomDropdown'
import CustomMenuItem from './CustomMenuItem'
import { getSessionInfo, isLoggedIn, removeSession } from '../utils/session'
import { CSSProperties } from 'styled-components'
import { Outlet, useNavigate } from 'react-router-dom'
import CustomDivider from './CustomDivider'
import DrawerOptions from './DrawerOptions'
import Darkreader from 'react-darkreader'
import Cookies from 'js-cookie'
import CustomCol from './CustomCol'
import { defaultTheme } from '../themes'
import CustomSpace from './CustomSpace'
import CustomModal from './CustomModal'
import CustomTitle from './CustomTitle'
import CustomText from './CustomText'
import ConditionalComponent from './ConditionalComponent'
import { CustomModalConfirmation } from './ConfirmModalMethod'
import { useAppDispatch } from '../hooks'
import { copiaDb } from '../slicers/general/general'

const { Header, Content } = Layout

const iconButtonStyle: CSSProperties = {
  color: 'black',
  cursor: 'pointer',
  maxHeight: '40px',
  padding: '3px',
}

const MenuRoutesWrapper = (): React.ReactElement => {
  const history = useNavigate()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [modalVisible, SetModalVisible] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  if (!isLoggedIn()) {
    removeSession()
  }

  const PerfilMenu = (
    <CustomMenu key={1}>
      <CustomMenuItem onClick={removeSession} key="2" icon={<LoginOutlined />}>
        Cerrar Sesión
      </CustomMenuItem>
    </CustomMenu>
  )

  const HandleFullScreen = () => {
    const exitFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    const launchFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      }
    }

    if (!fullScreen) {
      setFullScreen(true)
      launchFullscreen()
    } else {
      setFullScreen(false)
      exitFullscreen()
    }
  }
  const HandleSaveData = () => {
    CustomModalConfirmation({
      content: '¿Está seguro que desea realizar una copia de seguridad?',

      onOk: () => {
        dispatch(copiaDb({}))
      },
    })
  }

  return (
    <CustomLayout>
      <CustomSider
        className={'custom-sider'}
        trigger={null}
        width={280}
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          boxShadow: defaultTheme.boxShadow,
        }}
        collapsed={collapsed}
      >
        <CustomCol xs={24} style={{ minHeight: '120px', maxHeight: '120px' }}>
          <CustomRow justify={'center'}>
            <Image
              src={'/assets/logo.png'}
              alt="Logo"
              onClick={() => history('/dashboard')}
              preview={false}
              style={{
                cursor: 'pointer',
                height: collapsed ? '50px' : '120px',
                width: collapsed ? '50px' : '220px',
                marginTop: '10px',
              }}
            />
          </CustomRow>
          <h5
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: collapsed ? '10px' : '18px',
            }}
          >
            {getSessionInfo()?.privilegios === 1
              ? 'Administrador'
              : getSessionInfo()?.privilegios === 2
              ? 'Paciente'
              : getSessionInfo()?.privilegios === 4
              ? 'Recepcionista'
              : 'Doctor'}
          </h5>
        </CustomCol>
        <CustomDivider />
        <CustomRow
          justify={'center'}
          align={'top'}
          width={'100%'}
          style={{ padding: '2em' }}
        >
          <DrawerOptions />
        </CustomRow>
      </CustomSider>
      <CustomLayout>
        <CustomRow justify={'center'}>
          <Header
            style={{
              backgroundColor: `${defaultTheme.secondaryBackgroundColor}`,
              color: defaultTheme.primaryTextColor,
              width: '100%',
              alignItems: 'center',
              position: 'relative',
              top: 0,
              boxShadow: defaultTheme.boxShadowBottom,
            }}
          >
            <CustomRow justify={'space-between'}>
              <CustomRow style={{ marginLeft: '-40px' }}>
                <CustomTooltip
                  title={collapsed ? 'Mostrar Menu' : 'Cerrar Menu'}
                >
                  <CustomButton
                    size={'large'}
                    type={'link'}
                    style={iconButtonStyle}
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    {collapsed ? (
                      <MenuUnfoldOutlined style={defaultTheme.iconStyle} />
                    ) : (
                      <MenuFoldOutlined style={defaultTheme.iconStyle} />
                    )}
                  </CustomButton>
                </CustomTooltip>
              </CustomRow>
              <h2
                style={{
                  textAlign: 'left',
                  fontSize: '25px',
                }}
              >
                {'Instituto Dermatológico Integral'}
              </h2>

              <CustomSpace size={'large'} style={{ marginRight: '-35px' }}>
                <CustomCol xs={12}>
                  <CustomDropdown
                    placement={'bottomCenter'}
                    overlay={PerfilMenu}
                  >
                    <CustomButton
                      size={'large'}
                      type={'link'}
                      style={iconButtonStyle}
                    >
                      {getSessionInfo()?.privilegios === 3
                        ? `Dr. ${getSessionInfo().nombres} ${
                            getSessionInfo().apellidos
                          }`
                        : `${getSessionInfo().nombres} ${
                            getSessionInfo().apellidos
                          }`}
                    </CustomButton>
                  </CustomDropdown>
                </CustomCol>
                <ConditionalComponent
                  condition={getSessionInfo().privilegios === 1}
                >
                  <CustomCol xs={5}>
                    <CustomTooltip title={'Copia de seguridad'}>
                      <CustomButton
                        size={'large'}
                        type={'link'}
                        style={iconButtonStyle}
                        onClick={() => HandleSaveData()}
                      >
                        <Avatar
                          style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                          }}
                          size={'large'}
                          icon={<SaveOutlined />}
                        />
                      </CustomButton>
                    </CustomTooltip>
                  </CustomCol>
                </ConditionalComponent>

                <CustomCol xs={12}>
                  <CustomTooltip
                    title={
                      fullScreen
                        ? 'Salir de Pantalla Completa'
                        : 'Pantalla Completa'
                    }
                  >
                    <CustomButton
                      size={'large'}
                      type={'link'}
                      style={iconButtonStyle}
                      onClick={() => HandleFullScreen()}
                    >
                      <Avatar
                        style={{
                          backgroundColor: 'transparent',
                          color: 'black',
                        }}
                        size={'large'}
                        icon={
                          fullScreen ? (
                            <FullscreenExitOutlined />
                          ) : (
                            <FullscreenOutlined />
                          )
                        }
                      />
                    </CustomButton>
                  </CustomTooltip>
                </CustomCol>
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
                <Affix
                  style={{
                    position: 'fixed',
                    left: collapsed ? '100px' : '300px',
                    top: '90%',
                  }}
                >
                  <CustomTooltip title={'Contactanos'}>
                    <CustomButton
                      icon={<QuestionCircleOutlined />}
                      type={'primary'}
                      size={'large'}
                      onClick={() => SetModalVisible(true)}
                    />
                  </CustomTooltip>
                </Affix>
              </CustomSpace>
            </CustomRow>
          </Header>

          <Content
            style={{
              height: 'calc(100vh - 6.97vh)',
              paddingTop: '10px',
              overflow: 'auto',
              display: 'block',
              alignContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <CustomContainer>
              <Outlet />
            </CustomContainer>
          </Content>
        </CustomRow>
      </CustomLayout>
      <CustomModal
        title={<CustomTitle>Contactanos</CustomTitle>}
        width={'40%'}
        visible={modalVisible}
        onCancel={() => {
          SetModalVisible(false)
        }}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <CustomCol xs={24}>
          <CustomRow justify={'center'}>
            <CustomCol xs={24}>
              <CustomText>Telefono: 809-573-2379</CustomText>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomText>Email: soporte@idi.com</CustomText>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomText>Direccion: La Vega</CustomText>
            </CustomCol>
          </CustomRow>
        </CustomCol>
      </CustomModal>
    </CustomLayout>
  )
}

export default MenuRoutesWrapper
