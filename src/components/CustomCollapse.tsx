import { Collapse, CollapseProps } from 'antd'
import React from 'react'

const CustomCollapse: React.FC<CollapseProps> = ({
  ...props
}): React.ReactElement => <Collapse {...props}>{props.children}</Collapse>

export default CustomCollapse
