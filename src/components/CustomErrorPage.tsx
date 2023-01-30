import React from 'react'
import { Collapse, Result } from 'antd'
import { CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import CustomButton from './CustomButton'

const { Panel } = Collapse

type PropsType = {
  title?: React.ReactNode
  error?: Record<string, unknown> | string
  errorInfo?: Record<string, unknown> | string
}

const CustomErrorPage: React.FC<PropsType> = ({
  title = 'Algo salió mal.',
  error,
  errorInfo,
}): React.ReactElement => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Result
        style={{ margin: 'auto' }}
        status={'error'}
        title={title}
        subTitle={
          <span style={{ fontSize: 14 }}>
            Intente nuevamente. Si el error persiste póngase en contacto con el
            equipo de soporte técnico.
          </span>
        }
        extra={[
          <CustomButton
            key={'reload'}
            type={'primary'}
            icon={<ReloadOutlined />}
            onClick={() => {
              window.location.reload()
            }}
          >
            Recargar página
          </CustomButton>,
        ]}
      >
        <div style={{ marginTop: '25px' }}>
          <Collapse bordered={false}>
            <Panel header={<a href={'#'}>Ver detalle</a>} key={1}>
              <p>
                <>
                  <CloseCircleOutlined
                    style={{ fontSize: 16, color: '#f5222d' }}
                  />
                  {error}
                  <br />
                  {`${errorInfo}`}
                </>
              </p>
            </Panel>
          </Collapse>
        </div>
      </Result>
    </div>
  )
}

export default CustomErrorPage
