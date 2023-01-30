import React from 'react'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { CheckOutlined, StopOutlined } from '@ant-design/icons'
import { customModalButtonProps } from '../utils/general'
const CustomModal: React.FC<ModalProps> = ({
  bodyStyle = {},
  cancelText = 'Cancelar',
  cancelButtonProps = {
    icon: <StopOutlined className="disabledColor" />,
    ...customModalButtonProps,
  },
  okButtonProps = {
    icon: <CheckOutlined />,
    ...customModalButtonProps,
  },
  centered = true,
  closable = true,
  confirmLoading = false,
  destroyOnClose = true,
  forceRender = false,
  mask = true,
  maskClosable = true,
  maskStyle = {},
  okText = 'Aceptar',
  okType = 'primary',
  visible = false,
  width = 520,
  zIndex = 1000,
  ...props
}): React.ReactElement => {
  React.useEffect(() => {
    !visible && Modal.destroyAll()
  }, [visible])

  return (
    <Modal
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps}
      bodyStyle={bodyStyle}
      cancelText={cancelText}
      centered={centered}
      closable={closable}
      confirmLoading={confirmLoading}
      destroyOnClose={destroyOnClose}
      forceRender={forceRender}
      mask={mask}
      maskClosable={maskClosable}
      maskStyle={maskStyle}
      okText={okText}
      okType={okType}
      visible={visible}
      width={width}
      zIndex={zIndex}
      {...props}
    >
      {props.children}
    </Modal>
  )
}

export default CustomModal
