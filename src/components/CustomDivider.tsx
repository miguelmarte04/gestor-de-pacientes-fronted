import React from 'react'
import { Divider, DividerProps } from 'antd'

const CustomDivider: React.FC<DividerProps> = ({
  dashed = false,
  orientation = 'left',
  plain = true,
  type = 'horizontal',
  ...props
}): React.ReactElement => {
  return (
    <Divider
      dashed={dashed}
      orientation={orientation}
      plain={plain}
      type={type}
      {...props}
    >
      {props.children}
    </Divider>
  )
}

export default CustomDivider
