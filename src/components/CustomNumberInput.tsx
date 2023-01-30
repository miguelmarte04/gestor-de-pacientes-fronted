import React from 'react'
import { InputNumber } from 'antd'
import { InputNumberProps } from 'antd/lib/input-number'

export type CustomNumberInputProps = InputNumberProps

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  disabled = false,
  size = 'small',
  type = 'text',
  ...props
}): React.ReactElement => (
  <InputNumber disabled={disabled} type={type} size={size} {...props}>
    {props.children}
  </InputNumber>
)

export default CustomNumberInput
