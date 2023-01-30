import { SolutionOutlined } from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmployeeType, getEmployee } from '../slicers/employee'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import CustomSpin from '../components/CustomSpin'
import { useAppDispatch, useAppSelector, useSearch } from '../hooks'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomDivider from '../components/CustomDivider'
import { setEditingMode } from '../slicers/general'
import {
  defaultBreakpoints,
  defaultTheme,
  formItemLayout,
  labelColFullWidth,
} from '../themes'
import {
  filterArray,
  filterByDate,
  getInitials,
  showNotification,
} from '../utils/general'
import {
  getCargos,
  getCivilState,
  getDepartments,
  getWorkingDay,
} from '../slicers/general/general'
import CustomModal from '../components/CustomModal'
import CustomSelect from '../components/CustomSelect'
import CustomInput from '../components/CustomInput'
import CustomPasswordInput from '../components/CustomPasswordInput'
import { assignUser } from '../slicers/employee/employee'
import { getSessionInfo } from '../utils/session'

const optionsState = [
  { label: 'Activo', value: 'A' },
  { label: 'Inactivo', value: 'I' },
  { label: 'Incompletos', value: 'U' },
  { label: 'Fallecidos', value: 'F' },
]

const UserPermissions = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const history = useNavigate()
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType>()
  const [visible, setVisible] = useState(false)
  const [parentStateFilter] = useState('A')
  const [filterSearch, setFilterSearch] = useState('')
  const [searchCargo] = useState('')
  const [searchDepartamento] = useState('')
  const [searchJornada] = useState('')
  const [searchEstadoCivil] = useState('')
  const [searchDate] = useState([null, null])
  const [delay, setDelay] = useState<number>(0)
  const search = useSearch(filterSearch, delay)

  const { employee, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )
  const { departments } = useAppSelector((state) => state.general)

  const { nextLocation } = useAppSelector((state) => state.general)

  const empleados = useCallback(() => {
    dispatch(
      getEmployee({
        condition: {
          search: ' ',
          type: 'search_register',
        },
      })
    )
  }, [])

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

  useEffect(() => {
    if (!visible || !fetchingFromEmployee) {
      form.resetFields()
      setSelectedEmployee(undefined)
    }
  }, [visible, fetchingFromEmployee])

  const handleAddPermission = async () => {
    try {
      const data = await form.validateFields()

      dispatch(
        assignUser({
          id_departamento: data.id_departamento,
          usuario: data.nombre,
          pass: data.pass,
          usuario_insercion: getSessionInfo().usuario,
          id_empleado:
            selectedEmployee?.id ??
            (sessionStorage.getItem('id_empleado') as never),
        })
      )
      setVisible(false)
    } catch (error) {
      showNotification({
        type: 'error',
        description: 'Llene todos los campos requeridos',
        title: 'Error',
      })
    }
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

  const renderItem = (item: EmployeeType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip key={'permissions'} title={'Asignar permisos'}>
            <CustomButton
              className={'editPhoneButton'}
              disabled={item.estado === 'I'}
              icon={<SolutionOutlined style={{ fontSize: '18px' }} />}
              type={'link'}
              onClick={() => {
                sessionStorage.setItem('id_empleado', `${item.id}`)
                setSelectedEmployee(item)
                setVisible(true)
              }}
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
                  <CustomTitle>Permiso del empleado</CustomTitle>
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
                  </CustomRow>
                </CustomCol>
              </CustomRow>
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

      <CustomModal
        onCancel={() => setVisible(false)}
        onOk={handleAddPermission}
        visible={visible}
        width={'50%'}
      >
        <CustomSpin spinning={fetchingFromEmployee}>
          <CustomForm form={form} {...formItemLayout}>
            <CustomRow>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={'Departamento'}
                  name={'id_departamento'}
                  rules={[{ required: true }]}
                >
                  <CustomSelect
                    placeholder={'Seleccione un departamento'}
                    options={departments
                      ?.map((item) => ({
                        label: item.departamento,
                        value: item.id,
                      }))
                      ?.filter((item) => item.value === 8 || item.value === 10)}
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints} />
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Usuario'}
                  name={'nombre'}
                  {...labelColFullWidth}
                  rules={[{ required: true }]}
                >
                  <CustomInput placeholder={'Nombre de usuario'} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Contraseña'}
                  name={'pass'}
                  rules={[{ required: true }]}
                  {...labelColFullWidth}
                >
                  <CustomPasswordInput
                    autoComplete={'off'}
                    placeholder={'Nombre de usuario'}
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Confirmar Contraseña'}
                  name={'confirm_pass'}
                  dependencies={['pass']}
                  {...labelColFullWidth}
                  labelCol={{ span: 6 }}
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('pass') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          new Error(
                            'Las contraseñas no coinciden, por favor verifique'
                          )
                        )
                      },
                    }),
                  ]}
                >
                  <CustomPasswordInput
                    autoComplete={'off'}
                    placeholder={'Confirmar Contraseña'}
                  />
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomForm>
        </CustomSpin>
      </CustomModal>
    </>
  )
}

export default UserPermissions
