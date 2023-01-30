import React from 'react'

interface CustomDivProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
}

const CustomDiv: React.FC<CustomDivProps> = ({
  width,
  height,
  style,
  ...props
}): React.ReactElement => {
  return <div style={{ ...style, width, height }}>{props.children}</div>
}

export default CustomDiv
