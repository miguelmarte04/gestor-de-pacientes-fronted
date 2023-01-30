import React from 'react'
import { Button, ButtonProps } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

type CustomButtonProps = ButtonProps & {
  showAlways?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
  block = false,
  danger = false,
  disabled = false,
  ghost = false,
  loading = false,
  size = 'small',
  type = 'default',
  style,
  ...props
}): React.ReactElement => {
  return (
    <Button
      style={{
        ...style,
        borderRadius: '5px',
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      block={block}
      danger={danger}
      disabled={disabled}
      ghost={ghost}
      loading={loading}
      type={type}
      icon={props.children === 'Guardar' ? <SaveOutlined /> : props.icon}
      size={size}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default CustomButton
