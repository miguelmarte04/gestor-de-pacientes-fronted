import React from 'react'
import { Layout } from 'antd'
import { CustomLayoutProps } from './CustomLayout'

const { Content } = Layout

const CustomContent: React.FC<CustomLayoutProps> = (
  props
): React.ReactElement => {
  return <Content {...props}>{props.children}</Content>
}

export default CustomContent
