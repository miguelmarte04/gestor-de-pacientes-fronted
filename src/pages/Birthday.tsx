import { Avatar } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getEmployee } from '../slicers/employee/employee'
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
import { ArrayOrderBy, searchInArray } from '../utils/general'
import moment from 'moment'
import CustomButton from '../components/CustomButton'
import { PrinterOutlined } from '@ant-design/icons'
import CustomRadioGroup from '../components/CustomRadioGroup'
import CustomRadio from '../components/CustomRadio'
import CustomSelect from '../components/CustomSelect'
import { useReactToPrint } from 'react-to-print'
import PrintTemplate from '../components/PrintTemplate'

const listaMeses = [
  { value: '1', label: 'Enero' },
  { value: '2', label: 'Febrero' },
  { value: '3', label: 'Marzo' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Mayo' },
  { value: '6', label: 'Junio' },
  { value: '7', label: 'Julio' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
]

const Birthday = (): React.ReactElement => {
  const dispatch = useAppDispatch()

  const [stateFilter, setStateFilter] = useState<string>('P')
  const [search, setSearch] = useState('')
  const [mesSeleccionado, setMesSeleccionado] = useState<string>(
    moment().format('M')
  )
  const { employee, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )

  const dataSource = useMemo(() => {
    return ArrayOrderBy(
      searchInArray(
        employee?.filter((item) => item.estado === 'A'),
        ['nombres', 'doc_identidad'],
        search
      ),
      'fecha_nacimiento',
      'asc'
    )
      ?.filter((item) => {
        return stateFilter === 'T'
          ? item
          : moment(
              moment(item?.fecha_nacimiento).format('DD/MM/YYYY'),
              'DD/MM/YYYY'
            ).isSameOrAfter(moment().format('YYYY-MM-DD'))
      })
      ?.filter((item) => {
        return mesSeleccionado === ''
          ? item
          : moment(item?.fecha_nacimiento).format('MM') === mesSeleccionado
      })
  }, [employee, search, stateFilter, mesSeleccionado])

  useEffect(() => {
    dispatch(
      getEmployee({
        condition: {
          search: ' ',
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
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
      render: (text: string) => {
        return text === 'M' ? 'Masculino' : 'Femenino'
      },
    },
    {
      title: 'Cargo',
      dataIndex: 'cargo',
      key: 'cargo',
    },
    {
      title: 'Fecha de Nacimiento',
      dataIndex: 'fecha_nacimiento',
      key: 'fecha_nacimiento',
      render: (text: string) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Edad',
      dataIndex: 'fecha_nacimiento',
      key: 'fecha_nacimiento',
      render: (text: string) => `${moment().diff(moment(text), 'years')} años`,
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
          description={`${moment(item.fecha_nacimiento).format(
            'DD MMMM'
          )} del ${moment().format('YYYY')} cumple ${moment().diff(
            item.fecha_nacimiento,
            'years'
          )} años`}
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
                  <CustomTitle>Cumpleaños</CustomTitle>
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
                <CustomCol span={12}>
                  <CustomRow justify={'end'}>
                    <CustomFormItem label={'Ver: '} className={'grupoPersona'}>
                      <CustomRadioGroup
                        value={stateFilter}
                        defaultValue={'P'}
                        onChange={(e) => {
                          setStateFilter(e.target.value)
                        }}
                      >
                        <CustomRadio value={'T'}>Todos</CustomRadio>
                        <CustomRadio value={'P'}>Próximos</CustomRadio>
                      </CustomRadioGroup>
                    </CustomFormItem>
                  </CustomRow>
                </CustomCol>
              </CustomRow>
              <CustomDivider />
              <CustomList
                header={
                  <CustomRow justify="space-between">
                    <CustomCol xs={8}>
                      <CustomSelect
                        defaultValue={moment().format('M')}
                        placeholder={'Seleccionar mes'}
                        onClear={() => {
                          setMesSeleccionado('')
                        }}
                        onSelect={(value) => {
                          setMesSeleccionado(value)
                        }}
                        options={listaMeses?.map((item) => {
                          return { value: item.value, label: item.label }
                        })}
                        allowClear
                      />
                    </CustomCol>
                    <CustomRow justify="end">
                      <CustomButton
                        type={'primary'}
                        icon={<PrinterOutlined />}
                        onClick={handlePrintData}
                      >
                        Imprimir Listado
                      </CustomButton>
                    </CustomRow>
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
        title={'Listado de Cumpleaños'}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  )
}

export default Birthday
