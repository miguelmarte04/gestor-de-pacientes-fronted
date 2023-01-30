import { Timeline, TimelineProps } from 'antd'
import React from 'react'

const CustomTimeLine: React.FC<TimelineProps> = ({
  mode = 'alternate',
  ...props
}): React.ReactElement => {
  return (
    <Timeline mode={mode} {...props}>
      {props.children}
    </Timeline>
  )
}

export default CustomTimeLine
