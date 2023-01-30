import React from 'react'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import CustomCard from './CustomCard'
import CustomDivider from './CustomDivider'
import CustomTitle from './CustomTitle'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineChartProps {
  labels: string[]
  total: number[]
  discount: number[]
  neto: number[]
  title: string
}

const LineChart: React.FC<LineChartProps> = ({
  labels,
  total,
  discount,
  neto,
  title,
}): React.ReactElement => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  }

  const dataSource = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: [...total],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Descuentos',
        data: [...discount],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Neto',
        data: [...neto],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  }

  return (
    <CustomCard>
      <CustomDivider>
        <CustomTitle>{title}</CustomTitle>
      </CustomDivider>
      <Line
        style={{ height: '304.22px', maxHeight: '304.22px' }}
        options={options}
        data={dataSource}
      />
    </CustomCard>
  )
}

export default LineChart
