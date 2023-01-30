import { Tabs, TabsProps } from 'antd'
import React from 'react'

type CustomTabsProps = Omit<TabsProps, 'children'> & {
  children?: React.ReactNode | React.ReactNode[]
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabPosition = 'left',
  ...props
}): React.ReactElement => {
  return <Tabs tabPosition={tabPosition} {...props} />
}

export default CustomTabs
