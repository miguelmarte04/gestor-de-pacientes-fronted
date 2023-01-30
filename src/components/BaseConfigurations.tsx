import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import React from 'react'
import { AnyType } from '../constants/types'
import { defaultTheme } from '../themes'
import CustomButton from './CustomButton'
import CustomCol from './CustomCol'
import CustomDivider from './CustomDivider'
import CustomLayoutBoxShadow from './CustomLayoutBoxShadow'
import CustomRow from './CustomRow'
import CustomSpin from './CustomSpin'
import CustomTable from './CustomTable'
import CustomTitle from './CustomTitle'
import CustomTooltip from './CustomTooltip'
import { CustomModalConfirmation } from './ConfirmModalMethod'

interface ConfigurationsProps {
  dataIndex: string
  title: React.ReactNode
  onVisibility(): void
  dataSource: AnyType[]
  onEdit(record: AnyType): void
  onDelete(record: AnyType): void
}

const BaseConfigurations: React.FC<Partial<ConfigurationsProps>> = ({
  onVisibility,
  title,
  dataIndex,
  dataSource,
  onEdit,
  onDelete,
}): React.ReactElement => {
  const tableTitle = () => (
    <CustomRow justify={'end'}>
      <CustomButton
        icon={<PlusOutlined style={{ fontSize: '18px' }} />}
        onClick={onVisibility}
        size={'middle'}
        type={'primary'}
      />
    </CustomRow>
  )

  const columns: ColumnType<unknown>[] = [
    {
      dataIndex: 'id',
      title: 'Id',
      key: 'id',
      width: 100,
    },
    {
      dataIndex,
      title: 'Descripción',
      key: dataIndex,
    },
    {
      dataIndex: 'estado',
      title: 'Estado',
      key: 'estado',
      width: '15%',
      render: (text: string) => (text === 'A' ? 'Activo' : 'Inactivo'),
    },
    {
      dataIndex: 'actions',
      title: 'Acciones',
      key: 'actions',
      width: '10%',
      render: (_, record) => (
        <CustomRow justify={'center'}>
          <CustomTooltip title={'Editar'}>
            <CustomButton
              onClick={() => onEdit(record)}
              type={'link'}
              icon={<EditOutlined style={{ fontSize: '16px' }} />}
            />
          </CustomTooltip>
          <CustomTooltip
            title={record['estado'] === 'A' ? 'Eliminar' : 'Habilitar'}
          >
            <CustomButton
              onClick={() => {
                CustomModalConfirmation({
                  title: 'Eliminar',
                  content: '¿Está seguro de eliminar este registro?',
                  onOk: () => {
                    onDelete(record)
                  },
                })
              }}
              type={'link'}
              icon={
                record['estado'] === 'A' ? (
                  <DeleteOutlined
                    style={{
                      fontSize: '16px',
                      color: defaultTheme.dangerColor,
                    }}
                  />
                ) : (
                  <StopOutlined style={{ fontSize: '16px' }} />
                )
              }
            />
          </CustomTooltip>
        </CustomRow>
      ),
    },
  ]

  return (
    <CustomLayoutBoxShadow>
      <CustomSpin>
        <CustomDivider>
          <CustomTitle>{title}</CustomTitle>
        </CustomDivider>

        <CustomCol xs={24}>
          <CustomTable
            columns={columns}
            dataSource={dataSource}
            title={tableTitle}
          />
        </CustomCol>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default BaseConfigurations
