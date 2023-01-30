import React from 'react'
import DatePicker, { RangePickerProps } from 'antd/lib/date-picker'
import localeProp from 'antd/es/date-picker/locale/es_ES'
import 'moment/locale/es'

const RangePicker =
  DatePicker.RangePicker as unknown as React.FC<RangePickerProps>

const CustomDatePicker: React.FC<RangePickerProps> = ({
  locale = localeProp,
  ...props
}): React.ReactElement => {
  return (
    <RangePicker locale={locale} {...props} style={{ marginBottom: '1%' }} />
  )
}
export default CustomDatePicker
