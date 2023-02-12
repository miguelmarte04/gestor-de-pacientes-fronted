import { Table, TableProps } from 'antd'
import { AnyType } from '../constants/types'
import CustomCard from './CustomCard'

interface CustomTableProps extends TableProps<AnyType> {
  cardStyle?: React.CSSProperties
  extra?: React.ReactNode
}

const CustomTable: React.FC<CustomTableProps> = ({
  bordered = false,
  cardStyle,
  extra,
  pagination,
  size = 'middle',
  ...props
}): React.ReactElement => {
  return (
    <CustomCard style={{ ...cardStyle }}>
      {extra}
      <Table pagination={pagination} bordered={bordered} size={size} {...props}>
        {props.children}
      </Table>
    </CustomCard>
  )
}

export default CustomTable
