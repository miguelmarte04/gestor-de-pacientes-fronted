import React from 'react'
import { Layout } from 'antd'
import { LayoutProps } from 'antd/lib/layout'

export type CustomLayoutProps = LayoutProps & {
  className?: string
  style?: React.CSSProperties
  margin?: string
}

const CustomLayoutBoxShadow: React.FC<CustomLayoutProps> = ({
  style,
  margin = '0px',
  ...props
}): React.ReactElement => {
  const defaultStyle: React.CSSProperties = {
    background: 'white',
    padding: '35px 20px',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: '7px',
    minWidth: '100%',
    width: '30%',
    boxSizing: 'border-box',
  }
  return (
    <Layout
      style={{
        marginRight: margin,
        marginLeft: margin,
        ...style,
        ...defaultStyle,
      }}
      {...props}
    >
      {props.children}
    </Layout>
  )
}

export default CustomLayoutBoxShadow
