import React, { useEffect } from 'react'
import CustomDrawer from './CustomDrawer'
import CustomRow from './CustomRow'
import { Avatar, DrawerProps, Skeleton } from 'antd'
import CustomCol from './CustomCol'
import CustomDivider from './CustomDivider'
import { formatter } from '../utils/general'
import moment from 'moment'
import CustomTitle from './CustomTitle'
import CustomBadge from './CustomBadge'
import { useAppDispatch, useAppSelector } from '../hooks/CustomHooks'
import { setEmployeeSummary, setSummary } from '../slicers/employee'
import { EmployeeSummaryType, SummaryType } from '../slicers/employee/types'
import CustomCard from './CustomCard'
import CustomSpace from './CustomSpace'

interface EmployeeSummaryProps extends Omit<DrawerProps, 'children'> {
  open?: boolean
}

interface DescriptionItemProps {
  title: string
  content: React.ReactNode
}

const EmployeeSummary: React.FC<EmployeeSummaryProps> = ({
  open,
  ...props
}): React.ReactElement => {
  const dispatch = useAppDispatch()

  const { summary, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )

  useEffect(() => {
    return () => {
      dispatch(setEmployeeSummary({} as EmployeeSummaryType))
      dispatch(setSummary({} as SummaryType))
    }
  }, [])

  const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
    <div className={'site-description-item-profile-wrapper'}>
      <p className={'site-description-item-profile-p-label'}>{title}</p>
      {content || 'N/A'}
    </div>
  )

  return (
    <CustomDrawer width={740} closable={false} open={open} {...props}>
      <CustomRow justify={'center'}>
        <Skeleton loading={fetchingFromEmployee} active={fetchingFromEmployee}>
          <CustomSpace direction={'vertical'} size={'small'} width={'100%'}>
            <CustomRow justify={'center'}>
              <CustomBadge dot={summary?.estado === 'A'}>
                <Avatar size={64} src={summary?.imagen} />
              </CustomBadge>
              <CustomCol xs={24}>
                <CustomRow justify={'center'}>
                  <p style={{ fontSize: '24px' }}>{summary.nombre}</p>
                  <span className={'summary-description'}>
                    {summary.departamento}
                  </span>
                </CustomRow>
              </CustomCol>
            </CustomRow>
            <CustomCard width={'100%'}>
              <CustomDivider>
                <CustomTitle>Datos personales</CustomTitle>
              </CustomDivider>
              <CustomRow justify={'space-between'} width={'100%'}>
                <CustomCol span={12}>
                  <DescriptionItem title={'Nombre'} content={summary.nombre} />
                </CustomCol>

                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Doc. Identidad'}
                    content={formatter({
                      value: summary?.doc_identidad,
                      type: 'identity_doc',
                    })}
                  />
                </CustomCol>
              </CustomRow>
              <CustomRow justify={'space-between'} width={'100%'}>
                <CustomCol span={12}>
                  <DescriptionItem title={'Sexo'} content={summary?.sexo} />
                </CustomCol>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Nacionalidad'}
                    content={summary?.pais}
                  />
                </CustomCol>
              </CustomRow>
              <CustomRow justify={'space-between'} width={'100%'}>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Cumpleaños'}
                    content={
                      moment(summary?.fecha_nacimiento).isValid()
                        ? moment(summary?.fecha_nacimiento).format(
                            'D MMMM YYYY'
                          )
                        : null
                    }
                  />
                </CustomCol>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Estado Civil'}
                    content={summary.estado_civil}
                  />
                </CustomCol>
              </CustomRow>
              <CustomRow justify={'space-between'} width={'100%'}>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Tipo de Sangre'}
                    content={summary.tipo_sangre}
                  />
                </CustomCol>
              </CustomRow>
            </CustomCard>
            <CustomCard width={'100%'}>
              <CustomDivider>
                <CustomTitle>Datos laborales</CustomTitle>
              </CustomDivider>
              <CustomRow justify={'space-between'} width={'100%'}>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Departamento'}
                    content={summary.departamento}
                  />
                </CustomCol>
                <CustomCol span={12}>
                  <DescriptionItem title={'Cargo'} content={summary?.cargo} />
                </CustomCol>
              </CustomRow>
              <CustomRow justify={'space-between'} width={'100%'}>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Fecha de ingreso'}
                    content={moment(summary?.fecha_contratacion).format(
                      'D MMMM YYYY'
                    )}
                  />
                </CustomCol>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Nomina'}
                    content={summary.tipo_nomina}
                  />
                </CustomCol>
              </CustomRow>
              <CustomRow justify={'space-between'} width={'100%'}>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Jornada'}
                    content={summary.jornada_trabajo}
                  />
                </CustomCol>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Sueldo'}
                    content={formatter({
                      value: String(summary.sueldo),
                      type: 'currency',
                      textBefore: 'RD',
                    })}
                  />
                </CustomCol>
              </CustomRow>
              {/* <CustomRow justify={'space-between'} width={'100%'}>
                
              </CustomRow> */}
              {/* <CustomRow justify={'space-between'} width={'100%'}>
            <CustomCol span={24}>
              <DescriptionItem
                title={'Habilidades'}
                content={
                  'C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.'
                }
              />
            </CustomCol>
          </CustomRow> */}
            </CustomCard>
            <CustomCard width={'100%'}>
              <CustomDivider>
                <CustomTitle>Direcciones y Contactos</CustomTitle>
              </CustomDivider>
              <CustomRow justify={'space-between'} width={'100%'}>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Email'}
                    content={
                      summary.emails?.find((item) => item.principal === 1)
                        ?.correo_electronico
                    }
                  />
                </CustomCol>
                <CustomCol span={12}>
                  <DescriptionItem
                    title={'Teléfono'}
                    content={formatter({
                      value: String(
                        summary?.telefonos?.find((item) => item.principal === 1)
                          ?.telefono ?? ''
                      ),
                      type: 'phone',
                    })}
                  />
                </CustomCol>
              </CustomRow>
            </CustomCard>
          </CustomSpace>
        </Skeleton>
      </CustomRow>
    </CustomDrawer>
  )
}

export default EmployeeSummary
