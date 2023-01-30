import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Skeleton } from 'antd'
import CustomInput, { CustomInputProps } from './CustomInput'
import CustomSpin from './CustomSpin'
import { CustomFormContext } from './CustomForm'
import useSearch from '../hooks/useSearch'
import CustomMenu from './CustomMenu'
import CustomMenuItem from './CustomMenuItem'
import CustomRow from './CustomRow'
import CustomCol from './CustomCol'
import CustomTooltip from './CustomTooltip'
import CustomDropdown from './CustomDropdown'
import CustomSearch from './CustomSearch'
import { format } from '../constants/general'
import { EmployeeType, getEmployee } from '../slicers/employee'
import { getOnlyUnique, truncate } from '../utils/general'
import { CustomFormItemContext } from './CustomFormItem'
import { useAppDispatch, useAppSelector } from '../hooks'

type ContextValue = {
  employeeSelected?: EmployeeType
  setEmployeeSelected?: (employee: React.SetStateAction<EmployeeType>) => void
  inputValue?: string
  setInputValue?: (value: React.SetStateAction<string>) => void
}

export const SearchEmployeeContext = createContext<ContextValue>({})

export type MenuInfo = {
  key?: React.Key
}

export type MenuClickEventHandler = (
  item: MenuInfo,
  employee?: EmployeeType & { key?: React.Key }
) => void

type CustomProps = Omit<CustomInputProps, 'onSelect' | 'onBlur'> & {
  trigger?: ('contextMenu' | 'click' | 'hover')[]
  isEditing?: boolean
  cleanOnFinish?: boolean
  exclude?: string
  width?: number | string
  setValue?: 'name' | 'doc' | 'id'
  pageSize?: number
  showResult?: boolean
  showInitialValue?: boolean
  initialValue?: React.Key
  typeofSearchValue?: 'ID' | 'DOCUMENTOIDENTIDAD' | ''
  rol?: string
  onFocusout?: (event: React.FocusEvent<HTMLInputElement>) => void
  onSelect?: MenuClickEventHandler
  onSearch?: (value?: React.Key) => void
  onClear?: () => void
}

