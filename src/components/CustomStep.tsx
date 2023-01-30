import React from 'react'
import { Steps } from 'antd'
import { StepProps } from 'antd/lib/steps'

const { Step } = Steps

const CustomStep: React.FC<StepProps> = ({ ...props }): React.ReactElement => (
  <Step {...props} />
)

export default CustomStep
