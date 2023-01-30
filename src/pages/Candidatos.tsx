import { Avatar } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getHistoryChange } from '../slicers/employee/employee'
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
import { filterArray, filterByDate } from '../utils/general'
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
import { getCandidates } from '../slicers/recruitment/recruitment'
import moment from 'moment'
import CustomDatePicker from '../components/CustomRangePicker'

const Candidatos = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const [searchExperiencia, setSearchExperiencia] = useState('')
  const [searchNivelAcademico, setSearchNivelAcademico] = useState('')
  const { candidates, fetchingRecruitment } = useAppSelector(
    (state) => state.recruitment
  )
  const [searchDate, setSearchDate] = useState([null, null])
  const academicLevel = [
    { label: 'Primaria', value: 'Primaria' },
    { label: 'Bachillerato', value: 'Bachillerato' },
    { label: 'Técnico', value: 'Técnico' },
    { label: 'Licenciatura', value: 'Licenciatura' },
    { label: 'Maestría', value: 'Maestría' },
    { label: 'Doctorado', value: 'Doctorado' },
    { label: 'Universitario', value: 'Universitario' },
  ]

  // const dataSource = useMemo(() => {
  //   return filterArray(
  //     ArrayOrderBy(
  //       searchInArray(
  //         candidates?.filter((item) => item.estado === 'A'),
  //         ['nombres', 'apellidos'],
  //         search
  //       ),
  //       'id',
  //       'asc'
  //     ),
  //     [searchExperiencia, searchNivelAcademico],
  //     ['experiencia', 'nivel_academico']
  //   )
  // }, [search, candidates, searchExperiencia, searchNivelAcademico])

  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(
            candidates,
            [search, searchExperiencia, searchNivelAcademico],
            ['nombres', 'apellidos', 'experiencia', 'nivel_academico']
          ),
          'fecha_insercion',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(
          candidates,
          [search, searchExperiencia, searchNivelAcademico],
          ['nombres', 'apellidos', 'experiencia', 'nivel_academico']
        )
  }, [search, candidates, searchExperiencia, searchNivelAcademico, searchDate])

  useEffect(() => {
    dispatch(getCandidates({}))
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
      title: 'Correo electrónico',
      dataIndex: 'correo_electronico',
      key: 'correo_electronico',
    },
    {
      title: 'Fecha de Insercion',
      dataIndex: 'fecha_insercion',
      key: 'fecha_insercion',
      render: (text: string) => moment(text).format('DD/MM/YYYY'),
    },
    {
      dataIndex: 'nivel_academico',
      key: 'nivel_academico',
      title: 'Nivel Academico',
    },
    {
      dataIndex: 'telefono',
      key: 'telefono',
      title: 'Telefono',
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
          description={`Nivel Academico: ${
            item.nivel_academico
          } - Fecha Insercion: ${moment(item.fecha_insercion).format(
            'DD/MM/YYYY'
          )}`}
        />
      </CustomListItem>
    )
  }

  return (
    <>
      <CustomLayoutBoxShadow>
        <CustomSpin spinning={fetchingRecruitment || fetch}>
          <CustomRow justify={'end'}>
            <CustomCol xs={24}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Reporte de Candidatos</CustomTitle>
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
                  <CustomRow justify="space-around">
                    <CustomSelect
                      placeholder={'Años de experiencia'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchExperiencia('')}
                      onSelect={(value) => {
                        setSearchExperiencia(value)
                      }}
                      options={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '4' },
                        { label: '5', value: '5' },
                        { label: '6', value: '6' },
                        { label: '7', value: '7' },
                        { label: '8', value: '8' },
                        { label: '9', value: '9' },
                        { label: '10', value: '10' },
                        { label: '11', value: '11' },
                        { label: '12', value: '12' },
                      ]}
                    />
                    <CustomSelect
                      placeholder={'Nivel Academico'}
                      width={'24%'}
                      allowClear
                      onClear={() => setSearchNivelAcademico('')}
                      onSelect={(value) => {
                        setSearchNivelAcademico(value)
                      }}
                      options={academicLevel?.map((item) => ({
                        label: item.label,
                        value: item.value,
                      }))}
                    />

                    <CustomDatePicker
                      style={{ marginLeft: '2%', width: '24%' }}
                      onChange={(_, dateString) => {
                        setSearchDate(dateString)
                      }}
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
        title={'Reporte de Candidatos'}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  )
}

export default Candidatos
