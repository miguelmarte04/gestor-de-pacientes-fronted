import { Card, CardProps } from 'antd'
import React from 'react'

interface CustomCardProps extends CardProps {
  width?: number | string
  height?: number | string
}

const CustomCard: React.FC<CustomCardProps> = ({
  width,
  hoverable,
  height,
  ...props
}): React.ReactElement => {
  return (
    <Card
      hoverable={hoverable}
      style={{ ...props.style, width, height }}
      {...props}
    >
      {props.children}
    </Card>
  )
}

export default CustomCard
