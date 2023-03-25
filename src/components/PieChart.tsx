import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'

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
  id?: string
}

const PieChart: React.FC<PieChartProps> = ({
  labels,
  data,
  id,
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
    <Pie
      data={datasets}
      options={options}
      id={id}
      style={{ height: '204.22px', maxHeight: '204.22px' }}
    />
  )
}

export default PieChart
