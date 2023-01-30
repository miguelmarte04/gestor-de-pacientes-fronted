import React, { useEffect, useState } from 'react'
import CustomDivider from './CustomDivider'
import CustomTitle from './CustomTitle'
import CustomRow from './CustomRow'
import CustomFormItem from './CustomFormItem'
import CustomCol from './CustomCol'
import { defaultBreakpoints, formItemLayout } from '../themes'
import CustomSelect from './CustomSelect'
import { FormInstance, Select } from 'antd'
import { CargosType, DepartmentsType } from '../slicers/general'
import CustomCheckBox from './CustomCheckbox'
import CustomInputNumber from './CustomInputNumber'
import { useAppSelector } from '../hooks'
import CustomInputDate from './CustomInputDate'

type Props = {
  form: FormInstance
}
const DataEmployee = ({ form }: Props): React.ReactElement => {
  const { departments, cargos, workingDay } = useAppSelector(
    (state) => state.general
  )
  const { dataEmployee, employmentDataUpdated, historyChange } = useAppSelector(
    (state) => state.employee
  )
  const [cargoSelected, setCargoSelected] = useState<CargosType>()
  const [honorifico, setHonorifico] = useState<boolean>(false)
  const { Option } = Select

  useEffect(() => {
    if (dataEmployee?.id) {
      setHonorifico(dataEmployee.honorifico === 'S' ? true : false)
    }
  }, [dataEmployee, employmentDataUpdated])

  return (
    <CustomRow justify="start">
      <CustomDivider orientation={'left'}>
        <CustomTitle>Datos del Empleo</CustomTitle>
      </CustomDivider>
      <CustomCol {...defaultBreakpoints}>
        <CustomFormItem
          label={'Departamento'}
          name={'id_departamento'}
          rules={[{ required: true }]}
          {...formItemLayout}
        >
          <CustomSelect
            placeholder={'Seleccionar Departamento'}
            disabled={
              dataEmployee?.id_departamento !== undefined &&
              dataEmployee?.id_departamento !== null
            }
          >
            {departments?.map((department: DepartmentsType) => (
              <Option key={department.id} value={department.id}>
                {department.departamento}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      </CustomCol>

      <CustomCol {...defaultBreakpoints}>
        <CustomFormItem
          label={'Jornada de trabajo'}
          name={'id_jornada_trabajo'}
          rules={[{ required: true }]}
          {...formItemLayout}
        >
          <CustomSelect placeholder={'Seleccionar Jornada de trabajo'}>
            {workingDay?.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.jornada_trabajo}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      </CustomCol>
      <CustomCol {...defaultBreakpoints}>
        <CustomFormItem
          label={'Cargo'}
          name={'id_cargo'}
          rules={[{ required: true }]}
          {...formItemLayout}
        >
          <CustomSelect
            placeholder={'Seleccionar el Cargo'}
            onSelect={(record) =>
              setCargoSelected(cargos?.find((item) => item?.id === record))
            }
          >
            {cargos?.map((cargo) => (
              <Option key={cargo.id} value={cargo.id}>
                {cargo.cargo}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      </CustomCol>
      <CustomCol {...defaultBreakpoints}>
        <CustomFormItem
          label={'Empleado Honorifico'}
          name={'honorifico'}
          initialValue={honorifico}
          {...formItemLayout}
        >
          <CustomCheckBox
            tooltip="No recibe sueldo ni tiene Descuentos"
            checked={honorifico}
            disabled={
              dataEmployee?.sueldo !== undefined &&
              dataEmployee?.sueldo !== null
            }
            onChange={(e) => {
              setHonorifico(e.target.checked)
              form.setFieldsValue({
                id_tipo_pago: e.target.checked ? 0 : dataEmployee?.id_tipo_pago,
                sueldo: e.target.checked ? 0 : dataEmployee?.sueldo,
                numero_cuenta_electronica: e.target.checked
                  ? ''
                  : dataEmployee?.numero_cuenta_electronica,
              })
            }}
          />
        </CustomFormItem>
      </CustomCol>

      <CustomCol {...defaultBreakpoints}>
        <CustomFormItem
          label={'Sueldo'}
          name={'sueldo'}
          rules={[
            {
              required: !honorifico,
              min:
                dataEmployee?.sueldo !== undefined &&
                dataEmployee?.sueldo !== null
                  ? null
                  : honorifico
                  ? 0
                  : cargoSelected?.sueldo_minimo,
              max:
                dataEmployee?.sueldo !== undefined &&
                dataEmployee?.sueldo !== null
                  ? null
                  : cargoSelected?.sueldo_maximo,
              type: 'number',
            },
          ]}
          {...formItemLayout}
        >
          <CustomInputNumber
            placeholder="Sueldo"
            disabled={
              honorifico ||
              (dataEmployee?.sueldo !== undefined &&
                dataEmployee?.sueldo !== null)
            }
            style={{ width: '100%' }}
            format={{ format: 'money', coin: 'RD' }}
          />
        </CustomFormItem>
      </CustomCol>
      <CustomCol {...defaultBreakpoints}>
        <CustomFormItem
          label={'Fecha de Contratacion'}
          name={'fecha_contratacion'}
          rules={[{ required: true }]}
          {...formItemLayout}
        >
          <CustomInputDate
            mask={false}
            placeholder={'00/00/0000'}
            disabled={
              dataEmployee?.id_departamento !== undefined &&
              dataEmployee?.id_departamento !== null
            }
          />
        </CustomFormItem>
      </CustomCol>
      <CustomCol {...defaultBreakpoints}>
        <CustomFormItem
          label={'Tipo de nomina'}
          name={'id_tipo_nomina'}
          rules={[{ required: true }]}
          {...formItemLayout}
        >
          <CustomSelect placeholder={'Seleccionar Tipo Nomina'}>
            {historyChange?.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.tipo_nomina}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      </CustomCol>
    </CustomRow>
  )
}
export default DataEmployee
