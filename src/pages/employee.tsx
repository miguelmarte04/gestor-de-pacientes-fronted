import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  EmployeeType,
  getDataEmployee,
  getEmployee,
  getEmployeeSummary,
  setEmployee,
  updateStateEmployee,
} from '../slicers/employee'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import { REGISTER_EMPLOYEE } from '../constants/Routes'
import CustomSpin from '../components/CustomSpin'
import { AnyType } from '../constants/types'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
import { useAppDispatch, useAppSelector, useSearch } from '../hooks'
import { getSessionInfo } from '../utils/session'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomDivider from '../components/CustomDivider'
import EmployeeSummary from '../components/EmployeeSummary'
import {
  setEditingMode,
  setModalVisibilityStateForEmployeeSummary,
} from '../slicers/general'
import { defaultTheme } from '../themes'
import CustomSelect from '../components/CustomSelect'
import { filterArray, filterByDate, getInitials } from '../utils/general'
import CustomDatePicker from '../components/CustomRangePicker'
import CustomCollapse from '../components/CustomCollapse'
import CustomPanel from '../components/CustomPanel'
import {
  getCargos,
  getCivilState,
  getDepartments,
  getWorkingDay,
} from '../slicers/general/general'

const Employee = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const history = useNavigate()
  const [parentStateFilter, setParentStateFilter] = useState('A')
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
  const [updateEmployee, setUpdateEmployee] = useState(false)
  const [filterSearch, setFilterSearch] = useState(' ')
  const [searchCargo, setSearchCargo] = useState('')
  const [searchJornada, setSearchJornada] = useState('')
  const [searchEstadoCivil, setSearchEstadoCivil] = useState('')
  const [searchDepartamento, setSearchDepartamento] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])
  const [delay, setDelay] = useState<number>(0)
  const search = useSearch(filterSearch, delay)
  const { cargos, departments, workingDay, civilState } = useAppSelector(
    (state) => state.general
  )
  const { employee, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )
  const optionsState = [
    { label: 'Activo', value: 'A' },
    { label: 'Inactivo', value: 'I' },
    { label: 'Incompletos', value: 'U' },
    { label: 'Fallecidos', value: 'F' },
  ]

  const { modalVisibilityStateForEmployeeSummary, nextLocation } =
    useAppSelector((state) => state.general)

  const empleados = useCallback(() => {
    dispatch(
      getEmployee({
        condition: {
          search: search,
          type: 'search_register',
        },
      })
    )
  }, [updateEmployee, search])

  useEffect(empleados, [empleados])

  useEffect(() => {
    dispatch(setEditingMode(false))
    dispatch(getCargos({}))
    dispatch(getDepartments({}))
    dispatch(
      getCivilState({
        condition: {},
      })
    )
    dispatch(getWorkingDay({}))
  }, [])

  useEffect(() => {
    nextLocation && history(nextLocation)
  }, [nextLocation])

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
          )?.filter((item) =>
            parentStateFilter === '' ? item : item.estado === parentStateFilter
          ),
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
        )?.filter((item) =>
          parentStateFilter === '' ? item : item.estado === parentStateFilter
        )
  }, [
    search,
    parentStateFilter,
    employee,
    searchDate,
    searchCargo,
    searchJornada,
    searchEstadoCivil,
    searchDepartamento,
  ])

  const handleModalState = () => {
    dispatch(
      setModalVisibilityStateForEmployeeSummary(
        !modalVisibilityStateForEmployeeSummary
      )
    )
  }

  const handleDelete = (record: AnyType) => {
    setVisibleModalConfirm(true)
    CustomModalConfirmation({
      title: 'Deshabilitar',
      content: 'Desea deshabilitar este registro?',
      visible: visibleModalConfirm,
      onOk: () => {
        dispatch(
          updateStateEmployee({
            condition: {
              id: record.id,
              estado: record.estado === 'A' ? 'I' : 'A',
              usuario_insercion: getSessionInfo().usuario,
            },
          })
        )
        setUpdateEmployee(!updateEmployee)
        setVisibleModalConfirm(false)
      },
    })
  }

  const handleEdit = (record: AnyType) => {
    dispatch(
      getDataEmployee({
        condition: {
          id: `${record.id}`,
        },
      })
    )
  }

  const renderItem = (item: EmployeeType) => {
    return (
      <CustomListItem
        actions={[
          <>
            {item.estado !== 'F' ? (
              <CustomTooltip
                key={'edit'}
                title={
                  item.estado === 'A' || item.estado === 'U'
                    ? 'Editar'
                    : 'Empleado inactivo, no permite edición'
                }
              >
                <CustomButton
                  disabled={item.estado === 'I'}
                  onClick={() => handleEdit(item)}
                  type={'link'}
                  icon={<EditOutlined style={{ fontSize: '18px' }} />}
                  className={'editPhoneButton'}
                />
              </CustomTooltip>
            ) : null}
          </>,
          <CustomTooltip key={'ver'} title={'Ver'}>
            <CustomButton
              onClick={() => {
                dispatch(
                  getEmployeeSummary({
                    condition: {
                      doc_identidad: item.doc_identidad,
                    },
                  })
                )
              }}
              type={'link'}
              icon={<EyeOutlined style={{ fontSize: '18px' }} />}
            />
          </CustomTooltip>,
          <>
            {item.estado !== 'F' ? (
              <CustomTooltip
                key={'delete'}
                title={
                  item.estado === 'A' || item.estado === 'U'
                    ? 'Inhabilitar'
                    : 'Habilitar'
                }
              >
                <CustomButton
                  onClick={() => handleDelete(item)}
                  type={'link'}
                  icon={
                    item.estado === 'A' || item.estado === 'U' ? (
                      <DeleteOutlined
                        style={{
                          fontSize: '18px',
                          color: defaultTheme.dangerColor,
                        }}
                      />
                    ) : (
                      <StopOutlined
                        className={'disabledColor'}
                        style={{ fontSize: '18px' }}
                      />
                    )
                  }
                />
              </CustomTooltip>
            ) : null}
          </>,
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
          title={
            <CustomButton
              onClick={() => {
                dispatch(
                  getEmployeeSummary({
                    condition: {
                      doc_identidad: item.doc_identidad,
                    },
                  })
                )
              }}
              type={'link'}
            >{`${item.nombres} ${item.apellidos}`}</CustomButton>
          }
          description={`Cargo: ${item?.cargo ?? ''} - Estado: ${
            optionsState?.find((record) => record.value === item.estado)?.label
          }`}
        />
      </CustomListItem>
    )
  }

  return (
    <>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomLayoutBoxShadow>
          <CustomRow justify={'end'}>
            <CustomCol xs={24}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Registrar Empleado</CustomTitle>
                </CustomDivider>

                <CustomCol xs={24} md={12} />
                <CustomCol xs={24} md={12}>
                  <CustomRow justify={'end'} gutter={[10, 0]}>
                    <CustomCol xs={20}>
                      <CustomForm form={form}>
                        <CustomFormItem noStyle name={'SEARCH'}>
                          <CustomSearch
                            className={'search'}
                            placeholder={
                              'Buscar por nombre o documento de identidad'
                            }
                            onChange={(e) => {
                              if (
                                RegExp(/^[a-z A-Z ZÀ-ÿ 0-9]+$/).test(
                                  e.target.value
                                )
                              ) {
                                setFilterSearch(
                                  e.target.value?.replace(/\s/g, '%')
                                )
                                setDelay(800)
                              } else {
                                setFilterSearch(' ')
                              }
                            }}
                          />
                        </CustomFormItem>
                      </CustomForm>
                    </CustomCol>

                    <CustomCol xs={4} md={2} lg={3} xl={2}>
                      <CustomTooltip title={'Nuevo Empleado'}>
                        <CustomButton
                          icon={<PlusOutlined />}
                          shape={'circle'}
                          size={'middle'}
                          type={'primary'}
                          onClick={() => {
                            dispatch(setEmployee([]))
                            history(REGISTER_EMPLOYEE)
                          }}
                        />
                      </CustomTooltip>
                    </CustomCol>
                  </CustomRow>
                </CustomCol>

                <CustomCol xs={12}>
                  <CustomRow justify={'end'} style={{ marginRight: '9%' }}>
                    <CustomCol xs={12}>
                      <CustomFormItem
                        label={'Ver: '}
                        className={'grupoPersona'}
                      >
                        <CustomSelect
                          defaultValue={'A'}
                          placeholder={'Seleccione una opción'}
                          width={'100%'}
                          options={optionsState.map((item) => ({
                            label: item.label,
                            value: item.value,
                          }))}
                          onSelect={(e) => {
                            setParentStateFilter(e)
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
                    <CustomCol xs={6}>
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
        </CustomLayoutBoxShadow>
      </CustomSpin>

      {modalVisibilityStateForEmployeeSummary && (
        <EmployeeSummary
          height={100}
          open={modalVisibilityStateForEmployeeSummary}
          onClose={handleModalState}
        />
      )}
    </>
  )
}

export default Employee
