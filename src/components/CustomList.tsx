import { List, ListProps } from 'antd'
import React from 'react'
import { AnyType } from '../constants/types'

const CustomList: React.FC<ListProps<AnyType>> = ({
  itemLayout = 'horizontal',
  size = 'small',
  pagination = { pageSize: 5 },
  ...props
}): React.ReactElement => {
  return (
    <List
      itemLayout={itemLayout}
      pagination={pagination}
      size={size}
      {...props}
    />
  )
}

export default CustomList
