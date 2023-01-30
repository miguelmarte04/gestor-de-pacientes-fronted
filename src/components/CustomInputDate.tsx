import { Moment } from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'
import moment from 'moment'
import { showNotification } from '../utils/general'
import { maskedInput } from '../constants/general'
import { CustomFormContext } from './CustomForm'
import { CustomFormItemContext } from './CustomFormItem'
import { AnyType } from '../constants/types'
export type CustomProps = MaskedInputProps &
  Readonly<MaskedInputProps> & {
    alwaysAvailable?: boolean
    bordered?: boolean
    maxDate?: Moment
    minDate?: Moment & { _d?: string }
    onBlear?: (event: React.FocusEvent<HTMLInputElement>) => void
    prefix?: string & React.ReactNode
    tooltip?: string
    validate?: boolean
    width?: string | number
  }

const CustomInputDate: React.FC<Omit<CustomProps, 'onBlur'>> = ({
  autoComplete = 'off',
  bordered = true,
  className = '',
  guide = true,
  style,
  maxDate,
  minDate = moment().subtract(100, 'years'),
  validate = true,
  width,
  ...props
}): React.ReactElement => {
  const commonProps = {
    autoComplete: autoComplete,
    guide: guide,
    className: `ant-input ant-input-sm ${
      !bordered ? 'ant-input-borderless' : ''
    }
        `.concat(className),

    placeholder: 'DD/MM/AAAA',
    style: { width, ...style },
    ...props,
  }

  const ctx = useContext(CustomFormContext)
  const { name: inputName } = useContext(CustomFormItemContext)
  const [validation, setValidation] = useState<string>(
    ctx?.form?.getFieldValue([inputName as AnyType]) || ''
  )
  useEffect(() => {
    if (inputName)
      ctx?.form?.setFields([
        {
          name: inputName,
          value: validation,
        },
      ])
  }, [validation])

  const isValidDate = (value: string) => {
    const year = value.split('/')[2]
    const date = moment(value, 'DD/MM/YYYY', true).isValid()
    if (!(date && year?.length === 4 && Number(year))) {
      showNotification({
        title: 'Error',
        description: 'Fecha no válida',
        type: 'error',
      })
      setValidation('')
    } else {
      if (
        maxDate !== undefined &&
        moment(value, 'DD/MM/YYYY').isAfter(maxDate)
      ) {
        showNotification({
          title: 'Error',
          description: 'Fecha no válida (mayor a la máxima permitida)',
          type: 'error',
        })
        setValidation('')
      }
      if (
        minDate !== undefined &&
        moment(value, 'DD/MM/YYYY').isBefore(minDate)
      ) {
        showNotification({
          title: 'Error',
          description: 'Fecha no válida (menor a la mínima permitida)',
          type: 'error',
        })
        setValidation('')
      }
    }
  }
  return validate ? (
    <MaskedInput
      {...commonProps}
      value={validation}
      mask={maskedInput.date}
      onChange={(event) => {
        setValidation(event.target.value)
      }}
      onBlur={(event) => {
        if (event.target.value?.length === 10) {
          isValidDate(event.target.value)
        }
      }}
    >
      {props.children}
    </MaskedInput>
  ) : (
    <MaskedInput {...commonProps} mask={maskedInput.date}>
      {props.children}
    </MaskedInput>
  )
}

export default CustomInputDate
