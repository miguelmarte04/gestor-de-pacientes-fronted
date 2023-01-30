import React from 'react'
import { Select, SelectProps } from 'antd'
import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import CustomTooltip from './CustomTooltip'
import DisableContent from './DisableContent'
import CustomSpace from './CustomSpace'
type CustomSelectProps = SelectProps<string | number> & {
  tooltip?: string
  alwaysAvailable?: boolean
  width?: string
}
const CustomSelect: React.FC<CustomSelectProps> = ({
  tooltip = undefined,
  dropdownMatchSelectWidth = false,
  allowClear = false,
  size = 'small',
  disabled = false,
  width = '100%',
  ...props
}): React.ReactElement => {
  const suffixIcon = tooltip ? (
    <CustomSpace style={{ marginLeft: '-20px' }}>
      <CustomTooltip title={tooltip}>
        <QuestionCircleOutlined />
      </CustomTooltip>
      <DownOutlined />
    </CustomSpace>
  ) : undefined

  return (
    <DisableContent disabled={disabled} style={{ width: width }}>
      <Select
        allowClear={allowClear}
        style={{ width: '100%' }}
        showSearch
        optionFilterProp={'children'}
        disabled={disabled}
        suffixIcon={suffixIcon}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        size={size}
        {...props}
      >
        {props.children}
      </Select>
    </DisableContent>
  )
}
export default CustomSelect
