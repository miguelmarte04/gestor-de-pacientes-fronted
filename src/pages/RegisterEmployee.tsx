import React, { useEffect, useState } from 'react'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import { Steps } from '../constants/types'
import CustomForm from '../components/CustomForm'
import CustomSpin from '../components/CustomSpin'
import CustomSteps from '../components/CustomSteps'
import CustomStep from '../components/CustomStep'
import CustomSpace from '../components/CustomSpace'
import GeneralDataEmployee from '../components/GeneralDataEmployee'
import { Form, Modal } from 'antd'
import CustomButton from '../components/CustomButton'
import CustomRow from '../components/CustomRow'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SaveOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { EMPLOYEES } from '../constants/Routes'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
import DataEmployee from '../components/DataEmployee'
import ContactDataEmployee from '../components/ContactDataEmployee'
import { getAge, showNotification } from '../utils/general'
import { getSessionInfo } from '../utils/session'
import moment from 'moment'
import { format } from '../constants/general'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  getDataEmployee,
  resetEmployeeState,
  updateEmployee,
  updateEmploymentData,
  updateStateEmployee,
} from '../slicers/employee'
import {
  getCargos,
  getDepartments,
  getPaymentType,
  getPayroll,
  getPhoneTypes,
  // getRelationShip,
  getWorkingDay,
  setEditingMode,
  setNextLocation,
  setStepPosition,
} from '../slicers/general'
import { createEmployee, getHistoryChange } from '../slicers/employee/employee'
import Documents from '../components/Documents'

