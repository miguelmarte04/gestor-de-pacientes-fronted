import { Menu } from 'antd'
import { MenuItemGroupProps } from 'antd/lib/menu'
import React from 'react'

const CustomMenuItemGroup: React.FC<MenuItemGroupProps> = ({
  ...props
}): React.ReactElement => {
  const { ItemGroup } = Menu
  return <ItemGroup {...props}>{props.children}</ItemGroup>
}
export default CustomMenuItemGroup
