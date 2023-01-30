import React from 'react'
import styled from 'styled-components'
import CustomCard from './CustomCard'
import CustomDivider from './CustomDivider'
import CustomProgress from './CustomProgress'
import CustomRow from './CustomRow'
import CustomTitle from './CustomTitle'

export type ProgressType = {
  id: number
  name: string
  percent: number
  color: string | string[]
  success: number
}

type LegendType = {
  name: string
  color: string
}

interface DynamicCardProps {
  legend: LegendType[]
  dataSources: ProgressType[]
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  title: string
}

const LegendColor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 5px;
`

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`
const DynamicProgress: React.FC<DynamicCardProps> = ({
  legend,
  dataSources,
  justify = 'space-between',
  title,
}): React.ReactElement => {
  return (
    <CustomCard style={{ minHeight: '325.22px', margin: '10px 0px' }}>
      <CustomDivider>
        <CustomTitle>{title}</CustomTitle>
      </CustomDivider>
      <CustomRow justify={justify}>
        {dataSources?.map((item) => (
          <CustomProgress
            percent={item.percent}
            key={item.id}
            strokeColor={{
              '0%': '#fa541c',
              '50%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        ))}
      </CustomRow>
      <CustomDivider />
      <CustomRow justify={'space-between'} align={'middle'}>
        {legend?.map((item, index) => (
          <LegendContainer key={index}>
            <LegendColor color={item.color} />
            <span>{item.name}</span>
          </LegendContainer>
        ))}
      </CustomRow>
    </CustomCard>
  )
}

export default DynamicProgress
