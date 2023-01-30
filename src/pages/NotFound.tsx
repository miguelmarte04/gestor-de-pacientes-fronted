import { Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import { PATH_MAIN } from '../constants/Routes'

const NotFound: React.FC = (): React.ReactElement => {
  const navigate = useNavigate()

  return (
    <Result
      status={'404'}
      title={'404'}
      subTitle={'Lo sentimos, la pagina que ha visitado no existe.'}
      extra={
        <CustomButton
          onClick={() => navigate(PATH_MAIN, { replace: true })}
          type={'link'}
        >
          Volver a la pagina de inicio
        </CustomButton>
      }
    />
  )
}

export default NotFound
