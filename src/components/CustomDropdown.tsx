import React from 'react'
import { Dropdown } from 'antd'
import { DropDownProps } from 'antd/lib/dropdown'
import { CSSProperties } from 'react'

type CustomDropDownProps = DropDownProps & {
  style?: CSSProperties
}

const CustomDropdown: React.FC<CustomDropDownProps> = ({
  ...props
}): React.ReactElement => <Dropdown {...props}>{props.children}</Dropdown>

export default CustomDropdown
