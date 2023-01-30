import { ClockCircleOutlined } from '@ant-design/icons'
import { Empty, TimelineItemProps } from 'antd'
import React from 'react'
import { DataSourceType } from '../constants/types'
import { defaultTheme } from '../themes'
import { generateId, replaceAll } from '../utils/general'
import CustomButton from './CustomButton'
import CustomDivider from './CustomDivider'
import CustomPopover from './CustomPopover'
import CustomRow from './CustomRow'
import CustomSpin from './CustomSpin'
import CustomTimeLine from './CustomTimeLine'
import CustomTimelineItem from './CustomTimelineItem'
import CustomTooltip from './CustomTooltip'

interface TimelineHistoryProps extends TimelineItemProps {
  dataSource: DataSourceType[]
  loading?: boolean
  style?: React.CSSProperties
  title: string
  tooltip?: string
}

const TimelineHistory: React.FC<TimelineHistoryProps> = ({
  dataSource,
  loading,
  style,
  title,
  tooltip = 'Click para ver más',
  ...props
}): React.ReactElement => {
  const Dot = (
    <CustomTooltip title={tooltip} placement={'bottom'}>
      <CustomButton
        type={'link'}
        icon={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
      />
    </CustomTooltip>
  )
  return (
    <CustomSpin spinning={loading}>
      <CustomRow>
        <CustomDivider>
          <span>{title}</span>
        </CustomDivider>

        <CustomRow
          className={'timeline-content'}
          justify={'center'}
          width={'100%'}
          style={style}
        >
          {dataSource?.length > 0 ? (
            <CustomTimeLine
              style={{ width: '100%', overflowX: 'hidden', paddingTop: '2%' }}
            >
              {dataSource?.map((item) => (
                <CustomPopover
                  style={{ width: '100%' }}
                  key={item.id}
                  content={
                    <>
                      {Object?.keys(item.cambios ?? [])?.map((item2) => (
                        <span key={generateId()}>
                          <strong>{replaceAll(item2, '_', ' ')}</strong>:{' '}
                          {item.cambios[item2]}
                          <hr style={{ color: defaultTheme.primaryColor }} />
                        </span>
                      ))}
                    </>
                  }
                >
                  <CustomTimelineItem
                    dot={Dot}
                    color={item.color ?? defaultTheme.primaryColor}
                    {...props}
                  >
                    {item.label}
                  </CustomTimelineItem>
                </CustomPopover>
              ))}
            </CustomTimeLine>
          ) : (
            <Empty />
          )}
        </CustomRow>
      </CustomRow>
    </CustomSpin>
  )
}

export default TimelineHistory
