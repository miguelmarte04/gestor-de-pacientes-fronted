import { Collapse, CollapsePanelProps } from 'antd'
import React from 'react'

const CustomPanel: React.FC<CollapsePanelProps> = ({
  ...props
}): React.ReactElement => <Collapse.Panel {...props}></Collapse.Panel>

export default CustomPanel
