import { Select, SelectProps } from 'antd'
import { AnyType } from '../constants/types'
import { deleteSpecialCharacters } from '../utils/general'

interface CustomSelectProps extends SelectProps {
  width?: string | number
  deleteSpecialCharacter?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [],
  size = 'small',
  deleteSpecialCharacter = true,
  showSearch = true,
  width = '100%',
  ...props
}): React.ReactElement => {
  const handleFilterOption = (input: string, option: AnyType) => {
    return deleteSpecialCharacters(option?.label?.toString() as string)
      ?.toLowerCase()
      ?.includes(deleteSpecialCharacters(input)?.toLowerCase())
  }
  const handleOnChange = (value: string | number) => {
    props.value = deleteSpecialCharacter
      ? deleteSpecialCharacters(value?.toString())
      : value
  }
  return (
    <Select
      style={Object.assign({}, props.style, { width })}
      size={size}
      showSearch={showSearch}
      optionLabelProp="label"
      onChange={handleOnChange}
      filterOption={handleFilterOption}
      options={
        options
          ?.map((item) => ({
            ...item,
            label:
              Number(item?.label?.toString()?.length) >= 35
                ? item?.label?.toString()?.substring(0, 35) + '...'
                : item?.label,
          }))
          .unique('label') as never
      }
      {...props}
    />
  )
}

export default CustomSelect
