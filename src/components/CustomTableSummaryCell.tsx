import { FunctionComponent, ReactElement } from 'react'
import { Table } from 'antd'
import { SummaryCellProps } from 'rc-table/lib/Footer/Cell'

const CustomTableSummaryCell: FunctionComponent<SummaryCellProps> = ({
  ...props
}): ReactElement => (
  <Table.Summary.Cell {...props}>{props.children}</Table.Summary.Cell>
)

export default CustomTableSummaryCell
