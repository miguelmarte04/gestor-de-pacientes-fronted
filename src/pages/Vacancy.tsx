/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomCollapse from '../components/CustomCollapse'
import CustomDivider from '../components/CustomDivider'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomPanel from '../components/CustomPanel'
import CustomRadioGroup from '../components/CustomRadioGroup'
import CustomDatePicker from '../components/CustomRangePicker'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomSelect from '../components/CustomSelect'
import CustomSpin from '../components/CustomSpin'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import VacancyForm from '../components/VacancyForm'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getDepartments, setModalStateFormVacancy } from '../slicers/general'
import {
  getVacancies,
  updateVacancy,
  VacancyType,
} from '../slicers/recruitment'
import { defaultTheme } from '../themes'
import {
  ArrayOrderBy,
  filterArray,
  filterByDate,
  getInitials,
  searchInArray,
} from '../utils/general'

const radioOptions = [
  { label: 'Abiertas', value: 'A' },
  { label: 'Cerradas', value: 'I' },
]
const Vacancy = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { modalStateFormVacancy } = useAppSelector((state) => state.general)
  const { cargos, departments } = useAppSelector((state) => state.general)
  const { vacancies, fetchingRecruitment } = useAppSelector(
    (state) => state.recruitment
  )
  const [editData, setEditData] = useState<VacancyType>()
  const [filter, setFilter] = useState('A')
  const [search, setSearch] = useState('')
  const [searchCargo, setSearchCargo] = useState('')
  const [searchDepartamento, setSearchDepartamento] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])

  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(
            vacancies,
            [searchCargo, search, searchDepartamento],
            ['id_departamento', 'nombre', 'puesto']
          )?.filter((item) => item.estado === filter),
          'fecha_insercion',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(
          vacancies,
          [searchCargo, search, searchDepartamento],
          ['id_departamento', 'nombre', 'puesto']
        )?.filter((item) => item.estado === filter)
  }, [search, vacancies, filter, searchCargo, searchDepartamento, searchDate])

  useEffect(() => {
    dispatch(getVacancies({}))
    dispatch(getDepartments({}))
  }, [])

  useEffect(() => {
    if (!modalStateFormVacancy) {
      setEditData(undefined)
      form.resetFields()
    }
  }, [modalStateFormVacancy])

  useEffect(() => {
    if (editData?.id) {
      form.setFieldsValue({
        ...editData,
        fecha_limite: moment(editData.fecha_limite),
      })
      dispatch(setModalStateFormVacancy(true))
    }
  }, [editData])

  const handleModalState = () => {
    dispatch(setModalStateFormVacancy(!modalStateFormVacancy))
  }

  const handleDelete = (record: VacancyType) => {
    CustomModalConfirmation({
      title: '¿Está seguro de eliminar esta vacante?',
      content: `Se eliminará la vacante ${record.nombre}`,
      onOk: () => {
        record.estado = record.estado === 'A' ? 'I' : 'A'
        record.estado_publicacion =
          record.estado_publicacion === 'A' ? 'I' : 'A'
        delete record.fecha_insercion
        dispatch(updateVacancy({ ...record }))
      },
    })
  }

  const renderItem = (item: VacancyType) => {
    const cargo = cargos?.find(
      (cargo) => cargo.id === Number(item.puesto)
    )?.cargo
    return (
      <CustomListItem
        key={cargo}
        actions={[
          <CustomButton
            onClick={() => setEditData(item)}
            key={'edit'}
            disabled={item.estado === 'I'}
            icon={<EditOutlined style={{ fontSize: '16px' }} />}
            type={'link'}
          />,
          <CustomButton
            key={'delete'}
            onClick={() => handleDelete({ ...item })}
            danger
            icon={
              item.estado === 'A' ? (
                <DeleteOutlined
                  style={{ fontSize: '16px', color: defaultTheme.dangerColor }}
                />
              ) : (
                <StopOutlined
                  style={{ fontSize: '16px', color: defaultTheme.grayColor }}
                />
              )
            }
            type={'link'}
          />,
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
                  {getInitials(item.nombre, cargo)}
                </span>
              }
            />
          }
          title={cargo}
          description={`${item.nombre} | ${moment(item.fecha_insercion).format(
            'DD MMM YYYY'
          )} | ${item.candidatos ?? 0} candidatos`}
        />
      </CustomListItem>
    )
  }

  return (
    <>
      <CustomSpin spinning={fetchingRecruitment}>
        <CustomLayoutBoxShadow>
          <CustomRow justify={'end'}>
            <CustomDivider>
              <CustomTitle>Vacantes</CustomTitle>
            </CustomDivider>
            <CustomCol xs={12}>
              <CustomRow justify={'end'}>
                <CustomCol xs={22}>
                  <CustomSearch
                    width={'80%'}
                    placeholder={'Buscar vacantes'}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </CustomCol>

                <CustomTooltip title={'Nueva Vacante'}>
                  <CustomButton
                    icon={<PlusOutlined />}
                    shape={'circle'}
                    size={'middle'}
                    type={'primary'}
                    onClick={handleModalState}
                  />
                </CustomTooltip>
                <CustomRadioGroup
                  onChange={(e) => setFilter(e.target.value)}
                  defaultValue={'A'}
                  options={radioOptions}
                />
              </CustomRow>
            </CustomCol>
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
                      placeholder={'Puesto'}
                      allowClear
                      onClear={() => setSearchCargo('')}
                      onSelect={(value) => {
                        setSearchCargo(value)
                      }}
                      options={cargos?.map((item) => ({
                        label: item.cargo,
                        value: item.id,
                      }))}
                    />
                  </CustomCol>

                  <CustomCol xs={6} style={{ marginRight: '1%' }}>
                    <CustomSelect
                      placeholder={'Departamento'}
                      allowClear
                      onClear={() => setSearchDepartamento('')}
                      onSelect={(value) => {
                        setSearchDepartamento(value)
                      }}
                      options={departments?.map((item) => ({
                        label: item.departamento,
                        value: item.id.toString(),
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
      </CustomSpin>

      <VacancyForm data={editData} form={form} />
    </>
  )
}

export default Vacancy
