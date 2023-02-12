/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterFilled,
  StopOutlined,
} from '@ant-design/icons'
import { Form } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { defaultBreakpoints, defaultTheme } from '../themes'
import {
  formatter,
  generatePassword,
  removeFilters,
  replaceAll,
  searchInArray,
} from '../utils/general'
import { CustomModalConfirmation } from '../components/ConfirmModalMethod'
import CustomButton from '../components/CustomButton'
import CustomCol from '../components/CustomCol'
import CustomDivider from '../components/CustomDivider'
import CustomForm from '../components/CustomForm'
import CustomFormItem from '../components/CustomFormItem'
import CustomModal from '../components/CustomModal'
import CustomRadio from '../components/CustomRadio'
import CustomRadioGroup from '../components/CustomRadioGroup'
import CustomRow from '../components/CustomRow'
import CustomSearch from '../components/CustomSearch'
import CustomSearchPacientes from '../components/CustomSearchPacientes'
import CustomTitle from '../components/CustomTitle'
import CustomTooltip from '../components/CustomTooltip'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import {
  createConsultas,
  createDoctor,
  createEspecialidad,
  createHorarios,
  createPacientes,
  getConsultas,
  getDoctores,
  getEspecialidades,
  getHorarios,
  getNacionalidades,
  getPacientes,
  getSeguros,
  updateConsultas,
  updateDoctor,
  updateEspecialidad,
  updateHorarios,
  updatePacientes,
} from '../slicers/general/general'
import { ConsultasType } from '../slicers/general'
import CustomTable from '../components/CustomTable'
import { ColumnType } from 'antd/lib/table'
import { AnyType } from '../constants/types'
import CustomSpace from '../components/CustomSpace'
import moment from 'moment'
import CustomSelect from '../components/CustomSelect'
import CustomTextArea from '../components/CustomTextArea'
import CustomRangePicker from '../components/CustomRangePicker'
import CustomInput from '../components/CustomInput'
import {
  DoctoresType,
  EspecilidadesType,
  HorariosType,
  PacientesType,
} from '../slicers/general/types'
import ConditionalComponent from '../components/ConditionalComponent'
import CustomDatePicker from '../components/CustomDatePicker'
import CustomUpload from '../components/CustomUpload'
import CustomMaskedInput from '../components/CustomMaskedInput'
import { maskedInput } from '../constants/general'
import { getSessionInfo } from '../utils/session'
import PrintTemplate from '../components/PrintTemplate'
import { useReactToPrint } from 'react-to-print'
interface TemplateProps {
  State: string
}
type ComponentsRef = 'print'

