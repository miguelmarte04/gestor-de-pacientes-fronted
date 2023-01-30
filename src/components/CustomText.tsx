import React from 'react'
import { Typography } from 'antd'

const { Text } = Typography

type CustomTextProps = {
  code?: boolean
  copyable?: boolean | { text: string; onCopy: () => void }
  deleted?: boolean
  disabled?: boolean
  editable?:
    | boolean
    | {
        editing: boolean
        onStart: () => void
        onChange: (value: string) => void
      }
  ellipsis?: boolean
  mark?: boolean
  underline?: boolean
  strong?: boolean
  type?: 'secondary' | 'warning' | 'danger' | 'success'
  style?: React.CSSProperties | undefined
  children?: React.ReactNode | React.ReactNode[]
}

const CustomText: React.FC<CustomTextProps> = ({
  code = false,
  copyable = false,
  deleted = false,
  disabled = false,
  editable = false,
  ellipsis = false,
  mark = false,
  underline = false,
  strong = false,
  ...props
}): React.ReactElement => (
  <Text
    code={code}
    copyable={copyable}
    delete={deleted}
    disabled={disabled}
    editable={editable}
    ellipsis={ellipsis}
    mark={mark}
    underline={underline}
    strong={strong}
    {...props}
  >
    {props.children}
  </Text>
)

export default CustomText
