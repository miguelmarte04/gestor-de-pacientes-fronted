import React from 'react'
import { Form } from 'antd'
import { FormItemProps } from 'antd/lib/form'
import { AnyType } from '../constants/types'

const { Item } = Form

export type CustomFormItemProps = FormItemProps & {
  ref?: React.MutableRefObject<FormItemProps>
}

export const CustomFormItemContext = React.createContext<CustomFormItemProps>(
  null as AnyType
)

const CustomFormItem: React.FC<CustomFormItemProps> = ({
  colon = true,
  hasFeedback = false,
  labelAlign = 'right' as FormItemProps['labelAlign'],
  noStyle = false,
  required = false,
  trigger = 'onChange',
  validateFirst = false,
  validateTrigger = 'onChange',
  valuePropName = 'value',
  ...props
}): React.ReactElement => {
  const checkRequiredRule = () =>
    props.rules
      ? !!props.rules?.find((value: AnyType) => value['required'])
      : undefined

  return (
    <CustomFormItemContext.Provider value={{ ...props }}>
      <Item
        colon={colon}
        hasFeedback={hasFeedback}
        labelAlign={labelAlign}
        noStyle={noStyle}
        style={{ margin: 0, padding: 0 }}
        required={checkRequiredRule() || required}
        trigger={trigger}
        validateFirst={validateFirst}
        validateTrigger={validateTrigger}
        valuePropName={valuePropName}
        {...props}
      >
        {props.children}
      </Item>
    </CustomFormItemContext.Provider>
  )
}

export default CustomFormItem
