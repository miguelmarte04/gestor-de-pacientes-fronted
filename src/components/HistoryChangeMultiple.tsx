/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Select, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
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
import { AnyType } from '../constants/types'
import CustomTabs from './CustomTabs'
import CustomTable from './CustomTable'
import CustomSelect from './CustomSelect'
import { useAppDispatch, useAppSelector } from '../hooks'
import { DepartmentsType, getDepartments } from '../slicers/general'
import { ArrayOrderBy } from '../utils/general'

export type HistoryChangeSimpleProps = {
  fetching?: boolean
  title?: string
  onChange?: (value: EmployeeType) => void
  dataSource?: AnyType
  timelineHistoryTitle?: string
  scrollSize?: number
  pageSize?: number
  tipo?: string
  tabs?: AnyType[]
}
const HistoryChangeMultiple: React.FC<HistoryChangeSimpleProps> = ({
  fetching,
  title,
  onChange,
  tabs,
  tipo,
  pageSize = 5,
  scrollSize = 2560,
}): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { Option } = Select
  const { departments } = useAppSelector((state) => state.general)
  useEffect(() => {
    tipo === 'departamento' && dispatch(getDepartments({}))
  }, [])
  const [activeKey, setActiveKey] = useState('1')
  const items = [
    {
      label: `Linea de Tiempo`,
      key: '1',
    },
    {
      label: `Tabla`,
      key: '2',
    },
  ]

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
                  <CustomSearchEmployee
                    width={'40%'}
                    showInitialValue
                    style={{ marginBottom: '2%' }}
                    placeholder={'Buscar por: documento de identidad o nombres'}
                    onSelect={(_, employee) => {
                      onChange(employee)
                    }}
                  />
                </CustomFormItem>
              </CustomRow>
            </CustomCol>
          </CustomRow>
          <CustomCol xs={24}>
            <CustomRow justify="center">
              <Tabs
                defaultActiveKey="1"
                onChange={(key) => {
                  setActiveKey(key)
                }}
                items={items}
              />
            </CustomRow>
          </CustomCol>

          <CustomCol xs={24}>
            <CustomTabs
              defaultActiveKey={'linea_tiempo'}
              items={tabs.map((item) => ({
                key: item.key,
                label: item.label,
                disabled: item.disabled,
                children:
                  activeKey === '1' ? (
                    <TimelineHistory
                      dataSource={ArrayOrderBy(item?.dataSource, 'id', 'desc')}
                      title={item.title}
                    />
                  ) : (
                    <CustomTable
                      dataSource={item?.dataSourceTabla}
                      columns={item.columns}
                      scroll={{ x: item.scrollSize ?? scrollSize }}
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

export default HistoryChangeMultiple