const SimpleTemplate: React.FC<TemplateProps> = ({
  State,
}): React.ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const printRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>()

  const [currentRef, setCurrentRef] = useState<string>(undefined)

  const ref: Record<ComponentsRef, React.RefObject<HTMLDivElement>> = {
    print: printRef,
  }
  const handlePrint = useReactToPrint({
    content: () => ref[currentRef as ComponentsRef]?.current,
    onAfterPrint: () => {
      setCurrentRef(undefined)
      setLoading(false)
    },
    documentTitle: 'Reporte',
    bodyClass: 'print-report',
  })
  const {
    Consultas,
    fetchingGeneralData,
    createConsultasRequestStatus,
    createPacientesRequestStatus,
    createDoctorRequestStatus,
    createEspecialidadRequestStatus,
    createHorariosRequestStatus,
    doctores,
    pacientes,
    nacionalidades,
    seguros,
    horarios,
    especialidades,
  } = useAppSelector((state) => state.general)

  const handleUsePrint = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log(ref[currentRef as ComponentsRef]?.current)
    if (ref[currentRef as ComponentsRef]?.current) {
      handlePrint()
    }
  }, [currentRef])

  useEffect(handleUsePrint, [handleUsePrint])

  useEffect(() => {
    if (State === 'C') {
      dispatch(getConsultas({}))
      dispatch(getDoctores({}))
    } else if (State === 'P') {
      dispatch(getPacientes({}))
      dispatch(getNacionalidades({}))
      dispatch(getSeguros({}))
    } else if (State === 'D') {
      dispatch(getDoctores({}))
      dispatch(getNacionalidades({}))
      dispatch(getEspecialidades({}))
    } else if (State === 'E') {
      dispatch(getEspecialidades({}))
    } else if (State === 'H') {
      dispatch(getHorarios({}))
      dispatch(getDoctores({}))
    } else if (State === 'CP' && getSessionInfo().id) {
      dispatch(
        getConsultas({
          condition: {
            id_paciente: getSessionInfo().id,
          },
        })
      )
    } else if (State === 'CD' && getSessionInfo().id) {
      dispatch(
        getConsultas({
          condition: {
            id_doctor: getSessionInfo().id,
          },
        })
      )
    }
  }, [State])

  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<AnyType>()
  const [view, setView] = useState(false)
  const [pacienteSelected, setpacienteSelected] = useState<PacientesType>()
  const [visible, setVisible] = useState(false)
  const [stateFilter, setStateFilter] = useState<string>('A')

  const handleDelete = (record: ConsultasType | PacientesType) => {
    if (State === 'C') {
      dispatch(
        updateConsultas({
          condition: {
            ...record,
            estado: record.estado === 'A' ? 'I' : 'A',
          },
        })
      )
    } else if (State === 'P') {
      dispatch(
        updatePacientes({
          condition: {
            ...record,
            estado: record.estado === 'A' ? 'I' : 'A',
          },
        })
      )
    } else if (State === 'D') {
      dispatch(
        updateDoctor({
          condition: {
            ...record,
            estado: record.estado === 'A' ? 'I' : 'A',
          },
        })
      )
    } else if (State === 'E') {
      dispatch(
        updateEspecialidad({
          condition: {
            ...record,
            estado: record.estado === 'A' ? 'I' : 'A',
          },
        })
      )
    } else if (State === 'H') {
      dispatch(
        updateHorarios({
          condition: {
            ...record,
            estado: record.estado === 'A' ? 'I' : 'A',
          },
        })
      )
    }
  }
  const handleEdit = (record: AnyType) => {
    setVisible(true)
    setEdit(record)
    if (State === 'C') {
      form.setFieldsValue({
        ...record,
        nombres: `${record?.nombre_paciente} ${record?.apellido_paciente}`,
        documento_identidad: formatter({
          value: record?.cedula,
          type: 'identity_doc',
        }),
        fecha: [moment(record.inicio), moment(record.fin)],
      })
    } else if (State === 'P') {
      form.setFieldsValue({
        ...record,
        fecha_nacimiento: moment(record.fecha_nacimiento),
        imagen: record.imagen ? record.imagen : [],
      })
    } else if (State === 'D') {
      form.setFieldsValue({
        ...record,
        fecha_nacimiento: moment(record.fecha_nacimiento),
      })
    } else if (State === 'E' || State === 'H') {
      form.setFieldsValue({
        ...record,
      })
    }
  }

  const columnsConsultas: ColumnType<ConsultasType>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'paciente',
      title: 'Paciente',
      dataIndex: 'paciente',
      render: (_, record) => {
        return `${record.nombre_paciente} ${record.apellido_paciente}`
      },
    },
    {
      key: 'doctor',
      title: 'Doctor',
      dataIndex: 'doctor',
      render: (_, record) => {
        return `${record.nombre_doctor} ${record.apellido_doctor}`
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: `${item.nombre_doctor} ${item.apellido_doctor}`,
              value: item.nombre_doctor,
            }))?.unique('text')
          : [],

      onFilter(value, record) {
        return record.nombre_doctor === value
      },
    },
    {
      key: 'asunto',
      title: 'Asunto',
      dataIndex: 'asunto',
    },
    {
      key: 'inicio',
      title: 'Inicio',
      width: '10%',
      dataIndex: 'inicio',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: moment(item.inicio).format('DD/MM/YYYY'),
              value: moment(item.inicio).format('DD/MM/YYYY'),
            }))?.unique('text')
          : [],
      onFilter(value, record) {
        return moment(record.inicio).format('DD/MM/YYYY') === value
      },
    },
    {
      key: 'fin',
      title: 'Fin',
      width: '10%',
      dataIndex: 'fin',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: moment(item.fin).format('DD/MM/YYYY'),
              value: moment(item.fin).format('DD/MM/YYYY'),
            }))?.unique('text')
          : [],
      onFilter(value, record) {
        return moment(record.fin).format('DD/MM/YYYY') === value
      },
    },

    {
      key: 'acciones',
      title: 'Acciones',
      align: 'center',
      width: '10%',
      render: (_, item: AnyType) => {
        return (
          <CustomSpace>
            <CustomTooltip
              key={'edit'}
              title={
                item.estado === 'A' ? 'Editar' : 'Inactivo, no permite edición'
              }
            >
              <CustomButton
                disabled={item.estado === 'I'}
                onClick={() => handleEdit(item)}
                type={'link'}
                icon={<EditOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>

            <CustomTooltip
              key={'delete'}
              title={item.estado === 'A' ? 'Inhabilitar' : 'Habilitar'}
            >
              <CustomButton
                onClick={() => {
                  CustomModalConfirmation({
                    content:
                      item.estado === 'A'
                        ? '¿Está seguro que desea eliminar el registro?'
                        : '¿Está seguro que desea habilitar el registro?',
                    onOk: () => {
                      handleDelete(item)
                    },
                  })
                }}
                type={'link'}
                icon={
                  item.estado === 'A' ? (
                    <DeleteOutlined
                      style={{
                        fontSize: '18px',
                        color: defaultTheme.dangerColor,
                      }}
                    />
                  ) : (
                    <StopOutlined
                      className="disabledColor"
                      style={{ fontSize: '18px' }}
                    />
                  )
                }
              />
            </CustomTooltip>
          </CustomSpace>
        )
      },
    },
  ]
  const columnsConsultasPacientes: ColumnType<ConsultasType>[] = [
    {
      key: 'doctor',
      title: 'Doctor',
      dataIndex: 'doctor',
      render: (_, record) => {
        return `${record.nombre_doctor} ${record.apellido_doctor}`
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: `${item.nombre_doctor} ${item.apellido_doctor}`,
              value: item.nombre_doctor,
            }))?.unique('text')
          : [],

      onFilter(value, record) {
        return record.nombre_doctor === value
      },
    },
    {
      key: 'asunto',
      title: 'Asunto',
      dataIndex: 'asunto',
    },
    {
      key: 'inicio',
      title: 'Inicio',
      width: '10%',
      dataIndex: 'inicio',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: moment(item.inicio).format('DD/MM/YYYY'),
              value: moment(item.inicio).format('DD/MM/YYYY'),
            }))?.unique('text')
          : [],
      onFilter(value, record) {
        return moment(record.inicio).format('DD/MM/YYYY') === value
      },
    },

    {
      key: 'fin',
      title: 'Fin',
      width: '10%',
      dataIndex: 'fin',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: moment(item.fin).format('DD/MM/YYYY'),
              value: moment(item.fin).format('DD/MM/YYYY'),
            }))?.unique('text')
          : [],
      onFilter(value, record) {
        return moment(record.fin).format('DD/MM/YYYY') === value
      },
    },
  ]
  const columnsConsultasDoctor: ColumnType<ConsultasType>[] = [
    {
      key: 'paciente',
      title: 'Paciente',
      dataIndex: 'paciente',
      render: (_, record) => {
        return `${record.nombre_paciente} ${record.apellido_paciente}`
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: `${item.nombre_paciente} ${item.apellido_paciente}`,
              value: `${item.nombre_paciente} ${item.apellido_paciente}`,
            }))?.unique('text')
          : [],

      onFilter(value, record) {
        return `${record.nombre_paciente} ${record.apellido_paciente}` === value
      },
    },
    {
      key: 'asunto',
      title: 'Asunto',
      dataIndex: 'asunto',
    },
    {
      key: 'inicio',
      title: 'Inicio',
      width: '10%',
      dataIndex: 'inicio',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: moment(item.inicio).format('DD/MM/YYYY'),
              value: moment(item.inicio).format('DD/MM/YYYY'),
            }))?.unique('text')
          : [],
      onFilter(value, record) {
        return moment(record.inicio).format('DD/MM/YYYY') === value
      },
    },
    {
      key: 'fin',
      title: 'Fin',
      width: '10%',
      dataIndex: 'fin',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
      },
      filters:
        Number(Consultas?.length) > 0
          ? Consultas?.map((item: AnyType) => ({
              text: moment(item.fin).format('DD/MM/YYYY'),
              value: moment(item.fin).format('DD/MM/YYYY'),
            }))?.unique('text')
          : [],
      onFilter(value, record) {
        return moment(record.fin).format('DD/MM/YYYY') === value
      },
    },
  ]
  const columnsPacientes: ColumnType<PacientesType>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'nombres',
      title: 'Nombre',
      dataIndex: 'nombres',
      render: (_, record) => {
        return `${record.nombres} ${record.apellidos}`
      },
    },
    {
      key: 'cedula',
      title: 'Cédula',
      width: '12%',
      dataIndex: 'cedula',
      render: (_, record) => {
        return formatter({ value: record.cedula, type: 'identity_doc' })
      },
    },
    {
      key: 'fecha_nacimiento',
      title: 'Fecha de nacimiento',
      width: '10%',
      dataIndex: 'fecha_nacimiento',
      render: (_, record) => {
        return moment(record.fecha_nacimiento).format('DD/MM/YYYY')
      },
    },
    {
      key: 'sexo',
      title: 'Sexo',
      width: '10%',
      dataIndex: 'sexo',
      render: (item) => {
        return item === 'M' ? 'Masculino' : 'Femenino'
      },
      filters:
        Number(pacientes?.length) > 0
          ? pacientes
              ?.map((item) => ({
                text: item.sexo === 'M' ? 'Masculino' : 'Femenino',
                value: item.sexo,
              }))
              ?.unique('text')
          : [],

      onFilter(value, record) {
        return record.sexo === value
      },
    },
    {
      key: 'seguro',
      title: 'Seguro',
      dataIndex: 'seguro',
      filters:
        Number(pacientes?.length) > 0
          ? pacientes
              ?.map((item) => ({
                text: item.seguro,
                value: item.seguro,
              }))
              ?.unique('text')
          : [],

      onFilter(value, record) {
        return record.seguro === value
      },
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'nacionalidad',
      title: 'Nacionalidad',
      dataIndex: 'nacionalidad',
      filters:
        Number(pacientes?.length) > 0
          ? pacientes
              ?.map((item) => ({
                text: item.nacionalidad,
                value: item.nacionalidad,
              }))
              ?.unique('text')
          : [],

      onFilter(value, record) {
        return record.nacionalidad === value
      },
    },

    {
      key: 'acciones',
      title: 'Acciones',
      align: 'center',
      width: '10%',
      render: (_, item: AnyType) => {
        return (
          <CustomSpace>
            <CustomTooltip
              key={'edit'}
              title={
                item.estado === 'A' ? 'Editar' : 'Inactivo, no permite edición'
              }
            >
              <CustomButton
                disabled={item.estado === 'I'}
                onClick={() => handleEdit(item)}
                type={'link'}
                icon={<EditOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>

            <CustomTooltip
              key={'delete'}
              title={item.estado === 'A' ? 'Inhabilitar' : 'Habilitar'}
            >
              <CustomButton
                onClick={() => {
                  CustomModalConfirmation({
                    content:
                      item.estado === 'A'
                        ? '¿Está seguro que desea eliminar el registro?'
                        : '¿Está seguro que desea habilitar el registro?',
                    onOk: () => {
                      handleDelete(item)
                    },
                  })
                }}
                type={'link'}
                icon={
                  item.estado === 'A' ? (
                    <DeleteOutlined
                      style={{
                        fontSize: '18px',
                        color: defaultTheme.dangerColor,
                      }}
                    />
                  ) : (
                    <StopOutlined
                      className="disabledColor"
                      style={{ fontSize: '18px' }}
                    />
                  )
                }
              />
            </CustomTooltip>
          </CustomSpace>
        )
      },
    },
  ]
  const columnsDoctores: ColumnType<DoctoresType>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'nombres',
      title: 'Nombre',
      dataIndex: 'nombres',
      render: (_, record) => {
        return `${record.nombre} ${record.apellido}`
      },
    },
    {
      key: 'cedula',
      title: 'Cédula',
      width: '12%',
      dataIndex: 'cedula',
      render: (_, record) => {
        return formatter({ value: record.cedula, type: 'identity_doc' })
      },
    },
    {
      key: 'fecha_nacimiento',
      title: 'Fecha de nacimiento',
      width: '10%',
      dataIndex: 'fecha_nacimiento',
      render: (_, record) => {
        return moment(record.fecha_nacimiento).format('DD/MM/YYYY')
      },
    },
    {
      key: 'sexo',
      title: 'Sexo',
      width: '10%',
      dataIndex: 'sexo',
      render: (item) => {
        return item === 'M' ? 'Masculino' : 'Femenino'
      },
      filters:
        Number(pacientes?.length) > 0
          ? pacientes
              ?.map((item) => ({
                text: item.sexo === 'M' ? 'Masculino' : 'Femenino',
                value: item.sexo,
              }))
              ?.unique('text')
          : [],

      onFilter(value, record) {
        return record.sexo === value
      },
    },
    {
      key: 'especialidad',
      title: 'Especialidad',
      dataIndex: 'especialidad',
      filters:
        Number(pacientes?.length) > 0
          ? doctores
              ?.map((item) => ({
                text: item.especialidad,
                value: item.especialidad,
              }))
              ?.unique('text')
          : [],

      onFilter(value, record) {
        return record.especialidad === value
      },
    },
    {
      key: 'correo',
      title: 'Email',
      dataIndex: 'correo',
    },
    {
      key: 'nacionalidad',
      title: 'Nacionalidad',
      dataIndex: 'nacionalidad',
      filters:
        Number(pacientes?.length) > 0
          ? pacientes
              ?.map((item) => ({
                text: item.nacionalidad,
                value: item.nacionalidad,
              }))
              ?.unique('text')
          : [],

      onFilter(value, record) {
        return record.nacionalidad === value
      },
    },

    {
      key: 'acciones',
      title: 'Acciones',
      align: 'center',
      width: '10%',
      render: (_, item: AnyType) => {
        return (
          <CustomSpace>
            <CustomTooltip
              key={'edit'}
              title={
                item.estado === 'A' ? 'Editar' : 'Inactivo, no permite edición'
              }
            >
              <CustomButton
                disabled={item.estado === 'I'}
                onClick={() => handleEdit(item)}
                type={'link'}
                icon={<EditOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>

            <CustomTooltip
              key={'delete'}
              title={item.estado === 'A' ? 'Inhabilitar' : 'Habilitar'}
            >
              <CustomButton
                onClick={() => {
                  CustomModalConfirmation({
                    content:
                      item.estado === 'A'
                        ? '¿Está seguro que desea eliminar el registro?'
                        : '¿Está seguro que desea habilitar el registro?',
                    onOk: () => {
                      handleDelete(item)
                    },
                  })
                }}
                type={'link'}
                icon={
                  item.estado === 'A' ? (
                    <DeleteOutlined
                      style={{
                        fontSize: '18px',
                        color: defaultTheme.dangerColor,
                      }}
                    />
                  ) : (
                    <StopOutlined
                      className="disabledColor"
                      style={{ fontSize: '18px' }}
                    />
                  )
                }
              />
            </CustomTooltip>
          </CustomSpace>
        )
      },
    },
  ]
  const columnsEspecialidades: ColumnType<EspecilidadesType>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'nombre',
      title: 'Especialidad',
      dataIndex: 'nombre',
    },

    {
      key: 'acciones',
      title: 'Acciones',
      align: 'center',
      width: '10%',
      render: (_, item: AnyType) => {
        return (
          <CustomSpace>
            <CustomTooltip
              key={'edit'}
              title={
                item.estado === 'A' ? 'Editar' : 'Inactivo, no permite edición'
              }
            >
              <CustomButton
                disabled={item.estado === 'I'}
                onClick={() => handleEdit(item)}
                type={'link'}
                icon={<EditOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>

            <CustomTooltip
              key={'delete'}
              title={item.estado === 'A' ? 'Inhabilitar' : 'Habilitar'}
            >
              <CustomButton
                onClick={() => {
                  CustomModalConfirmation({
                    content:
                      item.estado === 'A'
                        ? '¿Está seguro que desea eliminar el registro?'
                        : '¿Está seguro que desea habilitar el registro?',
                    onOk: () => {
                      handleDelete(item)
                    },
                  })
                }}
                type={'link'}
                icon={
                  item.estado === 'A' ? (
                    <DeleteOutlined
                      style={{
                        fontSize: '18px',
                        color: defaultTheme.dangerColor,
                      }}
                    />
                  ) : (
                    <StopOutlined
                      className="disabledColor"
                      style={{ fontSize: '18px' }}
                    />
                  )
                }
              />
            </CustomTooltip>
          </CustomSpace>
        )
      },
    },
  ]
  const columnsHorarios: ColumnType<HorariosType>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'nombre',
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      key: 'nombre_doctor',
      title: 'Doctor',
      dataIndex: 'nombre_doctor',
      filters:
        Number(horarios?.length) > 0
          ? horarios
              ?.map((item) => ({
                text: item.nombre_doctor,
                value: item.nombre_doctor,
              }))
              ?.unique('text')
          : [],

      onFilter(value, record) {
        return record.nombre_doctor === value
      },
    },
    {
      key: 'acciones',
      title: 'Acciones',
      align: 'center',
      width: '10%',
      render: (_, item: AnyType) => {
        return (
          <CustomSpace>
            <CustomTooltip
              key={'edit'}
              title={
                item.estado === 'A' ? 'Editar' : 'Inactivo, no permite edición'
              }
            >
              <CustomButton
                disabled={item.estado === 'I'}
                onClick={() => handleEdit(item)}
                type={'link'}
                icon={<EditOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>

            <CustomTooltip
              key={'delete'}
              title={item.estado === 'A' ? 'Inhabilitar' : 'Habilitar'}
            >
              <CustomButton
                onClick={() => {
                  CustomModalConfirmation({
                    content:
                      item.estado === 'A'
                        ? '¿Está seguro que desea eliminar el registro?'
                        : '¿Está seguro que desea habilitar el registro?',
                    onOk: () => {
                      handleDelete(item)
                    },
                  })
                }}
                type={'link'}
                icon={
                  item.estado === 'A' ? (
                    <DeleteOutlined
                      style={{
                        fontSize: '18px',
                        color: defaultTheme.dangerColor,
                      }}
                    />
                  ) : (
                    <StopOutlined
                      className="disabledColor"
                      style={{ fontSize: '18px' }}
                    />
                  )
                }
              />
            </CustomTooltip>
          </CustomSpace>
        )
      },
    },
  ]

  const title = {
    C: {
      title: 'Consultas',
      titleModal: 'Registrar Consulta',
      titleModalEdit: 'Editar Consulta',
      placeHolderSearch: 'Buscar por nombre paciente / doctor',
      columns: columnsConsultas,
      dataSource:
        stateFilter === ''
          ? searchInArray(
              Consultas?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre_paciente', 'nombre_doctor', 'cedula'],
              search
            )
          : searchInArray(
              Consultas?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre_paciente', 'nombre_doctor', 'cedula'],
              search
            )?.filter((item) => item.estado === stateFilter),
    },
    P: {
      title: 'Pacientes',
      titleModal: 'Registrar Paciente',
      titleModalEdit: 'Editar Paciente',
      placeHolderSearch: 'Buscar por nombre paciente o cedula',
      columns: columnsPacientes,
      dataSource:
        stateFilter === ''
          ? searchInArray(
              pacientes?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombres', 'apellidos', 'cedula'],
              search
            )
          : searchInArray(
              pacientes?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombres', 'apellidos', 'cedula'],
              search
            )?.filter((item) => item.estado === stateFilter),
    },

    D: {
      title: 'Doctores',
      titleModal: 'Registrar Doctor',
      titleModalEdit: 'Editar Doctor',
      placeHolderSearch: 'Buscar por nombre Nombre o cedula',
      columns: columnsDoctores,
      dataSource:
        stateFilter === ''
          ? searchInArray(
              doctores?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre', 'apellido', 'cedula'],
              search
            )
          : searchInArray(
              doctores?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre', 'apellido', 'cedula'],
              search
            )?.filter((item) => item.estado === stateFilter),
    },
    E: {
      title: 'Especialidades',
      titleModal: 'Registrar Especialidad',
      titleModalEdit: 'Editar Especialidad',
      placeHolderSearch: 'Buscar por especialidad',
      columns: columnsEspecialidades,
      dataSource:
        stateFilter === ''
          ? searchInArray(
              especialidades?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre'],
              search
            )
          : searchInArray(
              especialidades?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre'],
              search
            )?.filter((item) => item.estado === stateFilter),
    },
    H: {
      title: 'Horarios',
      titleModal: 'Registrar Horario',
      titleModalEdit: 'Editar Horario',
      placeHolderSearch: 'Buscar por doctor',
      columns: columnsHorarios,
      dataSource:
        stateFilter === ''
          ? searchInArray(
              horarios?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre_doctor'],
              search
            )
          : searchInArray(
              horarios?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre_doctor'],
              search
            )?.filter((item) => item.estado === stateFilter),
    },
    CP: {
      title: 'Mis Consultas',
      titleModal: 'Registrar Consulta',
      titleModalEdit: 'Editar Consulta',
      placeHolderSearch: 'Buscar por nombre paciente / doctor',
      columns: columnsConsultasPacientes,
      dataSource:
        stateFilter === ''
          ? searchInArray(
              Consultas?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre_doctor'],
              search
            )
          : searchInArray(
              Consultas?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre_doctor'],
              search
            )?.filter((item) => item.estado === stateFilter),
    },
    CD: {
      title: 'Mis Consultas',
      titleModal: 'Registrar Consulta',
      titleModalEdit: 'Editar Consulta',
      placeHolderSearch: 'Buscar por nombre paciente',
      columns: columnsConsultasDoctor,
      dataSource:
        stateFilter === ''
          ? searchInArray(
              Consultas?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre_paciente'],
              search
            )
          : searchInArray(
              Consultas?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombre_paciente'],
              search
            )?.filter((item) => item.estado === stateFilter),
    },
  }

  useEffect(() => {
    pacienteSelected &&
      form.setFieldsValue({
        ...pacienteSelected,
        nombres: `${pacienteSelected?.nombres} ${pacienteSelected?.apellidos}`,
        documento_identidad: formatter({
          value: pacienteSelected?.cedula,
          type: 'identity_doc',
        }),
      })
  }, [pacienteSelected])
  useEffect(() => {
    if (
      createConsultasRequestStatus === 'success' ||
      createPacientesRequestStatus === 'success' ||
      createDoctorRequestStatus === 'success' ||
      createEspecialidadRequestStatus === 'success' ||
      createHorariosRequestStatus === 'success'
    ) {
      State === 'C' && dispatch(getConsultas({}))

      State === 'P' && dispatch(getPacientes({}))
      State === 'D' && dispatch(getDoctores({}))
      State === 'E' && dispatch(getEspecialidades({}))
      State === 'H' && dispatch(getHorarios({}))
      form.resetFields()
      setVisible(false)
      setEdit(undefined)
      setView(false)
    }
  }, [
    createConsultasRequestStatus,
    createPacientesRequestStatus,
    createDoctorRequestStatus,
    createEspecialidadRequestStatus,
    createHorariosRequestStatus,
  ])

  const handleUpdate = async () => {
    const data = await form.validateFields()
    if (State === 'C') {
      dispatch(updateConsultas({ condition: { ...edit, ...data } }))
    } else if (State === 'P') {
      dispatch(updatePacientes({ condition: { ...edit, ...data } }))
    } else if (State === 'D') {
      dispatch(updateDoctor({ condition: { ...edit, ...data } }))
    } else if (State === 'E') {
      dispatch(updateEspecialidad({ condition: { ...edit, ...data } }))
    } else if (State === 'H') {
      dispatch(updateHorarios({ condition: { ...edit, ...data } }))
    }
  }
  const handleCreate = async () => {
    const data = await form.validateFields()

    if (State === 'C') {
      dispatch(
        createConsultas({
          condition: {
            ...data,
            id_paciente: pacienteSelected.id,
            inicio: moment(data.fecha[0]).format('YYYY-MM-DD'),
            fin: moment(data.fecha[1]).format('YYYY-MM-DD'),
          },
        })
      )
    } else if (State === 'P') {
      dispatch(
        createPacientes({
          condition: {
            ...data,
            telefono: replaceAll(data.telefono, ' ', ''),
            cedula: replaceAll(data.cedula, '-', ''),
            id_seguro: data.seguro,
            id_nacionalidad: data.nacionalidad,
            clave: generatePassword(data.nombres, data.apellidos),
          },
        })
      )
    } else if (State === 'D') {
      dispatch(
        createDoctor({
          condition: {
            ...data,
            telefono: replaceAll(data.telefono, ' ', ''),
            cedula: replaceAll(data.cedula, '-', ''),
            id_especialidad: data.especialidad,
            id_nacionalidad: data.nacionalidad,
            clave: generatePassword(data.nombres, data.apellidos),
          },
        })
      )
    } else if (State === 'E') {
      dispatch(
        createEspecialidad({
          condition: {
            ...data,
          },
        })
      )
    } else if (State === 'H') {
      dispatch(
        createHorarios({
          condition: {
            ...data,
          },
        })
      )
    }
  }

  return (
    <CustomLayoutBoxShadow>
      <CustomSpin spinning={loading} tip={'Generando Reporte...'}>
        <CustomSpin spinning={fetchingGeneralData}>
          <CustomRow justify={'end'}>
            <CustomCol xs={24}>
              <CustomForm form={form}>
                <CustomRow>
                  <CustomDivider>
                    <CustomTitle>{title[`${State}`]?.title}</CustomTitle>
                  </CustomDivider>

                  <CustomCol xs={24} md={12} />
                  <CustomCol xs={24} md={12}>
                    <CustomRow justify={'end'} gutter={[10, 0]}>
                      <CustomCol xs={20}>
                        <CustomFormItem noStyle name={'SEARCH'}>
                          <CustomSearch
                            className={'search'}
                            placeholder={title[`${State}`]?.placeHolderSearch}
                            onChange={(e) => {
                              setSearch(e.target.value)
                            }}
                          />
                        </CustomFormItem>
                      </CustomCol>

                      <CustomCol xs={4} md={2} lg={3} xl={2}>
                        <CustomTooltip title={'Nuevo'}>
                          <CustomButton
                            icon={<PlusOutlined />}
                            shape={'circle'}
                            size={'middle'}
                            type={'primary'}
                            onClick={() => {
                              setVisible(true)
                            }}
                          />
                        </CustomTooltip>
                      </CustomCol>
                    </CustomRow>
                  </CustomCol>

                  <CustomCol span={12}>
                    <CustomRow justify={'end'}>
                      <CustomFormItem
                        label={'Ver: '}
                        className={'grupoPersona'}
                      >
                        <CustomRadioGroup
                          value={stateFilter}
                          defaultValue={'A'}
                          onChange={(e) => {
                            setStateFilter(e.target.value)
                          }}
                        >
                          <CustomRadio value={'A'}>Activos</CustomRadio>
                          <CustomRadio value={'I'}>Inactivos</CustomRadio>
                        </CustomRadioGroup>
                      </CustomFormItem>
                    </CustomRow>
                  </CustomCol>
                </CustomRow>
                <CustomTable
                  columns={title[`${State}`]?.columns}
                  dataSource={title[`${State}`]?.dataSource}
                  pagination={{ pageSize: 5 }}
                  extra={
                    <CustomRow justify={'end'} width={'100%'}>
                      <CustomTooltip title={'Imprimir'}>
                        <CustomButton
                          onClick={async () => {
                            setCurrentRef('print')
                            setLoading(true)
                          }}
                          type={'link'}
                          icon={<PrinterFilled style={{ fontSize: '22px' }} />}
                        />
                      </CustomTooltip>
                    </CustomRow>
                  }
                />

                <CustomModal
                  title={
                    <CustomTitle>
                      {edit?.id
                        ? title[`${State}`]?.titleModalEdit
                        : title[`${State}`]?.titleModal}
                    </CustomTitle>
                  }
                  width={'55%'}
                  visible={visible}
                  cancelText={view ? 'Salir' : 'Cancelar'}
                  okButtonProps={{ hidden: view }}
                  onCancel={() => {
                    CustomModalConfirmation({
                      content:
                        '¿Está seguro que desea salir sin guardar los cambios?',
                      onOk: () => {
                        setVisible(false)
                        setEdit(undefined)
                        setView(false)
                        form.resetFields()
                      },
                    })
                  }}
                  onOk={() => {
                    edit?.id ? handleUpdate() : handleCreate()
                  }}
                >
                  {/* consultas  */}
                  <ConditionalComponent condition={State === 'C'}>
                    <CustomCol xs={24}>
                      <CustomFormItem
                        label={'Paciente'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 4 }}
                      >
                        <CustomFormItem
                          label={'Nombre'}
                          noStyle
                          name={'nombres'}
                          rules={[{ required: true }]}
                        >
                          {edit?.nombre_paciente ? (
                            <CustomInput disabled placeholder="paciente" />
                          ) : (
                            <CustomSearchPacientes
                              showInitialValue
                              style={{ marginBottom: '2%' }}
                              placeholder={
                                'Buscar por: documento de identidad o nombres'
                              }
                              onSelect={(_, employee) => {
                                setpacienteSelected(employee)
                              }}
                            />
                          )}
                        </CustomFormItem>
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol xs={24}>
                      <CustomFormItem
                        label={'Doctor'}
                        name={'id_doctor'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 4 }}
                      >
                        <CustomSelect
                          placeholder={'Seleccione un doctor'}
                          options={doctores?.map((item) => ({
                            label: item.nombre,
                            value: item.id,
                          }))}
                        />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol xs={24}>
                      <CustomFormItem
                        label={'Asunto'}
                        name={'asunto'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 4 }}
                      >
                        <CustomTextArea placeholder="Asunto" />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol xs={24} style={{ marginTop: '0.5%' }}>
                      <CustomFormItem
                        label={'Fecha'}
                        name={'fecha'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 4 }}
                      >
                        <CustomRangePicker />
                      </CustomFormItem>
                    </CustomCol>
                  </ConditionalComponent>
                  {/* Pacientes  */}
                  <ConditionalComponent condition={State === 'P'}>
                    <CustomRow justify="space-between">
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Nombre'}
                          name={'nombres'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomInput placeholder="Nombre" />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Apellido'}
                          name={'apellidos'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomInput placeholder="Apellido" />
                        </CustomFormItem>
                      </CustomCol>
                    </CustomRow>
                    <CustomRow justify="space-between">
                      <CustomCol {...defaultBreakpoints} pull={1}>
                        <CustomFormItem
                          label={'Nacionalidad'}
                          name={'nacionalidad'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 8 }}
                        >
                          <CustomSelect
                            placeholder={'Seleccione una nacionalidad'}
                            width={'112%'}
                            options={nacionalidades?.map((item) => ({
                              label: item.nombre,
                              value: item.id,
                            }))}
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Cédula'}
                          name={'cedula'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomMaskedInput
                            mask={maskedInput.doc_identidad}
                            placeholder="Cedula"
                          />
                        </CustomFormItem>
                      </CustomCol>
                    </CustomRow>
                    <CustomRow justify="space-between">
                      <CustomCol {...defaultBreakpoints} pull={2}>
                        <CustomFormItem
                          label={'Fecha de Nac.'}
                          name={'fecha_nacimiento'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 10 }}
                        >
                          <CustomDatePicker style={{ width: '128%' }} />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Sexo'}
                          name={'sexo'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomSelect
                            placeholder={'Seleccione el Sexo'}
                            options={[
                              { label: 'Masculino', value: 'M' },
                              { label: 'Femenino', value: 'F' },
                            ]}
                          />
                        </CustomFormItem>
                      </CustomCol>
                    </CustomRow>
                    <CustomRow justify="space-between">
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Seguro'}
                          name={'seguro'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomSelect
                            placeholder={'Seleccione el Seguro'}
                            options={seguros?.map((item) => ({
                              label: item.nombre,
                              value: item.id,
                            }))}
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Teléfono'}
                          name={'telefono'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomMaskedInput
                            mask={maskedInput.telefono}
                            placeholder="Telefono"
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Email'}
                          name={'email'}
                          rules={[{ required: true, type: 'email' }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomInput
                            placeholder={'Correo Electrónico'}
                            type={'email'}
                          />
                        </CustomFormItem>
                      </CustomCol>
                      {/* <CustomCol {...defaultBreakpoints}>
                      <CustomUpload
                        form={form}
                        previewTitle={'Imagen'}
                        label={'Foto'}
                        name={'imagen'}
                        labelCol={{ span: 6 }}
                      />
                    </CustomCol> */}
                    </CustomRow>
                  </ConditionalComponent>
                  {/* Doctor  */}
                  <ConditionalComponent condition={State === 'D'}>
                    <CustomRow justify="space-between">
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Nombre'}
                          name={'nombre'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomInput placeholder="Nombre" />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Apellido'}
                          name={'apellido'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomInput placeholder="Apellido" />
                        </CustomFormItem>
                      </CustomCol>
                    </CustomRow>
                    <CustomRow justify="space-between">
                      <CustomCol {...defaultBreakpoints} pull={1}>
                        <CustomFormItem
                          label={'Nacionalidad'}
                          name={'nacionalidad'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 8 }}
                        >
                          <CustomSelect
                            placeholder={'Seleccione una nacionalidad'}
                            width={'112%'}
                            options={nacionalidades?.map((item) => ({
                              label: item.nombre,
                              value: item.id,
                            }))}
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Cédula'}
                          name={'cedula'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomMaskedInput
                            mask={maskedInput.doc_identidad}
                            placeholder="Cedula"
                          />
                        </CustomFormItem>
                      </CustomCol>
                    </CustomRow>
                    <CustomRow justify="space-between">
                      <CustomCol {...defaultBreakpoints} pull={2}>
                        <CustomFormItem
                          label={'Fecha de Nac.'}
                          name={'fecha_nacimiento'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 10 }}
                        >
                          <CustomDatePicker style={{ width: '128%' }} />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Sexo'}
                          name={'sexo'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomSelect
                            placeholder={'Seleccione el Sexo'}
                            options={[
                              { label: 'Masculino', value: 'M' },
                              { label: 'Femenino', value: 'F' },
                            ]}
                          />
                        </CustomFormItem>
                      </CustomCol>
                    </CustomRow>
                    <CustomRow justify="space-between">
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Especialidad'}
                          name={'especialidad'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomSelect
                            placeholder={'Seleccionar Especialidad'}
                            options={especialidades?.map((item) => ({
                              label: item.nombre,
                              value: item.id,
                            }))}
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Teléfono'}
                          name={'telefono'}
                          rules={[{ required: true }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomMaskedInput
                            mask={maskedInput.telefono}
                            placeholder="Telefono"
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Email'}
                          name={'correo'}
                          rules={[{ required: true, type: 'email' }]}
                          labelCol={{ span: 6 }}
                        >
                          <CustomInput
                            placeholder={'Correo Electrónico'}
                            type={'email'}
                          />
                        </CustomFormItem>
                      </CustomCol>
                    </CustomRow>
                  </ConditionalComponent>
                  <ConditionalComponent condition={State === 'E'}>
                    <CustomCol xs={24}>
                      <CustomFormItem
                        label={'Especialidad'}
                        name={'nombre'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 6 }}
                      >
                        <CustomInput placeholder="Especialidad" />
                      </CustomFormItem>
                    </CustomCol>
                  </ConditionalComponent>
                  {/* Horarios  */}
                  <ConditionalComponent condition={State === 'H'}>
                    <CustomCol xs={24}>
                      <CustomFormItem
                        label={'Nombre'}
                        name={'nombre'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 4 }}
                      >
                        <CustomInput placeholder="Nombre" />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol xs={24}>
                      <CustomFormItem
                        label={'Doctor'}
                        name={'id_doctor'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 4 }}
                      >
                        <CustomSelect
                          placeholder={'Seleccione un doctor'}
                          options={doctores?.map((item) => ({
                            label: item.nombre,
                            value: item.id,
                          }))}
                        />
                      </CustomFormItem>
                    </CustomCol>
                  </ConditionalComponent>
                </CustomModal>
              </CustomForm>
            </CustomCol>
          </CustomRow>
          <PrintTemplate ref={printRef} className={'print-report'}>
            <CustomTable
              columns={removeFilters(
                title[`${State}`]?.columns.map((item) => ({
                  ...(item.key === 'acciones' ? {} : item),
                }))
              )}
              dataSource={title[`${State}`]?.dataSource}
              pagination={false}
              title={() => (
                <CustomDivider>
                  <CustomTitle level={5}>{`${
                    title[`${State}`]?.title
                  }`}</CustomTitle>
                </CustomDivider>
              )}
            />
          </PrintTemplate>
        </CustomSpin>
      </CustomSpin>
    </CustomLayoutBoxShadow>
  )
}

export default SimpleTemplate
