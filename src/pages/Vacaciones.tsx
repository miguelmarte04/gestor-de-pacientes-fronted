import { Avatar } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getHistoryChange, getHolidays } from '../slicers/employee/employee'
import { HolidaysType } from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomFormItem from '../components/CustomFormItem'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomTitle from '../components/CustomTitle'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import {
  ArrayOrderBy,
  filterArray,
  formatter,
  searchInArray,
} from '../utils/general'
import moment from 'moment'
import CustomButton from '../components/CustomButton'
import { PrinterOutlined } from '@ant-design/icons'
import { useReactToPrint } from 'react-to-print'
import PrintTemplate from '../components/PrintTemplate'
import CustomCollapse from '../components/CustomCollapse'
import CustomPanel from '../components/CustomPanel'
import CustomSelect from '../components/CustomSelect'
import { getCivilState } from '../slicers/general/general'

const Vacaciones = (): React.ReactElement => {
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const [searchCargo, setSearchCargo] = useState('')

  const { fetchingFromEmployee, dataHolidays } = useAppSelector(
    (state) => state.employee
  )

  const dataSource = useMemo(() => {
    return filterArray(
      ArrayOrderBy(
        searchInArray(
          dataHolidays?.filter((item) => item.estado === 'A'),
          ['nombres', 'doc_identidad'],
          search
        ),
        'fecha_insercion',
        'asc'
      ),
      [searchCargo],
      ['estado_vacaciones']
    )
  }, [dataHolidays, search, searchCargo])

  useEffect(() => {
    dispatch(getHolidays({ condition: { estado: 'A' } }))

    dispatch(
      getCivilState({
        condition: {},
      })
    )
    dispatch(
      getHistoryChange({
        condition: {
          id: 1,
          tipo: 'tipos_nominas',
        },
      })
    )
  }, [])

  const componentRef = useRef<HTMLDivElement>()
  const [fetch, setFetch] = useState(false)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: '',
    onAfterPrint: () => setFetch(false),
    onBeforePrint: () => setFetch(true),
    bodyClass: 'print-body',
    pageStyle: 'print-page',
  })

  const estados_vacaciones = [
    {
      label: 'Generadas',
      value: 'G',
    },
    {
      label: 'Tomadas',
      value: 'T',
    },
  ]

  const handlePrintData = () => {
    setFetch(true)
    handlePrint()
  }

  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
  }

  const columns = [
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
    },
    {
      dataIndex: 'doc_identidad',
      key: 'doc_identidad',
      title: 'Cédula',
      render: (text: string) => {
        return formatter({ value: text, type: 'identity_doc' })
      },
    },

    {
      dataIndex: 'estado_vacaciones',
      key: 'estado_vacaciones',
      title: 'Estado de vacaciones',
      render: (text: string) =>
        estados_vacaciones?.find((item) => item.value === text)?.label,
    },
    {
      dataIndex: 'fecha_inicio',
      key: 'fecha_inicio',
      title: 'Fecha de inicio',
      render: (text: string) => {
        return moment(text).format('DD/MM/YYYY')
      },
    },
    {
      dataIndex: 'fecha_fin',
      key: 'fecha_fin',
      title: 'Fecha de fin',
      render: (text: string) => {
        return moment(text).format('DD/MM/YYYY')
      },
    },
    {
      dataIndex: 'sueldo_vacaciones',
      key: 'sueldo_vacaciones',
      title: 'Sueldo de vacaciones',
      render: (text: string) => {
        return formatter({ value: text, type: 'currency' })
      },
    },
    {
      dataIndex: 'fecha_insercion',
      key: 'fecha_insercion',
      title: 'Fecha de inserción',
      render: (text: string) => {
        return moment(text).format('DD/MM/YYYY')
      },
    },
  ]

  const renderItem = (item: HolidaysType) => {
    return (
      <CustomListItem>
        <CustomListItemMeta
          avatar={
            <Avatar
              size={'large'}
              icon={
                <span
                  style={{
                    color: defaultTheme.primaryColor,
                    fontSize: 18,
                    fontFamily: 'comic sans',
                  }}
                >
                  {getInitials(item.nombres, item.nombres)}
                </span>
              }
            />
          }
          title={`${item.nombres} ${item.apellidos}`}
          description={`Estado Vacaciones: ${
            estados_vacaciones?.find(
              (item2) => item.estado_vacaciones === item2.value
            )?.label
          } Cedula: ${formatter({
            value: item.doc_identidad,
            type: 'identity_doc',
          })} `}
        />
      </CustomListItem>
    )
  }

  return (
    <>
      <CustomLayoutBoxShadow>
        <CustomSpin spinning={fetchingFromEmployee || fetch}>
          <CustomRow justify={'end'}>
            <CustomCol xs={24}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Reporte de Vacaciones</CustomTitle>
                </CustomDivider>

                <CustomCol xs={24} md={12} />

                <CustomCol xs={24} md={12}>
                  <CustomRow justify={'end'} gutter={[10, 0]}>
                    <CustomCol xs={20}>
                      <CustomFormItem noStyle name={'SEARCH'}>
                        <CustomSearch
                          className={'search'}
                          placeholder={
                            'Buscar por nombre o documento de identidad'
                          }
                          onChange={(e) => {
                            setSearch(e.target.value)
                          }}
                        />
                      </CustomFormItem>
                    </CustomCol>
                  </CustomRow>
                </CustomCol>
              </CustomRow>
              <CustomCollapse style={{ width: '100%', marginTop: '2%' }}>
                <CustomPanel
                  key={'1'}
                  header={<CustomTitle>Filtros </CustomTitle>}
                >
                  <CustomRow justify="space-between">
                    <CustomSelect
                      placeholder={'Estado de Vacaciones'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchCargo('')}
                      onSelect={(value) => {
                        setSearchCargo(value)
                      }}
                      options={estados_vacaciones?.map((item) => {
                        return {
                          label: item?.label,
                          value: item?.value,
                        }
                      })}
                    />
                  </CustomRow>
                </CustomPanel>
              </CustomCollapse>
              <CustomList
                header={
                  <CustomRow justify="end">
                    <CustomButton
                      type={'primary'}
                      icon={<PrinterOutlined />}
                      onClick={handlePrintData}
                    >
                      Imprimir
                    </CustomButton>
                  </CustomRow>
                }
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                renderItem={renderItem}
              />
            </CustomCol>
          </CustomRow>
        </CustomSpin>
      </CustomLayoutBoxShadow>
      <PrintTemplate
        ref={componentRef}
        title={'Reporte de Vacaciones'}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  )
}

export default Vacaciones
