import React from 'react'
import { Checkbox } from 'antd'
import { CheckboxProps } from 'antd/lib/checkbox'
import { QuestionCircleOutlined } from '@ant-design/icons'
import DisableContent from './DisableContent'
import CustomTooltip from './CustomTooltip'

type CustomCheckboxProps = CheckboxProps & {
  tooltip?: string
  width?: string | number
}

const CustomCheckBox: React.FC<CustomCheckboxProps> = ({
  tooltip = null,
  width = '100%',
  style,
  ...props
}): React.ReactElement => {
  return (
    <DisableContent style={{ width: width }}>
      <Checkbox
        {...props}
        style={{ display: 'flex', justifyContent: 'start', ...style }}
      >
        {tooltip && (
          <CustomTooltip title={tooltip}>
            <QuestionCircleOutlined style={{ color: '#40a9ff' }} />
          </CustomTooltip>
        )}
        {props.children}
      </Checkbox>
    </DisableContent>
  )
}

export default CustomCheckBox
