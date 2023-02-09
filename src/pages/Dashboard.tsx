/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApartmentOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  // DollarCircleOutlined,
  GifOutlined,
  IssuesCloseOutlined,
  ProfileOutlined,
  RedoOutlined,
  TagOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import React, { useEffect, useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
// import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BarChart from '../components/BarChart'
import ConditionalComponent from '../components/ConditionalComponent'
import CustomCard from '../components/CustomCard'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomLayout from '../components/CustomLayout'
import CustomRow from '../components/CustomRow'
import CustomSpace from '../components/CustomSpace'
import CustomSpin from '../components/CustomSpin'
import CustomTitle from '../components/CustomTitle'
// import DoughnutChart from '../components/DoughnutChart'
import DynamicCard, { DynamicCardType } from '../components/DynamicCard'
import InfoCard, { InfoCardType } from '../components/InfoCard'
// import LineChart from '../components/LineChart'
import PieChart from '../components/PieChart'
// import { CONSULTAR_NOMINA } from '../constants/Routes'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getEmployee } from '../slicers/employee'
import {
  getDetNominas,
  getLaidOff,
  getNominas,
  getPermissions,
} from '../slicers/employee/employee'
import { getConsultas } from '../slicers/general'
import { getCandidates } from '../slicers/recruitment/recruitment'
import { sortByDate } from '../utils/general'
import { getSessionInfo } from '../utils/session'

const StyledLayout = styled(CustomLayout)`
  background-color: #fff;
  padding: 20px;
  min-height: 800px%;
`

const Dashboard = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  const {
    employee,
    nomina,
    dataPermissions,
    dataLaidOff,
    dataResignation,
    detNomina,
  } = useAppSelector((state) => state.employee)
  const { candidates } = useAppSelector((state) => state.recruitment)
  const { Consultas } = useAppSelector((state) => state.general)

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

  const barChartDataSourcePermissions = useMemo(() => {
    // cantidad de permisos por mes
    const data = new Array<number>()
    const arr = dataPermissions?.[0]?.id ? [...dataPermissions] : []

    // ordenar la data por mes de nacimiento
    const sortedData = arr?.sort?.((a, b) => {
      const monthA = new Date(a?.fecha_insercion).getMonth()
      const monthB = new Date(b?.fecha_insercion).getMonth()

      return monthA - monthB
    })

    // obtener la cantidad de empleados por mes y si un mes no tiene empleados, agregar 0
    for (let i = 0; i < 12; i++) {
      const month = sortedData?.filter(
        (permission) => new Date(permission?.fecha_insercion).getMonth() === i
      )

      data.push(month?.length)
    }

    return data
  }, [dataPermissions])

  const employeesBirthday = useMemo(() => {
    const currentMonth = new Date().getMonth()
    const arr = employee?.[0]?.id ? [...employee] : []

    return arr?.filter(
      (employee) =>
        new Date(employee.fecha_nacimiento).getMonth() === currentMonth
    )?.length
  }, [employee])

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
    dispatch(getCandidates(condition))
    dispatch(getConsultas(condition))
    dispatch(getNominas(condition))
    dispatch(getPermissions(condition))
    dispatch(getLaidOff(condition))
    dispatch(getDetNominas(condition))
    dispatch(
      getEmployee({
        condition: {
          search: '',
          type: 'search_register',
        },
      })
    )
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
      description: CardDescription('Total', `${employee?.length ?? 0}`),
      icon: <TeamOutlined />,
      color: '#ffe58f',
    },
    {
      title: 'Doctores',
      description: CardDescription('Total', `${candidates?.length ?? 0}`),
      icon: <UserOutlined />,
      color: '#f4ffb8',
    },
    {
      title: 'Especialidades',
      description: CardDescription('Total', `${Consultas?.length ?? 0}`),
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

  const infoCardDataSources: InfoCardType[] = [
    {
      content: 'Nóminas Registradas',
      value: `${nomina?.length}`,
      icon: <BarChartOutlined />,
      color: '#91d5ff',
    },
    {
      content: 'Nominas Aprobadas',
      value: `${nomina?.filter((item) => item.estado_nomina === 'A')?.length}`,
      icon: <CheckCircleOutlined />,
      color: '#b7eb8f',
    },
    {
      content: 'Nominas Autorizadas',
      value: `${nomina?.filter((item) => item.estado_nomina === 'U')?.length}`,
      icon: <IssuesCloseOutlined />,
      color: '#adc6ff',
    },
    {
      content: 'Nominas Reversadas',
      value: `${nomina?.filter((item) => item.estado_nomina === 'D')?.length}`,
      icon: <RedoOutlined />,
      color: '#efdbff',
    },
  ]

  return (
    <CustomSpin>
      <StyledLayout>
        <CustomCol xs={24}>
          <CustomRow justify={'center'}>
            <CustomRow justify={'space-between'}>
              <CustomCol xs={24}>
                <ConditionalComponent
                  condition={
                    getSessionInfo().privilegios === 1 ||
                    getSessionInfo().privilegios === 3
                  }
                >
                  <DynamicCard dataSources={dynamicCardDataSources} />
                </ConditionalComponent>
                <ConditionalComponent
                  condition={
                    getSessionInfo().privilegios === 2 ||
                    getSessionInfo().privilegios === 3
                  }
                >
                  <InfoCard dataSource={infoCardDataSources} />
                </ConditionalComponent>
              </CustomCol>
              {/* <ConditionalComponent
                condition={
                  getSessionInfo().privilegios === 1 ||
                  getSessionInfo().privilegios === 3
                }
              >
                <CustomCol xs={24}>
                  <PieChart
                    title={'Permisos'}
                    labels={labels}
                    data={barChartDataSourcePermissions}
                  />
                </CustomCol>
              </ConditionalComponent> */}

              {/* <ConditionalComponent
                condition={
                  getSessionInfo().privilegios === 1 ||
                  getSessionInfo().privilegios === 2 ||
                  getSessionInfo().privilegios === 3
                }
              >
                <CustomCol xs={24}>
                  <BarChart
                    title={'Rotación de empleados'}
                    labels={labels}
                    employees={buildDataSource(employee, 'fecha_contratacion')}
                    laidOff={buildDataSource(dataLaidOff, 'fecha_insercion')}
                    hired={buildDataSource(dataResignation, 'fecha_insercion')}
                  />
                </CustomCol>
              </ConditionalComponent> */}
            </CustomRow>
          </CustomRow>
        </CustomCol>
      </StyledLayout>
    </CustomSpin>
  )
}

export default Dashboard
