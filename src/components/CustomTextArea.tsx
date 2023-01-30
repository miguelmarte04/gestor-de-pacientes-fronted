import React from 'react'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input'

const { TextArea } = Input

type CustomTextAreaProps = TextAreaProps & {
  width?: string | number
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  autoSize = { minRows: 3, maxRows: 3 },
  size = 'small',
  showCount = true,
  maxLength = 200,
  disabled = false,
  width = '100%',
  readOnly = false,
  style,
  ...props
}): React.ReactElement => {
  return (
    <TextArea
      disabled={disabled}
      readOnly={readOnly}
      autoSize={autoSize}
      showCount={showCount}
      maxLength={maxLength}
      style={{ ...style, width }}
      size={size}
      {...props}
    />
  )
}
export default CustomTextArea