const CustomSearchEmployee: React.FC<CustomProps> = ({
  trigger = ['click'],
  isEditing = false,
  disabled = false,
  cleanOnFinish = false,
  width = '100%',
  pageSize = 15,
  showInitialValue = false,
  initialValue = ' ',
  typeofSearchValue = '',
  setValue = 'name',
  onFocusout,
  onClear,
  onSelect,
  onSearch,
  ...props
}): React.ReactElement => {
  const dispatch = useAppDispatch()
  const ctx = useContext(CustomFormContext)
  const name = useContext(CustomFormItemContext)?.name || 'SEARCH'
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>(
    {} as EmployeeType
  )
  const [inputValue, setInputValue] = useState<string>('')
  const [dataSource, setDataSource] =
    useState<(EmployeeType & { key?: string })[]>()
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [searchValue, setSearchValue] = useState<string>()
  const [delay, setDelay] = useState<number>(0)
  const debounce = useSearch(searchValue, delay)
  const inputId = `${ctx?.name}_${name || ''}`

  const { employee, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )

  const handleOnSelect = (item: MenuInfo) => {
    const curDataSource = dataSource?.find(
      (curItem) => `${curItem.id}` === `${item.key}`
    )
    if (curDataSource) {
      setEmployeeSelected(curDataSource)
      if (typeof onSelect === 'function') onSelect(item, curDataSource)
    }
  }

  useEffect(() => {
    if (employee?.length > 0) {
      const data = getOnlyUnique(employee ?? [])
      setDataSource(data || [])
    }
  }, [employee, fetchingFromEmployee])

  useEffect(() => {
    employeeSelected &&
      setInputValue(cleanOnFinish ? '' : employeeSelected?.nombres)
    employeeSelected &&
      ctx?.form?.setFields([
        {
          name: name,
          value: cleanOnFinish
            ? ''
            : employeeSelected?.nombres
            ? `${employeeSelected?.nombres} ${employeeSelected?.apellidos}`
            : undefined,
        },
      ])
  }, [employeeSelected])

  const handleInitialValue = useCallback(() => {
    const person = employee?.find((item) => item.id === initialValue)

    person &&
      ctx?.form?.setFields([
        {
          name: name,
          value: person?.nombres,
        },
      ])
  }, [initialValue, employee])

  const handleSearchInitialValue = useCallback(() => {
    showInitialValue &&
      dispatch(
        getEmployee({
          condition: {
            search: initialValue,
            type: 'search',
          },
        })
      )
  }, [showInitialValue, initialValue, typeofSearchValue])

  useEffect(handleSearchInitialValue, [handleSearchInitialValue])

  useEffect(handleInitialValue, [handleInitialValue])

  const handleEventListener = useCallback(() => {
    const element = document.getElementById(inputId)

    element?.addEventListener('keydown', (e: Event) => {
      const event = e as unknown as React.ChangeEvent<HTMLInputElement>
      setDelay(800)
      setSearchValue(event.target.defaultValue)
    })
  }, [])

  useEffect(handleEventListener, [handleEventListener])

  const handleSearchEmployee = useCallback(() => {
    if (debounce) {
      dispatch(
        getEmployee({
          condition: {
            search: debounce.replace(/-/gi, ''),
            type: 'search',
          },
        })
      )
    }
    if (typeof onSearch === 'function') onSearch(debounce)
  }, [debounce])

  useEffect(handleSearchEmployee, [handleSearchEmployee])

  const handleOnSearch = (value: string) => {
    setDelay(0)
    setSearchValue(value)
    cleanOnFinish && setInputValue('')
  }

  const handleOnClick = (item: MenuInfo) => {
    setDropdownVisible(false)
    if (item.key && dataSource?.length) {
      const employeeSource = dataSource?.find((value) => value.id === item.key)

      handleOnSelect(item)
      !cleanOnFinish &&
        ctx?.form?.setFields([
          {
            name: name,
            errors: undefined,
            value:
              setValue === 'doc'
                ? employeeSource?.doc_identidad
                : setValue === 'name'
                ? employeeSource?.nombres
                : employeeSource?.id,
          },
        ])
    }
  }

  const menu = (
    <CustomMenu onClick={handleOnClick}>
      {dataSource !== undefined && dataSource?.length > 0 ? (
        truncate(dataSource, pageSize)?.map((item: EmployeeType) => (
          <CustomMenuItem key={item.id} style={{ padding: '4px' }}>
            <CustomTooltip title={`${item.nombres} ${item.apellidos}`}>
              <CustomRow justify={'space-around'}>
                <CustomCol
                  xs={7}
                  style={{
                    borderRight: '1px solid #d9d9d9',
                  }}
                >
                  {format({
                    value: item.doc_identidad,
                    type: 'cedula',
                  })}
                </CustomCol>
                <CustomCol
                  xs={16}
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {`${item.nombres} ${item.apellidos}`}
                </CustomCol>
              </CustomRow>
            </CustomTooltip>
          </CustomMenuItem>
        ))
      ) : (
        <CustomMenuItem className={'custom-ant-menu-item'} key={0}>
          <CustomSpin spinning={fetchingFromEmployee}>
            <CustomRow
              justify={'center'}
              style={{
                height: '150px',
              }}
            >
              {fetchingFromEmployee ? (
                <Skeleton active />
              ) : (
                <>
                  <InboxOutlined
                    style={{
                      fontSize: '5em',
                      color: '#d9d9d9',
                    }}
                  />
                  <span
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      color: '#9d9d9d',
                      marginTop: '-10%',
                    }}
                  >
                    No hay datos
                  </span>
                </>
              )}
            </CustomRow>
          </CustomSpin>
        </CustomMenuItem>
      )}
    </CustomMenu>
  )

  return (
    <div id={'search_box'} style={{ width: width }}>
      {disabled || ctx?.readOnly ? (
        <CustomInput
          readOnly={ctx?.readOnly}
          disabled={ctx?.readOnly ? false : disabled}
          value={inputValue}
          {...props}
        />
      ) : (
        <>
          <CustomSearch
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value)
              setSearchValue(event.target.value)
              setDelay(500)
              if (!event.target.value?.length)
                if (typeof onClear === 'function') onClear()
            }}
            onSearch={(value) => handleOnSearch(value)}
            onFocus={() => setDropdownVisible(true)}
            onClick={() => setDropdownVisible(true)}
            onBlur={(e) => {
              setTimeout(() => {
                setDropdownVisible(false)
              }, 100)
              if (typeof onFocusout === 'function') onFocusout(e)
            }}
            {...props}
          />
          <CustomDropdown
            overlay={menu}
            overlayStyle={isEditing ? { display: 'none' } : {}}
            trigger={trigger}
            visible={dropdownVisible}
          >
            <CustomCol xs={24} />
          </CustomDropdown>
        </>
      )}
    </div>
  )
}

export default CustomSearchEmployee
