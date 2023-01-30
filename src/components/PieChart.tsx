import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import CustomCard from './CustomCard'
import CustomDivider from './CustomDivider'
import CustomTitle from './CustomTitle'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
    },
  },
}

interface PieChartProps {
  labels: string[]
  data: number[]
  title: string
}

const PieChart: React.FC<PieChartProps> = ({
  labels,
  data,
  title,
}): React.ReactElement => {
  const datasets = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data: [...data],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <CustomCard style={{ margin: '10px 0' }}>
      <CustomDivider>
        <CustomTitle>{title}</CustomTitle>
      </CustomDivider>
      <Pie
        data={datasets}
        options={options}
        style={{ maxHeight: '304.22px' }}
      />
    </CustomCard>
  )
}

export default PieChart
