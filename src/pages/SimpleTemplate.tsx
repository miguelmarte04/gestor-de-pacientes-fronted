/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  PlusOutlined,
  PrinterFilled,
  RollbackOutlined,
  SolutionOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Form, Image, Select, TimePicker } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { defaultBreakpoints, defaultTheme } from '../themes'
import {
  filterByArray,
  filterByDates,
  formatter,
  generatePassword,
  getKeyValue,
  removeFilters,
  replaceAll,
  searchInArray,
  searchInArrayMultiple,
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
  createAdministradores,
  createConsultas,
  createDetCitas,
  createDoctor,
  createEspecialidad,
  createHorarios,
  createPacientes,
  getAdministradores,
  getColorLesion,
  getConsultas,
  getDetCitas,
  getDoctores,
  getEspecialidades,
  getHorarios,
  getNacionalidades,
  getPacientes,
  getSeguros,
  getTipoLesion,
  updateAdministradores,
  updateConsultas,
  updateDetCitas,
  updateDoctor,
  updateEspecialidad,
  updateHorarios,
  updatePacientes,
} from '../slicers/general/general'
import { ConsultasType, setDetCitas } from '../slicers/general'
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
  AdministradoresType,
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
import { FilterValue } from 'antd/lib/table/interface'
import CustomInputDate from '../components/CustomInputDate'
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
  const [selectedDiasManana, setSelectedDiasManana] = useState<string[]>([])
  const [selectedDiasTarde, setSelectedDiasTarde] = useState<string[]>([])
  const [tandaSelected, setTandaSelected] = useState<string>()
  const [fechaSelected, setFechaSelected] =
    useState<[moment.Moment, moment.Moment]>(null)
  const [filters, setFilters] = useState<AnyType[]>()

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
    DetCitas,
    ColorLesion,
    TipoLesion,
    Administradores,
    fetchingGeneralData,
    createConsultasRequestStatus,
    createDetCitasRequestStatus,
    createPacientesRequestStatus,
    createAdministradoresRequestStatus,
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
    if (ref[currentRef as ComponentsRef]?.current) {
      handlePrint()
    }
  }, [currentRef])

  useEffect(handleUsePrint, [handleUsePrint])

  useEffect(() => {
    setFechaSelected(null)
    setFilters([])
    if (State === 'C') {
      dispatch(getConsultas({}))
      dispatch(getPacientes({}))
      dispatch(getDoctores({}))
      dispatch(getHorarios({}))
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
            estado: 'A',
          },
        })
      )
    } else if (State === 'HD' && getSessionInfo().id) {
      dispatch(
        getConsultas({
          condition: {
            id_doctor: getSessionInfo().id,
            estado: 'T',
          },
        })
      )
      dispatch(getTipoLesion({}))
      dispatch(getColorLesion({}))
    } else if (State === 'HP' && getSessionInfo().id) {
      dispatch(
        getConsultas({
          condition: {
            id_paciente: getSessionInfo().id,
            estado: 'T',
          },
        })
      )
    } else if (State === 'CD' && getSessionInfo().id) {
      dispatch(
        getConsultas({
          condition: {
            id_doctor: getSessionInfo().id,
            estado: 'A',
          },
        })
      )
      dispatch(getTipoLesion({}))
      dispatch(getColorLesion({}))
    } else if (State === 'A' && getSessionInfo().id) {
      dispatch(getAdministradores({}))
    }
  }, [State])

  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState<AnyType>()
  const [view, setView] = useState(false)
  const [pacienteSelected, setpacienteSelected] = useState<PacientesType>()
  const [visible, setVisible] = useState(false)
  const [visibleReceta, setVisibleReceta] = useState(false)
  const [visibleDetalles, setVisibleDetalles] = useState(false)
  const [stateFilter, setStateFilter] = useState<string>('A')
  const diasDeLaSemana = [
    {
      value: '1',
      label: 'Lunes',
    },
    {
      value: '2',
      label: 'Martes',
    },
    {
      value: '3',
      label: 'Miercoles',
    },
    {
      value: '4',
      label: 'Jueves',
    },
    {
      value: '5',
      label: 'Viernes',
    },
  ]
  useEffect(() => {
    if (DetCitas?.id) {
      form.setFieldsValue({
        ...DetCitas,
        fecha_lesion_anterior: moment(DetCitas.fecha_lesion_anterior),
      })
    }
  }, [DetCitas])
  const handleDelete = (record: ConsultasType | PacientesType) => {
    if (State === 'C' || State === 'CD') {
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
    } else if (State === 'A') {
      dispatch(
        updateAdministradores({
          condition: {
            ...record,
            estado: record.estado === 'A' ? 'I' : 'A',
          },
        })
      )
    }
  }
  const handleFinish = (record: ConsultasType | PacientesType) => {
    if (State === 'CD') {
      dispatch(
        updateConsultas({
          condition: {
            ...record,
            estado: 'T',
          },
        })
      )
    }
  }
  const handleAddReceta = (record: ConsultasType) => {
    setVisibleReceta(true)
    setEdit(record)
    if (State === 'CD' || State === 'HD' || State === 'HP') {
      form.setFieldsValue({
        ...record,
      })
    }
  }
  const handleAddDetalles = (record: ConsultasType) => {
    dispatch(getDetCitas({ condition: { id_cita: record.id } }))
    setVisibleDetalles(true)
    setEdit(record)
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
        dia: record.dia,
      })
    } else if (State === 'P') {
      form.setFieldsValue({
        ...record,
        fecha_nacimiento: moment(record.fecha_nacimiento),
        imagen: record.imagen ? record.imagen : [],
        nacionalidad: record.id_nacionalidad,
        seguro: record.id_seguro,
      })
    } else if (State === 'D') {
      form.setFieldsValue({
        ...record,
        fecha_nacimiento: moment(record.fecha_nacimiento),
        nacionalidad: record.id_nacionalidad,
        especialidad: record.id_especialidad,
      })
    } else if (State === 'E' || State === 'A') {
      form.setFieldsValue({
        ...record,
      })
    } else if (State === 'H') {
      form.setFieldsValue({
        ...record,
        tanda_manana:
          record.tanda_manana === '' ? [] : record.tanda_manana.split(','),
        tanda_tarde:
          record.tanda_tarde === '' ? [] : record.tanda_tarde.split(','),
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
      key: 'fecha_insercion',
      title: 'Fecha',
      width: '10%',
      dataIndex: 'fecha_insercion',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
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
                    <RollbackOutlined
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
    },
    {
      key: 'fin',
      title: 'Fin',
      width: '10%',
      dataIndex: 'fin',
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY')
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
                item.estado === 'A'
                  ? 'Agregar Detalles'
                  : 'Inactivo, no permite edición'
              }
            >
              <CustomButton
                disabled={item.estado === 'I'}
                onClick={() => handleAddDetalles(item)}
                type={'link'}
                icon={<PlusOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>
            <CustomTooltip
              key={'addReceta'}
              title={
                item.estado === 'A'
                  ? 'Agregar Receta'
                  : 'Inactivo, no permite edición'
              }
            >
              <CustomButton
                disabled={item.estado === 'I'}
                onClick={() => handleAddReceta(item)}
                type={'link'}
                icon={<FileAddOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>

            <CustomTooltip
              key={'finish'}
              title={
                item.estado === 'A'
                  ? 'Finalizar consulta'
                  : 'Inactivo, no permite esta acción'
              }
            >
              <CustomButton
                disabled={item.estado === 'I'}
                onClick={() => {
                  CustomModalConfirmation({
                    content: '¿Está seguro que desea terminar la consulta?',
                    onOk: () => {
                      handleFinish(item)
                    },
                  })
                }}
                type={'link'}
                icon={<CheckOutlined style={{ fontSize: '18px' }} />}
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
                    <RollbackOutlined
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
  const columnsAdministrador: ColumnType<AdministradoresType>[] = [
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
    // {
    //   key: 'fecha_nacimiento',
    //   title: 'Fecha de nacimiento',
    //   width: '10%',
    //   dataIndex: 'fecha_nacimiento',
    //   render: (_, record) => {
    //     return moment(record.fecha_nacimiento).format('DD/MM/YYYY')
    //   },
    // },
    // {
    //   key: 'sexo',
    //   title: 'Sexo',
    //   width: '10%',
    //   dataIndex: 'sexo',
    //   render: (item) => {
    //     return item === 'M' ? 'Masculino' : 'Femenino'
    //   },
    //   filters:
    //     Number(pacientes?.length) > 0
    //       ? pacientes
    //           ?.map((item) => ({
    //             text: item.sexo === 'M' ? 'Masculino' : 'Femenino',
    //             value: item.sexo,
    //           }))
    //           ?.unique('text')
    //       : [],

    //   onFilter(value, record) {
    //     return record.sexo === value
    //   },
    // },

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
                    <RollbackOutlined
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
  const columnsHistorialDoctor: ColumnType<ConsultasType>[] = [
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
            {/* <CustomTooltip key={'edit'} title={'Ver Historial del paciente'}>
              <CustomButton
                // onClick={() => handleEdit(item)}
                type={'link'}
                icon={<FieldTimeOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip> */}
            <CustomTooltip key={'edit'} title={'Ver Detalles'}>
              <CustomButton
                onClick={() => handleAddDetalles(item)}
                type={'link'}
                icon={<UnorderedListOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>
            <CustomTooltip key={'addReceta'} title={'Ver Receta'}>
              <CustomButton
                onClick={() => handleAddReceta(item)}
                type={'link'}
                icon={<SolutionOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>
          </CustomSpace>
        )
      },
    },
  ]
  const columnsHistorialPacientes: ColumnType<ConsultasType>[] = [
    {
      key: 'doctor',
      title: 'Doctor',
      dataIndex: 'Doctor',
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
            <CustomTooltip key={'addReceta'} title={'Ver Receta'}>
              <CustomButton
                onClick={() => handleAddReceta(item)}
                type={'link'}
                icon={<SolutionOutlined style={{ fontSize: '18px' }} />}
                className={'editPhoneButton'}
              />
            </CustomTooltip>
          </CustomSpace>
        )
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
                    <RollbackOutlined
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
                    <RollbackOutlined
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
                    <RollbackOutlined
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
      key: 'oficina',
      title: 'Oficina',
      dataIndex: 'oficina',
    },
    {
      key: 'tanda',
      title: 'Tanda',
      render: (_, record) => {
        return record.tanda_manana !== '' && record.tanda_tarde !== ''
          ? 'Mañana y Tarde'
          : record.tanda_manana !== ''
          ? 'Mañana'
          : record.tanda_tarde !== ''
          ? 'Tarde'
          : ''
      },
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
                    <RollbackOutlined
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
      placeHolderSearch: 'Buscar por nombre doctor',
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
    A: {
      title: 'Administradores',
      titleModal: 'Registrar Administrador',
      titleModalEdit: 'Editar Administrador',
      placeHolderSearch: 'Buscar por nombre o cedula',
      columns: columnsAdministrador,
      dataSource:
        stateFilter === ''
          ? searchInArray(
              Administradores?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombres', 'apellidos', 'cedula'],
              search
            )
          : searchInArray(
              Administradores?.filter(
                (item) => item.estado === 'A' || item.estado === 'I'
              ),
              ['nombres', 'apellidos', 'cedula'],
              search
            )?.filter((item) => item.estado === stateFilter),
    },
    HD: {
      title: 'Historial de Consultas',
      titleModal: 'Registrar Consulta',
      titleModalEdit: 'Editar Consulta',
      placeHolderSearch: 'Buscar por nombre paciente',
      columns: columnsHistorialDoctor,
      dataSource: searchInArray(
        Consultas?.filter((item) => item.estado === 'T'),
        ['nombre_paciente'],
        search
      ),
    },
    HP: {
      title: 'Historial de Consultas',
      titleModal: 'Registrar Consulta',
      titleModalEdit: 'Editar Consulta',
      placeHolderSearch: 'Buscar por nombre doctor',
      columns: columnsHistorialPacientes,
      dataSource: searchInArray(
        Consultas?.filter((item) => item.estado === 'T'),
        ['nombre_paciente'],
        search
      ),
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
      createAdministradoresRequestStatus === 'success' ||
      createDoctorRequestStatus === 'success' ||
      createEspecialidadRequestStatus === 'success' ||
      createHorariosRequestStatus === 'success' ||
      createDetCitasRequestStatus === 'success'
    ) {
      State === 'C' && dispatch(getConsultas({}))
      State === 'HD' && dispatch(getConsultas({}))
      State === 'P' && dispatch(getPacientes({}))
      State === 'D' && dispatch(getDoctores({}))
      State === 'E' && dispatch(getEspecialidades({}))
      State === 'H' && dispatch(getHorarios({}))
      State === 'A' && dispatch(getAdministradores({}))
      State === 'CD' &&
        dispatch(
          getConsultas({
            condition: {
              id_doctor: getSessionInfo().id,
              estado: 'A',
            },
          })
        )
      form.resetFields()
      setVisible(false)
      setVisibleDetalles(false)
      setVisibleReceta(false)
      setEdit(undefined)
      setView(false)
    }
  }, [
    createConsultasRequestStatus,
    createPacientesRequestStatus,
    createDoctorRequestStatus,
    createEspecialidadRequestStatus,
    createHorariosRequestStatus,
    createAdministradoresRequestStatus,
    createDetCitasRequestStatus,
  ])

  const handleUpdate = async () => {
    const data = await form.validateFields()
    if (State === 'C' || State === 'CD') {
      dispatch(updateConsultas({ condition: { ...edit, ...data } }))
    } else if (State === 'P') {
      dispatch(
        updatePacientes({
          condition: {
            ...edit,
            ...data,
            cedula: replaceAll(data.cedula, '-', ''),
            telefono: replaceAll(data.cedula, '-', ''),
            id_nacionalidad: data.nacionalidad,
          },
        })
      )
    } else if (State === 'D') {
      dispatch(
        updateDoctor({
          condition: {
            ...edit,
            ...data,
            cedula: replaceAll(data.cedula, '-', ''),
            telefono: replaceAll(data.cedula, '-', ''),
            id_especialidad: data.especialidad,
            id_nacionalidad: data.nacionalidad,
          },
        })
      )
    } else if (State === 'E') {
      dispatch(updateEspecialidad({ condition: { ...edit, ...data } }))
    } else if (State === 'H') {
      dispatch(
        updateHorarios({
          condition: {
            ...edit,
            ...data,
            tanda_manana: selectedDiasManana?.toString() ?? null,
            tanda_tarde: selectedDiasTarde?.toString() ?? null,
          },
        })
      )
    } else if (State === 'A') {
      dispatch(
        updateAdministradores({
          condition: {
            ...edit,
            ...data,
            cedula: replaceAll(data.cedula, '-', ''),
          },
        })
      )
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
          },
        })
      )
    } else if (State === 'P') {
      dispatch(
        createPacientes({
          condition: {
            ...data,
            cedula: replaceAll(data.cedula, '-', ''),
            telefono: replaceAll(data.cedula, '-', ''),
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
            cedula: replaceAll(data.cedula, '-', ''),
            telefono: replaceAll(data.cedula, '-', ''),
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
            tanda_manana: selectedDiasManana?.toString() ?? null,
            tanda_tarde: selectedDiasTarde?.toString() ?? null,
          },
        })
      )
    } else if (State === 'A') {
      dispatch(
        createAdministradores({
          condition: {
            ...data,
            cedula: replaceAll(data.cedula, '-', ''),
            clave: generatePassword(data.nombres, data.apellidos),
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

                      <ConditionalComponent
                        condition={
                          State !== 'CD' &&
                          State !== 'CP' &&
                          State !== 'HP' &&
                          State !== 'HD'
                        }
                      >
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
                      </ConditionalComponent>
                    </CustomRow>
                  </CustomCol>

                  <CustomCol xs={24} style={{ marginBottom: '1%' }}>
                    <CustomRow justify={'space-between'}>
                      {State === 'C' ||
                      State === 'CD' ||
                      State === 'HD' ||
                      State === 'CP' ||
                      State === 'HP' ? (
                        <CustomFormItem label={'Filtrar por Fecha'}>
                          <CustomRangePicker
                            format={'DD/MM/YYYY'}
                            onChange={(item) => {
                              setFechaSelected(item)
                            }}
                          />
                        </CustomFormItem>
                      ) : (
                        <CustomFormItem />
                      )}
                      <ConditionalComponent
                        condition={
                          State !== 'HD' && State !== 'HP' && State !== 'CP'
                        }
                      >
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
                      </ConditionalComponent>
                    </CustomRow>
                  </CustomCol>
                </CustomRow>
                <CustomTable
                  key={State}
                  columns={title[`${State}`]?.columns}
                  dataSource={
                    fechaSelected !== null
                      ? filterByDates(
                          title[`${State}`]?.dataSource,
                          'inicio',
                          'fin',
                          fechaSelected
                        )
                      : title[`${State}`]?.dataSource
                  }
                  pagination={{ pageSize: 5 }}
                  onChange={(_, filters) => {
                    setFilters(
                      getKeyValue(filters)?.filter(
                        (item) => item.value !== undefined
                      )
                    )
                  }}
                  extra={
                    <ConditionalComponent
                      condition={State !== 'CP' && State !== 'HP'}
                    >
                      <CustomRow justify={'end'} width={'100%'}>
                        <CustomTooltip title={'Imprimir'}>
                          <CustomButton
                            onClick={async () => {
                              setCurrentRef('print')
                              setLoading(true)
                            }}
                            type={'link'}
                            icon={
                              <PrinterFilled style={{ fontSize: '22px' }} />
                            }
                          />
                        </CustomTooltip>
                      </CustomRow>
                    </ConditionalComponent>
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
                            <CustomSelect
                              placeholder={'Seleccione un Paciente'}
                              options={pacientes
                                ?.filter((item) => item.estado === 'A')
                                ?.map((item) => ({
                                  label: `${formatter({
                                    value: item.cedula,
                                    type: 'identity_doc',
                                  })} - ${item.nombres} ${item.apellidos}`,
                                  value: item.id,
                                }))}
                              onSelect={(_, item) => {
                                setpacienteSelected(
                                  pacientes?.find(
                                    (paciente) => paciente.id === item.value
                                  )
                                )
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
                          options={doctores
                            ?.filter((item) => item.estado === 'A')
                            ?.map((item) => ({
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
                        label={'Tanda'}
                        name={'id_tanda'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 4 }}
                      >
                        <CustomSelect
                          placeholder={'Seleccione la tanda'}
                          options={[
                            horarios?.find(async (item) => {
                              item.id_doctor ===
                                (await form.getFieldValue('id_doctor'))
                            })?.tanda_manana !== ''
                              ? {
                                  label: 'Mañana',
                                  value: 'M',
                                }
                              : null,
                            horarios?.find(async (item) => {
                              item.id_doctor ===
                                (await form.getFieldValue('id_doctor'))
                            })?.tanda_tarde !== ''
                              ? {
                                  label: 'Tarde',
                                  value: 'T',
                                }
                              : null,
                          ]?.filter((item) => item !== null)}
                          onSelect={async (value) => {
                            setTandaSelected(value)
                          }}
                        />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol xs={24} style={{ marginTop: '0.5%' }}>
                      <CustomFormItem
                        label={'Dia'}
                        name={'dia'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 4 }}
                      >
                        <CustomSelect
                          placeholder={'Seleccione el dia'}
                          options={filterByArray(
                            diasDeLaSemana,
                            tandaSelected === 'M'
                              ? horarios
                                  ?.find(async (item) => {
                                    item.id_doctor ===
                                      (await form.getFieldValue('id_doctor'))
                                  })
                                  ?.tanda_manana?.split(',')
                              : horarios
                                  ?.find(async (item2) => {
                                    item2.id_doctor ===
                                      (await form.getFieldValue('id_doctor'))
                                  })
                                  ?.tanda_tarde?.split(',')
                          )}
                        />
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
                            options={nacionalidades
                              ?.filter((item) => item.estado === 'A')
                              ?.map((item) => ({
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
                            options={seguros
                              ?.filter((item) => item.estado === 'A')
                              ?.map((item) => ({
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
                  {/* Administradores  */}
                  <ConditionalComponent condition={State === 'A'}>
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
                            options={nacionalidades
                              ?.filter((item) => item.estado === 'A')
                              ?.map((item) => ({
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
                            options={especialidades
                              ?.filter((item) => item.estado === 'A')
                              ?.map((item) => ({
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
                    <CustomRow justify="space-between">
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Doctor'}
                          name={'id_doctor'}
                          rules={[{ required: true }]}
                        >
                          <CustomSelect
                            placeholder={'Seleccione un doctor'}
                            options={doctores
                              ?.filter((item) => item.estado === 'A')
                              ?.map((item) => ({
                                label: item.nombre,
                                value: item.id,
                              }))}
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          label={'Oficina'}
                          name={'oficina'}
                          rules={[{ required: true }]}
                        >
                          <CustomInput placeholder="Oficina" />
                        </CustomFormItem>
                      </CustomCol>

                      <CustomCol
                        {...defaultBreakpoints}
                        style={{ marginTop: '2%' }}
                      >
                        <CustomTitle style={{ textAlign: 'center' }}>
                          Tanda de la Mañana
                        </CustomTitle>
                      </CustomCol>
                      <CustomCol
                        {...defaultBreakpoints}
                        style={{ marginTop: '2%' }}
                      >
                        <CustomTitle style={{ textAlign: 'center' }}>
                          Tanda de la Tarde
                        </CustomTitle>
                      </CustomCol>
                      {/* <CustomCol {...defaultBreakpoints} /> */}
                      <CustomCol {...defaultBreakpoints} push={1}>
                        <CustomFormItem
                          label={'Días de la tanda de la mañana'}
                          name={'tanda_manana'}
                          // rules={[{ required: true }]}
                          noStyle
                        >
                          <CustomSelect
                            mode="multiple"
                            onChange={(value: string[]) => {
                              setSelectedDiasManana(value)
                            }}
                            placeholder={'Seleccione los dias'}
                            options={diasDeLaSemana}
                            width={'80%'}
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints} push={1}>
                        <CustomFormItem
                          label={'Días de la tanda de la tarde'}
                          name={'tanda_tarde'}
                          // rules={[{ required: true }]}
                          noStyle
                        >
                          <CustomSelect
                            mode="multiple"
                            onChange={(value: string[]) => {
                              setSelectedDiasTarde(value)
                            }}
                            placeholder={'Seleccione los dias'}
                            options={diasDeLaSemana}
                            width={'80%'}
                          />
                        </CustomFormItem>
                      </CustomCol>
                    </CustomRow>
                  </ConditionalComponent>
                </CustomModal>
                <CustomModal
                  title={<CustomTitle>Receta</CustomTitle>}
                  width={State === 'HD' || State === 'HP' ? '50%' : '30%'}
                  visible={visibleReceta}
                  onCancel={() => {
                    if (State === 'HD' || State === 'HP') {
                      setVisibleReceta(false)
                      setEdit(undefined)
                      form.resetFields()
                    } else {
                      CustomModalConfirmation({
                        content:
                          '¿Está seguro que desea salir sin guardar los cambios?',
                        onOk: () => {
                          setVisibleReceta(false)
                          setEdit(undefined)
                          form.resetFields()
                        },
                      })
                    }
                  }}
                  onOk={() => {
                    handleUpdate()
                  }}
                  okButtonProps={{
                    style: {
                      display: (State === 'HD' || State === 'HP') && 'none',
                    },
                  }}
                  cancelText={(State === 'HD' || State === 'HP') && 'Salir'}
                >
                  <ConditionalComponent
                    condition={State !== 'HD' && State !== 'HP'}
                  >
                    <CustomUpload
                      form={form}
                      previewTitle={'Receta'}
                      label={'Receta'}
                      readonly={State === 'HD' || State === 'HP'}
                      name={'receta'}
                      labelCol={{ span: 6 }}
                    />
                  </ConditionalComponent>
                  <ConditionalComponent
                    condition={State === 'HD' || State === 'HP'}
                  >
                    <CustomRow justify={'center'}>
                      <Image src={edit?.receta} />
                    </CustomRow>
                  </ConditionalComponent>
                </CustomModal>
                <CustomModal
                  title={<CustomTitle>Detalles de la consulta</CustomTitle>}
                  width={'70%'}
                  visible={visibleDetalles}
                  onCancel={() => {
                    if (State === 'HD') {
                      setVisibleDetalles(false)
                      dispatch(setDetCitas([]))
                      setEdit(undefined)
                      form.resetFields()
                    } else {
                      CustomModalConfirmation({
                        content:
                          '¿Está seguro que desea salir sin guardar los cambios?',
                        onOk: () => {
                          setVisibleDetalles(false)
                          dispatch(setDetCitas([]))
                          setEdit(undefined)
                          form.resetFields()
                        },
                      })
                    }
                  }}
                  onOk={async () => {
                    const data = await form.validateFields()
                    if (DetCitas?.id) {
                      dispatch(
                        updateDetCitas({
                          condition: {
                            ...DetCitas,
                            ...data,
                          },
                        })
                      )
                    } else {
                      dispatch(
                        createDetCitas({
                          condition: {
                            ...data,
                            id_cita: edit?.id,
                          },
                        })
                      )
                    }
                  }}
                  okButtonProps={{
                    style: {
                      display: State === 'HD' && 'none',
                    },
                  }}
                  cancelText={State === 'HD' && 'Salir'}
                >
                  <CustomDivider>
                    <CustomTitle level={4} style={{ textAlign: 'center' }}>
                      Síntomas
                    </CustomTitle>
                  </CustomDivider>
                  <CustomRow justify={'space-between'}>
                    <CustomCol {...defaultBreakpoints}>
                      <CustomFormItem
                        label={'Tipo de lesión'}
                        name={'id_tipo_lesion'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 6 }}
                      >
                        <CustomSelect
                          placeholder={'Selecciona el Tipo de lesión'}
                          options={TipoLesion?.filter(
                            (item) => item.estado === 'A'
                          )?.map((item) => ({
                            label: item.nombre,
                            value: item.id,
                          }))}
                          disabled={State === 'HD'}
                        />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol {...defaultBreakpoints}>
                      <CustomFormItem
                        label={'Localización'}
                        name={'localizacion'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 7 }}
                      >
                        <CustomInput
                          placeholder="Localización de la lesión"
                          disabled={State === 'HD'}
                        />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol {...defaultBreakpoints}>
                      <CustomFormItem
                        label={'Color'}
                        name={'id_color_lesion'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 6 }}
                      >
                        <CustomSelect
                          placeholder={'Selecciona el color de la lesión'}
                          options={ColorLesion?.filter(
                            (item) => item.estado === 'A'
                          )?.map((item) => ({
                            label: item.color,
                            value: item.id,
                          }))}
                          disabled={State === 'HD'}
                        />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol {...defaultBreakpoints} pull={1}>
                      <CustomFormItem
                        label={'Antecedentes Patol.'}
                        name={'antecedentes_patologicos'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 9 }}
                      >
                        <CustomInput
                          placeholder="Antecedentes Patológicos Familiares"
                          style={{ width: '113%' }}
                          disabled={State === 'HD'}
                        />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol {...defaultBreakpoints} pull={1}>
                      <CustomFormItem
                        label={'Tratamiento previo'}
                        name={'tratamiento_previo'}
                        // rules={[{ required: true }]}
                        labelCol={{ span: 8 }}
                      >
                        <CustomInput
                          placeholder="Tratamientos utilizados Anteriormente"
                          style={{ width: '112%' }}
                          disabled={State === 'HD'}
                        />
                      </CustomFormItem>
                    </CustomCol>
                  </CustomRow>
                  <CustomDivider>
                    <CustomTitle level={4} style={{ textAlign: 'center' }}>
                      Tiempo de Evolución
                    </CustomTitle>
                  </CustomDivider>
                  <CustomRow justify={'space-between'}>
                    <CustomCol {...defaultBreakpoints} pull={1}>
                      <CustomFormItem
                        label={'Lesiones anteriores'}
                        name={'lesiones_anteriores'}
                        rules={[{ required: true }]}
                        labelCol={{ span: 8 }}
                      >
                        <CustomRadioGroup
                          // value={stateFilter}

                          // onChange={(e) => {
                          //   setStateFilter(e.target.value)
                          // }}
                          disabled={State === 'HD'}
                        >
                          <CustomRadio value={'S'}>Si</CustomRadio>
                          <CustomRadio value={'N'}>No</CustomRadio>
                        </CustomRadioGroup>
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol {...defaultBreakpoints} pull={1}>
                      <CustomFormItem
                        label={'Desde cuando'}
                        name={'fecha_lesion_anterior'}
                        // rules={[{ required: true }]}
                        labelCol={{ span: 9 }}
                      >
                        <CustomDatePicker disabled={State === 'HD'} />
                      </CustomFormItem>
                    </CustomCol>
                  </CustomRow>
                  <CustomCol xs={24} pull={1}>
                    <CustomFormItem
                      label={'Detalles extras'}
                      name={'detalles_extras'}
                      // rules={[{ required: true }]}
                      labelCol={{ span: 4 }}
                    >
                      <CustomTextArea
                        maxLength={1000}
                        autoSize
                        disabled={State === 'HD'}
                        width={'105%'}
                        placeholder={'Detalles de la consulta del paciente'}
                      />
                    </CustomFormItem>
                  </CustomCol>
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
              dataSource={searchInArrayMultiple(
                fechaSelected !== null
                  ? filterByDates(
                      title[`${State}`]?.dataSource,
                      'inicio',
                      'fin',
                      fechaSelected
                    )
                  : title[`${State}`]?.dataSource,
                [...(filters?.map((item) => item.key) ?? [])],
                [...(filters?.map((item) => item.value) ?? [])]
              )}
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
