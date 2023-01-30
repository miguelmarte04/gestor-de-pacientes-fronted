import React from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'antd/lib/menu'

const CustomMenu: React.FC<MenuProps> = ({
  forceSubMenuRender = false,
  inlineIndent = 24,
  mode = 'vertical',
  multiple = false,
  selectable = true,
  subMenuCloseDelay = 0.1,
  subMenuOpenDelay = 0,
  theme = 'light',
  ...props
}): React.ReactElement => (
  <Menu
    forceSubMenuRender={forceSubMenuRender}
    inlineIndent={inlineIndent}
    mode={mode}
    multiple={multiple}
    selectable={selectable}
    subMenuCloseDelay={subMenuCloseDelay}
    subMenuOpenDelay={subMenuOpenDelay}
    theme={theme}
    {...props}
  >
    {props.children}
  </Menu>
)

export default CustomMenu
