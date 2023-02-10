import { PrinterOutlined } from '@ant-design/icons'
import React, { ReactInstance, useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import CustomCol from './CustomCol'
import CustomLayoutBoxShadow from './CustomLayoutBoxShadow'
import CustomRow from './CustomRow'
import CustomSpin from './CustomSpin'
import CustomTable from './CustomTable'
import CustomTooltip from './CustomTooltip'
import { ColumnType } from 'antd/lib/table'
import { format } from '../constants/general'
import CustomDivider from './CustomDivider'
import CustomTitle from './CustomTitle'
import { useReactToPrint } from 'react-to-print'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../hooks'
import { EmployeeType, getPacientes } from '../slicers/employee'

const PrintReportTss = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const { employee, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )
  const [reactToPrintContent, setReactToPrintContent] =
    useState<ReactInstance>()

  useEffect(() => {
    if (employee[0]?.doc_identidad) {
      const htmlObject = document.createElement('div')
      htmlObject.innerHTML = `<p style="text-align: center;"><img src="https://user-images.githubusercontent.com/40346318/170406491-e51c36e1-2644-44c5-af4b-a84da2bc6666.png" alt="Ed" width="109" height="109" style="display: block; margin-left: auto; margin-right: auto;" /><strong>Tesorer&iacute;a de la Seguridad Social</strong></p>
      <p><strong><a href="https://tss.gob.do/" data-ved="2ahUKEwjt-oTl0f33AhXcsYQIHR5nAzYQFnoECBIQAQ" ping="/url?sa=t&amp;source=web&amp;rct=j&amp;url=https://tss.gob.do/&amp;ved=2ahUKEwjt-oTl0f33AhXcsYQIHR5nAzYQFnoECBIQAQ"></a>RNC:</strong></p>
      <p><strong>Periodo: ${moment().format('DD/MM/YYYY')}</strong></p>
      <table width="702" height="77" class="demoTable" style="height: 63px; width: 680px;">
      <tbody>
      <tr style="height: 21px;">
      <td colspan="6" style="width: 370.25px; text-align: center; height: 21px; background: #008000; color: white;"><strong>TRABAJADORES</strong></td>
      <td colspan="4" style="width: 302.75px; text-align: center; height: 21px; background: #008000; color: white;"><strong>SDSS</strong></td>
      </tr>
      <tr style="height: 42px;">
      <td style="width: 64.5938px; text-align: center; height: 42px;"><strong>Clase Nomina</strong></td>
      <td style="width: 41.3906px; text-align: center; height: 42px;"><strong>Tipo Doc.</strong></td>
      <td style="width: 46.4219px; text-align: center; height: 42px;"><strong>Num. Doc</strong></td>
      <td style="width: 70.6406px; text-align: center; height: 42px;"><strong>Nombres</strong></td>
      <td style="width: 40.375px; text-align: center; height: 42px;"><strong>Sexo</strong></td>
      <td style="width: 91.8281px; text-align: center; height: 42px;"><strong>Fecha Nacimiento</strong></td>
      <td style="width: 84.7656px; text-align: center; height: 42px;"><strong>Salario Cotizable&nbsp;</strong></td>
      <td style="width: 86.7812px; text-align: center; height: 42px;"><strong>Aporte Voluntario</strong></td>
      <td style="width: 56.5156px; text-align: center; height: 42px;"><strong>Salario ISR</strong></td>
      <td style="width: 65.6875px; text-align: center; height: 42px;"><strong>Tipo Ingreso</strong></td>
      </tr>
     
      ${employee
        ?.map((item) => {
          return `<tr style="height: 0px;">
          <td style="width: 64.5938px; text-align: center; height: 0px;">${
            item?.id
          }</td>
          <td style="width: 41.3906px; text-align: center; height: 0px;">${'Cedula'}</td>
          <td style="width: 46.4219px; text-align: center; height: 0px;">${
            item?.doc_identidad
          }</td>
          <td style="width: 70.6406px; text-align: center; height: 0px;">${
            item?.nombres
          }</td>
          <td style="width: 40.375px; text-align: center; height: 0px;">${
            item?.sexo
          }</td>
          <td style="width: 91.8281px; text-align: center; height: 0px;">${''}</td>
          <td style="width: 84.7656px; text-align: center; height: 0px;">${
            //   item.salario_cotizable
            ''
          }</td>
          <td style="width: 86.7812px; text-align: center; height: 0px;">${
            //   item.aporte_voluntario
            ''
          }</td>
          <td style="width: 56.5156px; text-align: center; height: 0px;">${
            //   item.salario_isr
            ''
          }</td>
          <td style="width: 65.6875px; text-align: center; height: 0px;">${
            //   item.tipo_ingreso
            ''
          }</td>
          </tr>`
        })
        .join('')}
      
  
      
      </tbody>
      </table>
      <p></p>`
      setReactToPrintContent(htmlObject)
    }
  }, [employee])

  const handlePrint = useReactToPrint({
    content: reactToPrintContent ? () => reactToPrintContent : () => null,
    removeAfterPrint: true,
    bodyClass: 'print-body',
    pageStyle: 'print-page',
  })
  const title = () => {
    return (
      <CustomRow justify="end">
        <CustomCol xs={4}>
          <CustomTooltip title={'Imprimir Reporte'}>
            <CustomButton
              icon={<PrinterOutlined />}
              size={'middle'}
              type={'primary'}
              onClick={handlePrint}
            >
              Imprimir Reporte
            </CustomButton>
          </CustomTooltip>
        </CustomCol>
      </CustomRow>
    )
  }
  useEffect(() => {
    dispatch(
      getPacientes({
        condition: {
          search: ' ',
        },
      })
    )
  }, [])

  const columns: ColumnType<EmployeeType>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'nombres',
      title: 'Nombre',
      dataIndex: 'nombres',
      width: '50%',
      render: (_, record) => {
        return `${record.nombres} ${record.apellidos}`
      },
    },
    {
      key: 'doc_identidad',
      title: 'Doc. Identidad',
      dataIndex: 'doc_identidad',
      render: (doc_identidad: string) => {
        return format({ value: doc_identidad, type: 'cedula' })
      },
    },
  ]

  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomDivider>
              <CustomTitle>Reporte TSS</CustomTitle>
            </CustomDivider>
            <CustomTable
              title={title}
              columns={columns}
              dataSource={employee}
              pagination={{ pageSize: 5 }}
              rowKey={(row) => row.id}
            />
          </CustomCol>
        </CustomRow>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default PrintReportTss
