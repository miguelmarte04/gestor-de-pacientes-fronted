/* eslint-disable @typescript-eslint/no-unused-vars */
import { EyeOutlined, StopOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomCollapse from '../components/CustomCollapse'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomInput from '../components/CustomInput'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomModal from '../components/CustomModal'
import CustomPanel from '../components/CustomPanel'
import CustomDatePicker from '../components/CustomRangePicker'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomSelect from '../components/CustomSelect'
import CustomSpin from '../components/CustomSpin'
import CustomTextArea from '../components/CustomTextArea'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getDepartments } from '../slicers/general'
import { CandidateType } from '../slicers/recruitment'
import { getCandidates, getVacancies } from '../slicers/recruitment/recruitment'
import { defaultBreakpoints, defaultTheme } from '../themes'
import { filterArray, filterByDate, getInitials } from '../utils/general'

const Candidates = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [form] = useForm()
  const { candidates, fetchingRecruitment, vacancies } = useAppSelector(
    (state) => state.recruitment
  )
  const [search, setSearch] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [searchVacante, setSearchVacante] = useState('')
  const [searchNivelAcademico, setSearchNivelAcademico] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])

  useEffect(() => {
    dispatch(getCandidates({}))
    dispatch(getVacancies({}))
  }, [])
  const academicLevel = [
    { label: 'Primaria', value: 'Primaria' },
    { label: 'Bachillerato', value: 'Bachillerato' },
    { label: 'Técnico', value: 'Técnico' },
    { label: 'Licenciatura', value: 'Licenciatura' },
    { label: 'Maestría', value: 'Maestría' },
    { label: 'Doctorado', value: 'Doctorado' },
    { label: 'Universitario', value: 'Universitario' },
  ]

  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(
            candidates,
            [search, searchNivelAcademico, searchVacante],
            ['nombre', 'nivel_academico', 'nombre']
          )?.filter((item) => item.estado === 'A'),
          'fecha_insercion',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(
          candidates,
          [search, searchNivelAcademico, searchVacante],
          ['nombre', 'nivel_academico', 'nombre']
        )?.filter((item) => item.estado === 'A')
  }, [search, candidates, searchDate, searchNivelAcademico, searchVacante])

  const handleView = (record: CandidateType) => {
    form.setFieldsValue({
      ...record,
      fecha_insercion: moment(record.fecha_insercion).format('DD/MM/YYYY'),
    })
    setOpenModal(true)
  }

  const renderItem = (item: CandidateType) => {
    return (
      <CustomListItem
        key={item.id}
        actions={[
          <CustomTooltip key={'delete'} title="Ver Candidato">
            <CustomButton
              onClick={() => handleView({ ...item })}
              icon={
                item.estado === 'A' ? (
                  <EyeOutlined
                    style={{
                      fontSize: '18px',
                    }}
                  />
                ) : (
                  <StopOutlined
                    style={{ fontSize: '16px', color: defaultTheme.grayColor }}
                  />
                )
              }
              type={'link'}
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
          title={
            <a href={'item.href'}>
              {item.nombres} ${item.apellidos}
            </a>
          }
          description={`Vacante: ${
            vacancies?.find((item2) => item2.id === item.id_vacante)?.nombre
          } - Nivel Academico: ${item.nivel_academico} - Telefono: ${
            item.telefono
          }`}
        />
      </CustomListItem>
    )
  }

  return (
    <CustomSpin spinning={fetchingRecruitment}>
      <CustomLayoutBoxShadow>
        <CustomRow justify={'end'}>
          <CustomDivider>
            <CustomTitle>Candidatos</CustomTitle>
          </CustomDivider>
          <CustomCol xs={12}>
            <CustomRow justify={'end'}>
              <CustomCol xs={22}>
                <CustomSearch
                  placeholder={'Buscar Por Nombre'}
                  onChange={(item) => {
                    setSearch(item.target.value)
                  }}
                />
              </CustomCol>
            </CustomRow>
          </CustomCol>
          <CustomCollapse
            style={{ width: '100%', marginTop: '2%', marginBottom: '1%' }}
          >
            <CustomPanel key={'1'} header={<CustomTitle>Filtros </CustomTitle>}>
              <CustomRow justify="start">
                <CustomCol xs={6} style={{ marginRight: '1%' }}>
                  <CustomSelect
                    placeholder={'Vacante'}
                    allowClear
                    onClear={() => setSearchVacante('')}
                    onSelect={(value) => {
                      setSearchVacante(value)
                    }}
                    options={vacancies?.map((item) => {
                      return {
                        label: item.nombre,
                        value: item.id,
                      }
                    })}
                  />
                </CustomCol>

                <CustomCol xs={6} style={{ marginRight: '1%' }}>
                  <CustomSelect
                    placeholder={'Nivel Academico'}
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
                </CustomCol>

                <CustomCol xs={6}>
                  <CustomDatePicker
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
          <CustomCol xs={24}>
            <CustomList dataSource={dataSource} renderItem={renderItem} />
          </CustomCol>
        </CustomRow>
      </CustomLayoutBoxShadow>
      <CustomModal
        title={<CustomTitle>Datos del Candidato</CustomTitle>}
        width={900}
        visible={openModal}
        onCancel={() => {
          setOpenModal(false)
          form.resetFields()
        }}
        cancelText={'Cerrar'}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <CustomForm form={form} disabled>
          <CustomRow justify="start">
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Nombre'}
                name={'nombres'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomInput placeholder="Nombre" />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Apellido'}
                name={'apellidos'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomInput placeholder="Apellido" />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Experiencia'}
                name={'experiencia'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomInput placeholder="Experiencia" />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Nivel Academico'}
                name={'nivel_academico'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomInput placeholder="Nivel Academico" />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Correo Electronico'}
                name={'correo_electronico'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomInput placeholder="Correo Electronico" />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Telefono'}
                name={'telefono'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomInput placeholder="Telefono" />
              </CustomFormItem>
            </CustomCol>

            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={'Fecha Registro'}
                name={'fecha_insercion'}
                rules={[{ required: true }]}
                labelCol={{ span: 8 }}
              >
                <CustomInput placeholder="Fecha Registro" />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={'Resumen'}
                name={'resumen'}
                labelCol={{ span: 4 }}
              >
                <CustomTextArea placeholder="Resumen" />
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomModal>
    </CustomSpin>
  )
}

export default Candidates
