import { Result } from 'antd'
import React from 'react'

const Custom404 = (): React.ReactElement => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, Este modulo no fue encontrado"
    />
  )
}
export default Custom404
