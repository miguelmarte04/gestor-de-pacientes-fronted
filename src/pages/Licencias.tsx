import { Avatar } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  getHistoryChange,
  getLicences,
  getTypeLicences,
} from '../slicers/employee/employee'
import { PermissionsType } from '../slicers/employee/types'
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
import {
  getCargos,
  getCivilState,
  getDepartments,
} from '../slicers/general/general'

const Licencias = (): React.ReactElement => {
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const [searchCargo, setSearchCargo] = useState('')

  const { fetchingFromEmployee, dataLicences, dataTypeLicences } =
    useAppSelector((state) => state.employee)

  const dataSource = useMemo(() => {
    return filterArray(
      ArrayOrderBy(
        searchInArray(
          dataLicences?.filter((item) => item.estado === 'A'),
          ['nombres', 'doc_identidad'],
          search
        ),
        'fecha_insercion',
        'asc'
      ),
      [searchCargo],
      ['tipo_licencia']
    )
  }, [dataLicences, search, searchCargo])

  useEffect(() => {
    dispatch(getLicences({}))
    dispatch(getTypeLicences({}))
    dispatch(getCargos({}))
    dispatch(getDepartments({}))
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
      dataIndex: 'tipo_licencia',
      key: 'tipo_licencia',
      title: 'Tipo de licencia',
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
      dataIndex: 'sexo',
      key: 'sexo',
      title: 'Sexo',
      render: (text: string) => {
        return text === 'M' ? 'Masculino' : 'Femenino'
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

  const renderItem = (item: PermissionsType) => {
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
          description={`Tipo Licencia: ${
            item.tipo_licencia
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
                  <CustomTitle>Reporte de Licencias</CustomTitle>
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
                      placeholder={'Tipo Licencia'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchCargo('')}
                      onSelect={(value) => {
                        setSearchCargo(value)
                      }}
                      options={dataTypeLicences?.map((item) => {
                        return {
                          label: item.tipo_licencia,
                          value: item.tipo_licencia,
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
        title={'Reporte de Licencias'}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  )
}

export default Licencias
