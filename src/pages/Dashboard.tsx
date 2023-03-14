/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApartmentOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  // DollarCircleOutlined,
  GifOutlined,
  IssuesCloseOutlined,
  PrinterFilled,
  ProfileOutlined,
  RedoOutlined,
  TagOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Calendar, Image } from 'antd'
import styled from 'styled-components'
import BarChart from '../components/BarChart'
import ConditionalComponent from '../components/ConditionalComponent'
import CustomButton from '../components/CustomButton'
import CustomCard from '../components/CustomCard'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomLayout from '../components/CustomLayout'
import CustomRow from '../components/CustomRow'
import CustomSelect from '../components/CustomSelect'
import CustomSpace from '../components/CustomSpace'
import CustomSpin from '../components/CustomSpin'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import DynamicCard, { DynamicCardType } from '../components/DynamicCard'
import InfoCard, { InfoCardType } from '../components/InfoCard'
import PieChart from '../components/PieChart'
import PrintTemplate from '../components/PrintTemplate'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getConsultas } from '../slicers/general'
import {
  getDoctores,
  getEspecialidades,
  getPacientes,
} from '../slicers/general/general'
import { createBarDatasets, sortByDate } from '../utils/general'
import { getSessionInfo } from '../utils/session'
import CustomCalendar from '../components/CustomCalendar'
import { AnyType } from '../constants/types'

const StyledLayout = styled(CustomLayout)`
  background-color: #fff;
  padding: 20px;
  min-height: 800px%;
`
export const Separated = styled.div`
  margin: 10px 0;
  height: 2px;
  borde2: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`
type ComponentsRef = 'consultas'
const Dashboard = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const { Consultas, pacientes, doctores, especialidades } = useAppSelector(
    (state) => state.general
  )
  const [loading, setLoading] = useState<boolean>()
  const [currentRef, setCurrentRef] = useState<ComponentsRef>()
  const ConsultasRef = useRef<HTMLDivElement>(null)
  const [chartTitle, setChartTitle] = useState<string>()
  const [chartIMG, setChartIMG] = useState<string>()
  const getChartIMG = (chartId: string) => {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement
    const imgData = canvas?.toDataURL('image/png', 1.0) as string

    setChartIMG(imgData)
  }

  const buildDataSource = <T, K extends keyof T>(arr: T[], k: K) => {
    const data = new Array<number>()
    const sortedData = sortByDate(arr, k)

    // obtener el numero del mes actual
    const currentMonth = new Date().getMonth() + 1

    // agrupar los datos por mes, para tener cuantos datos hay por mes
    const groupedData = sortedData?.reduce((acc, curr) => {
      const month = new Date(curr[k as string]).getMonth()

      if (acc[month]) {
        acc[month]++
      } else {
        acc[month] = 1
      }

      return acc
    }, {} as Record<number, number>)

    for (let i = 1; i < currentMonth + 1; i++) {
      data.push(groupedData[i] ?? 0)
    }

    return data
  }

  const labels = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]

  useEffect(() => {
    const condition = {}
    if (getSessionInfo().privilegios === 1) {
      dispatch(getConsultas(condition))
      dispatch(getDoctores(condition))
      dispatch(getEspecialidades(condition))
      dispatch(
        getPacientes({
          condition: {
            search: '',
            type: 'search_register',
          },
        })
      )
    }
  }, [])

  const CardDescription = (desc: string, label: string) => (
    <span>
      <strong>{desc} : </strong>
      {label}
    </span>
  )

  const dynamicCardDataSources: DynamicCardType[] = [
    {
      title: 'Pacientes',
      description: CardDescription('Total', `${pacientes?.length ?? 0}`),
      icon: <TeamOutlined />,
      color: '#ffe58f',
    },
    {
      title: 'Doctores',
      description: CardDescription('Total', `${doctores?.length ?? 0}`),
      icon: <UserOutlined />,
      color: '#f4ffb8',
    },
    {
      title: 'Especialidades',
      description: CardDescription('Total', `${especialidades?.length ?? 0}`),
      icon: <TagOutlined />,
      color: '#95de64',
    },
    {
      title: 'Consultas',
      description: CardDescription('Total', `${Consultas?.length ?? 0}`),
      icon: <ProfileOutlined />,
      color: '#87e8de',
    },
  ]

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top' as const,
  //     },
  //     title: {
  //       display: true,
  //       text: '',
  //     },
  //   },
  // }
  const ref: Record<ComponentsRef, React.RefObject<HTMLDivElement>> = {
    consultas: ConsultasRef,
  }

  const handlePrint = useReactToPrint({
    content: () => ref[currentRef as ComponentsRef]?.current,
    onAfterPrint: () => {
      setCurrentRef(undefined)
      setLoading(false)
    },
    documentTitle: 'Reporte',
    bodyClass: 'print-report',
  })
  const handlePrintChart = useCallback(() => {
    if ((chartIMG && chartTitle) || ref[currentRef as ComponentsRef]?.current) {
      // eslint-disable-next-line no-console
      console.log(ref[currentRef as ComponentsRef]?.current)
      handlePrint()
    }
  }, [chartIMG, chartTitle, currentRef])

  useEffect(handlePrintChart, [handlePrintChart])

  const monthCellRender = (value: AnyType) => {
    const num = 1239
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  const dateCellRender = (value: AnyType) => {
    const listData = [{ type: 'warning', content: 'This is warning event.' }]
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>hola</li>
        ))}
      </ul>
    )
  }
  return (
    <CustomSpin spinning={loading}>
      <StyledLayout>
        <CustomCol xs={24}>
          <CustomRow justify={'center'}>
            <CustomRow justify={'space-between'}>
              <CustomCol xs={24}>
                <ConditionalComponent
                  condition={getSessionInfo().privilegios === 1}
                >
                  <DynamicCard dataSources={dynamicCardDataSources} />

                  <Separated />
                  <CustomCol xs={24} style={{ marginBottom: 10 }}>
                    <CustomCard>
                      <Calendar
                        dateCellRender={dateCellRender}
                        monthCellRender={monthCellRender}
                      />
                    </CustomCard>
                  </CustomCol>
                  <CustomCol xs={24} style={{ marginBottom: 10 }}>
                    <CustomCard>
                      <CustomRow justify={'end'} width={'100%'}>
                        <CustomTooltip title={'Imprimir'}>
                          <CustomButton
                            onClick={async () => {
                              setLoading(true)
                              setCurrentRef('consultas')
                              setChartTitle('Consumo')
                              getChartIMG('bar-chart')
                            }}
                            type={'link'}
                            icon={
                              <PrinterFilled style={{ fontSize: '22px' }} />
                            }
                          />
                        </CustomTooltip>
                      </CustomRow>
                      <CustomRow justify="space-between">
                        <CustomCol xs={24}>
                          <CustomDivider>
                            <CustomTitle level={5}>Consultas</CustomTitle>
                          </CustomDivider>
                        </CustomCol>
                      </CustomRow>

                      <BarChart
                        title={'Consultas'}
                        labels={labels}
                        id={'bar-chart'}
                        Bardata={buildDataSource(
                          [...Consultas],
                          'fecha_insercion'
                        )}
                      />
                    </CustomCard>
                  </CustomCol>
                </ConditionalComponent>
              </CustomCol>
            </CustomRow>
          </CustomRow>
        </CustomCol>
      </StyledLayout>
      <PrintTemplate ref={ConsultasRef} className={'print-report'}>
        <CustomDivider>{`Gráfico de ${chartTitle}`}</CustomDivider>
        <Image src={chartIMG} />
      </PrintTemplate>
    </CustomSpin>
  )
}

export default Dashboard
