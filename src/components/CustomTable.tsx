import { FunctionComponent, ReactElement } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import { AnyType } from '../constants/types'

const CustomTable: FunctionComponent<TableProps<AnyType>> = ({
  bordered = true,
  size = 'small',
  ...props
}): ReactElement => (
  <Table bordered={bordered} size={size} {...props}>
    {props.children}
  </Table>
)

export default CustomTable
