import React from 'react'
import DatePicker, { DatePickerProps } from 'antd/lib/date-picker'
import localeProp from 'antd/es/date-picker/locale/es_ES'
import 'moment/locale/es'
import { CalendarOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import CustomSpace from './CustomSpace'
import CustomTooltip from './CustomTooltip'
import { AnyType } from '../constants/types'

const Picker = DatePicker as AnyType

type CustomDatePickerProps = DatePickerProps & {
  locale?: Record<string, unknown>
  tooltip?: string
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  format = 'DD/MM/YYYY',
  locale = localeProp,
  size = 'small',
  tooltip = undefined,
  ...props
}): React.ReactElement => {
  const suffixIcon = tooltip ? (
    <CustomSpace style={{ marginLeft: '-20px' }}>
      <CustomTooltip title={tooltip}>
        <QuestionCircleOutlined style={{ color: '#40a9ff' }} />
      </CustomTooltip>
      <CalendarOutlined />
    </CustomSpace>
  ) : (
    <CalendarOutlined />
  )

  return (
    <Picker
      suffixIcon={suffixIcon}
      format={format}
      locale={locale}
      size={size}
      {...props}
    />
  )
}

export default CustomDatePicker
