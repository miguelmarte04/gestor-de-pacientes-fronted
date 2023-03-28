import { Typography } from 'antd'
import moment from 'moment'
import React from 'react'
import { getSessionInfo } from '../utils/session'
import CustomCol from './CustomCol'
import CustomRow from './CustomRow'
import { Image } from 'antd'
import styled from 'styled-components'

const { Text } = Typography
const Separated = styled.div`
  margin: 10px 0;
  height: 2px;
  borde2: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`
interface PrintTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const PrintTemplate = React.forwardRef<HTMLDivElement, PrintTemplateProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <CustomCol xs={24}>
          <CustomRow justify={'center'}>
            <Image
              preview={false}
              src={'/assets/logo.png'}
              alt={'Logo'}
              style={{
                width: '130px',
                height: '130px',
              }}
            />
          </CustomRow>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomRow justify={'center'}>
            <Text strong style={{ fontSize: '20px' }}>
              {'Instituto Dermatológico Integral'}
            </Text>
          </CustomRow>
        </CustomCol>

        <CustomRow justify={'end'}>
          <Text type={'secondary'} style={{ fontSize: '20px' }}>
            {moment().format('DD MMMM YYYY')}
          </Text>
        </CustomRow>
        <Separated />
        <CustomRow justify={'center'}>
          <CustomCol xs={24}>{children}</CustomCol>
        </CustomRow>

        <Separated />
        <CustomRow justify={'end'}>
          <Text type={'secondary'} style={{ fontSize: '20px' }}>
            Usuario:
            <strong>{`${getSessionInfo().nombres} ${
              getSessionInfo().apellidos
            }`}</strong>
          </Text>
        </CustomRow>
      </div>
    )
  }
)

PrintTemplate.displayName = 'PrintTemplate'

export default PrintTemplate
