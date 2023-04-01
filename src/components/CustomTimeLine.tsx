import { Timeline, TimelineProps } from 'antd'
import React from 'react'

const CustomTimeline: React.FC<TimelineProps> = ({
  ...props
}): React.ReactElement => {
  return <Timeline {...props}>{props.children}</Timeline>
}

export default CustomTimeline
