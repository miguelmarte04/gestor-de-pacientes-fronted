import React from 'react'
import { Space, SpaceProps } from 'antd'
type CustomSpaceProps = SpaceProps & {
  width?: string | number
}
const CustomSpace: React.FC<CustomSpaceProps> = ({
  width,
  style,
  ...props
}): React.ReactElement => {
  return (
    <Space style={{ width, ...style }} {...props}>
      {props.children}
    </Space>
  )
}

export default CustomSpace