const RegisterEmployee = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const history = useNavigate()
  const [createEmployeeSend, setCreateEmployeeSend] = useState<boolean>(false)
  const [change, setChange] = useState<boolean>(false)
  const [editing, setEditing] = useState(false)
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
  const [visibleModalConfirmChange, setVisibleModalConfirmChange] =
    useState(false)
  const { fetchingFromEmployee } = useAppSelector((state) => state.employee)
  const { dataEmployee, phone, EmployeeUpdated, employmentDataUpdated } =
    useAppSelector((state) => state.employee)
  const { isEditing, stepPosition } = useAppSelector((state) => state.general)

  useEffect(() => {
    const condition = {}
    dispatch(getDepartments(condition))
    dispatch(getPaymentType(condition))
    dispatch(getCargos(condition))
    dispatch(getWorkingDay(condition))
    dispatch(getPayroll(condition))
    dispatch(getPhoneTypes(condition))
    dispatch(
      getHistoryChange({
        condition: {
          id: 1,
          tipo: 'tipos_nominas',
        },
      })
    )

    // dispatch(
    //   getRelationShip({
    //     condition: {},
    //   })
    // )
  }, [])

  useEffect(() => {
    return () => {
      isEditing && dispatch(setEditingMode(false))
    }
  }, [])

  useEffect(() => {
    if (employmentDataUpdated?.id) {
      dispatch(
        getDataEmployee({
          condition: {
            id: `${dataEmployee?.id}`,
          },
        })
      )
    }
  }, [employmentDataUpdated])

  useEffect(() => {
    if (dataEmployee?.id) {
      if (dataEmployee?.id && createEmployeeSend === false) {
        setEditing(true)
      }
      form.setFieldsValue({
        ...dataEmployee,
        id_departamento:
          dataEmployee?.id_departamento !== 0
            ? dataEmployee.id_departamento
            : undefined,
        id_cargo:
          dataEmployee?.id_cargo !== 0 ? dataEmployee.id_cargo : undefined,

        id_empleado: dataEmployee.id,
        fecha_nacimiento: moment(dataEmployee?.fecha_nacimiento).format(
          'DD/MM/YYYY'
        ),
        doc_identidad: format({
          value: dataEmployee?.doc_identidad,
          type: 'cedula',
        }),

        id_jornada_trabajo:
          dataEmployee?.id_jornada_trabajo !== 0
            ? dataEmployee?.id_jornada_trabajo
            : undefined,
        id_tipo_pago:
          dataEmployee?.id_tipo_pago !== 0
            ? dataEmployee?.id_tipo_pago
            : undefined,

        hora_entrada: dataEmployee?.hora_entrada
          ? moment(dataEmployee?.hora_entrada, 'HH:mm')
          : undefined,

        edad: `${getAge(
          moment(dataEmployee?.fecha_nacimiento).format('YYYY-MM-DD')
        )} años`,
        honorifico: dataEmployee?.honorifico === 'S' ? true : false,
        fecha_contratacion: moment(dataEmployee?.fecha_contratacion).format(
          'DD/MM/YYYY'
        ),
      })
    } else {
      setEditing(false)
      form.resetFields()
    }
  }, [dataEmployee, stepPosition])

  const handleBack = () => {
    dispatch(setStepPosition(stepPosition - 1))
  }

  useEffect(() => {
    dataEmployee?.id &&
      dispatch(
        getDataEmployee({
          condition: {
            id: `${dataEmployee.id}`,
          },
        })
      )
  }, [EmployeeUpdated])

  const steps: Steps[] = [
    {
      title: 'Datos Generales',
      description: 'Información Básica',
      node: <GeneralDataEmployee form={form} editing={editing} />,
      key: 'general',
    },
    {
      title: 'Datos del Empleo',
      description: 'Información del Empleo',
      node: <DataEmployee form={form} />,
      key: 'empleo',
    },
    {
      title: 'Direcciones y Contactos',
      description: 'Direcciones y Contactos del Empleado',
      node: <ContactDataEmployee id={Number(dataEmployee?.id)} form={form} />,
      key: 'contactos',
    },
    {
      title: 'Documentos',
      description: 'Documentos del Empleado',
      node: <Documents form={form} />,
      key: 'documentos',
    },
  ]

  const handleNext = async () => {
    const data = await form.validateFields()
    // eslint-disable-next-line no-console
    console.log(data.fecha_contratacion)
    delete data.id
    const employee = { ...dataEmployee, ...data }
    if (editing) {
      switch (steps[stepPosition]?.key) {
        case 'general':
          delete employee.usuario_insercion
          delete employee.ultima_fecha_insercion
          delete employee.id_empleado
          delete employee.edad
          delete employee.id_tipo_pago
          delete employee.numero_cuenta_electronica
          delete employee.pass
          delete employee.numero_cuenta_electronica
          delete employee.id_tipo_pago
          delete employee.honorifico
          delete employee.id_tipo_nomina
          delete employee.id_privilegios

          dispatch(
            updateEmployee({
              condition: {
                ...employee,
                id: dataEmployee.id,
                doc_identidad: dataEmployee?.doc_identidad?.replaceAll('-', ''),
                fecha_nacimiento: dataEmployee.fecha_nacimiento,
                usuario_insercion: getSessionInfo().usuario,
              },
            })
          )
          setCreateEmployeeSend(true)
          break
        case 'empleo':
          dispatch(
            updateEmploymentData({
              condition: {
                ...data,
                id: employee.id,
                honorifico: data.honorifico ? 'S' : 'N',
                fecha_contratacion: moment(
                  data.fecha_contratacion,
                  'DD/MM/YYYY',
                  true
                ).toISOString(),
                usuario_insercion: getSessionInfo().usuario,
              },
            })
          )
          setCreateEmployeeSend(true)
          break
        case 'contactos':
          if (phone?.length > 0) {
            dispatch(setStepPosition(stepPosition + 1))
          } else {
            showNotification({
              title: 'Aviso',
              description: 'Debe registrar al menos un teléfono',
              type: 'warning',
            })
          }
          break
        case 'documentos':
          if (dataEmployee?.estado === 'U') {
            dispatch(
              updateStateEmployee({
                condition: {
                  id: dataEmployee.id,
                  estado: 'A',
                  usuario_insercion: getSessionInfo().usuario,
                  accion: 'registar',
                },
              })
            )
          }
          dispatch(setNextLocation(''))
          dispatch(resetEmployeeState())
          dispatch(setStepPosition(0))
          Modal.destroyAll()
          history(EMPLOYEES)
          break
        default:
          dispatch(setStepPosition(stepPosition + 1))
          break
      }
    } else {
      switch (steps[stepPosition]?.key) {
        case 'general':
          delete data.edad

          dispatch(
            createEmployee({
              condition: {
                ...data,
                doc_identidad: data?.doc_identidad?.replaceAll('-', ''),
                usuario_insercion: getSessionInfo().usuario,
                fecha_nacimiento: moment(
                  data.fecha_nacimiento,
                  'DD/MM/YYYY',
                  true
                ).toISOString(),
              },
            })
          )
          setCreateEmployeeSend(true)
          break
        case 'empleo':
          dispatch(
            updateEmploymentData({
              condition: {
                ...data,
                id: employee.id,
                honorifico: data.honorifico ? 'S' : 'N',
                fecha_contratacion: moment(
                  data.fecha_contratacion,
                  'DD/MM/YYYY',
                  true
                ).toISOString(),
                usuario_insercion: getSessionInfo().usuario,
              },
            })
          )
          setCreateEmployeeSend(true)
          break
        case 'contactos':
          if (phone?.length > 0) {
            dispatch(
              updateStateEmployee({
                condition: {
                  id: dataEmployee?.id,
                  estado: 'A',
                  usuario_insercion: getSessionInfo().usuario,
                },
              })
            )
            dispatch(setStepPosition(stepPosition + 1))
          } else {
            showNotification({
              title: 'Aviso',
              description: 'Debe registrar al menos un teléfono',
              type: 'warning',
            })
          }
          break
        case 'documentos':
          dispatch(setNextLocation(''))
          dispatch(resetEmployeeState())
          dispatch(setStepPosition(0))
          Modal.destroyAll()
          history(EMPLOYEES)
          break
        default:
          dispatch(setStepPosition(stepPosition + 1))
          break
      }
    }
  }

  const handleCancel = () => {
    setVisibleModalConfirm(true)
    CustomModalConfirmation({
      title: 'Cancelar',
      content: 'Desea detener el proceso de registro?',
      visible: visibleModalConfirm,
      onOk: () => {
        dispatch(setNextLocation(''))
        dispatch(resetEmployeeState())
        Modal.destroyAll()
        history(EMPLOYEES)
      },
    })
  }

  const handleOnStepChange = async (current: number) => {
    if (change) {
      setVisibleModalConfirmChange(true)
      CustomModalConfirmation({
        title: 'Advertencia',
        content: 'Tiene cambios sin guardar, desea Actualizar y Continuar?',
        visible: visibleModalConfirmChange,
        okText: 'Actualizar',
        cancelText: 'Omitir',
        onOk: () => {
          handleNext()
          setChange(false)
        },
        onCancel: () => {
          dispatch(
            getDataEmployee({
              condition: {
                id: `${dataEmployee.id}`,
              },
            })
          )

          dispatch(setStepPosition(current))
          setChange(false)
        },
      })
    } else {
      dispatch(setStepPosition(current))
    }
  }

  const Icon =
    steps?.length !== stepPosition + 1 ? (
      <ArrowRightOutlined />
    ) : (
      <SaveOutlined />
    )

  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomForm form={form} onValuesChange={() => setChange(true)}>
          <CustomSteps
            current={stepPosition}
            onChange={editing ? handleOnStepChange : undefined}
          >
            {steps?.map((step: Steps) => (
              <CustomStep
                description={step.description}
                key={`${step.title}`}
                title={step.title}
              />
            ))}
          </CustomSteps>
          <CustomSpace
            direction={'vertical'}
            size={'large'}
            style={{ width: '100%' }}
          >
            {steps[stepPosition]?.node}
          </CustomSpace>
          <CustomRow justify={'space-between'} style={{ marginTop: '5%' }}>
            <CustomRow justify="start">
              {stepPosition !== 0 && editing && (
                <CustomButton onClick={handleBack}>
                  <ArrowLeftOutlined /> Atrás
                </CustomButton>
              )}
            </CustomRow>

            <CustomRow justify={'end'}>
              <CustomSpace>
                <CustomButton
                  icon={<StopOutlined />}
                  onClick={handleCancel}
                  danger
                >
                  Cancelar
                </CustomButton>

                <CustomButton type="primary" onClick={handleNext} icon={Icon}>
                  {steps?.length !== stepPosition + 1
                    ? 'Guardar y Continuar'
                    : 'Guardar'}
                </CustomButton>
              </CustomSpace>
            </CustomRow>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default RegisterEmployee
