import { ClockCircleOutlined } from '@ant-design/icons'
import { TimelineItemProps } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import React from 'react'
import { getArray } from '../utils/general'
import ConditionalComponent from './ConditionalComponent'
import CustomButton from './CustomButton'
import CustomCard from './CustomCard'
import CustomCol from './CustomCol'
import CustomDivider from './CustomDivider'
import CustomRow from './CustomRow'
import CustomSelect from './CustomSelect'
import CustomSpace from './CustomSpace'
import CustomTimeline from './CustomTimeLine'
import CustomTimelineItem from './CustomTimelineItem'
import CustomTitle from './CustomTitle'

export type HistoryDataSource = {
  key: string
  date: string
  description: React.ReactNode
}

interface HistoryProps extends TimelineItemProps {
  dataSource: HistoryDataSource[]
  initialSelected?: string
  onSelect?(value?: React.Key, options?: DefaultOptionType): void
  options?: DefaultOptionType[]
  pageSize?: number
  title?: string
  extra?: React.ReactNode
}

const CustomHistory: React.FC<HistoryProps> = ({
  dataSource,
  initialSelected,
  onSelect,
  options,
  pageSize = 2,
  extra,
  title,
  ...props
}): React.ReactElement => {
  const [size, setSize] = React.useState<number>(pageSize)

  const handleHistorySize = () => {
    if (size < dataSource.length) {
      setSize(size + pageSize)
    } else {
      setSize(pageSize)
    }
  }

  return (
    <CustomCard
      style={{ height: '450px', maxHeight: '490px', boxSizing: 'border-box' }}
    >
      {extra}
      <ConditionalComponent condition={!!title}>
        <CustomRow justify="space-between">
          <CustomCol xs={17}>
            <CustomDivider>
              <CustomTitle level={5}>{title}</CustomTitle>
            </CustomDivider>
          </CustomCol>
          <ConditionalComponent condition={!!options}>
            <CustomCol xs={6}>
              <CustomSelect
                value={initialSelected}
                options={options}
                onSelect={onSelect}
              />
            </CustomCol>
          </ConditionalComponent>
        </CustomRow>
      </ConditionalComponent>
      <CustomRow className={'card-history'}>
        <CustomSpace size={'small'}>
          <CustomCol xs={24}>
            <CustomTimeline style={{ marginLeft: '5px', marginTop: '5px' }}>
              {getArray(dataSource, size).map((item) => (
                <CustomTimelineItem
                  key={item.key}
                  {...props}
                  dot={<ClockCircleOutlined />}
                >
                  <p>{item.date}</p>
                  <p>{item.description}</p>
                </CustomTimelineItem>
              ))}
            </CustomTimeline>
          </CustomCol>
          <ConditionalComponent condition={dataSource.length > pageSize}>
            <CustomRow justify={'center'}>
              <CustomButton type={'link'} onClick={handleHistorySize}>
                {dataSource.length > size ? 'Mostrar más' : 'Mostrar menos'}
              </CustomButton>
            </CustomRow>
          </ConditionalComponent>
        </CustomSpace>
      </CustomRow>
    </CustomCard>
  )
}

export default CustomHistory
