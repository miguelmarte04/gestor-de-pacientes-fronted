/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrinterOutlined } from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { ReactInstance, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getEmployee } from '../slicers/employee/employee'
import { EmployeeType } from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import {
  filterArray,
  filterByDate,
  formatter,
  searchInArray,
} from '../utils/general'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import CustomDatePicker from './CustomRangePicker'
import CustomPanel from './CustomPanel'
import CustomCollapse from './CustomCollapse'
import CustomSelect from './CustomSelect'
const CartaRegistroEmpleado = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { fetchingFromEmployee, employee } = useAppSelector(
    (state) => state.employee
  )
  useEffect(() => {
    dispatch(
      getEmployee({
        condition: {
          search: ' ',
          type: 'search_register',
        },
      })
    )
  }, [])
  const [searchCargo, setSearchCargo] = useState('')
  const [searchJornada, setSearchJornada] = useState('')
  const [searchEstadoCivil, setSearchEstadoCivil] = useState('')
  const [searchDepartamento, setSearchDepartamento] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])

  const getInitials = (name: string, lastName: string) => {
    return `${name?.charAt(0).toUpperCase()}${lastName
      ?.charAt(0)
      .toUpperCase()}`
  }
  const [search, setSearch] = useState('')
  const [reactToPrintContent, setReactToPrintContent] =
    useState<ReactInstance>()
  const [fetch, setFetch] = useState(false)
  const { cargos, departments, workingDay, civilState } = useAppSelector(
    (state) => state.general
  )
  const handlePrintData = (record: EmployeeType) => {
    setFetch(true)
    const htmlObject = document.createElement('div')
    htmlObject.innerHTML = `<h2>&nbsp;</h2>
    <h2 style="text-align: left;">&nbsp;</h2>
    <h2 style="text-align: right;"><strong>${moment().format(
      'DD/MM/YYYY'
    )}</strong></h2>
    <h2 style="text-align: right;"><strong>Distrito Municipal Don Juan Rodr&iacute;guez, La Vega</strong></h2>
    <h2><strong>&nbsp;</strong></h2>
    <h2>&nbsp;</h2>
    <h2>&nbsp;</h2>
    <h2>&nbsp;</h2>
    <h2>Se&ntilde;ores</h2>
    <h2>Tesorer&iacute;a de la Seguridad Social</h2>
    <h2>Direcci&oacute;n de Asistencia al Empleador</h2>
    <h2>La Vega</h2>
    <h2>&nbsp;</h2>
    <h2>&nbsp;</h2>
    <h2>Por medio de la presente solicito sea registrada en la Tesorer&iacute;a de la Seguridad Social <strong>RNC-430210641 bajo la Raz&oacute;n Social Ayuntamiento del Distrito Municipal Don Juan Rodr&iacute;guez (BARRANCA). </strong></h2>
    <h2>&nbsp;</h2>
    <h2><strong>De igual manera, solicito agregar como representante al Sr. (a) ${
      record.nombres
    } ${
      record.apellidos
    } con c&eacute;dula de identidad y electoral No</strong>.<strong>${formatter(
      { value: record.doc_identidad, type: 'identity_doc' }
    )}</strong></h2>
    <h2>&nbsp;</h2>
    <h2>Atentamente,</h2>
    <h2>&nbsp;</h2>
    <h2>&nbsp;</h2>
    <table style="height: 275px; margin-left: auto; margin-right: auto; width: 955.172px;">
    <tbody>
    <tr style="height: 47px;">
    <td style="width: 426px; text-align: center; height: 47px;">
    <h2>______________________ &nbsp;&nbsp;&nbsp;&nbsp;</h2>
    </td>
    <td style="width: 512.172px; text-align: center; height: 47px;">
    <h2>________________________</h2>
    </td>
    </tr>
    <tr style="height: 41px;">
    <td style="width: 426px; text-align: center; height: 41px;">
    <h2><strong>&nbsp;Firma Propietario &nbsp;&nbsp;</strong></h2>
    </td>
    <td style="width: 512.172px; text-align: center; height: 41px;">
    <h2><strong>&nbsp; &nbsp; &nbsp; Firma Representante</strong></h2>
    </td>
    </tr>
    <tr style="height: 50px;">
    <td style="width: 426px; text-align: center; height: 50px;">
    <h2>Ayun. Distr. Mun. Don Juan Rodr.&nbsp;&nbsp;&nbsp;&nbsp;</h2>
    </td>
    <td style="width: 512.172px; text-align: center; height: 50px;">
    <h2>&nbsp;${record.nombres} ${record.apellidos}</h2>
    </td>
    </tr>
    <tr style="height: 76.5312px;">
    <td style="width: 426px; text-align: center; height: 76.5312px;">
    <h2>RNC-430210641&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h2>
    </td>
    <td style="width: 512.172px; text-align: center; height: 76.5312px;">
    <h2>${formatter({ value: record.doc_identidad, type: 'identity_doc' })}</h2>
    </td>
    </tr>
    </tbody>
    </table>
    <h2 style="text-align: center;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h2>
    <h2 style="text-align: center;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong></h2>
    <h2 style="text-align: center;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h2>
    <h2 style="text-align: center;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h2>
    <h2><strong>&nbsp;</strong></h2>
    <h2>&nbsp;</h2>
    <h2>&nbsp;</h2>
    <h2>&nbsp;</h2>
    <h2>&nbsp;</h2>`
    setReactToPrintContent(htmlObject)
  }

  const handleAfterPrint = () => {
    setFetch(false)
  }
  const handlePrint = useReactToPrint({
    content: reactToPrintContent ? () => reactToPrintContent : () => null,
    onAfterPrint: () => handleAfterPrint(),
    removeAfterPrint: true,
    bodyClass: 'print-body',
    pageStyle: 'print-page',
  })

  useEffect(() => {
    reactToPrintContent && handlePrint()
  }, [reactToPrintContent])

  const renderItem = (item: EmployeeType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip key={'view'} title={'Imprimir Carta'}>
            <CustomButton
              onClick={() => {
                handlePrintData(item)
              }}
              type={'link'}
              icon={<PrinterOutlined style={{ fontSize: '18px' }} />}
            />
          </CustomTooltip>,
        ]}
      >
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
                  {getInitials(item.nombres, item.apellidos)}
                </span>
              }
            />
          }
          title={`${item.nombres} ${item.apellidos}`}
          description={`Cedula: ${formatter({
            value: item.doc_identidad,
            type: 'identity_doc',
          })}`}
        />
      </CustomListItem>
    )
  }
  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(
            employee,
            [
              search,
              searchCargo,
              searchJornada,
              searchEstadoCivil,
              searchDepartamento,
            ],
            [
              'id_departamento',
              'nombres',
              'apellidos',
              'id_cargo',
              'id_jornada_trabajo',
              'estado_civil',
              'id_departamento',
            ]
          )?.filter((item) => item.estado === 'A'),
          'fecha_insercion',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(
          employee,
          [
            search,
            searchCargo,
            searchJornada,
            searchEstadoCivil,
            searchDepartamento,
          ],
          [
            'id_departamento',
            'nombres',
            'apellidos',
            'id_cargo',
            'id_jornada_trabajo',
            'estado_civil',
            'id_departamento',
          ]
        )?.filter((item) => item.estado === 'A')
  }, [
    search,
    employee,
    searchDate,
    searchCargo,
    searchJornada,
    searchEstadoCivil,
    searchDepartamento,
  ])

  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee || fetch}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomForm form={form}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Carta Registro del Empleado</CustomTitle>
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
              <CustomCollapse
                style={{ width: '100%', marginTop: '2%', marginBottom: '1%' }}
              >
                <CustomPanel
                  key={'1'}
                  header={<CustomTitle>Filtros </CustomTitle>}
                >
                  <CustomRow justify="start">
                    <CustomCol xs={6} style={{ marginRight: '1%' }}>
                      <CustomSelect
                        placeholder={'Cargo'}
                        allowClear
                        onClear={() => setSearchCargo('')}
                        onSelect={(value) => {
                          setSearchCargo(value)
                        }}
                        options={cargos?.map((item) => {
                          return {
                            label: item.cargo,
                            value: item.id,
                          }
                        })}
                      />
                    </CustomCol>
                    <CustomCol xs={6} style={{ marginRight: '1%' }}>
                      <CustomSelect
                        placeholder={'Jornada de trabajo'}
                        allowClear
                        onClear={() => setSearchJornada('')}
                        onSelect={(value) => {
                          setSearchJornada(value)
                        }}
                        options={workingDay?.map((item) => {
                          return {
                            label: item.jornada_trabajo,
                            value: item.id,
                          }
                        })}
                      />
                    </CustomCol>
                    <CustomCol xs={6} style={{ marginRight: '1%' }}>
                      <CustomSelect
                        placeholder={'Estado Civil'}
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
                    </CustomCol>
                    <CustomCol
                      xs={6}
                      style={{ marginRight: '1%', marginTop: '1%' }}
                    >
                      <CustomSelect
                        placeholder={'Departamento'}
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
                    </CustomCol>

                    <CustomCol xs={6} style={{ marginTop: '1%' }}>
                      <CustomDatePicker
                        allowClear
                        style={{ marginLeft: '2%' }}
                        onChange={(_, dateString) => {
                          setSearchDate(dateString)
                        }}
                      />
                    </CustomCol>
                  </CustomRow>
                </CustomPanel>
              </CustomCollapse>
              <CustomList
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                renderItem={renderItem}
              />
            </CustomForm>
          </CustomCol>
        </CustomRow>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default CartaRegistroEmpleado
