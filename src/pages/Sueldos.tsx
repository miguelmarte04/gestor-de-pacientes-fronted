import { Avatar } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getEmployee, getHistoryChange } from '../slicers/employee/employee'
import { EmployeeType } from '../slicers/employee/types'
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

const Sueldos = (): React.ReactElement => {
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const [searchCargo, setSearchCargo] = useState('')
  const [searchDepartamento, setSearchDepartamento] = useState('')
  const [searchEstadoCivil, setSearchEstadoCivil] = useState('')
  const [searchTipoNomina, setSearchTipoNomina] = useState('')
  const [searchSexo, setSearchSexo] = useState('')
  const { employee, fetchingFromEmployee, historyChange } = useAppSelector(
    (state) => state.employee
  )
  const { cargos, departments, civilState } = useAppSelector(
    (state) => state.general
  )

  const dataSource = useMemo(() => {
    return filterArray(
      ArrayOrderBy(
        searchInArray(
          employee?.filter((item) => item.estado === 'A'),
          ['nombres', 'doc_identidad'],
          search
        ),
        'fecha_nacimiento',
        'asc'
      ),
      [
        searchCargo,
        searchDepartamento,
        searchEstadoCivil,
        searchTipoNomina,
        searchSexo,
      ],
      ['cargo', 'id_departamento', 'id_estado_civil', 'id_tipo_nomina', 'sexo']
    )
  }, [
    employee,
    search,
    searchCargo,
    searchDepartamento,
    searchEstadoCivil,
    searchTipoNomina,
    searchSexo,
  ])

  useEffect(() => {
    dispatch(
      getEmployee({
        condition: {
          search: ' ',
        },
      })
    )
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
      title: 'Fecha de Nacimiento',
      dataIndex: 'fecha_nacimiento',
      key: 'fecha_nacimiento',
      render: (text: string) => moment(text).format('DD/MM/YYYY'),
    },

    {
      dataIndex: 'cargo',
      key: 'cargo',
      title: 'Cargo',
    },
    {
      dataIndex: 'fecha_contratacion',
      key: 'fecha_contratacion',
      title: 'Fecha de Contratación',
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
      dataIndex: 'sueldo',
      key: 'sueldo',
      title: 'Sueldo',
      render: (text: string) => {
        return formatter({ value: text, type: 'currency' })
      },
    },
  ]

  const renderItem = (item: EmployeeType) => {
    return (
      <CustomListItem>
        <CustomListItemMeta
          avatar={
            <Avatar
              size={'large'}
              src={item.imagen}
              icon={
                item.imagen ? null : (
                  <span
                    style={{
                      color: defaultTheme.primaryColor,
                      fontSize: 18,
                      fontFamily: 'comic sans',
                    }}
                  >
                    {getInitials(item.nombres, item.apellidos)}
                  </span>
                )
              }
            />
          }
          title={`${item.nombres} ${item.apellidos}`}
          description={`Cargo: ${item.cargo} Cedula: ${formatter({
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
                  <CustomTitle>Reporte de Empleados</CustomTitle>
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
                      placeholder={'Cargos'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchCargo('')}
                      onSelect={(value) => {
                        setSearchCargo(value)
                      }}
                      options={cargos?.map((item) => {
                        return {
                          label: item.cargo,
                          value: item.cargo,
                        }
                      })}
                    />
                    <CustomSelect
                      placeholder={'Departamentos'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchDepartamento('')}
                      onSelect={(value) => {
                        setSearchDepartamento(value)
                      }}
                      options={departments?.map((item) => {
                        return {
                          label: item.departamento,
                          value: item.id,
                        }
                      })}
                    />
                    <CustomSelect
                      placeholder={'Estado Civil'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchEstadoCivil('')}
                      onSelect={(value) => {
                        setSearchEstadoCivil(value)
                      }}
                      options={civilState?.map((item) => {
                        return {
                          label: item.estado_civil,
                          value: item.id,
                        }
                      })}
                    />
                    <CustomSelect
                      placeholder={'Tipo de Nomina'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchTipoNomina('')}
                      onSelect={(value) => {
                        setSearchTipoNomina(value)
                      }}
                      options={historyChange?.map((item) => {
                        return {
                          label: item.tipo_nomina,
                          value: item.id,
                        }
                      })}
                    />
                  </CustomRow>
                  <CustomRow
                    justify="space-between"
                    style={{ marginTop: '1%' }}
                  >
                    <CustomSelect
                      placeholder={'Sexo'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchSexo('')}
                      onSelect={(value) => {
                        setSearchSexo(value)
                      }}
                      options={[
                        {
                          label: 'Masculino',
                          value: 'M',
                        },
                        {
                          label: 'Femenino',
                          value: 'F',
                        },
                      ]}
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
        title={'Reporte de Sueldos de Empleados'}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  )
}

export default Sueldos
