import React from 'react'
import { Row, RowProps } from 'antd'
type CustomRowProps = RowProps & {
  width?: string | number
}
const CustomRow: React.FC<CustomRowProps> = ({
  align = 'middle',
  gutter = 0,
  justify = 'end',
  width,
  style,
  ...props
}): React.ReactElement => {
  return (
    <Row
      align={align}
      gutter={gutter}
      justify={justify}
      style={{ width, ...style }}
      {...props}
    >
      {props.children}
    </Row>
  )
}

export default CustomRow
