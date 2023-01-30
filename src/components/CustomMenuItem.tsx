import React from 'react'
import { Menu } from 'antd'
import { MenuItemProps } from 'antd/lib/menu/MenuItem'
// import CustomTooltip from './CustomTooltip'

const { Item } = Menu

const CustomMenuItem: React.FC<MenuItemProps> = ({
  disabled = false,
  ...props
}): React.ReactElement => (
  // <CustomTooltip title={props.children}>
  <Item disabled={disabled} {...props}>
    {props.children}
  </Item>
  // </CustomTooltip>
)

export default CustomMenuItem
