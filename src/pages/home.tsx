import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import CustomRow from '../components/CustomRow'
import { getDataInfoEmpresa } from '../utils/session'
import { InfoEmpresaType } from '../slicers/general'

const Home = (): React.ReactElement => {
  const [getDataEmpresa, setGetDataEmpresa] = useState<InfoEmpresaType>()

  useEffect(() => {
    setGetDataEmpresa(getDataInfoEmpresa())
  }, [])

  return (
    <CustomRow justify={'center'} style={{ marginTop: '40px' }}>
      <Image
        src={getDataEmpresa?.logo}
        alt="Logo"
        preview={false}
        width={'50%'}
      />
    </CustomRow>
  )
}
export default Home
