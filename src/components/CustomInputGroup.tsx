import React from 'react'
import Input, { GroupProps } from 'antd/lib/input'

const CustomInputGroup: React.FC<GroupProps> = ({
  size = 'small',
  className = 'custom-input-group',
  ...props
}): React.ReactElement => {
  return (
    <Input.Group className={className} size={size} {...props}>
      {props.children}
    </Input.Group>
  )
}

export default CustomInputGroup
