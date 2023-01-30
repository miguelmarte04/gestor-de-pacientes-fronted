import { Drawer, DrawerProps } from 'antd'
import React from 'react'

const CustomDrawer: React.FC<DrawerProps> = ({
  placement = 'right',
  height = '100%',
  ...props
}): React.ReactElement => {
  return (
    <Drawer height={height} placement={placement} {...props}>
      {props.children}
    </Drawer>
  )
}

export default CustomDrawer
