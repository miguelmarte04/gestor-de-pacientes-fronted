import React from 'react'
import { Input } from 'antd'
import { InputProps, InputRef } from 'antd/lib/input'
import { QuestionCircleOutlined } from '@ant-design/icons'
import CustomTooltip from './CustomTooltip'

export type CustomInputProps = InputProps & {
  autoComplete?: string
  tooltip?: string
  ref?: React.MutableRefObject<InputRef>
  textAlign?:
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent'
}

const CustomInput: React.FC<CustomInputProps> = ({
  autoComplete = 'off',
  disabled = false,
  type = 'text',
  size = 'small',
  textAlign,
  tooltip = undefined,
  readOnly = false,
  style,
  ...props
}): React.ReactElement => {
  const suffix = tooltip ? (
    <CustomTooltip title={tooltip}>
      CustomInputNumber
      <QuestionCircleOutlined style={{ color: '#40a9ff' }} />
    </CustomTooltip>
  ) : null

  return (
    <Input
      autoComplete={autoComplete}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={100}
      size={size}
      type={type}
      style={{ ...style, textAlign }}
      suffix={suffix}
      {...props}
    >
      {props.children}
    </Input>
  )
}

export default CustomInput
