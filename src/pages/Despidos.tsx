import { Avatar } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getLaidOff, getTypeLayoffs } from '../slicers/employee/employee'
import { LayoffsType } from '../slicers/employee/types'
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

const Despidos = (): React.ReactElement => {
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const [searchCargo, setSearchCargo] = useState('')

  const { fetchingFromEmployee, dataLaidOff, dataTypeLayoffs } = useAppSelector(
    (state) => state.employee
  )

  const dataSource = useMemo(() => {
    return filterArray(
      ArrayOrderBy(
        searchInArray(dataLaidOff, ['nombres', 'doc_identidad'], search),
        'fecha_insercion',
        'asc'
      ),
      [searchCargo],
      ['tipo_razon']
    )
  }, [dataLaidOff, search, searchCargo])

  useEffect(() => {
    dispatch(getTypeLayoffs({}))
    dispatch(getLaidOff({}))
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
      dataIndex: 'tipo_razon',
      key: 'tipo_razon',
      title: 'Razón de despido',
    },
    {
      dataIndex: 'cesantia',
      key: 'cesantia',
      title: 'Cesantía',
      render: (text: string) => {
        return formatter({ value: text, type: 'currency' })
      },
    },
    {
      dataIndex: 'preaviso',
      key: 'preaviso',
      title: 'Preaviso',
      render: (text: string) => {
        return formatter({ value: text, type: 'currency' })
      },
    },
    {
      dataIndex: 'regalia',
      key: 'regalia',
      title: 'Regalía',
      render: (text: string) => {
        return formatter({ value: text, type: 'currency' })
      },
    },
    {
      dataIndex: 'total_prestaciones',
      key: 'total_prestaciones',
      title: 'Total prestaciones',
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

  const renderItem = (item: LayoffsType) => {
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
          description={`Razón del Despido: ${
            item.tipo_razon
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
                  <CustomTitle>Reporte de Despidos</CustomTitle>
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
                      placeholder={'Razón de despido'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchCargo('')}
                      onSelect={(value) => {
                        setSearchCargo(value)
                      }}
                      options={dataTypeLayoffs?.map((item) => {
                        return {
                          label: item.tipo_razon,
                          value: item.tipo_razon,
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
        columns={columns}
        title={'Reporte de Despidos'}
        dataSource={dataSource}
      />
    </>
  )
}

export default Despidos
