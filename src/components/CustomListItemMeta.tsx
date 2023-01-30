import { List } from 'antd'
import { ListItemMetaProps } from 'antd/lib/list'
import React from 'react'

const { Meta } = List.Item

const CustomListItemMeta: React.FC<ListItemMetaProps> = ({
  ...props
}): React.ReactElement => {
  return <Meta {...props} />
}

export default CustomListItemMeta
