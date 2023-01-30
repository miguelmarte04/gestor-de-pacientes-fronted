import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  createLicences,
  getLicences,
  getTypeLicences,
  updateLicences,
} from '../slicers/employee/employee'
import { EmployeeType, PermissionType } from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import { filterArray, filterByDate, formatter } from '../utils/general'
import { CustomModalConfirmation } from './ConfirmModalMethod'
import CustomButton from './CustomButton'
import CustomCol from './CustomCol'
import CustomDivider from './CustomDivider'
import CustomForm from './CustomForm'
import CustomFormItem from './CustomFormItem'
import CustomInput from './CustomInput'
import CustomInputGroup from './CustomInputGroup'
import CustomList from './CustomList'
import CustomListItem from './CustomListItem'
import CustomListItemMeta from './CustomListItemMeta'
import CustomModal from './CustomModal'
import CustomRadio from './CustomRadio'
import CustomRadioGroup from './CustomRadioGroup'
import CustomRangePicker from './CustomRangePicker'
import CustomRow from './CustomRow'
import CustomSearch from './CustomSearch'
import CustomSearchEmployee from './CustomSearchEmployee'
import CustomSelect from './CustomSelect'
import CustomTextArea from './CustomTextArea'
import CustomTitle from './CustomTitle'
import CustomTooltip from './CustomTooltip'
import CustomUpload from './CustomUpload'
import { getSessionInfo } from '../utils/session'
import CustomPanel from './CustomPanel'
import CustomCollapse from './CustomCollapse'
import CustomDatePicker from './CustomRangePicker'
const Licenses = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { dataLicences, dataTypeLicences, createLicencesRequestStatus } =
    useAppSelector((state) => state.employee)
  const { departments } = useAppSelector((state) => state.general)
  useEffect(() => {
    dispatch(getTypeLicences({}))
    dispatch(getLicences({}))
  }, [])

  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
  }
  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<PermissionType>()
  const [view, setView] = useState(false)
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const [visible, setVisible] = useState(false)
  const [stateFilter, setStateFilter] = useState<string>('A')
  const [searchDepartamento, setSearchDepartamento] = useState('')
  const [searchTipo, setSearchTipo] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])
  useEffect(() => {
    employeeSelected &&
      form.setFieldsValue({
        ...employeeSelected,
        nombres: `${employeeSelected?.nombres} ${employeeSelected?.apellidos}`,
        doc_identidad: formatter({
          value: employeeSelected?.doc_identidad,
          type: 'identity_doc',
        }),
      })
  }, [employeeSelected])
  useEffect(() => {
    if (createLicencesRequestStatus === 'success') {
      dispatch(getLicences({}))
      form.resetFields()
      setVisible(false)
    }
  }, [createLicencesRequestStatus])

  const handleDelete = (record: PermissionType) => {
    dispatch(
      updateLicences({
        condition: {
          ...record,
          estado: record.estado === 'A' ? 'I' : 'A',
        },
      })
    )
  }
  const handleEdit = (record: PermissionType) => {
    setVisible(true)
    setEdit(record)
    form.setFieldsValue({
      ...record,
      nombres: `${record?.nombres} ${record?.apellidos}`,
      doc_identidad: formatter({
        value: record?.doc_identidad,
        type: 'identity_doc',
      }),
      fecha: [moment(record?.fecha_inicio), moment(record?.fecha_fin)],
      dias: `${moment(record?.fecha_fin).diff(
        moment(record?.fecha_inicio),
        'days'
      )} dias`,
      documento: record?.imagenes,
    })
  }
  const handleView = (record: PermissionType) => {
    setView(true)
    setVisible(true)
    form.setFieldsValue({
      ...record,
      nombres: `${record?.nombres} ${record?.apellidos}`,
      doc_identidad: formatter({
        value: record?.doc_identidad,
        type: 'identity_doc',
      }),
      fecha: [moment(record?.fecha_inicio), moment(record?.fecha_fin)],
      dias: `${moment(record?.fecha_fin).diff(
        moment(record?.fecha_inicio),
        'days'
      )} dias`,
      documento: record?.imagenes,
    })
  }

  const renderItem = (item: PermissionType) => {
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

          <CustomTooltip key={'view'} title={'Ver'}>
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
              src={item.imagenes}
              icon={
                item.imagenes ? null : (
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
          description={`${item.tipo_licencia} - ${moment(
            item.fecha_inicio
          ).format('DD/MM/YYYY')} - ${moment(item.fecha_fin).format(
            'DD/MM/YYYY'
          )}`}
        />
      </CustomListItem>
    )
  }
  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(
            dataLicences,
            [search, searchTipo, searchDepartamento],
            ['nombres', 'doc_identidad', 'tipo_licencia', 'id_departamento']
          )?.filter((item) => item.estado === stateFilter),
          'fecha_insercion',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(
          dataLicences,
          [search, searchTipo, searchDepartamento],
          ['nombres', 'doc_identidad', 'tipo_licencia', 'id_departamento']
        )?.filter((item) => item.estado === stateFilter)
  }, [
    searchDepartamento,
    dataLicences,
    search,
    searchDate,
    stateFilter,
    searchTipo,
  ])
  const handleUpdate = async () => {
    const data = await form.validateFields()
    dispatch(updateLicences({ condition: { ...edit, ...data } }))
  }
  const handleCreate = async () => {
    const data = await form.validateFields()

    dispatch(
      createLicences({
        condition: {
          ...data,
          id_empleado: employeeSelected?.id,
          fecha_inicio: moment(data.fecha[0]),
          fecha_fin: moment(data.fecha[1]),
          imagenes: data?.documento?.file?.url ?? data?.documento,
          usuario_insercion: getSessionInfo().usuario,
        },
      })
    )
  }
  return (
    <CustomRow justify={'end'}>
      <CustomCol xs={24}>
        <CustomForm form={form}>
          <CustomRow>
            <CustomDivider>
              <CustomTitle>Licencias</CustomTitle>
            </CustomDivider>

            <CustomCol xs={24} md={12} />
            <CustomCol xs={24} md={12}>
              <CustomRow justify={'end'} gutter={[10, 0]}>
                <CustomCol xs={20}>
                  <CustomFormItem noStyle name={'SEARCH'}>
                    <CustomSearch
                      className={'search'}
                      placeholder={'Buscar por nombre o documento de identidad'}
                      onChange={(e) => {
                        setSearch(e.target.value)
                      }}
                    />
                  </CustomFormItem>
                </CustomCol>

                <CustomCol xs={4} md={2} lg={3} xl={2}>
                  <CustomTooltip title={'Nuevo Licencia'}>
                    <CustomButton
                      icon={<PlusOutlined />}
                      shape={'circle'}
                      size={'middle'}
                      type={'primary'}
                      onClick={() => {
                        setVisible(true)
                      }}
                    />
                  </CustomTooltip>
                </CustomCol>
              </CustomRow>
            </CustomCol>

            <CustomCol span={12}>
              <CustomRow justify={'end'}>
                <CustomFormItem label={'Ver: '} className={'grupoPersona'}>
                  <CustomRadioGroup
                    value={stateFilter}
                    defaultValue={'A'}
                    onChange={(e) => {
                      setStateFilter(e.target.value)
                    }}
                  >
                    <CustomRadio value={'A'}>Activos</CustomRadio>
                    <CustomRadio value={'I'}>Inactivos</CustomRadio>
                  </CustomRadioGroup>
                </CustomFormItem>
              </CustomRow>
            </CustomCol>
          </CustomRow>
          <CustomCollapse
            style={{ width: '100%', marginTop: '2%', marginBottom: '1%' }}
          >
            <CustomPanel key={'1'} header={<CustomTitle>Filtros </CustomTitle>}>
              <CustomRow justify="start">
                <CustomCol xs={6} style={{ marginRight: '1%' }}>
                  <CustomSelect
                    placeholder={'Tipo Licencia'}
                    allowClear
                    onClear={() => setSearchTipo('')}
                    onSelect={(value) => {
                      setSearchTipo(value)
                    }}
                    options={dataTypeLicences?.map((item) => {
                      return {
                        label: item.tipo_licencia,
                        value: item.tipo_licencia,
                      }
                    })}
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
                    options={departments?.map((item) => {
                      return {
                        label: item.departamento,
                        value: item.id,
                      }
                    })}
                  />
                </CustomCol>

                <CustomCol xs={6}>
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
          <CustomModal
            title={
              <CustomTitle>
                {edit?.id
                  ? 'Editar Licencia'
                  : view
                  ? 'Licencia'
                  : 'Registrar Licencia'}
              </CustomTitle>
            }
            width={'50%'}
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
            {!(edit?.id || view) && (
              <CustomCol xs={24}>
                <CustomRow justify="end">
                  <CustomFormItem name={'SEARCH_EMPLOYEE'} noStyle>
                    <CustomSearchEmployee
                      width={'40%'}
                      showInitialValue
                      style={{ marginBottom: '2%' }}
                      placeholder={
                        'Buscar por: documento de identidad o nombres'
                      }
                      onSelect={(_, employee) => {
                        setEmployeeSelected(employee)
                      }}
                    />
                  </CustomFormItem>
                </CustomRow>
              </CustomCol>
            )}

            <CustomCol xs={24}>
              <CustomFormItem
                label={'Empleado'}
                rules={[{ required: true }]}
                labelCol={{ span: 6 }}
              >
                <CustomInputGroup compact>
                  <CustomFormItem
                    label={'Documento Identidad'}
                    noStyle
                    name={'doc_identidad'}
                    rules={[{ required: true }]}
                  >
                    <CustomInput
                      placeholder="Documento Identidad"
                      style={{ width: '30%' }}
                      disabled
                    />
                  </CustomFormItem>

                  <CustomFormItem
                    label={'Nombre'}
                    noStyle
                    name={'nombres'}
                    rules={[{ required: true }]}
                  >
                    <CustomInput
                      placeholder="Nombre"
                      style={{ width: '70%' }}
                      disabled
                    />
                  </CustomFormItem>
                </CustomInputGroup>
              </CustomFormItem>
            </CustomCol>

            <CustomCol xs={24}>
              <CustomFormItem
                label={'Tipos de Licencias'}
                name={'id_tipo_licencia'}
                rules={[{ required: true }]}
                labelCol={{ span: 6 }}
              >
                <CustomSelect
                  placeholder={'Seleccione Tipos de Licencias'}
                  disabled={view}
                  options={dataTypeLicences?.map((item) => ({
                    label: item.tipo_licencia,
                    value: item.id,
                  }))}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={'Fecha Inicio/Fin'}
                rules={[{ required: true }]}
                labelCol={{ span: 6 }}
              >
                <CustomInputGroup compact>
                  <CustomFormItem
                    name={'fecha'}
                    label={'Fecha'}
                    rules={[{ required: true }]}
                    noStyle
                  >
                    <CustomRangePicker
                      size="small"
                      disabled={view}
                      onChange={(e) => {
                        form.setFieldValue(
                          'dias',
                          `${moment(e[1]).diff(moment(e[0]), 'days')} dias`
                        )
                      }}
                    />
                  </CustomFormItem>
                  <CustomFormItem name={'dias'} noStyle>
                    <CustomInput
                      placeholder="Dias"
                      disabled
                      style={{ width: '15%' }}
                    />
                  </CustomFormItem>
                </CustomInputGroup>
              </CustomFormItem>
            </CustomCol>

            <CustomCol xs={24}>
              <CustomFormItem
                label={'Observaciones'}
                name={'observaciones'}
                labelCol={{ span: 6 }}
              >
                <CustomTextArea placeholder="Observaciones" disabled={view} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24} style={{ marginTop: '1%' }}>
              <CustomUpload
                form={form}
                disabled={view}
                // itemName={['documento']}
                name={'documento'}
                previewTitle={'Documento'}
                required={true}
                label={'Archivo'}
                labelCol={{ span: 6 }}
                accept={'.jpg, .jpeg, .png'}
              />
            </CustomCol>
          </CustomModal>
        </CustomForm>
      </CustomCol>
    </CustomRow>
  )
}

export default Licenses
