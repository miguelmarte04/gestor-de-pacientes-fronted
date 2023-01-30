import React from 'react'
import { Progress, ProgressProps } from 'antd'

const CustomProgress: React.FC<ProgressProps> = ({
  type = 'dashboard',
  showInfo = false,
  ...props
}): React.ReactElement => {
  return <Progress showInfo={showInfo} type={type} {...props} />
}

export default CustomProgress
