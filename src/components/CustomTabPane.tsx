import { TabPaneProps, Tabs } from 'antd'

const { TabPane } = Tabs

const CustomTabPane: React.FC<TabPaneProps> = ({
  ...props
}): React.ReactElement => {
  return <TabPane {...props}>{props.children}</TabPane>
}

export default CustomTabPane
