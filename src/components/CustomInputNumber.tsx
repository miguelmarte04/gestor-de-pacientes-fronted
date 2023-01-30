import React, { useContext, useState } from 'react'
import InputNumber, { InputNumberProps } from 'antd/lib/input-number'
import { CustomFormContext } from './CustomForm'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { InputRef } from 'antd'
import { formatMoneyNoDecimals } from '../utils/general'
import CustomInputGroup from './CustomInputGroup'
import CustomTooltip from './CustomTooltip'
import { AnyType } from '../constants/types'

type FormatType = 'money' | 'percent' | 'range'
export type CoinType = 'RD' | 'UE' | 'US'

export type InputFormat = {
  format: FormatType
  coin: CoinType
}

export type CustomInputNumberProps = Omit<InputNumberProps, 'type'> & {
  ref?: React.MutableRefObject<InputRef> | React.ForwardedRef<InputRef>
  format?: InputFormat
  width?: string | number
  tooltip?: React.ReactNode
  textAlign?: 'start' | 'end' | 'left' | 'center' | 'justify'
  alwaysAvailable?: boolean
  stringMode?: boolean
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = ({
  alwaysAvailable = false,
  autoComplete = 'off',
  bordered = true,
  className = '',
  disabled = false,
  format = { format: '', coin: '' },
  min = 0,
  precision = undefined,
  size = 'small',
  stringMode = false,
  style,
  textAlign = 'left',
  tooltip,
  width,
  ref,
  ...props
}): React.ReactElement => {
  const readOnly = useContext(CustomFormContext)?.readOnly
  const [maxValue, setMaxValue] = useState<number>()

  const regExp =
    Number(precision) > 2 || typeof precision === 'object'
      ? /\B(?=(\d{3})+(?!\d)+([^,])\.?)/g
      : /\B(?=(\d{3})+(?!\d)\.?)/g
  const formatter = (value: number | string) => {
    switch (format.format) {
      case 'money': {
        return {
          format: `${format.coin}$ ${value}`.replace(regExp, ','),
          parse: `${value}`
            .replace(`${format.coin?.[0]}`, '')
            .replace(`${format.coin?.[1]}`, '')
            .replace(/\$\s?|(,*)/g, ''),
        }
      }
      case 'percent': {
        setMaxValue(100)
        return {
          format: `${value}%`,
          parse: `${value}`.replace('%', ''),
        }
      }
      case 'range': {
        return {
          format: `${Math.trunc(Number(value))}`,
          parse: `${value}`.replace('%', ''),
        }
      }
      default:
        return {
          format: `${value}`,
          parse: `${value}`,
        }
    }
  }

  const commonProps: CustomInputNumberProps = {
    autoComplete,
    disabled: readOnly ? false : disabled,
    formatter: stringMode
      ? format.format
        ? (value: string) => formatMoneyNoDecimals(value) as AnyType
        : ('' as AnyType)
      : format.format
      ? (value: string) => formatter(value).format as AnyType
      : ('' as AnyType),
    max: maxValue,
    min,
    parser: format.format
      ? (value: string) => formatter(value).parse as AnyType
      : ('' as AnyType),
    precision: stringMode
      ? undefined
      : precision
      ? precision
      : format.format
      ? 2
      : undefined,
    stringMode: stringMode,
    readOnly: readOnly && !alwaysAvailable,
    size,
    ...props,
  }
  return tooltip ? (
    <CustomInputGroup
      className={`ant-input input-number-width-suffix ${
        !bordered && 'ant-input-borderless'
      }`}
      style={{
        width,
        backgroundColor: disabled ? '#f5f5f5' : undefined,
      }}
    >
      <InputNumber
        ref={ref as AnyType}
        className={`custom-input-number-text-align-${textAlign} ${className} ant-input-borderless`}
        bordered={false}
        style={{ marginRight: '1px', width, ...style }}
        {...commonProps}
      />
      <CustomTooltip title={tooltip}>
        <QuestionCircleOutlined style={{ color: '#40a9ff' }} />
      </CustomTooltip>
    </CustomInputGroup>
  ) : (
    <InputNumber
      ref={ref as AnyType}
      bordered={bordered}
      className={`${className} custom-input-number-text-align-${textAlign} ${className}`}
      style={{ width, ...style }}
      {...commonProps}
    />
  )
}

export default CustomInputNumber
