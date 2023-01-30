import React from 'react'
import { ColumnsType } from 'antd/lib/table'
import { Image } from 'antd'
import CustomTable from './CustomTable'
import CustomCol from './CustomCol'
import CustomRow from './CustomRow'
import CustomTitle from './CustomTitle'
import { getDataInfoEmpresa } from '../utils/session'

interface PrintTemplateProps {
  columns: ColumnsType<unknown>
  dataSource: unknown[]
  title: string
}

const PrintTemplate = React.forwardRef<HTMLDivElement, PrintTemplateProps>(
  ({ dataSource, columns, title }, ref) => {
    return (
      <div ref={ref} className={'print-template'}>
        <CustomCol xs={24}>
          <CustomRow justify={'center'}>
            <Image
              width={150}
              preview={false}
              src={getDataInfoEmpresa()?.logo}
            />
          </CustomRow>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomRow justify={'center'}>
            <CustomTitle>{title}</CustomTitle>
          </CustomRow>
        </CustomCol>
        <div className={'push'}></div>
        <CustomTable
          columns={columns}
          className={'print-table'}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    )
  }
)

PrintTemplate.displayName = 'PrintTemplate'

export default PrintTemplate
