import React from 'react'
import { Layout, LayoutProps } from 'antd'
export type CustomLayoutProps = LayoutProps & {
  className?: string
  style?: React.CSSProperties
}
const CustomLayout: React.FC<CustomLayoutProps> = ({
  ...props
}): React.ReactElement => {
  return <Layout {...props}>{props.children}</Layout>
}

export default CustomLayout
