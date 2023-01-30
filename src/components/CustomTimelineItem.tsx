import React from 'react'
import Timeline, { TimelineItemProps } from 'antd/lib/timeline'

const { Item } = Timeline

const CustomTimelineItem: React.FC<TimelineItemProps> = ({
  position = 'left',
  ...props
}): React.ReactElement => {
  return (
    <Item position={position} {...props}>
      {props.children}
    </Item>
  )
}

export default CustomTimelineItem
