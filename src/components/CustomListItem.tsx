import { List } from 'antd'
import { ListItemTypeProps } from 'antd/lib/list/Item'
import React from 'react'

interface CustomListItemProps extends ListItemTypeProps {
  actions: React.ReactNode[]
  children?: React.ReactNode | React.ReactNode[]
  extra?: React.ReactNode
}

const { Item } = List

const CustomListItem: React.FC<Partial<CustomListItemProps>> = ({
  actions,
  ...props
}): React.ReactElement => {
  return (
    <Item actions={actions} {...props}>
      {props.children}
    </Item>
  )
}

export default CustomListItem
