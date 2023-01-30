/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createAumentoSueldo, getEmployee } from '../slicers/employee/employee'
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

const AumentoSueldo = (): React.ReactElement => {
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
      createAumentoSueldo({
        condition: {
          ...data,
          id_empleado: employeeSelected?.id,
          anterior_sueldo: employeeSelected?.sueldo,
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
                <CustomTitle>Aumento de Sueldo</CustomTitle>
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
                          anterior_sueldo: formatter({
                            value: employee.sueldo,
                            type: 'currency',
                          }),
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
                  label={'Sueldo Actual'}
                  name={'anterior_sueldo'}
                  labelCol={{ span: 6 }}
                  rules={[{ required: true }]}
                >
                  <CustomInputNumber
                    placeholder="Sueldo Actual"
                    style={{ width: '40%' }}
                    disabled
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Nuevo Sueldo'}
                  name={'nuevo_sueldo'}
                  labelCol={{ span: 6 }}
                  rules={[
                    {
                      required: true,
                      min: Number(employeeSelected?.sueldo + 1),
                      type: 'number',
                    },
                  ]}
                >
                  <CustomInputNumber
                    placeholder="Nuevo Sueldo"
                    style={{ width: '40%' }}
                  />
                </CustomFormItem>
              </CustomCol>

              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Motivo o Concepto'}
                  name={'observaciones'}
                  labelCol={{ span: 6 }}
                  rules={[{ required: true }]}
                >
                  <CustomTextArea placeholder="Observaciones" />
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

export default AumentoSueldo
