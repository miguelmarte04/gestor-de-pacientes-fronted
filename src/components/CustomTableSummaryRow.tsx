import { FunctionComponent, ReactElement } from 'react'
import { Table } from 'antd'
import { FooterRowProps } from 'rc-table/lib/Footer/Row'

const CustomTableSummaryRow: FunctionComponent<FooterRowProps> = ({
  ...props
}): ReactElement => (
  <Table.Summary.Row {...props}>{props.children}</Table.Summary.Row>
)

export default CustomTableSummaryRow
