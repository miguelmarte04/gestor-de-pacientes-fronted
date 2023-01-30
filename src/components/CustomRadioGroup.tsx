import React from 'react'
import { Radio } from 'antd'
import { RadioGroupProps } from 'antd/lib/radio'

const CustomRadioGroup: React.FC<RadioGroupProps> = ({
  size = 'small',
  ...props
}): React.ReactElement => {
  return (
    <Radio.Group size={size} {...props}>
      {props.children}
    </Radio.Group>
  )
}
export default CustomRadioGroup
