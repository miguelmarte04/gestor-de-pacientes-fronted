import React from 'react'
import { Input } from 'antd'
import { CustomInputProps } from './CustomInput'
const { Password } = Input
type CustomPasswordInputProps = CustomInputProps & {
  visibilityToggle?: boolean
}

const CustomPasswordInput: React.FC<CustomPasswordInputProps> = ({
  disabled = false,
  size = 'small',
  type = 'text',
  visibilityToggle = true,
  ...props
}): React.ReactElement => {
  return (
    <Password
      disabled={disabled}
      type={type}
      visibilityToggle={visibilityToggle}
      size={size}
      {...props}
    >
      {props.children}
    </Password>
  )
}

export default CustomPasswordInput
