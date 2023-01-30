import {
  CheckCircleOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Modal } from 'antd'

import { ModalFuncProps } from 'antd/lib/modal'
import { customModalButtonProps } from '../utils/general'
import { systemMessage } from '../constants/general'

export const CustomModalConfirmation = (props: ModalFuncProps): void => {
  Modal.confirm({
    visible: false,
    title: 'Confirmar',
    content: 'content: Alguna descripcion',
    closable: true,
    cancelButtonProps: {
      ...customModalButtonProps,
      icon: <StopOutlined className="disabledColor" />,
    },
    okButtonProps: {
      ...customModalButtonProps,
      icon: <CheckOutlined />,
    },
    ...props,
  })
}
export const CustomModalError = (
  props: ModalFuncProps & { hideCancelButton?: boolean }
): void => {
  Modal.error({
    title: 'Error',
    content: 'A ocurrido un error.',
    okButtonProps: { icon: <CheckOutlined />, ...customModalButtonProps },
    cancelButtonProps: {
      style: { display: props.hideCancelButton ? 'none' : '' },
    },
    ...props,
  })
}
export const CustomModalInfo = (
  props: ModalFuncProps & { hideCancelButton?: boolean }
): void => {
  Modal.info({
    title: 'Información',
    content: 'Mensaje de información',
    okButtonProps: {
      icon: <CheckOutlined />,
      ...customModalButtonProps,
    },
    cancelButtonProps: {
      style: { display: props.hideCancelButton ? 'none' : '' },
    },
    ...props,
  })
}
export const CustomModalSuccess = (
  props: ModalFuncProps & { hideCancelButton?: boolean }
): void => {
  Modal.success({
    title: systemMessage.successFullOperation,
    icon: <CheckCircleOutlined />,
    content: 'Proceso completado con éxito.',
    okButtonProps: {
      icon: <CheckOutlined />,
      ...customModalButtonProps,
    },
    cancelButtonProps: {
      style: { display: props.hideCancelButton ? 'none' : '' },
    },
    ...props,
  })
}
export const CustomModalWarning = (
  props: ModalFuncProps & { hideCancelButton?: boolean }
): void => {
  Modal.warning({
    title: 'Advertencia',
    icon: <ExclamationCircleOutlined />,
    okButtonProps: {
      icon: <CheckOutlined />,
      ...customModalButtonProps,
    },
    cancelButtonProps: {
      style: { display: props.hideCancelButton ? 'none' : '' },
    },
    content: 'Advertencia',
    ...props,
  })
}
