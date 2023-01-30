import React from 'react'
import CustomCol from './CustomCol'

type PropsType = {
  width?: number | string
  height?: number | string
  color: string
  label: string
  xs?: number
  pull?: number
  display?: string
  style?: React.CSSProperties
  marginRight?: string
}

const CustomColorLegendSquared = ({
  width = '10px',
  height = '10px',
  display = 'inline-block',
  color,
  label,
  style,
  xs = 12,
  pull,
  marginRight = '5px',
}: PropsType): React.ReactElement => {
  return (
    <CustomCol xs={xs} pull={pull}>
      <div
        style={{
          width: width,
          height: height,
          backgroundColor: color,
          display: display,
          marginRight: marginRight,
          ...style,
        }}
      />
      {label}
    </CustomCol>
  )
}
export default CustomColorLegendSquared
