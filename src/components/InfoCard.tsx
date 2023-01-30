import React from 'react'
import styled from 'styled-components'
import CustomCard from './CustomCard'
import CustomRow from './CustomRow'
import CustomSpace from './CustomSpace'

export type InfoCardType = {
  color: string
  content: string
  icon: React.ReactNode
  value: React.ReactNode
}

interface InfoCardProps {
  dataSource: InfoCardType[]
  height?: number | string
  hoverable?: boolean
}

const CardIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 70px;
  margin: 10px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  font-size: 22px;
`

const StyledCard = styled(CustomCard)`
  width: 100%;
  height: ${(props) => props.height ?? '220px'};
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: center;
  color: #000;
  font-weight: 400;
`

const InfoCard: React.FC<InfoCardProps> = ({
  hoverable,
  height,
  dataSource,
}): React.ReactElement => {
  return (
    <CustomSpace direction={'horizontal'} width={'100%'} size={'large'}>
      {dataSource?.map((item, index) => (
        <StyledCard hoverable={hoverable} key={index} height={height}>
          <CardIconContainer color={item.color}>{item.icon}</CardIconContainer>
          <CustomRow justify={'center'}>
            <CardContent style={{ fontSize: 18, fontWeight: '600' }}>
              {item.value}
            </CardContent>
            <CardContent style={{ fontSize: 14 }}>{item.content}</CardContent>
          </CustomRow>
        </StyledCard>
      ))}
    </CustomSpace>
  )
}

export default InfoCard
