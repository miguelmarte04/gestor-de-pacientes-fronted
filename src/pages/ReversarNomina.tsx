/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  RollbackOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  createLack,
  getDetNominas,
  getHistoryChange,
  getLack,
  getNominas,
  updateLack,
  updateNominas,
} from '../slicers/employee/employee'
import {
  DetNominaType,
  EmployeeType,
  LacksType,
  NominaType,
} from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import {
  filterArray,
  filterByDate,
  formatter,
  searchInArray,
} from '../utils/general'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomInput from '../components/CustomInput'
import CustomInputGroup from '../components/CustomInputGroup'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomModal from '../components/CustomModal'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomSearchEmployee from '../components/CustomSearchEmployee'
import CustomSelect from '../components/CustomSelect'
import CustomTextArea from '../components/CustomTextArea'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import { getSessionInfo } from '../utils/session'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import moment from 'moment'
import CustomTable from '../components/CustomTable'
import CustomCollapse from '../components/CustomCollapse'
import CustomPanel from '../components/CustomPanel'
import CustomDatePicker from '../components/CustomRangePicker'
const ReversarNomina = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const {
    nominaRequestStatus,
    fetchingFromEmployee,
    nomina,
    detNomina,
    historyChange,
  } = useAppSelector((state) => state.employee)
  useEffect(() => {
    dispatch(getNominas({}))
    dispatch(
      getHistoryChange({
        condition: {
          tipo: 'tipos_nominas',
          id: 1,
        },
      })
    )
  }, [])

  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
  }
  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<LacksType>()
  const [view, setView] = useState(false)
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const [visible, setVisible] = useState(false)
  const [searchTipoNomina, setSearchTipoNomina] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])

  useEffect(() => {
    if (nominaRequestStatus === 'success') {
      dispatch(getNominas({}))
      form.resetFields()
      setVisible(false)
    }
  }, [nominaRequestStatus])

  const handleDelete = (record: NominaType) => {
    CustomModalConfirmation({
      content: '¿Está seguro que desea Declinar esta nomina?',
      onOk: () => {
        dispatch(
          updateNominas({
            condition: {
              ...record,
              estado_nomina: 'D',
              estado: 'I',
            },
          })
        )
      },
    })
  }
  const handleSubmit = (record: NominaType) => {
    CustomModalConfirmation({
      content: '¿Está seguro que desea Reversar esta nomina?',
      onOk: () => {
        dispatch(
          updateNominas({
            condition: {
              ...record,
              estado_nomina: 'U',
            },
          })
        )
      },
    })
  }
  const handleView = (record: NominaType) => {
    dispatch(getDetNominas({ condition: { id: Number(record?.id) } }))
    setView(true)
    setVisible(true)
  }

  const renderItem = (item: NominaType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip key={'view'} title={'Ver Nomina'}>
            <CustomButton
              onClick={() => {
                handleView(item)
              }}
              type={'link'}
              icon={
                <EyeOutlined
                  style={{
                    fontSize: '18px',
                  }}
                />
              }
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
                  {getInitials(
                    item.tipo_nomina?.split(' ')[0],
                    item.tipo_nomina?.split(' ')[1]
                  )}
                </span>
              }
            />
          }
          title={`${item.tipo_nomina} del mes de ${moment(
            item.fecha_insercion
          ).format('MMMM')}`}
          description={`Fecha Registro: ${moment(item?.fecha_registro)?.format(
            'DD/MM/YYYY'
          )} - Usuario: ${item?.usuario_insercion}`}
        />
      </CustomListItem>
    )
  }
  const handleUpdate = async () => {
    const data = await form.validateFields()
    dispatch(updateLack({ condition: { ...edit, ...data } }))
  }
  const handleCreate = async () => {
    const data = await form.validateFields()

    dispatch(
      createLack({
        condition: {
          ...data,
          id_empleado: employeeSelected?.id,
          usuario_insercion: getSessionInfo().usuario,
        },
      })
    )
  }
  const renderItemDet = (item: DetNominaType) => {
    return (
      <CustomListItem>
        <CustomListItemMeta
          avatar={
            <Avatar
              size={'large'}
              src={item.imagen}
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
          title={`Nombre: ${item.nombres} ${
            item.apellidos
          } - Cedula: ${formatter({
            value: item.doc_identidad,
            type: 'identity_doc',
          })} - Cargo: ${item.cargo} - Departamento: ${item.departamento}`}
          description={`Salario Bruto: ${formatter({
            value: item?.salario_bruto,
            type: 'currency',
          })}  -  Descuentos: ${formatter({
            value: item?.descuento,
            type: 'currency',
          })}  -  Ingresos: ${formatter({
            value: item?.ingresos,
            type: 'currency',
          })} - Sueldo Neto: ${formatter({
            value: item?.sueldo_neto,
            type: 'currency',
          })}`}
        />
      </CustomListItem>
    )
  }
  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(nomina, [searchTipoNomina], ['id_tipo_nomina'])?.filter(
            (item) => item.estado_nomina === 'D'
          ),
          'fecha_registro',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(nomina, [searchTipoNomina], ['id_tipo_nomina'])?.filter(
          (item) => item.estado_nomina === 'D'
        )
  }, [nomina, searchDate, searchTipoNomina])
  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomForm form={form}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Nominas Reversadas</CustomTitle>
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
                        placeholder={'Tipo Nomina'}
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
              <CustomList
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                renderItem={renderItem}
              />
              <CustomModal
                title={<CustomTitle>Detalles de la Nomina</CustomTitle>}
                width={'60%'}
                visible={visible}
                cancelText={view ? 'Salir' : 'Cancelar'}
                okButtonProps={{ hidden: view }}
                onCancel={() => {
                  setVisible(false)
                  setEdit(undefined)
                  setView(false)
                  form.resetFields()
                }}
                onOk={() => {
                  edit?.id ? handleUpdate() : handleCreate()
                }}
              >
                <CustomCol xs={24}>
                  <CustomList
                    dataSource={detNomina?.filter(
                      (item) => item.estado === 'A'
                    )}
                    pagination={{ pageSize: 100 }}
                    renderItem={renderItemDet}
                  />
                </CustomCol>
              </CustomModal>
            </CustomForm>
          </CustomCol>
        </CustomRow>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default ReversarNomina
