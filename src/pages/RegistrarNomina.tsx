import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  createDescuentosEmpleados,
  createDetNomina,
  createIngresosEmpleado,
  getDescuentosEmpleados,
  getDescuentosFijos,
  getDetNominas,
  getHistoryChange,
  getIngresosEmpleado,
  getNominas,
  registerNominas,
  updateDetNominas,
  updateIngresosEmpleado,
  updateNominas,
} from '../slicers/employee/employee'
import {
  DescuentosEmpleadosType,
  DetNominaType,
  EmployeeType,
  NominaType,
} from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomModal from '../components/CustomModal'
import CustomRow from '../components/CustomRow'
import CustomSelect from '../components/CustomSelect'
import CustomTextArea from '../components/CustomTextArea'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import { getSessionInfo } from '../utils/session'
import moment from 'moment'
import {
  filterArray,
  filterByDate,
  formatter,
  showNotification,
} from '../utils/general'
import { setDetNominas } from '../slicers/employee'
import CustomTable from '../components/CustomTable'
import { ColumnType } from 'antd/lib/table'
import CustomRadioGroup from '../components/CustomRadioGroup'
import CustomRadio from '../components/CustomRadio'
import CustomInput from '../components/CustomInput'
import CustomInputNumber from '../components/CustomInputNumber'
import CustomSpace from '../components/CustomSpace'
import { updateDescuentosEmpleados } from '../slicers/employee/employee'
import CustomSearchEmployee from '../components/CustomSearchEmployee'
import CustomDatePicker from '../components/CustomRangePicker'
import CustomCollapse from '../components/CustomCollapse'
import CustomPanel from '../components/CustomPanel'
const RegistrarNomina = (): React.ReactElement => {
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  const dispatch = useAppDispatch()
  const [searchTipoNomina, setSearchTipoNomina] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])
  const {
    nominaRequestStatus,
    nominaDetRequestStatus,
    fetchingFromEmployee,
    historyChange,
    nomina,
    descuentos_fijos,
    detNomina,
    ingresosEmpleado,
    descuentosEmpleados,
    descuentoEmpleadosResponse,
    detNominaEmpleadosResponse,
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
    return `${name?.charAt(0)?.toUpperCase()}${lastName
      ?.charAt(0)
      ?.toUpperCase()}`
  }
  const [edit, setEdit] = useState<NominaType>()
  const [abrirNomina, setAbrirNomina] = useState<NominaType>()
  const [descuento, setDescuento] = useState<DetNominaType>()
  const [editDescuentosEmpleados, setEditDescuentosEmpleados] =
    useState<DescuentosEmpleadosType>()
  const [editIngresosEmpleados, setEditIngresosEmpleados] =
    useState<DescuentosEmpleadosType>()
  const [selectedEmployee, setSelectedEmployee] = useState<
    EmployeeType & {
      key?: React.Key
    }
  >()
  const [view, setView] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleAbrirNomina, setVisibleAbrirNomina] = useState(false)
  const [visibleDescuentos, setVisibleDescuentos] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleDescuentosEmpleado, setVisibleDescuentosEmpleado] =
    useState(false)
  const [visibleIngresosEmpleado, setVisibleIngresosEmpleado] = useState(false)
  const [stateFilter, setStateFilter] = useState<string>('A')
  const data = historyChange?.find(
    (item) => item?.id_tipo_nomina === abrirNomina?.[0]?.id
  )

  useEffect(() => {
    if (
      nominaRequestStatus === 'success' ||
      nominaDetRequestStatus === 'success' ||
      descuentoEmpleadosResponse === 'success' ||
      detNominaEmpleadosResponse === 'success'
    ) {
      dispatch(getNominas({}))
      abrirNomina?.id &&
        dispatch(getDetNominas({ condition: { id: Number(abrirNomina?.id) } }))
      form.resetFields()
      form2.resetFields()
      setVisible(false)
      setVisibleModal(false)
    }
  }, [
    nominaRequestStatus,
    nominaDetRequestStatus,
    descuentoEmpleadosResponse,
    detNominaEmpleadosResponse,
  ])

  const handleDelete = (record: NominaType) => {
    dispatch(
      updateNominas({
        condition: {
          ...record,
          estado_nomina: 'I',
          estado: 'I',
        },
      })
    )
  }
  const handleDeleteDetNomina = (record: DetNominaType) => {
    dispatch(
      updateDetNominas({
        condition: {
          id: record.id,
          estado: record.estado === 'A' ? 'I' : 'A',
          usuario_insercion: getSessionInfo()?.usuario,
        },
      })
    )
  }
  const handleEdit = (record: NominaType) => {
    setVisible(true)
    setEdit(record)
    form.setFieldsValue({
      ...record,
    })
  }
  const handleAbrir = (record: NominaType) => {
    setAbrirNomina(record)
    setVisibleAbrirNomina(true)
  }
  const handleDescuentos = (record: DetNominaType) => {
    setDescuento(record)
    setVisibleDescuentos(true)
  }
  useEffect(() => {
    if (descuentoEmpleadosResponse === 'success') {
      dispatch(
        getDescuentosEmpleados({
          id: descuento?.id_empleado,
          id_nomina: descuento?.id_nomina,
        })
      )
      dispatch(
        getIngresosEmpleado({
          id: descuento?.id_empleado,
          id_nomina: descuento?.id_nomina,
        })
      )
      form.resetFields()
      setVisibleDescuentosEmpleado(false)
      setVisibleIngresosEmpleado(false)
    }
  }, [descuentoEmpleadosResponse])

  const renderItem = (item: NominaType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip
            key={'edit'}
            title={
              item.estado === 'A' || item.estado === 'U'
                ? 'Editar'
                : 'Inactivo, no permite edición'
            }
          >
            <CustomButton
              disabled={item.estado === 'I'}
              onClick={() => handleEdit(item)}
              type={'link'}
              icon={<EditOutlined style={{ fontSize: '18px' }} />}
              className={'editPhoneButton'}
            />
          </CustomTooltip>,

          <CustomTooltip key={'view'} title={'Abrir Nomina'}>
            <CustomButton
              onClick={() => {
                dispatch(getDetNominas({ condition: { id: item.id } }))
                handleAbrir(item)
              }}
              type={'link'}
              icon={
                <CheckOutlined
                  style={{
                    fontSize: '18px',
                  }}
                />
              }
            />
          </CustomTooltip>,

          <CustomTooltip
            key={'delete'}
            title={
              item.estado === 'A' || item.estado === 'U'
                ? 'Inhabilitar'
                : 'Habilitar'
            }
          >
            <CustomButton
              onClick={() => {
                CustomModalConfirmation({
                  content:
                    item.estado === 'A'
                      ? '¿Está seguro que desea eliminar el registro?'
                      : '¿Está seguro que desea habilitar el registro?',
                  onOk: () => {
                    handleDelete(item)
                  },
                })
              }}
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
                    className="disabledColor"
                    style={{ fontSize: '18px' }}
                  />
                )
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
          description={`Usuario: ${item?.usuario_insercion}`}
        />
      </CustomListItem>
    )
  }

  const renderItemDet = (item: DetNominaType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip
            key={'view'}
            title={
              data?.descuentos_fijos === 'N' &&
              data?.descuentos_empleado === 'N'
                ? 'Este tipo de nomina no permite agregar descuentos'
                : 'Agregar Descuentos'
            }
          >
            <CustomButton
              disabled={
                item.estado === 'I' ||
                (data?.descuentos_fijos === 'N' &&
                  data?.descuentos_empleado === 'N' &&
                  data?.ingresos_empleados === 'N')
              }
              onClick={() => {
                dispatch(
                  getDescuentosFijos({ condition: { id: item.id_empleado } })
                )
                dispatch(
                  getDescuentosEmpleados({
                    id: item.id_empleado,
                    id_nomina: item.id_nomina,
                  })
                )
                dispatch(
                  getIngresosEmpleado({
                    id: item.id_empleado,
                    id_nomina: item.id_nomina,
                  })
                )

                handleDescuentos(item)
              }}
              type={'link'}
              icon={
                <PlusOutlined
                  style={{
                    fontSize: '18px',
                  }}
                />
              }
            />
          </CustomTooltip>,

          <CustomTooltip
            key={'delete'}
            title={item.estado === 'A' ? 'Excluir' : 'Incluir'}
          >
            <CustomButton
              onClick={() => {
                CustomModalConfirmation({
                  content:
                    item.estado === 'A'
                      ? '¿Está seguro que desea Excluir a este empleado de la nomina?'
                      : '¿Está seguro que desea Incluir a este empleado a la nomina?',
                  onOk: () => {
                    handleDeleteDetNomina(item)
                  },
                })
              }}
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
                    className="disabledColor"
                    style={{ fontSize: '18px' }}
                  />
                )
              }
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
  const handleUpdate = async () => {
    const data = await form.validateFields()
    dispatch(updateNominas({ condition: { ...edit, ...data } }))
  }
  const handleCreate = async () => {
    const data = await form.validateFields()
    dispatch(
      registerNominas({
        condition: {
          ...data,
          usuario_insercion: getSessionInfo().usuario,
        },
      })
    )
  }

  const columns: ColumnType<unknown>[] = [
    {
      dataIndex: 'sueldo_bruto',
      title: 'Sueldo Bruto',
      key: 'sueldo_bruto',
    },
    {
      dataIndex: 'ISR',
      title: 'ISR',
      key: 'ISR',
    },
    {
      dataIndex: 'AFP',
      title: 'AFP',
      key: 'AFP',
    },
    {
      dataIndex: 'SFS',
      title: 'SFS',
      key: 'SFS',
    },
    {
      dataIndex: 'total_descuento',
      title: 'Total Descuento',
      key: 'total_descuento',
    },
  ]
  const columnsDescuentos: ColumnType<DescuentosEmpleadosType>[] = [
    {
      dataIndex: 'nombre',
      title: 'Nombre',
      key: 'nombre',
    },
    {
      dataIndex: 'monto',
      title: 'Monto',
      key: 'monto',
    },
    {
      dataIndex: 'descripcion',
      title: 'Descripcion',
      key: 'descripcion',
    },
    {
      key: 'ACCIONES',
      title: 'Acciones',
      dataIndex: 'ACCIONES',
      width: '10%',
      render: (_, record) => {
        return (
          <CustomSpace>
            <CustomTooltip title={'Editar'}>
              <CustomButton
                disabled={record.estado === 'I'}
                onClick={() => {
                  setVisibleDescuentosEmpleado(true)
                  setEditDescuentosEmpleados(record)
                  form.setFieldsValue(record)
                }}
                type={'link'}
                icon={<EditOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>
            <CustomTooltip title={'Inhabilitar'}>
              <CustomButton
                onClick={() => {
                  CustomModalConfirmation({
                    content:
                      '¿Está seguro que desea inhabilitar este descuento?',

                    onOk: () => {
                      dispatch(
                        updateDescuentosEmpleados({ ...record, estado: 'I' })
                      )
                    },
                  })
                }}
                type={'link'}
                icon={
                  <StopOutlined
                    className="disabledColor"
                    style={{ fontSize: '18px' }}
                  />
                }
              />
            </CustomTooltip>
          </CustomSpace>
        )
      },
    },
  ]
  const columnIngresos: ColumnType<DescuentosEmpleadosType>[] = [
    {
      dataIndex: 'nombre',
      title: 'Nombre',
      key: 'nombre',
    },
    {
      dataIndex: 'monto',
      title: 'Monto',
      key: 'monto',
    },
    {
      dataIndex: 'descripcion',
      title: 'Descripcion',
      key: 'descripcion',
    },
    {
      key: 'ACCIONES',
      title: 'Acciones',
      dataIndex: 'ACCIONES',
      width: '10%',
      render: (_, record) => {
        return (
          <CustomSpace>
            <CustomTooltip title={'Editar'}>
              <CustomButton
                disabled={record.estado === 'I'}
                onClick={() => {
                  setVisibleIngresosEmpleado(true)
                  setEditIngresosEmpleados(record)
                  form.setFieldsValue(record)
                }}
                type={'link'}
                icon={<EditOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>
            <CustomTooltip title={'Inhabilitar'}>
              <CustomButton
                onClick={() => {
                  CustomModalConfirmation({
                    content:
                      '¿Está seguro que desea inhabilitar este descuento?',

                    onOk: () => {
                      dispatch(
                        updateIngresosEmpleado({ ...record, estado: 'I' })
                      )
                    },
                  })
                }}
                type={'link'}
                icon={
                  <StopOutlined
                    className="disabledColor"
                    style={{ fontSize: '18px' }}
                  />
                }
              />
            </CustomTooltip>
          </CustomSpace>
        )
      },
    },
  ]
  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(nomina, [searchTipoNomina], ['id_tipo_nomina'])?.filter(
            (item) => item.estado_nomina === 'G'
          ),
          'fecha_registro',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(nomina, [searchTipoNomina], ['id_tipo_nomina'])?.filter(
          (item) => item.estado_nomina === 'G'
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
                  <CustomTitle>Nominas</CustomTitle>
                </CustomDivider>

                <CustomCol xs={12} />
                <CustomCol xs={12}>
                  <CustomRow justify={'end'}>
                    <CustomCol xs={6}>
                      <CustomTooltip title={'Nueva Solicitud de Nomina'}>
                        <CustomButton
                          icon={<PlusOutlined />}
                          shape={'circle'}
                          size={'middle'}
                          type={'primary'}
                          onClick={() => {
                            setVisible(true)
                          }}
                        >
                          Nueva Solicitud
                        </CustomButton>
                      </CustomTooltip>
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
                title={
                  <CustomTitle>
                    {edit?.id_tipo_nomina
                      ? 'Editar Nomina'
                      : view
                      ? 'Nomina'
                      : 'Registrar Nomina'}
                  </CustomTitle>
                }
                width={'50%'}
                visible={visible}
                cancelText={view ? 'Salir' : 'Cancelar'}
                okButtonProps={{ hidden: view }}
                onCancel={() => {
                  setEdit(undefined)
                  setVisible(false)
                  setView(false)
                  form.resetFields()
                }}
                onOk={() => {
                  edit?.id_tipo_nomina ? handleUpdate() : handleCreate()
                }}
              >
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Tipo de Nomina'}
                    name={'id_tipo_nomina'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomSelect
                      placeholder={'Seleccione la nomina'}
                      disabled={view}
                      options={historyChange?.map((item) => ({
                        label: item.tipo_nomina,
                        value: item.id,
                      }))}
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Descripcion'}
                    name={'descripcion'}
                    labelCol={{ span: 6 }}
                    rules={[{ required: true }]}
                  >
                    <CustomTextArea placeholder="Descripcion" disabled={view} />
                  </CustomFormItem>
                </CustomCol>
              </CustomModal>
              <CustomModal
                width={'75%'}
                visible={visibleAbrirNomina}
                closable={false}
                footer={null}
                title={`${abrirNomina?.tipo_nomina} del mes de ${moment(
                  abrirNomina?.fecha_insercion
                ).format('MMMM')}`}
                onOk={() => {
                  edit?.id_tipo_nomina ? handleUpdate() : handleCreate()
                }}
              >
                <CustomRow justify="end">
                  <CustomCol xs={3} style={{ marginLeft: '1%' }}>
                    <CustomButton
                      type={'primary'}
                      onClick={() => {
                        setVisibleModal(true)
                      }}
                    >
                      Agregar Empleado
                    </CustomButton>
                  </CustomCol>
                </CustomRow>
                <CustomCol xs={24}>
                  <CustomRow justify={'end'}>
                    <CustomFormItem label={'Ver: '} className={'grupoPersona'}>
                      <CustomRadioGroup
                        value={stateFilter}
                        defaultValue={'A'}
                        onChange={(e) => {
                          setStateFilter(e.target.value)
                        }}
                      >
                        <CustomRadio value={'A'}>Incluidos</CustomRadio>
                        <CustomRadio value={'I'}>Excluidos</CustomRadio>
                      </CustomRadioGroup>
                    </CustomFormItem>
                  </CustomRow>
                </CustomCol>

                <CustomCol xs={24}>
                  <CustomList
                    dataSource={detNomina?.filter(
                      (item) => item.estado === stateFilter
                    )}
                    pagination={{ pageSize: 100 }}
                    renderItem={renderItemDet}
                  />
                </CustomCol>
                <CustomCol xs={24} style={{ marginTop: '2%' }}>
                  <CustomRow justify="end">
                    <CustomButton
                      danger
                      style={{ marginRight: '1%' }}
                      onClick={() => {
                        setVisibleAbrirNomina(false)
                        setAbrirNomina(undefined)
                        form.resetFields()
                        dispatch(setDetNominas())
                      }}
                    >
                      Salir
                    </CustomButton>
                    <CustomButton
                      type={'primary'}
                      onClick={() => {
                        CustomModalConfirmation({
                          content:
                            '¿Está seguro que desea registrar la nomina?',
                          onOk: () => {
                            dispatch(
                              updateNominas({
                                condition: {
                                  ...abrirNomina,
                                  estado_nomina: 'R',
                                  fecha_registro: new Date(),
                                },
                              })
                            )
                            setVisibleAbrirNomina(false)
                            setAbrirNomina(undefined)
                            form.resetFields()
                            dispatch(setDetNominas())
                          },
                        })
                      }}
                    >
                      Registrar
                    </CustomButton>
                  </CustomRow>
                </CustomCol>
              </CustomModal>
              <CustomModal
                width={'60%'}
                cancelText={'Salir'}
                title={'Agregar Descuento'}
                okButtonProps={{ hidden: true }}
                visible={visibleDescuentos}
                onCancel={() => {
                  setVisibleDescuentos(false)
                  form.resetFields()
                }}
              >
                <CustomRow justify="space-between">
                  {data?.descuentos_fijos === 'S' && (
                    <CustomCol xs={24}>
                      <CustomTable
                        columns={columns}
                        dataSource={descuentos_fijos}
                        title={() => (
                          <CustomTitle>{'Descuentos Fijos'}</CustomTitle>
                        )}
                        pagination={{ pageSize: 1 }}
                      />
                    </CustomCol>
                  )}

                  <CustomCol xs={24} style={{ marginTop: '2%' }}>
                    <CustomRow justify="space-between">
                      {data?.descuentos_empleado === 'S' ? (
                        <CustomCol xs={11}>
                          <CustomTable
                            columns={columnsDescuentos}
                            dataSource={descuentosEmpleados?.filter(
                              (item) => item.estado === 'A'
                            )}
                            pagination={{ pageSize: 5 }}
                            title={() => (
                              <CustomCol xs={24}>
                                <CustomRow justify="space-between">
                                  <CustomTitle>
                                    {'Descuentos del empleado'}
                                  </CustomTitle>

                                  <CustomButton
                                    icon={<PlusOutlined />}
                                    type={'primary'}
                                    onClick={() => {
                                      setVisibleDescuentosEmpleado(true)
                                    }}
                                  >
                                    Agregar
                                  </CustomButton>
                                </CustomRow>
                              </CustomCol>
                            )}
                          />
                        </CustomCol>
                      ) : (
                        <CustomCol xs={11} />
                      )}
                      {data?.ingresos_empleados === 'S' && (
                        <CustomCol xs={11}>
                          <CustomTable
                            columns={columnIngresos}
                            dataSource={ingresosEmpleado?.filter(
                              (item) => item.estado === 'A'
                            )}
                            pagination={{ pageSize: 5 }}
                            title={() => (
                              <CustomCol xs={24}>
                                <CustomRow justify="space-between">
                                  <CustomTitle>
                                    {'Ingresos del empleado'}
                                  </CustomTitle>

                                  <CustomButton
                                    icon={<PlusOutlined />}
                                    type={'primary'}
                                    onClick={() => {
                                      setVisibleIngresosEmpleado(true)
                                    }}
                                  >
                                    Agregar
                                  </CustomButton>
                                </CustomRow>
                              </CustomCol>
                            )}
                          />
                        </CustomCol>
                      )}
                    </CustomRow>
                  </CustomCol>
                </CustomRow>
              </CustomModal>
              <CustomModal
                width={'40%'}
                title={
                  editDescuentosEmpleados?.id
                    ? 'Editar Descuento'
                    : 'Registrar Descuento'
                }
                visible={visibleDescuentosEmpleado}
                onCancel={() => {
                  setVisibleDescuentosEmpleado(false)
                  setDescuento(undefined)
                  form.resetFields()
                }}
                onOk={async () => {
                  const data = await form.validateFields()
                  if (editDescuentosEmpleados?.id) {
                    dispatch(
                      updateDescuentosEmpleados({
                        ...editDescuentosEmpleados,
                        ...data,
                      })
                    )
                  } else {
                    dispatch(
                      createDescuentosEmpleados({
                        ...data,
                        id_nomina: descuento?.id_nomina,
                        id_empleado: descuento?.id_empleado,
                        usuario_insercion: getSessionInfo()?.usuario,
                      })
                    )
                  }
                }}
              >
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Nombre'}
                    name={'nombre'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInput placeholder="Nombre del descuento" />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Monto'}
                    name={'monto'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInputNumber
                      placeholder="Monto"
                      style={{ width: '100%' }}
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Descripcion'}
                    name={'descripcion'}
                    labelCol={{ span: 6 }}
                    rules={[{ required: true }]}
                  >
                    <CustomTextArea placeholder="Descripcion" disabled={view} />
                  </CustomFormItem>
                </CustomCol>
              </CustomModal>
              <CustomModal
                width={'40%'}
                title={
                  editIngresosEmpleados?.id
                    ? 'Editar Ingreso'
                    : 'Registrar Ingreso'
                }
                visible={visibleIngresosEmpleado}
                onCancel={() => {
                  setVisibleIngresosEmpleado(false)
                  setDescuento(undefined)
                  form.resetFields()
                }}
                onOk={async () => {
                  const data = await form.validateFields()

                  if (editIngresosEmpleados?.id) {
                    dispatch(
                      updateIngresosEmpleado({
                        ...editIngresosEmpleados,
                        ...data,
                      })
                    )
                  } else {
                    dispatch(
                      createIngresosEmpleado({
                        condition: {
                          ...data,
                          id_nomina: descuento?.id_nomina,
                          id_empleado: descuento?.id_empleado,
                          usuario_insercion: getSessionInfo()?.usuario,
                        },
                      })
                    )
                  }
                }}
              >
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Nombre'}
                    name={'nombre'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInput placeholder="Nombre del descuento" />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Monto'}
                    name={'monto'}
                    rules={[{ required: true }]}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInputNumber
                      placeholder="Monto"
                      style={{ width: '100%' }}
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={'Descripcion'}
                    name={'descripcion'}
                    labelCol={{ span: 6 }}
                    rules={[{ required: true }]}
                  >
                    <CustomTextArea placeholder="Descripcion" disabled={view} />
                  </CustomFormItem>
                </CustomCol>
              </CustomModal>
              <CustomModal
                width={'40%'}
                title={'Registrar Empleado'}
                visible={visibleModal}
                onCancel={() => {
                  setVisibleModal(false)
                  form2.resetFields()
                }}
                onOk={async () => {
                  await form2.validateFields()
                  const data = detNomina?.find(
                    (item) => item.id_empleado === selectedEmployee?.id
                  )?.estado

                  if (selectedEmployee?.id && data === undefined) {
                    dispatch(
                      createDetNomina({
                        condition: {
                          id_nomina: abrirNomina?.id,
                          id_empleado: selectedEmployee?.id,
                          salario_bruto: selectedEmployee?.sueldo ?? 0,
                          usuario_insercion: getSessionInfo()?.usuario,
                        },
                      })
                    )
                  } else {
                    if (data === 'I') {
                      showNotification({
                        type: 'error',
                        description:
                          'El empleado ya se encuentra en la nómina, esta en Excluidos',
                        title: 'Error',
                      })
                    } else {
                      showNotification({
                        type: 'error',
                        description: 'El empleado ya se encuentra en la nómina',
                        title: 'Error',
                      })
                    }
                  }
                }}
              >
                <CustomForm form={form2}>
                  <CustomCol xs={24}>
                    <CustomFormItem
                      name={'SEARCH_EMPLOYEE_NOMINA'}
                      rules={[{ required: true }]}
                      label={'Empleado'}
                    >
                      <CustomSearchEmployee
                        showInitialValue
                        style={{ marginBottom: '2%' }}
                        placeholder={
                          'Buscar por: documento de identidad o nombres'
                        }
                        onSelect={(_, employee) => {
                          setSelectedEmployee(employee)
                        }}
                      />
                    </CustomFormItem>
                  </CustomCol>
                </CustomForm>
              </CustomModal>
            </CustomForm>
          </CustomCol>
        </CustomRow>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default RegistrarNomina
