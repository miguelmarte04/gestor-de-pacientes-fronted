/* eslint-disable @typescript-eslint/no-unused-vars */
import { EyeOutlined, PrinterOutlined } from '@ant-design/icons'
import { Avatar, Form } from 'antd'
import React, { ReactInstance, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  createLack,
  getDetNominas,
  getHistoryChange,
  getNominas,
  updateLack,
  updateNominas,
} from '../slicers/employee/employee'
import {
  DetNominaType,
  EmployeeType,
  LacksType,
  NominaType,
} from '../slicers/employee/types'
import { defaultTheme } from '../themes'
import {
  filterArray,
  filterByDate,
  formatter,
  searchInArray,
  showNotification,
} from '../utils/general'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomList from '../components/CustomList'
import CustomListItem from '../components/CustomListItem'
import CustomListItemMeta from '../components/CustomListItemMeta'
import CustomModal from '../components/CustomModal'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import { getSessionInfo } from '../utils/session'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import CustomDatePicker from '../components/CustomRangePicker'
import CustomCollapse from '../components/CustomCollapse'
import CustomPanel from '../components/CustomPanel'
import CustomSelect from '../components/CustomSelect'
const ConsultarNomina = (): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const {
    nominaRequestStatus,
    fetchingFromEmployee,
    nomina,
    detNomina,
    getDetNominasStatus,
    historyChange,
  } = useAppSelector((state) => state.employee)
  useEffect(() => {
    dispatch(getNominas({}))
    dispatch(
      getHistoryChange({
        condition: {
          id: '1',
          tipo: 'tipos_nominas',
        },
      })
    )
  }, [])

  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
  }
  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<LacksType>()
  const [printNomina, setPrintNomina] = useState<NominaType>()
  const [printNominaType, setPrintNominaType] = useState('')
  const [view, setView] = useState(false)
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>()
  const [visible, setVisible] = useState(false)
  const [searchTipoNomina, setSearchTipoNomina] = useState('')
  const [searchDate, setSearchDate] = useState([null, null])
  const [shouldPrint, setShouldPrint] = useState(false)
  const [reactToPrintContent, setReactToPrintContent] =
    useState<ReactInstance>(null)
  const [fetch, setFetch] = useState(false)
  useEffect(() => {
    if (getDetNominasStatus === 'success' && !view) {
      // eslint-disable-next-line no-console
      console.log({ detNomina })
      setFetch(true)
      const htmlObject = document.createElement('div')
      htmlObject.innerHTML =
        printNominaType === 'recibo'
          ? `<h2 style="text-align: center;"><strong><img src="https://i.ibb.co/n0M3yX0/1.png" alt="" width="162" height="162" /></strong></h2>
    <h2 style="text-align: center;"><strong>TESORERIA MUNICIPAL</strong></h2>
    <h2 style="text-align: center;"><strong>JUNTA DEL DISTRITO MUNICIPAL DON JUAN RODRIGUEZ</strong></h2>
    <h2 style="text-align: center;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Fecha:${moment(
      detNomina[0]?.fecha_insercion
    ).format('DD/MM/YYYY')}</strong></h2>
    <h2 style="text-align: center;"><strong>${
      printNomina?.tipo_nomina ?? ''
    }&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong></h2>
   
    ${detNomina?.map((item) => {
      return `
      <table style="margin-left: auto; margin-right: auto; width: 1225px;">
      <tbody>
    <tr>
    <td style="width: 518.766px; text-align: center;">
    <h2><strong>C&oacute;digo: ${item.id} </strong></h2>
    </td>
    <td style="width: 687.234px; text-align: center;">
    <h2>&nbsp;</h2>
    </td>
    </tr>
    <tr>
    <td style="width: 518.766px; text-align: center;">
    <h2><strong>Nombres: ${item.nombres} ${item.apellidos} </strong></h2>
    </td>
    <td style="width: 687.234px; text-align: center;">
    <h2><strong>Cedula:</strong> ${formatter({
      value: item.doc_identidad,
      type: 'identity_doc',
    })}</h2>
    </td>
    </tr>
    <tr>
    <td style="width: 518.766px; text-align: center;">
    <h2><strong>Departamento: </strong>${item.departamento}</h2>
    </td>
    <td style="width: 687.234px; text-align: center;">
    <h2><strong>Cargo:</strong> ${item.cargo}</h2>
    </td>
    </tr>
    </tbody>
    </table>
    <h2 style="text-align: center;">&nbsp;</h2>
    <table style="margin-left: auto; margin-right: auto; height: 164px; width: 1221px;">
    <tbody>
    <tr>
    <td style="width: 513.016px; text-align: center;">
    <h2><strong>Sueldo</strong></h2>
    </td>
    <td style="width: 684.984px;">
    <h2>: ${formatter({ value: item.salario_bruto, type: 'currency' })}</h2>
    </td>
    </tr>
    <tr>
    <td style="width: 513.016px; text-align: center;">
    <h2><strong>Otros ingresos</strong></h2>
    </td>
    <td style="width: 684.984px;">
    <h2>: ${formatter({ value: item.ingresos, type: 'currency' })}</h2>
    </td>
    </tr>
    <tr>
    <td style="width: 513.016px; text-align: center;">
    <h2><strong>Total</strong></h2>
    </td>
    <td style="width: 684.984px;">
    <h2>: ${formatter({
      value: Number(item.salario_bruto) + Number(item.ingresos),
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    </tbody>
    </table>
    <h2 style="text-align: center;">&nbsp;</h2>
    <table style="margin-left: auto; margin-right: auto; width: 1219px;">
    <tbody>
    <tr>
    <td style="width: 508.219px; text-align: center;">
    <h2><strong>Seguro Nacional de Salud (SFS)</strong></h2>
    </td>
    <td style="width: 691.781px;">
    <h2>: ${formatter({
      value: item.SFS,
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    <tr>
    <td style="width: 508.219px; text-align: center;">
    <h2><strong>Aseguradora de Fondo de pensiones (AFP)</strong></h2>
    </td>
    <td style="width: 691.781px;">
    <h2>: ${formatter({
      value: item.AFP,
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    <tr>
    <td style="width: 508.219px; text-align: center;">
    <h2><strong>Impuesto Sobre la Renta (ISR)</strong></h2>
    </td>
    <td style="width: 691.781px;">
    <h2>: ${formatter({
      value: item.ISR,
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    <tr>
    <td style="width: 508.219px; text-align: center;">
    <h2><strong>Total</strong></h2>
    </td>
    <td style="width: 691.781px;">
    <h2>: ${formatter({
      value: Number(item.SFS) + Number(item.AFP) + Number(item.ISR),
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    </tbody>
    </table>
    <h2 style="text-align: center;">&nbsp;</h2>
    <h2 style="text-align: left;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Sueldo Neto: ${formatter(
      {
        value: item.sueldo_neto,
        type: 'currency',
      }
    )} </strong></h2>
    <h2 style="text-align: center;"><strong>_______________________________________________________________________________________________________________</strong></h2>
    `
    })}
    <table style="margin-left: auto; margin-right: auto; width: 1148.89px;">
    <tbody>
    <tr>
    <td style="width: 377px;">
    <h2 style="text-align: center;">&nbsp; _______________________</h2>
    </td>
    <td style="width: 367px;">
    <h2 style="text-align: center;">_______________________</h2>
    </td>
    <td style="width: 373.891px;">
    <h2 style="text-align: center;">_______________________</h2>
    </td>
    </tr>
    <tr>
    <td style="width: 377px;">
    <h2 style="text-align: center;"><strong>Encargado de Nomina</strong></h2>
    </td>
    <td style="width: 367px;">
    <h2 style="text-align: center;"><strong>Encargado de Contabilidad</strong></h2>
    </td>
    <td style="width: 373.891px; text-align: center;">
    <h2><strong>Contralor&iacute;a Municipal</strong></h2>
    </td>
    </tr>
    <tr>
    <td style="width: 377px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    <td style="width: 367px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    <td style="width: 373.891px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    </tr>
    <tr>
    <td style="width: 377px;">
    <h2 style="text-align: center;">_______________________</h2>
    </td>
    <td style="width: 367px;">
    <h2 style="text-align: center;">_______________________</h2>
    </td>
    <td style="width: 373.891px;">
    <h2 style="text-align: center;">_______________________</h2>
    </td>
    </tr>
    <tr>
    <td style="width: 377px;">
    <h2 style="text-align: center;"><strong>Gerente Financiero</strong></h2>
    </td>
    <td style="width: 367px; text-align: center;">
    <h2><strong>Tesorero Municipal</strong></h2>
    </td>
    <td style="width: 373.891px; text-align: center;">
    <h2><strong>Alcalde Municipal</strong></h2>
    </td>
    </tr>
    </tbody>
    </table>
    <h2><strong>&nbsp;</strong></h2>`
          : `<h2 style="text-align: center;"><strong><img src="https://pbs.twimg.com/profile_images/767459751928049666/_DRS0HB8_400x400.jpg" alt="Alcald&iacute;a Don Juan R. (@alcaldiadjr) / Twitter" width="133" height="133" /></strong></h2>
          <h1 style="text-align: center;"><strong>Detalle ${`${
            printNomina?.tipo_nomina
          } del mes de ${moment(printNomina?.fecha_insercion).format(
            'MMMM'
          )} del año ${moment(printNomina?.fecha_insercion).format(
            'YYYY'
          )}`}</strong></h1>
          <h2><strong>RNC: 430210641</strong></h2>
          <h2><strong>Fecha: ${moment().format('DD/MM/YYYY')} </strong></h2>
          <h2 style="text-align: left;"><strong>Cantidad de empleados: ${
            detNomina?.length
          }</strong></h2>
          <h2>&nbsp;</h2>
          <table style="height: 222px; margin-left: auto; margin-right: auto;" width="1411">
          <tbody>
          <tr style="background-color: #000000;">
          <td style="text-align: center; width: 107.153px;">
          <h2><span style="color: #ffffff;"><strong>Clave Nomina</strong></span></h2>
          </td>
          <td style="text-align: center; width: 150.51px;">
          <h2><span style="color: #ffffff;"><strong>Doc. Identidad</strong></span></h2>
          </td>
          <td style="text-align: center; width: 125.139px;">
          <h2><span style="color: #ffffff;"><strong>Nombres</strong></span></h2>
          </td>
          <td style="text-align: center; width: 127.378px;">
          <h2><span style="color: #ffffff;"><strong>Apellidos</strong></span></h2>
          </td>
          <td style="text-align: center; width: 73.9236px;">
          <h2><span style="color: #ffffff;"><strong>Sexo</strong></span></h2>
          </td>
          <td style="text-align: center; width: 153.976px;">
          <h2><span style="color: #ffffff;"><strong>Fecha Nacimiento</strong></span></h2>
          </td>
          <td style="text-align: center; width: 98.6806px;">
          <h2><span style="color: #ffffff;"><strong>Salario</strong></span></h2>
          </td>
          <td style="text-align: center; width: 53.0035px;">
          <h2><span style="color: #ffffff;"><strong>ISR</strong></span></h2>
          </td>
          <td style="text-align: center; width: 60.7986px;">
          <h2><span style="color: #ffffff;"><strong>AFP</strong></span></h2>
          </td>
          <td style="text-align: center; width: 59.1493px;">
          <h2><span style="color: #ffffff;"><strong>SFS</strong></span></h2>
          </td>
          <td style="text-align: center; width: 121.25px;">
          <h2><span style="color: #ffffff;"><strong>Preaviso</strong></span></h2>
          </td>
          <td style="text-align: center; width: 122.396px;">
          <h2><span style="color: #ffffff;"><strong>Cesant&iacute;a</strong></span></h2>
          </td>
          <td style="text-align: center; width: 104.236px;">
          <h2><span style="color: #ffffff;"><strong>Regal&iacute;a</strong></span></h2>
          </td>
          </tr>
          ${detNomina?.map((item) => {
            return ` <tr>
<td style="text-align: center; width: 107.153px;">
<h2>${item.id}</h2>
</td>
<td style="text-align: center; width: 150.51px;">
<h2>${formatter({
              value: item.doc_identidad,
              type: 'identity_doc',
            })}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${item.nombres}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${item.apellidos}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${item.sexo}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${moment(item.fecha_nacimiento).format('DD/MM/YYYY')}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${formatter({
              value: item.salario_bruto,
              type: 'currency',
              textBefore: '',
            })}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${formatter({ value: item.ISR, type: 'currency', textBefore: '' })}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${formatter({ value: item.AFP, type: 'currency', textBefore: '' })}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${formatter({ value: item.SFS, type: 'currency', textBefore: '' })}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${formatter({
              value: item.preaviso,
              type: 'currency',
              textBefore: '',
            })}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${formatter({
              value: item.cesantia,
              type: 'currency',
              textBefore: '',
            })}</h2>
</td>
<td style="text-align: center; width: 107.153px;">
<h2>${formatter({
              value: item.regalia ?? 0,
              type: 'currency',
              textBefore: '',
            })}</h2>
</td>
</tr>`
          })}
          <tr>
          <td style="text-align: center; width: 107.153px;">
<h2></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2><strong>Total: </strong> </h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2> <strong>${formatter({
              value: detNomina?.reduce((acc, item) => {
                return acc + item.salario_bruto
              }, 0),
              type: 'currency',
              textBefore: '',
            })} </strong></h2> 
</td>
          <td style="text-align: center; width: 107.153px;">
<h2><strong>${formatter({
              value: detNomina?.reduce((acc, item) => {
                return acc + item.ISR
              }, 0),
              type: 'currency',
              textBefore: '',
            })}</strong></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2><strong>${formatter({
              value: detNomina?.reduce((acc, item) => {
                return acc + item.AFP
              }, 0),
              type: 'currency',
              textBefore: '',
            })}</strong></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2><strong>${formatter({
              value: detNomina?.reduce((acc, item) => {
                return acc + item.SFS
              }, 0),
              type: 'currency',
              textBefore: '',
            })}</strong></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2><strong>${formatter({
              value: detNomina?.reduce((acc, item) => {
                return acc + item.preaviso
              }, 0),
              type: 'currency',
              textBefore: '',
            })}</strong></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2><strong>${formatter({
              value: detNomina?.reduce((acc, item) => {
                return acc + item.cesantia
              }, 0),
              type: 'currency',
              textBefore: '',
            })}</strong></h2>
</td>
          <td style="text-align: center; width: 107.153px;">
<h2><strong>${formatter({
              value: detNomina?.reduce((acc, item) => {
                return acc + item.regalia
              }, 0),
              type: 'currency',
              textBefore: '',
            })}</strong></h2>
</td>
          </tr>
         
          </tbody>
          </table>`
      setReactToPrintContent(htmlObject)
      setShouldPrint(true)
    }
  }, [getDetNominasStatus])

  const handlePrintDataNomina = (record: NominaType, type: string) => {
    setPrintNomina(record)
    setPrintNominaType(type)
    dispatch(getDetNominas({ condition: { id: Number(record?.id) } }))
  }

  const handlePrintData = (record: DetNominaType) => {
    setFetch(true)
    setPrintNominaType('recibo')
    const htmlObject = document.createElement('div')
    htmlObject.innerHTML = `<h2><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.ibb.co/n0M3yX0/1.png" alt="Logo" width="162" height="162" /></strong></h2>
    <h2 style="text-align: center;"><strong>AYUNTAMIENTO DEL DISTRITO MUNICIPAL DON JUAN RODR&Iacute;GUEZ</strong></h2>
    <h2 style="text-align: center;"><strong>RECIBO DE PAGO</strong></h2>
    <h2 style="text-align: center;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;FECHA: ${moment(
      record?.fecha_insercion
    ).format('DD/MM/YYYY')}</strong></h2>
    <h2>&nbsp;</h2>
    <table style="margin-left: auto; margin-right: auto; width: 984px; height: 863px;" cellspacing="0.5" cellpadding="0.5">
    <tbody>
    <tr style="height: 46px;">
    <td style="height: 46px; width: 492.016px;">
    <h2><strong>NOMBRE: ${record.nombres} ${
      record.apellidos
    } &nbsp;</strong></h2>
    </td>
    <td style="height: 46px; width: 482.984px;">
    <h2><strong>DEPARTAMENTO: ${record.apellidos}&nbsp;</strong></h2>
    </td>
    </tr>
    <tr style="height: 46px;">
    <td style="height: 46px; width: 492.016px;">
    <h2><strong>CEDULA: ${formatter({
      value: record.doc_identidad,
      type: 'identity_doc',
    })}&nbsp;</strong></h2>
    </td>
    <td style="height: 46px; width: 482.984px;">
    <h2><strong>CARGO: ${record.cargo}&nbsp;</strong></h2>
    </td>
    </tr>
    <tr style="height: 16.5px;">
    <td style="height: 16.5px; width: 492.016px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    <td style="height: 16.5px; width: 482.984px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    </tr>
    <tr style="height: 46px;">
    <td style="height: 46px; width: 492.016px; text-align: left;">
    <h2><strong>CONCEPTO</strong></h2>
    </td>
    <td style="height: 46px; width: 482.984px; text-align: left;">
    <h2><strong>DESCUENTOS</strong></h2>
    </td>
    </tr>
    <tr style="height: 22px;">
    <td style="height: 22px; width: 492.016px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    <td style="height: 22px; width: 482.984px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    </tr>
    <tr style="height: 46px;">
    <td style="height: 46px; width: 492.016px;">
    <h2><strong>SUELDO BRUTO</strong>: ${formatter({
      value: record.salario_bruto,
      type: 'currency',
    })}</h2>
    </td>
    <td style="height: 46px; width: 482.984px; text-align: left;">
    <h2><strong>SFS</strong>: ${formatter({
      value: record.SFS,
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    <tr style="height: 46px;">
    <td style="height: 46px; width: 492.016px;">
    <h2><strong>OTROS INGRESOS</strong>: ${formatter({
      value: record.ingresos,
      type: 'currency',
    })}</h2>
    </td>
    <td style="height: 46px; width: 482.984px; text-align: left;">
    <h2><strong>AFP</strong>: ${formatter({
      value: record.AFP,
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    <tr style="height: 46px;">
    <td style="height: 46px; width: 492.016px;">
    <h2><strong>TOTAL</strong>: ${formatter({
      value: Number(record.salario_bruto) + Number(record.ingresos),
      type: 'currency',
    })}</h2>
    </td>
    <td style="height: 46px; width: 482.984px; text-align: left;">
    <h2><strong>ISR</strong>:${formatter({
      value: record.ISR,
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    <tr style="height: 46px;">
    <td style="height: 46px; width: 492.016px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    <td style="height: 46px; width: 482.984px; text-align: left;">
    <h2><strong>TOTAL</strong>:${formatter({
      value: Number(record.SFS) + Number(record.AFP) + Number(record.ISR),
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    <tr style="height: 46px;">
    <td style="height: 46px; width: 492.016px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    <td style="height: 46px; width: 482.984px; text-align: left;">
    <h2><strong>SUELDO NETO</strong>: ${formatter({
      value: record.sueldo_neto,
      type: 'currency',
    })}</h2>
    </td>
    </tr>
    <tr style="height: 78px;">
    <td style="height: 78px; width: 492.016px;">
    <h2><strong>&nbsp;</strong></h2>
    <h2><strong>&nbsp;</strong></h2>
    </td>
    <td style="height: 78px; width: 482.984px;">
    <h2><strong>&nbsp;</strong></h2>
    </td>
    </tr>
    <tr style="height: 78px;">
    <td style="height: 78px; width: 975px;" colspan="2">
    <h2 style="text-align: center;"><strong>__________________________________</strong></h2>
    <h2 style="text-align: center;"><strong>Recibido Por:</strong></h2>
    </td>
    </tr>
    </tbody>
    </table>`
    setReactToPrintContent(htmlObject)
    setShouldPrint(true)
  }

  useEffect(() => {
    if (nominaRequestStatus === 'success') {
      dispatch(getNominas({}))
      form.resetFields()
      setVisible(false)
    }
  }, [nominaRequestStatus])

  const handleAfterPrint = () => {
    setFetch(false)
    setPrintNominaType('')
    setShouldPrint(false)
  }

  const handlePrint = useReactToPrint({
    content: reactToPrintContent ? () => reactToPrintContent : () => null,
    onAfterPrint: () => handleAfterPrint(),
    removeAfterPrint: true,
    bodyClass: 'print-body',
    pageStyle:
      printNominaType === 'recibo'
        ? 'print-page'
        : '@page { size: landscape; }',
  })

  useEffect(() => {
    shouldPrint && handlePrint()
  }, [shouldPrint])

  const handleDelete = (record: NominaType) => {
    CustomModalConfirmation({
      content: '¿Está seguro que desea Declinar esta nomina?',
      onOk: () => {
        dispatch(
          updateNominas({
            condition: {
              ...record,
              estado_nomina: 'D',
              estado: 'I',
            },
          })
        )
      },
    })
  }
  const handleSubmit = (record: NominaType) => {
    CustomModalConfirmation({
      content: '¿Está seguro que desea Autorizar esta nomina?',
      onOk: () => {
        dispatch(
          updateNominas({
            condition: {
              ...record,
              estado_nomina: 'U',
            },
          })
        )
      },
    })
  }
  const handleView = (record: NominaType) => {
    dispatch(getDetNominas({ condition: { id: Number(record?.id) } }))
    setView(true)
    setVisible(true)
  }

  const renderItem = (item: NominaType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip key={'view'} title={'Ver Nomina'}>
            <CustomButton
              onClick={() => {
                handleView(item)
              }}
              type={'link'}
              icon={
                <EyeOutlined
                  style={{
                    fontSize: '18px',
                  }}
                />
              }
            />
          </CustomTooltip>,
          <CustomTooltip key={'view'} title={'Imprimir Recibo de nomina'}>
            <CustomButton
              onClick={() => {
                handlePrintDataNomina(item, 'recibo')
              }}
              type={'link'}
              icon={<PrinterOutlined style={{ fontSize: '18px' }} />}
            />
          </CustomTooltip>,
          <CustomTooltip key={'view'} title={'Imprimir Detalle de la Nomina'}>
            <CustomButton
              onClick={() => {
                handlePrintDataNomina(item, 'detalle')
              }}
              type={'link'}
              icon={<PrinterOutlined style={{ fontSize: '18px' }} />}
            />
          </CustomTooltip>,
        ]}
      >
        <CustomListItemMeta
          avatar={
            <Avatar
              size={'large'}
              icon={
                <span
                  style={{
                    color: defaultTheme.primaryColor,
                    fontSize: 18,
                    fontFamily: 'comic sans',
                  }}
                >
                  {getInitials(
                    item.tipo_nomina?.split(' ')[0],
                    item.tipo_nomina?.split(' ')[1]
                  )}
                </span>
              }
            />
          }
          title={`${item.tipo_nomina} del mes de ${moment(
            item?.fecha_insercion
          ).format('MMMM')}`}
          description={`Fecha Registro: ${moment(item?.fecha_registro)?.format(
            'DD/MM/YYYY'
          )} - Usuario: ${item?.usuario_insercion}`}
        />
      </CustomListItem>
    )
  }
  const handleUpdate = async () => {
    const data = await form.validateFields()
    dispatch(updateLack({ condition: { ...edit, ...data } }))
  }
  const handleCreate = async () => {
    const data = await form.validateFields()

    dispatch(
      createLack({
        condition: {
          ...data,
          id_empleado: employeeSelected?.id,
          usuario_insercion: getSessionInfo().usuario,
        },
      })
    )
  }
  const renderItemDet = (item: DetNominaType) => {
    return (
      <CustomListItem
        actions={[
          <CustomTooltip key={'view'} title={'Ver Nomina'}></CustomTooltip>,
          <CustomTooltip key={'view'} title={'Imprimir Recibo de nomina'}>
            <CustomButton
              onClick={() => {
                handlePrintData(item)
              }}
              type={'link'}
              icon={<PrinterOutlined style={{ fontSize: '18px' }} />}
            />
          </CustomTooltip>,
        ]}
      >
        <CustomListItemMeta
          avatar={
            <Avatar
              size={'large'}
              src={item.imagen}
              icon={
                <span
                  style={{
                    color: defaultTheme.primaryColor,
                    fontSize: 18,
                    fontFamily: 'comic sans',
                  }}
                >
                  {getInitials(item.nombres, item.apellidos)}
                </span>
              }
            />
          }
          title={`Nombre: ${item.nombres} ${
            item.apellidos
          } - Cedula: ${formatter({
            value: item.doc_identidad,
            type: 'identity_doc',
          })} - Cargo: ${item.cargo} - Departamento: ${item.departamento}`}
          description={`Salario Bruto: ${formatter({
            value: item?.salario_bruto,
            type: 'currency',
          })}  -  Descuentos: ${formatter({
            value: item?.descuento,
            type: 'currency',
          })}  -  Ingresos: ${formatter({
            value: item?.ingresos,
            type: 'currency',
          })} - Sueldo Neto: ${formatter({
            value: item?.sueldo_neto,
            type: 'currency',
          })}`}
        />
      </CustomListItem>
    )
  }

  const dataSource = useMemo(() => {
    return searchDate[0]
      ? filterByDate(
          filterArray(nomina, [searchTipoNomina], ['id_tipo_nomina'])?.filter(
            (item) => item.estado_nomina === 'U'
          ),
          'fecha_registro',
          searchDate[0],
          searchDate[1]
        )
      : filterArray(nomina, [searchTipoNomina], ['id_tipo_nomina'])?.filter(
          (item) => item.estado_nomina === 'U'
        )
  }, [nomina, searchDate, searchTipoNomina])

  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={fetchingFromEmployee || fetch}>
        <CustomRow justify={'end'}>
          <CustomCol xs={24}>
            <CustomForm form={form}>
              <CustomRow>
                <CustomDivider>
                  <CustomTitle>Consultar Nominas</CustomTitle>
                </CustomDivider>
              </CustomRow>
              <CustomCollapse
                style={{ width: '100%', marginTop: '2%', marginBottom: '1%' }}
              >
                <CustomPanel
                  key={'1'}
                  header={<CustomTitle>Filtros </CustomTitle>}
                >
                  <CustomRow justify="start">
                    <CustomCol xs={6} style={{ marginRight: '1%' }}>
                      <CustomSelect
                        placeholder={'Tipo Nomina'}
                        allowClear
                        onClear={() => setSearchTipoNomina('')}
                        onSelect={(value) => {
                          setSearchTipoNomina(value)
                        }}
                        options={historyChange?.map((item) => {
                          return {
                            label: item.tipo_nomina,
                            value: item.id,
                          }
                        })}
                      />
                    </CustomCol>

                    <CustomCol xs={6}>
                      <CustomDatePicker
                        style={{ marginLeft: '2%' }}
                        onChange={(_, dateString) => {
                          setSearchDate(dateString)
                        }}
                      />
                    </CustomCol>
                  </CustomRow>
                </CustomPanel>
              </CustomCollapse>
              <CustomList
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                renderItem={renderItem}
              />
              <CustomModal
                cancelText={view ? 'Salir' : 'Cancelar'}
                okButtonProps={{ hidden: view }}
                onOk={() => (edit?.id ? handleUpdate() : handleCreate())}
                title={<CustomTitle>Detalles de la Nomina</CustomTitle>}
                visible={visible}
                width={'60%'}
                onCancel={() => {
                  setVisible(false)
                  setEdit(undefined)
                  setView(false)
                  form.resetFields()
                }}
              >
                <CustomSpin spinning={fetch}>
                  <CustomCol xs={24}>
                    <CustomList
                      dataSource={detNomina?.filter(
                        (item) => item?.estado === 'A'
                      )}
                      pagination={{ pageSize: 100 }}
                      renderItem={renderItemDet}
                    />
                  </CustomCol>
                </CustomSpin>
              </CustomModal>
            </CustomForm>
          </CustomCol>
        </CustomRow>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default ConsultarNomina
