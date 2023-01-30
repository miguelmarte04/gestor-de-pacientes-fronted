import React from 'react'
import Spin, { SpinProps } from 'antd/lib/spin'

const CustomSpin: React.FC<SpinProps> = ({
  spinning = false,
  size = 'default',
  ...props
}): React.ReactElement => (
  <Spin size={size} spinning={spinning} {...props}>
    {props.children}
  </Spin>
)

export default CustomSpin
