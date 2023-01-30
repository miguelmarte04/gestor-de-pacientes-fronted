import { Form, Select } from 'antd'
import React, { useEffect } from 'react'
import { EmployeeType } from '../slicers/employee'
import CustomCol from './CustomCol'
import CustomDivider from './CustomDivider'
import CustomForm from './CustomForm'
import CustomFormItem from './CustomFormItem'
import CustomRow from './CustomRow'
import CustomSearchEmployee from './CustomSearchEmployee'
import CustomSpin from './CustomSpin'
import CustomTitle from './CustomTitle'
import TimelineHistory from './TimelineHistory'
import { AnyType, TabConfig } from '../constants/types'
import CustomTabs from './CustomTabs'
import CustomTable from './CustomTable'
import { ColumnType } from 'antd/lib/table'
import CustomSelect from './CustomSelect'
import { useAppDispatch, useAppSelector } from '../hooks'
import { DepartmentsType, getDepartments } from '../slicers/general'
import { ArrayOrderBy } from '../utils/general'
import { getVacancies, VacancyType } from '../slicers/recruitment'

export type HistoryChangeSimpleProps = {
  fetching?: boolean
  title?: string
  onChange?: (value: EmployeeType | DepartmentsType | VacancyType) => void
  makeHistory?: (data: AnyType) => AnyType
  dataSource?: AnyType
  timelineHistoryTitle?: string
  columns?: ColumnType<AnyType>[]
  scrollSize?: number
  pageSize?: number
  tipo?: string
}
const HistoryChangeSimple: React.FC<HistoryChangeSimpleProps> = ({
  fetching,
  title,
  onChange,
  makeHistory,
  tipo,
  dataSource,
  timelineHistoryTitle,
  columns,
  pageSize = 5,
  scrollSize = 1000,
}): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { Option } = Select
  const { departments } = useAppSelector((state) => state.general)
  const { vacancies } = useAppSelector((state) => state.recruitment)
  const tabs: TabConfig[] = [
    {
      key: 'linea_tiempo',
      label: 'Línea de Tiempo',
      title: timelineHistoryTitle,
      dataSource: ArrayOrderBy(makeHistory(dataSource), 'id', 'desc'),
    },
    {
      key: 'tabla',
      label: 'Tabla',
      title: timelineHistoryTitle,
      dataSource: dataSource,
    },
  ]

  useEffect(() => {
    tipo === 'departamento' && dispatch(getDepartments({}))
    tipo === 'vacante' && dispatch(getVacancies({}))
  }, [])

  return (
    <CustomSpin spinning={fetching}>
      <CustomForm form={form}>
        <CustomCol xs={24}>
          <CustomRow>
            <CustomDivider orientation={'left'}>
              <CustomTitle>{title}</CustomTitle>
            </CustomDivider>

            <CustomCol xs={24}>
              <CustomRow justify="end">
                <CustomFormItem name={'SEARCH_EMPLOYEE'} noStyle>
                  {tipo === 'departamento' ? (
                    <CustomRow justify="end">
                      <CustomCol xs={24}>
                        <CustomSelect
                          style={{ marginBottom: '2%' }}
                          width={'100%'}
                          placeholder={'Seleccionar Departamento'}
                          onSelect={(item) => {
                            const data = departments?.find(
                              (item2) => Number(item2.id) === Number(item)
                            )
                            onChange(data)
                          }}
                        >
                          {departments?.map((department: DepartmentsType) => (
                            <Option key={department.id} value={department.id}>
                              {department.departamento}
                            </Option>
                          ))}
                        </CustomSelect>
                      </CustomCol>
                    </CustomRow>
                  ) : tipo === 'vacantes' ? (
                    <CustomRow justify="end">
                      <CustomCol xs={24}>
                        <CustomSelect
                          style={{ marginBottom: '2%' }}
                          width={'100%'}
                          placeholder={'Seleccionar Vacante'}
                          onSelect={(item) => {
                            const data = vacancies?.find(
                              (item2) => Number(item2.id) === Number(item)
                            )
                            onChange(data)
                          }}
                        >
                          {vacancies?.map((vacancie: VacancyType) => (
                            <Option key={vacancie.id} value={vacancie.id}>
                              {vacancie.nombre}
                            </Option>
                          ))}
                        </CustomSelect>
                      </CustomCol>
                    </CustomRow>
                  ) : (
                    <CustomSearchEmployee
                      width={'40%'}
                      showInitialValue
                      style={{ marginBottom: '2%' }}
                      placeholder={
                        'Buscar por: documento de identidad o nombres'
                      }
                      onSelect={(_, employee) => {
                        onChange(employee)
                      }}
                    />
                  )}
                </CustomFormItem>
              </CustomRow>
            </CustomCol>
          </CustomRow>

          <CustomCol xs={24}>
            <CustomTabs
              defaultActiveKey={'linea_tiempo'}
              items={tabs?.map((item) => ({
                key: item.key,
                label: item.label,
                disabled: item.disabled,
                children:
                  item.key === 'linea_tiempo' ? (
                    <TimelineHistory
                      dataSource={item.dataSource}
                      title={item.title}
                    />
                  ) : (
                    <CustomTable
                      dataSource={item.dataSource}
                      columns={columns}
                      scroll={{ x: scrollSize }}
                      pagination={{ pageSize: pageSize }}
                    />
                  ),
              }))}
            />
          </CustomCol>
        </CustomCol>
      </CustomForm>
    </CustomSpin>
  )
}

export default HistoryChangeSimple
