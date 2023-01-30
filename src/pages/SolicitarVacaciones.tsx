/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  createAumentoSueldo,
  createSolicitudVacaciones,
  getEmployee,
} from '../slicers/employee/employee'
import { EmployeeType } from '../slicers/employee/types'
import { formatter } from '../utils/general'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomInput from '../components/CustomInput'
import CustomInputGroup from '../components/CustomInputGroup'
import CustomRow from '../components/CustomRow'
import CustomSearchEmployee from '../components/CustomSearchEmployee'
import CustomTextArea from '../components/CustomTextArea'
import CustomTitle from '../components/CustomTitle'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import CustomInputNumber from '../components/CustomInputNumber'
import { useForm } from 'antd/lib/form/Form'
import { getSessionInfo } from '../utils/session'
import moment from 'moment'
import CustomRangePicker from '../components/CustomRangePicker'

const SolicitarVacaciones = (): React.ReactElement => {
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const { fetchingFromEmployee, aumentoRequestStatus } = useAppSelector(
    (state) => state.employee
  )

  useEffect(() => {
    dispatch(
      getEmployee({
        condition: {
          search: ' ',
          type: 'search_register',
        },
      })
    )
  }, [])

  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()

  useEffect(() => {
    if (aumentoRequestStatus === 'success') {
      form.resetFields()
    }
  }, [aumentoRequestStatus])

  const handleSave = async () => {
    const data = await form.validateFields()

    dispatch(
      createSolicitudVacaciones({
        condition: {
          id_empleado: employeeSelected?.id,
          fecha_inicio: moment(data?.fecha[0])?.toISOString(),
          fecha_fin: moment(data?.fecha[1])?.toISOString(),
          usuario_insercion: getSessionInfo().usuario,
        },
      })
    )
  }
  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomForm form={form}>
              <CustomDivider>
                <CustomTitle>Solicitar Vacaciones</CustomTitle>
              </CustomDivider>

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
                        form.setFieldsValue({
                          doc_identidad: employee.doc_identidad,
                          nombres: `${employee.nombres} ${employee.apellidos}`,
                        })
                      }}
                    />
                  </CustomFormItem>
                </CustomRow>
              </CustomCol>

              <CustomCol xs={24}>
                <CustomFormItem label={'Empleado'} labelCol={{ span: 6 }}>
                  <CustomInputGroup compact>
                    <CustomFormItem
                      label={'Documento Identidad'}
                      noStyle
                      name={'doc_identidad'}
                    >
                      <CustomInput
                        placeholder="Documento Identidad"
                        style={{ width: '30%' }}
                        disabled
                      />
                    </CustomFormItem>

                    <CustomFormItem label={'Nombre'} noStyle name={'nombres'}>
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

              <CustomCol xs={24} style={{ marginTop: '3%' }}>
                <CustomRow justify="end">
                  <CustomButton type="primary" onClick={handleSave}>
                    Guardar
                  </CustomButton>
                </CustomRow>
              </CustomCol>
            </CustomForm>
          </CustomCol>
        </CustomRow>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default SolicitarVacaciones
