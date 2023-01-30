import React from 'react'
import { Layout } from 'antd'
import { SiderProps } from 'antd/lib/layout'

const { Sider } = Layout

const CustomSider: React.FC<SiderProps> = ({
  collapsedWidth = 80,
  collapsible = false,
  reverseArrow = false,
  theme = 'dark',
  width = 200,
  ...props
}): React.ReactElement => (
  <Sider
    collapsedWidth={collapsedWidth}
    collapsible={collapsible}
    reverseArrow={reverseArrow}
    theme={theme}
    width={width}
    {...props}
  >
    {props.children}
  </Sider>
)

export default CustomSider
