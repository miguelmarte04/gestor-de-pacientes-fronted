import React from 'react'
import styled from 'styled-components'
import CustomCard from './CustomCard'
import CustomCol from './CustomCol'
import CustomRow from './CustomRow'
import CustomSpace from './CustomSpace'
import { Image } from 'antd'
export type DynamicCardType = {
  title: string
  description: React.ReactNode
  icon: string
  color: string
}

interface DynamicCardProps {
  dataSources: DynamicCardType[]
  direction?: 'horizontal' | 'vertical'
}

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #000;
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: ${(props) => props.color};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 80%;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 228px;
  max-width: 228px;
  height: 120px;
  max-height: 120px;
  margin-top: 20px;
  position: relative;
  box-sizing: border-box;
`

const StyledCard = styled(CustomCard)`
  width: 100%;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
`

// const IconContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 45px;
//   height: 45px;
//   font-size: 25px;
//   font-weight: 300;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   color: #000;
//   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
//   border: 1px solid #e8e8e8;
//   box-sizing: border-box;
// `

const DynamicCard: React.FC<DynamicCardProps> = ({
  dataSources,
  direction = 'horizontal',
}): React.ReactElement => {
  return (
    <CustomSpace direction={direction} width={'100%'} size={'large'}>
      {dataSources?.map((item, index) => (
        <CardContainer key={index}>
          <CardHeader color={item.color}>{item.title}</CardHeader>
          <StyledCard>
            <CustomRow
              justify={'space-between'}
              align={'middle'}
              style={{ padding: '10px' }}
            >
              <CustomCol xs={6}>
                <Image
                  preview={false}
                  src={item.icon}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                />
              </CustomCol>
              <span>{item.description}</span>
            </CustomRow>
          </StyledCard>
        </CardContainer>
      ))}
    </CustomSpace>
  )
}

export default DynamicCard
