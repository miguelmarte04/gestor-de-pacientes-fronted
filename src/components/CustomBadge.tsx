import { Badge, BadgeProps } from 'antd'
import React from 'react'

const CustomBadge: React.FC<BadgeProps> = ({
  dot = false,
  color = '#52c41a',
  ...props
}): React.ReactElement => {
  return (
    <Badge color={color} dot={dot} {...props}>
      {props.children}
    </Badge>
  )
}

export default CustomBadge
