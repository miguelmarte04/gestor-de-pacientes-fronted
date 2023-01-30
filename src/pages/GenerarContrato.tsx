/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrinterOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
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
import { useReactToPrint } from 'react-to-print'
import moment from 'moment'
import CustomDatePicker from '../components/CustomRangePicker'
import CustomCollapse from '../components/CustomCollapse'
import CustomPanel from '../components/CustomPanel'
import CustomSelect from '../components/CustomSelect'
import {
  getCargos,
  getCivilState,
  getDepartments,
  getWorkingDay,
  setEditingMode,
} from '../slicers/general'

const GenerarContrato = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const { fetchingFromEmployee, employee } = useAppSelector(
    (state) => state.employee
  )
  const [reactToPrintContent, setReactToPrintContent] =
    useState<ReactInstance>()
  const [fetch, setFetch] = useState(false)
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

  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
  }
  const [search, setSearch] = useState('')
  const [searchCargo, setSearchCargo] = useState('')
  const [searchJornada, setSearchJornada] = useState('')
  const [searchEstadoCivil, setSearchEstadoCivil] = useState('')
  const [searchDepartamento, setSearchDepartamento] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])
  const { cargos, departments, workingDay, civilState } = useAppSelector(
    (state) => state.general
  )
  useEffect(() => {
    dispatch(getCargos({}))
    dispatch(getDepartments({}))
    dispatch(
      getCivilState({
        condition: {},
      })
    )
    dispatch(getWorkingDay({}))
  }, [])

  const handlePrintData = (record: EmployeeType) => {
    setFetch(true)
    const htmlObject = document.createElement('div')
    htmlObject.innerHTML = `<h1 style="text-align: center;"><strong><u>CONTRATO DE TRABAJO</u></strong></h1>
    <h1>ENTRE: DE UNA PARTE, el Ayuntamiento del Distrito Municipal Don Juan Rodr&iacute;guez entidad Gubernamental organizada de acuerdo a las leyes de la Rep&uacute;blica Dominicana, con su domicilio social establecido en el No. 32 de la Calle Principal, del Sector Don Juan Rodr&iacute;guez (Barranca) debidamente representada en este acto por el se&ntilde;or dominicano, mayor de edad, ${
      record.estado_civil
    }, portador de la C&eacute;dula de Identidad y &nbsp;Electoral No. ${formatter(
      { value: record.doc_identidad, type: 'identity_doc' }
    )} en su calidad de; quien en lo que sigue del presente acto se denominar &amp; <strong>LA EMPRESA</strong>, y de la otra parte el se&ntilde;or ${record.nombres?.toUpperCase()} ${record.apellidos?.toUpperCase()}, dominicano, mayor de edad, portador de la C&eacute;dula de Identidad y Electoral No. ${formatter(
      { value: record.doc_identidad, type: 'identity_doc' }
    )}, quien en lo que sigue del presente acto se denominara <strong>EL TRABAJADOR</strong>.</h1>
    <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>SE HA CONVENIDO Y PACTADO LO SIGUIENTE</strong></h1>
    <h1><strong>PRIMERO:</strong>&nbsp;&nbsp;&nbsp; EL TRABAJADOR laborar&aacute; &nbsp;&nbsp;&nbsp; en calidad de ${
      record.cargo
    }, en el Departamento de ${
      record.departamento
    } a partir del con un salario de RD$ ${
      record.sueldo
    }, el cual le ser&aacute; pagado 30 de cada mes.</h1>
    <h1><strong>SEGUNDO:</strong> EL TRABAJADOR deber&aacute; cumplir con el horario de trabajo de 8:00 AM hasta ${
      record.id_jornada_trabajo === 1 ? '5:00 PM' : '12:00 PM'
    } y con las dem&aacute;s instrucciones provengan de la Empresa y de su jefe directo.</h1>
    <h1><strong>TERCERO:</strong> Las relaciones de trabajo del TRABAJADOR con la Empresa se regir&aacute;n por el art&iacute;culo 27 y 28 del C&oacute;digo de Trabajo.</h1>
    <h1><strong>&nbsp;</strong></h1>
    <h1>hecho y firmado en tres (3) originales, uno para cada una de las partes y otros ser&aacute;n depositados en el departamento de trabajo para fines legales correspondientes. en la ciudad La Vega rep&uacute;blica Dominicana, a los ${moment().format(
      'DD'
    )} d&iacute;a &nbsp;del mes de (${moment().format(
      'MMMM'
    )}), del a&ntilde;o ${moment().format('YYYY')}</h1>
    <h1 style="text-align: center;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;__________________________&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;_________________________</h1>
<h1 style="text-align: center;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>EMPRESA&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EL TRABAJADOR</strong></h1>
    
    <h1>YO,  DRA. ARACELIS JOSEFINA MARCANO DEL
    ROSARIO, Abogado notario p&uacute;blico de los n&uacute;meros de La Vega CERTIFICO Y DOY FE que las firmas de antecedentes fueron puestas en mi presencia, libre y voluntariamente, por los se&ntilde;ores ${
      record.nombres
    } ${
      record.apellidos
    } &amp; Ayuntamiento del Distrito Municipal Don Juan Rodr&iacute;guez, de generales y calidades de constan en el presente acto, quienes han acervados bajo la fe del juramento actos p&uacute;blicos y privados de sus vidas. En la ciudad de La Vega, rep&uacute;blica dominicana, a los ${moment().format(
      'DD'
    )} d&iacute;as del mes de ${moment().format(
      'MMMM'
    )}, del a&ntilde;o: ${moment().format('YYYY')}</h1>
    <h1>&nbsp;</h1>
    <h1 style="text-align: center;"><strong>__________________________________</strong></h1>
    <h1 style="text-align: center;">NOTARIO PUBLICO</h1>`
    setReactToPrintContent(htmlObject)
  }
  const renderItem = (item: EmployeeType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip key={'edit'} title={'Imprimir Contrato'}>
            <CustomButton
              disabled={item.estado === 'I'}
              onClick={() => handlePrintData(item)}
              type={'link'}
              icon={<PrinterOutlined style={{ fontSize: '18px' }} />}
              className={'editPhoneButton'}
            />
          </CustomTooltip>,
        ]}
      >
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
          description={`Cargo: ${item?.cargo ?? ''} - Departamento: ${
            item.departamento
          } - Cedula: ${formatter({
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
            <CustomRow>
              <CustomDivider>
                <CustomTitle>Generar Contrato</CustomTitle>
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
            <CustomDivider />
            <CustomList
              dataSource={dataSource}
              pagination={{ pageSize: 5 }}
              renderItem={renderItem}
            />
          </CustomCol>
        </CustomRow>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default GenerarContrato
