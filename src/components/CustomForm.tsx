import React, { useRef } from 'react'
import { Form, FormInstance, FormProps } from 'antd'
import { validateMessages } from '../constants/general'
import { AnyType } from '../constants/types'

type CustomFormProps = FormProps & {
  uppercase?: boolean
  readOnly?: boolean
  children?: React.ReactNode | React.ReactNode[]
}

export const CustomFormContext = React.createContext<CustomFormProps>({})

const CustomForm: React.FC<CustomFormProps> = ({
  autoComplete = 'off',
  name = 'form',
  readOnly,
  ...props
}): React.ReactElement => {
  const formRef = useRef<FormInstance>()
  const context = React.useContext(CustomFormContext)

  return (
    <CustomFormContext.Provider
      value={{
        name,
        readOnly: context?.readOnly ? context?.readOnly : readOnly,
        ...props,
      }}
    >
      <Form
        id={name}
        name={name}
        ref={formRef as AnyType}
        autoComplete={autoComplete}
        validateMessages={validateMessages}
        {...props}
      >
        {props.children}
      </Form>
    </CustomFormContext.Provider>
  )
}

export default CustomForm
