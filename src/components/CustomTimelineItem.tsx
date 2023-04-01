import { Timeline, TimelineItemProps } from 'antd'

const { Item } = Timeline

const CustomTimelineItem: React.FC<TimelineItemProps> = ({
  ...props
}): React.ReactElement => {
  return <Item {...props}>{props.children}</Item>
}

export default CustomTimelineItem
