import React from 'react'
import { Popconfirm } from 'antd'
import { PopconfirmProps } from 'antd/lib/popconfirm'
import { CheckOutlined, StopOutlined } from '@ant-design/icons'
import { customModalButtonProps } from '../utils/general'
const CustomPopConfirm: React.FC<PopconfirmProps> = ({
  cancelButtonProps = {
    ...customModalButtonProps,
    icon: <StopOutlined className="disabledColor" />,
  },
  okButtonProps = {
    ...customModalButtonProps,
    icon: <CheckOutlined />,
  },
  ...props
}): React.ReactElement => (
  <Popconfirm
    okButtonProps={okButtonProps}
    cancelButtonProps={cancelButtonProps}
    {...props}
  />
)

export default CustomPopConfirm
