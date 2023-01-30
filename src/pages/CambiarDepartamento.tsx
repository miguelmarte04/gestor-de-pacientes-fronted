import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  getEmployee,
  updateCambioDepartamento,
} from '../slicers/employee/employee'
import { EmployeeType } from '../slicers/employee/types'
import { formatter, showNotification } from '../utils/general'
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
import CustomSelect from '../components/CustomSelect'
import { getDepartments } from '../slicers/general'
import { getSessionInfo } from '../utils/session'

const CambiarDepartamento = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { fetchingFromEmployee, updateCambioDepartamentoStatus } =
    useAppSelector((state) => state.employee)
  const { departments } = useAppSelector((state) => state.general)
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  useEffect(() => {
    dispatch(getDepartments({}))
  }, [])

  useEffect(() => {
    if (updateCambioDepartamentoStatus === 'success') {
      dispatch(
        getEmployee({
          condition: {
            search: ' ',
            type: 'search_register',
          },
        })
      )
      showNotification({
        title: 'Éxito',
        description: 'Cambio de departamento realizado con éxito',
        type: 'success',
      })
      form.resetFields()
    }
  }, [updateCambioDepartamentoStatus])

  const handleSave = async () => {
    const data = await form.validateFields()
    dispatch(
      updateCambioDepartamento({
        condition: {
          id: employeeSelected?.id,
          id_departamento: data.nuevo_departamento,
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
                <CustomTitle>Cambiar de Departamento</CustomTitle>
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
                        dispatch(getDepartments({}))
                        form.setFieldsValue({
                          sueldo_actual: formatter({
                            value: employee.sueldo,
                            type: 'currency',
                          }),
                          doc_identidad: employee.doc_identidad,
                          departamento_actual: departments?.find(
                            (item) => item.id === employee.id_departamento
                          )?.departamento,
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
                  label={'Departamento Actual'}
                  name={'departamento_actual'}
                  labelCol={{ span: 6 }}
                >
                  <CustomInputNumber
                    placeholder="Departamento Actual"
                    style={{ width: '70%' }}
                    disabled
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Nuevo Departamento'}
                  name={'nuevo_departamento'}
                  labelCol={{ span: 6 }}
                  rules={[{ required: true }]}
                >
                  <CustomSelect
                    placeholder="Seleccione el nuevo departamento"
                    options={departments
                      ?.filter(
                        (item) => item.id !== employeeSelected?.id_departamento
                      )
                      ?.map((department) => {
                        return {
                          label: department.departamento,
                          value: department.id,
                        }
                      })}
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

export default CambiarDepartamento
