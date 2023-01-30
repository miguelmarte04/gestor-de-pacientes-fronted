import React from 'react'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import CustomCard from './CustomCard'
import CustomDivider from './CustomDivider'
import CustomTitle from './CustomTitle'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  labels: string[]
  employees: number[]
  laidOff: number[]
  hired: number[]
  title: string
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  employees,
  laidOff,
  hired,
  title,
}): React.ReactElement => {
  const dataSource = {
    labels,
    datasets: [
      {
        label: 'Contratados',
        data: [...employees],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Despedidos',
        data: [...laidOff],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Renunciados',
        data: [...hired],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  }
  return (
    <CustomCard style={{ margin: '10px 0' }}>
      <CustomDivider>
        <CustomTitle>{title}</CustomTitle>
      </CustomDivider>
      <Bar
        style={{ height: '304.22px', maxHeight: '304.22px' }}
        options={options}
        data={dataSource}
      />
    </CustomCard>
  )
}

export default BarChart
