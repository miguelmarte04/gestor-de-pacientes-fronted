/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrinterFilled } from '@ant-design/icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Image, Timeline } from 'antd'
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
import CustomSpin from '../components/CustomSpin'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import DynamicCard, { DynamicCardType } from '../components/DynamicCard'
import PieChart from '../components/PieChart'
import PrintTemplate from '../components/PrintTemplate'
import { useAppDispatch, useAppSelector } from '../hooks'
import { ConsultasType, getConsultas } from '../slicers/general'
import {
  getDoctores,
  getEspecialidades,
  getPacientes,
} from '../slicers/general/general'
import { sortByDate } from '../utils/general'
import { getSessionInfo } from '../utils/session'

import { AnyType } from '../constants/types'
import moment from 'moment'
import CustomModal from '../components/CustomModal'
import CustomTable from '../components/CustomTable'
import { ColumnType } from 'antd/lib/table'
import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import CustomTimeLine from '../components/CustomTimeLine'

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
  const [visible, setVisible] = useState<boolean>()
  const [dateSelected, setDateSelected] = useState<string>()
  const [typeCalendar, setTypeCalendar] = useState<string>()
  const [yearSelected, SetYearSelected] = useState<number>(moment().year())
  const [monthSelected, SetMonthSelected] = useState<number>(moment().month())
  const [especilidadSelected, setEspecilidadSelected] = useState<number>()
  const [doctorSelected, setDoctorSelected] = useState<number>()
  const getChartIMG = (chartId: string) => {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement
    const imgData = canvas?.toDataURL('image/png', 1.0) as string

    setChartIMG(imgData)
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  )

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

    for (let i = 0; i < currentMonth; i++) {
      data.push(groupedData[i] ?? 0)
    }

    return data
  }

  const years = []
  for (let i = 2000; i <= moment().year(); i++) {
    years.push({ label: i, value: i })
  }
  const labels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  useEffect(() => {
    const condition = {}
    if (
      getSessionInfo().privilegios === 1 ||
      getSessionInfo().privilegios === 4
    ) {
      dispatch(
        getConsultas({
          condition: {
            estado: 'T',
          },
        })
      )
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
    if (getSessionInfo().privilegios === 3) {
      dispatch(
        getConsultas({
          condition: {
            estado: 'T',
            id_doctor: getSessionInfo().id,
          },
        })
      )
    }
    if (getSessionInfo().privilegios === 2) {
      dispatch(
        getConsultas({
          condition: {
            estado: 'T',
            id_paciente: getSessionInfo().id,
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
      description: CardDescription(
        'Total',
        `${pacientes?.filter((item) => item.estado === 'A')?.length ?? 0}`
      ),
      icon: './assets/pacientes.png',
      color: '#ffe58f',
    },
    {
      title: 'Doctores',
      description: CardDescription(
        'Total',
        `${doctores?.filter((item) => item.estado === 'A')?.length ?? 0}`
      ),
      icon: './assets/doctor.png',
      color: '#f4ffb8',
    },
    {
      title: 'Especialidades',
      description: CardDescription(
        'Total',
        `${especialidades?.filter((item) => item.estado === 'A')?.length ?? 0}`
      ),
      icon: './assets/especialidades.png',
      color: '#95de64',
    },
    {
      title: 'Consultas',
      description: CardDescription(
        'Total',
        `${Consultas?.filter((item) => item.estado !== 'I')?.length ?? 0}`
      ),
      icon: './assets/consultas.png',
      color: '#87e8de',
    },
  ]
  const dynamicCardDataSourcesDoc: DynamicCardType[] = [
    {
      title: 'Pacientes',
      description: CardDescription(
        'Total',
        `${
          Consultas?.filter((item) => item.estado !== 'I')?.unique(
            'id_paciente'
          )?.length ?? 0
        }`
      ),
      icon: './assets/pacientes.png',
      color: '#ffe58f',
    },

    {
      title: 'Consultas',
      description: CardDescription(
        'Total',
        `${Consultas?.filter((item) => item.estado !== 'I')?.length ?? 0}`
      ),
      icon: './assets/consultas.png',
      color: '#87e8de',
    },
  ]
  const dynamicCardDataSourcesPac: DynamicCardType[] = [
    {
      title: 'Consultas',
      description: CardDescription(
        'Total',
        `${Consultas?.filter((item) => item.estado !== 'I')?.length ?? 0}`
      ),
      icon: './assets/consultas.png',
      color: '#87e8de',
    },
  ]

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
      handlePrint()
    }
  }, [chartIMG, chartTitle, currentRef])

  useEffect(handlePrintChart, [handlePrintChart])

  // const monthCellRender = (value: AnyType) => {
  //   return Consultas?.some(
  //     (c) =>
  //       moment(c.fecha_insercion, 'YYYY-MM-DD').format('MM') ===
  //       moment(value).format('MM')
  //   ) ? (
  //     <CustomTitle
  //       style={{
  //         backgroundColor: 'red',
  //         padding: 19,
  //         borderRadius: 5,
  //       }}
  //       onClick={() => {
  //         setVisible(true)
  //         setDateSelected(value)
  //         setTypeCalendar('years')
  //       }}
  //     >
  //       Consultas
  //     </CustomTitle>
  //   ) : null
  // }

  // const dateCellRender = (value: AnyType) => {
  //   return Consultas?.some(
  //     (c) =>
  //       moment(c.fecha_insercion, 'YYYY-MM-DD').format('DD/MM/YYYY') ===
  //       moment(value).format('DD/MM/YYYY')
  //   ) ? (
  //     <CustomTitle
  //       style={{
  //         backgroundColor: 'red',
  //         padding: 19,
  //         borderRadius: 5,
  //       }}
  //       onClick={() => {
  //         setVisible(true)
  //         setTypeCalendar('meses')
  //         setDateSelected(value)
  //       }}
  //     >
  //       Consultas
  //     </CustomTitle>
  //   ) : null
  // }
  const columnsConsultas: ColumnType<ConsultasType>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'paciente',
      title: 'Paciente',
      dataIndex: 'paciente',
      render: (_, record) => {
        return `${record.nombre_paciente} ${record.apellido_paciente}`
      },
    },
    {
      key: 'doctor',
      title: 'Doctor',
      dataIndex: 'doctor',
      render: (_, record) => {
        return `${record.nombre_doctor} ${record.apellido_doctor}`
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: `${item.nombre_doctor} ${item.apellido_doctor}`,
              value: item.nombre_doctor,
            }))?.unique('text')
          : [],

      onFilter(value, record) {
        return record.nombre_doctor === value
      },
    },
    {
      key: 'asunto',
      title: 'Asunto',
      dataIndex: 'asunto',
    },

    {
      key: 'fecha_insercion',
      title: 'Fecha',
      width: '10%',
      dataIndex: 'fecha_insercion',
      render: (item: string) => {
        return moment(item, 'YYYY-MM-DD').format('DD/MM/YYYY')
      },
    },
  ]

  return (
    <CustomSpin spinning={loading}>
      <StyledLayout>
        <CustomCol xs={24}>
          <CustomRow justify={'center'}>
            <CustomRow justify={'space-between'}>
              <CustomCol xs={24}>
                <ConditionalComponent
                  condition={
                    getSessionInfo().privilegios === 1 ||
                    getSessionInfo().privilegios === 4
                  }
                >
                  <DynamicCard dataSources={dynamicCardDataSources} />

                  <Separated />
                  {/* <CustomCol xs={24} style={{ marginBottom: 10 }}>
                    <CustomCard>
                      <CustomTimeLine />
                      <Calendar
                        dateCellRender={dateCellRender}
                        monthCellRender={monthCellRender}
                        style={{
                          maxHeight: '50vh',
                          overflow: 'auto',
                          width: '50%',
                        }}
                      />
                    </CustomCard>
                  </CustomCol> */}
                  <CustomRow justify="space-between">
                    <CustomCol xs={11} style={{ marginBottom: 10 }}>
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
                              type={'text'}
                              icon={
                                <PrinterFilled style={{ fontSize: '22px' }} />
                              }
                            >
                              Imprimir
                            </CustomButton>
                          </CustomTooltip>
                        </CustomRow>
                        <CustomRow justify="space-between">
                          <CustomCol xs={18}>
                            <CustomDivider>
                              <CustomTitle level={5}>
                                Consultas por meses
                              </CustomTitle>
                            </CustomDivider>
                          </CustomCol>
                          <CustomCol xs={6}>
                            <CustomSelect
                              placeholder={'Seleccionar Año'}
                              defaultValue={moment().year()}
                              options={years}
                              onChange={(value) => {
                                SetYearSelected(value)
                              }}
                            />
                          </CustomCol>
                        </CustomRow>

                        <BarChart
                          title={'Consultas'}
                          labels={labels}
                          id={'bar-chart'}
                          Bardata={buildDataSource(
                            [
                              ...(Consultas?.filter(
                                (item) =>
                                  moment(
                                    item.fecha_insercion,
                                    'YYYY-MM-DD'
                                  ).year() === yearSelected
                              ) ?? []),
                            ],
                            'fecha_insercion'
                          )}
                        />
                      </CustomCard>
                    </CustomCol>
                    <CustomCol xs={11} style={{ marginBottom: 10 }}>
                      <CustomCard>
                        <CustomRow justify={'end'} width={'100%'}>
                          <CustomTooltip title={'Imprimir'}>
                            <CustomButton
                              onClick={async () => {
                                setLoading(true)
                                setCurrentRef('consultas')
                                setChartTitle('Consumo')
                                getChartIMG('pie-chart')
                              }}
                              type={'text'}
                              icon={
                                <PrinterFilled style={{ fontSize: '22px' }} />
                              }
                            >
                              Imprimir
                            </CustomButton>
                          </CustomTooltip>
                        </CustomRow>
                        <CustomRow justify="space-between">
                          <CustomCol xs={18}>
                            <CustomDivider>
                              <CustomTitle level={5}>
                                Consultas por tanda
                              </CustomTitle>
                            </CustomDivider>
                          </CustomCol>
                          <CustomCol xs={6}>
                            <CustomSelect
                              placeholder={'Seleccionar Mes'}
                              defaultValue={moment().month()}
                              options={labels?.map((item, index) => {
                                return {
                                  label: item,
                                  value: index,
                                }
                              })}
                              onChange={(value) => {
                                SetMonthSelected(value)
                              }}
                            />
                          </CustomCol>
                        </CustomRow>
                        <PieChart
                          id={'pie-chart'}
                          title={'Consultas'}
                          labels={['Mañana', 'Tarde']}
                          data={[
                            Consultas?.filter(
                              (item) =>
                                moment(
                                  item.fecha_insercion,
                                  'YYYY-MM-DD'
                                ).month() === monthSelected
                            )?.reduce((a, b) => {
                              return a + (b.id_tanda === 'M' ? 1 : 0)
                            }, 0),
                            Consultas?.filter(
                              (item) =>
                                moment(
                                  item.fecha_insercion,
                                  'YYYY-MM-DD'
                                ).month() === monthSelected
                            )?.reduce((a, b) => {
                              return a + (b.id_tanda === 'T' ? 1 : 0)
                            }, 0),
                          ]}
                        />
                      </CustomCard>
                    </CustomCol>
                    <CustomCol xs={11} style={{ marginBottom: 10 }}>
                      <CustomCard>
                        <CustomRow justify={'end'} width={'100%'}>
                          <CustomTooltip title={'Imprimir'}>
                            <CustomButton
                              onClick={async () => {
                                setLoading(true)
                                setCurrentRef('consultas')
                                setChartTitle('Consumo')
                                getChartIMG('line-chart')
                              }}
                              type={'text'}
                              icon={
                                <PrinterFilled style={{ fontSize: '22px' }} />
                              }
                            >
                              Imprimir
                            </CustomButton>
                          </CustomTooltip>
                        </CustomRow>
                        <CustomRow justify="space-between">
                          <CustomCol xs={18}>
                            <CustomDivider>
                              <CustomTitle level={5}>
                                Consultas por especialidad
                              </CustomTitle>
                            </CustomDivider>
                          </CustomCol>
                          <CustomCol xs={6}>
                            <CustomSelect
                              placeholder={'Seleccionar Especialidad'}
                              options={especialidades
                                ?.filter((item) => item.estado === 'A')
                                ?.map((item) => {
                                  return {
                                    label: item.nombre,
                                    value: item.id,
                                  }
                                })}
                              onChange={(value) => {
                                setEspecilidadSelected(value)
                              }}
                            />
                          </CustomCol>
                        </CustomRow>
                        <Line
                          id={'line-chart'}
                          title={'Consultas'}
                          data={{
                            labels: [
                              'Enero',
                              'Febrero',
                              'Marzo',
                              'Abril',
                              'Mayo',
                              'Junio',
                              'Julio',
                              'Agosto',
                              'Septiembre',
                              'Octubre',
                              'Noviembre',
                              'Diciembre',
                            ],
                            datasets: [
                              {
                                label: especilidadSelected
                                  ? especialidades?.find(
                                      (item) => item.id === especilidadSelected
                                    )?.nombre
                                  : 'Seleccionar especialidad',
                                data: especilidadSelected
                                  ? buildDataSource(
                                      [
                                        ...(Consultas?.filter(
                                          (item) =>
                                            item.id_especialidad ===
                                            especilidadSelected
                                        ) ?? []),
                                      ],
                                      'fecha_insercion'
                                    )
                                  : [],
                                fill: false,
                                backgroundColor: 'rgb(75, 192, 192)',
                                borderColor: 'rgba(75, 192, 192, 0.2)',
                              },
                            ],
                          }}
                        />
                      </CustomCard>
                    </CustomCol>
                    <CustomCol xs={11} style={{ marginBottom: 10 }}>
                      <CustomCard>
                        <CustomRow justify={'end'} width={'100%'}>
                          <CustomTooltip title={'Imprimir'}>
                            <CustomButton
                              onClick={async () => {
                                setLoading(true)
                                setCurrentRef('consultas')
                                setChartTitle('Consumo')
                                getChartIMG('line-doc-chart')
                              }}
                              type={'text'}
                              icon={
                                <PrinterFilled style={{ fontSize: '22px' }} />
                              }
                            >
                              Imprimir
                            </CustomButton>
                          </CustomTooltip>
                        </CustomRow>
                        <CustomRow justify="space-between">
                          <CustomCol xs={18}>
                            <CustomDivider>
                              <CustomTitle level={5}>
                                Consultas por Doctor
                              </CustomTitle>
                            </CustomDivider>
                          </CustomCol>
                          <CustomCol xs={6}>
                            <CustomSelect
                              placeholder={'Seleccionar Doctor'}
                              options={doctores
                                ?.filter((item) => item.estado === 'A')
                                ?.map((item) => {
                                  return {
                                    label: item.nombre,
                                    value: item.id,
                                  }
                                })}
                              onChange={(value) => {
                                setDoctorSelected(value)
                              }}
                            />
                          </CustomCol>
                        </CustomRow>
                        <Line
                          id={'line-doc-chart'}
                          title={'Consultas'}
                          data={{
                            labels: [
                              'Enero',
                              'Febrero',
                              'Marzo',
                              'Abril',
                              'Mayo',
                              'Junio',
                              'Julio',
                              'Agosto',
                              'Septiembre',
                              'Octubre',
                              'Noviembre',
                              'Diciembre',
                            ],
                            datasets: [
                              {
                                label: doctorSelected
                                  ? doctores?.find(
                                      (item) => item.id === doctorSelected
                                    )?.nombre
                                  : 'Seleccionar doctor',
                                data: doctorSelected
                                  ? buildDataSource(
                                      [
                                        ...(Consultas?.filter(
                                          (item) =>
                                            item.id_doctor === doctorSelected
                                        ) ?? []),
                                      ],
                                      'fecha_insercion'
                                    )
                                  : [],
                                fill: false,
                                backgroundColor: 'rgb(197,100,55)',
                                borderColor: 'rgba(197,100,55,0.2)',
                              },
                            ],
                          }}
                        />
                      </CustomCard>
                    </CustomCol>
                    <CustomCol xs={11} style={{ marginBottom: 10 }}>
                      <CustomCard>
                        <CustomRow justify={'end'} width={'100%'}>
                          <CustomTooltip title={'Imprimir'}>
                            <CustomButton
                              onClick={async () => {
                                setLoading(true)
                                setCurrentRef('consultas')
                                setChartTitle('Consumo')
                                getChartIMG('pie-enfermedad-chart')
                              }}
                              type={'text'}
                              icon={
                                <PrinterFilled style={{ fontSize: '22px' }} />
                              }
                            >
                              Imprimir
                            </CustomButton>
                          </CustomTooltip>
                        </CustomRow>
                        <CustomRow justify="space-between">
                          <CustomCol xs={18}>
                            <CustomDivider>
                              <CustomTitle level={5}>
                                Consultas por enfermedad
                              </CustomTitle>
                            </CustomDivider>
                          </CustomCol>
                        </CustomRow>
                        <PieChart
                          id={'pie-enfermedad-chart'}
                          title={'Consultas'}
                          labels={Consultas?.unique('enfermedad')?.map(
                            (item) => {
                              return item.enfermedad
                            }
                          )}
                          data={
                            Consultas?.unique('enfermedad')?.map((item) => {
                              return Consultas?.filter(
                                (item2) => item2.enfermedad === item.enfermedad
                              )?.length
                            }) ?? []
                          }
                        />
                      </CustomCard>
                    </CustomCol>
                  </CustomRow>
                </ConditionalComponent>
              </CustomCol>

              {/* <ConditionalComponent
                condition={getSessionInfo().privilegios === 4}
              >
                <CustomCol xs={24} style={{ marginBottom: 10 }}>
                  <CustomRow justify={'center'}>
                    <Image
                      src={'/assets/logo.png'}
                      alt="Logo"
                      preview={false}
                    />
                  </CustomRow>
                </CustomCol>
              </ConditionalComponent> */}
              <ConditionalComponent
                condition={getSessionInfo().privilegios === 3}
              >
                <CustomCol xs={24}>
                  <CustomRow justify={'center'}>
                    <DynamicCard dataSources={dynamicCardDataSourcesDoc} />
                  </CustomRow>
                </CustomCol>

                <Separated />
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
                          type={'text'}
                          icon={<PrinterFilled style={{ fontSize: '22px' }} />}
                        >
                          Imprimir
                        </CustomButton>
                      </CustomTooltip>
                    </CustomRow>
                    <CustomRow justify="space-between">
                      <CustomCol xs={18}>
                        <CustomDivider>
                          <CustomTitle level={5}>
                            Consultas por meses
                          </CustomTitle>
                        </CustomDivider>
                      </CustomCol>
                      <CustomCol xs={6}>
                        <CustomSelect
                          placeholder={'Seleccionar Año'}
                          defaultValue={moment().year()}
                          options={years}
                          onChange={(value) => {
                            SetYearSelected(value)
                          }}
                        />
                      </CustomCol>
                    </CustomRow>

                    <BarChart
                      title={'Consultas'}
                      labels={labels}
                      id={'bar-chart'}
                      Bardata={buildDataSource(
                        [
                          ...(Consultas?.filter(
                            (item) =>
                              moment(
                                item.fecha_insercion,
                                'YYYY-MM-DD'
                              ).year() === yearSelected
                          ) ?? []),
                        ],
                        'fecha_insercion'
                      )}
                    />
                  </CustomCard>
                </CustomCol>
              </ConditionalComponent>
            </CustomRow>
          </CustomRow>
        </CustomCol>
        <ConditionalComponent condition={getSessionInfo().privilegios === 2}>
          <CustomRow justify="space-between">
            <CustomCol xs={22} style={{ marginBottom: 10 }}>
              <CustomRow justify="center">
                <DynamicCard dataSources={dynamicCardDataSourcesPac} />
              </CustomRow>
            </CustomCol>
            <CustomCol xs={11} style={{ marginBottom: 10 }}>
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
                        type={'text'}
                        icon={<PrinterFilled style={{ fontSize: '22px' }} />}
                      >
                        Imprimir
                      </CustomButton>
                    </CustomTooltip>
                  </CustomRow>
                  <CustomRow justify="space-between">
                    <CustomCol xs={18}>
                      <CustomDivider>
                        <CustomTitle level={5}>Consultas por meses</CustomTitle>
                      </CustomDivider>
                    </CustomCol>
                    <CustomCol xs={6}>
                      <CustomSelect
                        placeholder={'Seleccionar Año'}
                        defaultValue={moment().year()}
                        options={years}
                        onChange={(value) => {
                          SetYearSelected(value)
                        }}
                      />
                    </CustomCol>
                  </CustomRow>

                  <BarChart
                    title={'Consultas'}
                    labels={labels}
                    id={'bar-chart'}
                    Bardata={buildDataSource(
                      [
                        ...(Consultas?.filter(
                          (item) =>
                            moment(
                              item.fecha_insercion,
                              'YYYY-MM-DD'
                            ).year() === yearSelected
                        ) ?? []),
                      ],
                      'fecha_insercion'
                    )}
                  />
                </CustomCard>
              </CustomCol>
            </CustomCol>
            <CustomCol xs={11} style={{ marginBottom: 10 }}>
              <CustomCard>
                <CustomRow justify={'start'}>
                  <CustomTitle level={5}>Consultas</CustomTitle>
                </CustomRow>
                <Timeline mode={'left'}>
                  {Consultas?.map((item, index) => {
                    return (
                      <Timeline.Item
                        label={`Fecha: ${moment(
                          item.fecha_insercion,
                          'YYYY-MM-DD'
                        ).format('DD/MM/YYYY')}`}
                        key={index}
                      >
                        {`Dr. ${item.nombre_doctor} ${
                          item.apellido_doctor
                        } - Especialidad: ${item.especialidad} - Tanda: ${
                          item.id_tanda === 'M' ? 'Mañana' : 'Tarde'
                        }`}
                      </Timeline.Item>
                    )
                  })}
                </Timeline>
              </CustomCard>
            </CustomCol>
          </CustomRow>
        </ConditionalComponent>
      </StyledLayout>
      <PrintTemplate ref={ConsultasRef} className={'print-report'}>
        <CustomDivider>{`Gráfico de ${chartTitle}`}</CustomDivider>
        <Image src={chartIMG} />
      </PrintTemplate>
      <CustomModal
        title="Consultas"
        visible={visible}
        onCancel={() => setVisible(false)}
        width={'70%'}
        okButtonProps={{
          hidden: true,
        }}
        cancelText="Salir"
      >
        <CustomTable
          dataSource={Consultas?.filter((item) => {
            return typeCalendar === 'meses'
              ? moment(item.fecha_insercion, 'YYYY-MM-DD')?.format(
                  'DD/MM/YYYY'
                ) === moment(dateSelected)?.format('DD/MM/YYYY')
              : moment(item.fecha_insercion, 'YYYY-MM-DD')?.format('MM') ===
                  moment(dateSelected)?.format('MM')
          })}
          columns={columnsConsultas}
          rowKey={(record) => record.id}
        />
      </CustomModal>
    </CustomSpin>
  )
}

export default Dashboard
