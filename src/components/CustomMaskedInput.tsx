import React from 'react'
import { InputProps } from 'antd/lib'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'

export type CustomProps = InputProps &
  MaskedInputProps &
  Readonly<MaskedInputProps> & {
    prefix?: string & React.ReactNode
    props?: never
  }

const CustomMaskedInput: React.FC<CustomProps> = ({
  mask = [],
  guide = false,
  className = 'ant-input ant-input-sm',
  autoComplete = 'off',
  bordered = true,
  disabled = false,
  readOnly = false,
  ...props
}): React.ReactElement => {
  return (
    <MaskedInput
      readOnly={readOnly}
      disabled={disabled}
      autoComplete={autoComplete}
      mask={mask}
      onBlur={props.onBlur}
      guide={guide}
      className={
        bordered ? className : className.concat(' ant-input-borderless')
      }
      {...props}
    >
      {props.children}
    </MaskedInput>
  )
}

export default CustomMaskedInput
