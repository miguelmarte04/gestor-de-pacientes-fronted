import React, { ReactNode } from 'react'
import { Menu, SubMenuProps } from 'antd'

const { SubMenu } = Menu

// type TitleEventEntity = {
//   key: string
//   domEvent: Event
// }

type CustomSubMenuProps = SubMenuProps & {
  popupClassName?: string
  disabled?: boolean
  key?: string
  title?: string | ReactNode
  icon?: ReactNode
  // onTitleClick?: (e: TitleEventEntity) => void
}

const CustomSubMenu: React.FC<CustomSubMenuProps> = ({
  disabled = false,
  ...props
}): React.ReactElement => (
  <SubMenu disabled={disabled} {...props}>
    {props.children}
  </SubMenu>
)

export default CustomSubMenu
