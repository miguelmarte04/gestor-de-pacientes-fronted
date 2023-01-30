import React from 'react'
import Form, { FormListProps } from 'antd/es/form'

const { List } = Form

const CustomFormList: React.FC<FormListProps> = ({
  ...props
}): React.ReactElement => {
  return <List {...props}>{props.children}</List>
}

export default CustomFormList
