import React, { useState } from 'react'
import { Calendar } from 'antd'
import { Moment } from 'moment'

import moment from 'moment'
import { MenuItemGroupProps } from 'antd/lib/menu'

const CustomCalendar: React.FC<MenuItemGroupProps> = ({
  style,
  ...props
}): React.ReactElement => {
  const [value, selectedValue] = useState<Moment>(moment())

  return (
    <Calendar
      {...props}
      style={{ ...style }}
      onPanelChange={value !== undefined ? (e) => selectedValue(e) : undefined}
    />
  )
}

export default CustomCalendar
