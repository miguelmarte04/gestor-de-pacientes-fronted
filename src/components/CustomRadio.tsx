import React from 'react'
import { Radio } from 'antd'
import { RadioProps } from 'antd/lib/radio'

const CustomRadio: React.FC<RadioProps> = ({
  ...props
}): React.ReactElement => {
  return <Radio {...props}>{props.children}</Radio>
}

export default CustomRadio
