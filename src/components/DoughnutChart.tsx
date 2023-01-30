import React from 'react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import CustomCard from './CustomCard'
import CustomDivider from './CustomDivider'
import CustomTitle from './CustomTitle'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
  labels: string[]
  data: number[]
  colors: string[]
  title: string
  style?: React.CSSProperties
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  labels,
  title,
  data,
  colors,
  style,
}): React.ReactElement => {
  const dataSource = {
    labels,
    datasets: [
      {
        label: 'Monto',
        data,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  }

  return (
    <CustomCard style={{ margin: '10px 0', ...style }}>
      <CustomDivider>
        <CustomTitle>{title}</CustomTitle>
      </CustomDivider>
      <Doughnut
        style={{ height: '304.22px', maxHeight: '304.22px' }}
        data={dataSource}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset?.label || ''
                  const value = `${context.parsed ?? 0}`.replace(
                    /\B(?=(\d{3})+(?!\d)\.?)/g,
                    ','
                  )

                  return `${label}: RD$ ${value}`
                },
                footer: (context) => {
                  const total = context?.reduce(
                    (acc, cur) => acc + (cur.parsed ?? 0),
                    0
                  )

                  return `Total: RD$ ${total}`
                },
              },
            },
          },
        }}
      />
    </CustomCard>
  )
}

export default DoughnutChart
