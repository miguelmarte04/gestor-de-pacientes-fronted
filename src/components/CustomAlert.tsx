import React from 'react'
import { Alert, AlertProps } from 'antd'

interface CustomAlertProps extends AlertProps {
  children?: React.ReactNode | React.ReactNode[]
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  ...props
}): React.ReactElement => {
  return <Alert {...props}>{props.children}</Alert>
}

export default CustomAlert
