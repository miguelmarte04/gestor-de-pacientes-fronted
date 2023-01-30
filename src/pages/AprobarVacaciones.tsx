/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  createLack,
  getDetNominas,
  getLack,
  getNominas,
  getSolicitudVacaciones,
  updateLack,
  updateNominas,
  updateSolicitudVacaciones,
} from '../slicers/employee/employee'
import {
  EmployeeType,
  LacksType,
  SolicitarVacacionesType,
} from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import { formatter, searchInArray } from '../utils/general'
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
const AprobarVacaciones = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const {
    nominaRequestStatus,
    fetchingFromEmployee,
    nomina,
    detNomina,
    solicitudVacaciones,
    aumentoRequestStatus,
  } = useAppSelector((state) => state.employee)
  useEffect(() => {
    dispatch(getSolicitudVacaciones({}))
  }, [])

  const getInitials = (name: string, lastName: string) => {
    return `${name?.charAt(0).toUpperCase()}${lastName
      ?.charAt(0)
      .toUpperCase()}`
  }
  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<LacksType>()
  const [view, setView] = useState(false)
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (aumentoRequestStatus === 'success') {
      dispatch(getSolicitudVacaciones({}))
      form.resetFields()
      setVisible(false)
    }
  }, [aumentoRequestStatus])

  const handleDelete = (record: SolicitarVacacionesType) => {
    dispatch(
      updateSolicitudVacaciones({
        condition: {
          ...record,
          estado: 'I',
          estado_solicitud: 'D',
          usuario_insercion: getSessionInfo()?.usuario,
        },
      })
    )
  }

  const handleSubmit = (record: SolicitarVacacionesType) => {
    CustomModalConfirmation({
      content: '¿Está seguro que desea Aprobar esta Solicitud?',
      onOk: () => {
        dispatch(
          updateSolicitudVacaciones({
            condition: {
              ...record,
              estado_solicitud: 'A',
              usuario_insercion: getSessionInfo()?.usuario,
            },
          })
        )
      },
    })
  }

  const renderItem = (item: SolicitarVacacionesType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip key={'edit'} title={'Aprobar Solicitud de Vacaciones'}>
            <CustomButton
              disabled={item.estado === 'I'}
              onClick={() => handleSubmit(item)}
              type={'link'}
              icon={<CheckOutlined style={{ fontSize: '18px' }} />}
              className={'editPhoneButton'}
            />
          </CustomTooltip>,

          <CustomTooltip key={'delete'} title={'Declinar Solicitud'}>
            <CustomButton
              onClick={() => {
                CustomModalConfirmation({
                  content: '¿Está seguro que desea Declinar esta Solicitud?',
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
                  {getInitials(item.nombres, item.apellidos)}
                </span>
              }
            />
          }
          title={`${item.nombres} ${item.apellidos}`}
          description={`Fecha Inicio: ${moment(item?.fecha_inicio)?.format(
            'DD/MM/YYYY'
          )} - Fecha Fin: ${moment(item?.fecha_fin)?.format(
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

  const renderItemDet = (item: SolicitarVacacionesType) => {
    return (
      <CustomListItem>
        <CustomListItemMeta
          avatar={
            <Avatar
              size={'large'}
              // src={item.imagen}
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
        />
      </CustomListItem>
    )
  }
  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomForm form={form}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Aprobar Solicitudes de Vacaciones</CustomTitle>
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

              <CustomList
                dataSource={searchInArray(
                  solicitudVacaciones?.filter(
                    (item) => item.estado_solicitud === 'G'
                  ),
                  ['apellidos', 'nombres'],
                  search
                )}
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
                  handleUpdate()
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

export default AprobarVacaciones
