import React, { useEffect, useState } from 'react'
import CustomDivider from './CustomDivider'
import CustomTitle from './CustomTitle'
import CustomRow from './CustomRow'
import CustomFormItem from './CustomFormItem'
import CustomCol from './CustomCol'
import CustomInput from './CustomInput'
import { defaultBreakpoints, formItemLayout } from '../themes'
import CustomSelect from './CustomSelect'
import moment from 'moment'
import CustomInputDate from './CustomInputDate'
import CustomRadioGroup from './CustomRadioGroup'
import CustomRadio from './CustomRadio'
import CustomUpload from './CustomUpload'
import { FormInstance, Select } from 'antd'
import {
  getBloodType,
  getCivilState,
  getCountries,
  getParametros,
  getPersonData,
} from '../slicers/general'
import CustomSpin from './CustomSpin'
import CustomMaskedInput from './CustomMaskedInput'
import { BloodType, CivilStateType, CountriesType } from '../slicers/general'
import { getValidateId } from '../slicers/employee'
import { getActivityId, getAge, showNotification } from '../utils/general'
import CustomInputGroup from './CustomInputGroup'
import { useAppDispatch, useAppSelector } from '../hooks'

type Props = {
  form: FormInstance
  editing: boolean
}

const mack = [
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
]

const { Option } = Select
const typeDocuments = [
  { value: 'C', label: 'Cédula' },
  { value: 'P', label: 'Pasaporte' },
]

const GeneralDataEmployee: React.FC<Props> = ({
  form,
  editing,
}): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [validate, setValidate] = useState(false)
  const {
    personData,
    fetchingGeneralData,
    bloodType,
    civilState,
    countries,
    parametros,
  } = useAppSelector((state) => state.general)
  const { validateId, fetchingFromEmployee } = useAppSelector(
    (state) => state.employee
  )
  const { REGISTAR_CEDULA } = parametros

  useEffect(() => {
    personData.person_id &&
      form.setFieldsValue({
        nombres: personData?.name,
        apellidos: `${personData?.last_name_one} ${personData?.last_name_two}`,
        fecha_nacimiento: moment(personData?.date_birth).format('DD/MM/YYYY'),
        lugar_nacimiento: personData?.place_birth,
        edad: `${getAge(
          moment(personData?.date_birth).format('YYYY-MM-DD')
        )} años`,
        id_pais: 138,
      })
  }, [personData])

  useEffect(() => {
    dispatch(
      getBloodType({
        condition: {},
      })
    )
    dispatch(
      getCivilState({
        condition: {},
      })
    )
    dispatch(
      getCountries({
        condition: {},
      })
    )
    dispatch(
      getParametros({
        condition: {
          id_actividad: getActivityId(),
        },
      })
    )
  }, [])

  useEffect(() => {
    if (validate && fetchingFromEmployee === false) {
      if (validateId?.existe === 0) {
        const value = form.getFieldValue('doc_identidad')
        dispatch(
          getPersonData({
            condition: {
              doc_identidad: value?.replaceAll('-', ''),
            },
          })
        )
      } else {
        showNotification({
          title: 'Error',
          description: 'La cédula insertada ya se encuentra registrada',
          type: 'error',
        })
        setValidate(false)
      }
    }
  }, [validateId, fetchingFromEmployee])

  const handleSeachPerson = async () => {
    const value = form.getFieldValue('doc_identidad')

    if (value?.length === 13) {
      dispatch(
        getValidateId({
          condition: {
            doc_identidad: value?.replaceAll('-', ''),
          },
        })
      )
      setValidate(true)
    }
  }
  const estadosEmpleados = [
    { value: 'A', label: 'Activo' },
    { value: 'I', label: 'Inactivo' },
    { value: 'F', label: 'Fallecido' },
  ]

  return (
    <CustomSpin spinning={fetchingGeneralData}>
      <CustomRow justify="start">
        <CustomDivider orientation={'left'}>
          <CustomTitle>Datos Generales</CustomTitle>
        </CustomDivider>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem label={'Id'} name={'id_empleado'} {...formItemLayout}>
            <CustomInput placeholder="Id del empleado" disabled />
          </CustomFormItem>
        </CustomCol>
        {editing ? (
          <CustomCol {...defaultBreakpoints}>
            <CustomFormItem
              label={'Estado'}
              name={'estado'}
              rules={[{ required: true }]}
              {...formItemLayout}
            >
              <CustomSelect
                placeholder={'Seleccione el Estado'}
                options={estadosEmpleados?.map((item) => {
                  return { value: item.value, label: item.label }
                })}
              />
            </CustomFormItem>
          </CustomCol>
        ) : (
          <CustomCol {...defaultBreakpoints} />
        )}

        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Doc. de Identidad'}
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <CustomInputGroup compact>
              <CustomFormItem
                label={'Tipo de Documento'}
                name={'tipo_doc_identidad'}
                rules={[{ required: true }]}
                initialValue={typeDocuments[0]?.value}
                noStyle
              >
                <CustomSelect
                  placeholder={'Tipo Documento'}
                  allowClear
                  disabled={editing}
                  width={'30%'}
                  options={typeDocuments?.map((item) => {
                    return { value: item.value, label: item.label }
                  })}
                />
              </CustomFormItem>

              <CustomFormItem
                label={'Doc. de Identidad'}
                name={'doc_identidad'}
                rules={[{ required: true, len: 13 }]}
                noStyle
              >
                <CustomMaskedInput
                  mask={mack}
                  style={{ width: '70%' }}
                  placeholder={'000-0000000-0'}
                  onBlur={
                    REGISTAR_CEDULA === 'S'
                      ? editing
                        ? undefined
                        : handleSeachPerson
                      : undefined
                  }
                  readOnly={editing}
                  autoFocus
                />
              </CustomFormItem>
            </CustomInputGroup>
          </CustomFormItem>
        </CustomCol>

        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Nombres'}
            name={'nombres'}
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <CustomInput
              placeholder="Nombres"
              readOnly={REGISTAR_CEDULA === 'S'}
            />
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Apellidos'}
            name={'apellidos'}
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <CustomInput
              placeholder={'Apellidos'}
              readOnly={REGISTAR_CEDULA === 'S'}
            />
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem label={'Apodo'} name={'apodo'} {...formItemLayout}>
            <CustomInput placeholder={'Apodo'} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Fecha de nacimiento'}
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <CustomInputGroup compact>
              <CustomFormItem
                name={'fecha_nacimiento'}
                rules={[{ required: true }]}
                noStyle
              >
                <CustomInputDate
                  maxDate={moment()}
                  minDate={moment().subtract(100, 'years')}
                  placeholder={'Fecha de nacimiento'}
                  mask={false}
                  onChange={(date) => {
                    if (date.target.value?.replaceAll('_', '')?.length === 10) {
                      form.setFieldsValue({
                        edad: `${getAge(
                          moment(date.target.value).format('YYYY-MM-DD')
                        )} años`,
                      })
                    } else {
                      form.setFieldsValue({
                        edad: '',
                      })
                    }
                  }}
                  validate={false}
                  readOnly={REGISTAR_CEDULA === 'S'}
                  width={'75%'}
                />
              </CustomFormItem>

              <CustomFormItem name={'edad'} noStyle>
                <CustomInput readOnly style={{ width: '25%' }} />
              </CustomFormItem>
            </CustomInputGroup>
          </CustomFormItem>
        </CustomCol>

        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'País'}
            name={'id_pais'}
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <CustomSelect
              placeholder={'Seleccionar País'}
              disabled={REGISTAR_CEDULA === 'S'}
            >
              {countries?.map((item: CountriesType) => (
                <Option key={item.id} title={item.pais} value={item.id}>
                  {item.pais}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Sexo'}
            name={'sexo'}
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <CustomRadioGroup>
              <CustomRadio value={'M'}>Masculino</CustomRadio>
              <CustomRadio value={'F'}>Femenino</CustomRadio>
            </CustomRadioGroup>
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Lugar de nacimiento'}
            name={'lugar_nacimiento'}
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <CustomInput
              placeholder="Lugar de nacimiento"
              readOnly={REGISTAR_CEDULA === 'S'}
            />
          </CustomFormItem>
        </CustomCol>

        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Estado civil'}
            name={'id_estado_civil'}
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <CustomSelect placeholder={'Seleccione el Estado Civil'}>
              {civilState?.map((item: CivilStateType) => (
                <Option key={item.id} title={item.estado_civil} value={item.id}>
                  {item.estado_civil}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Tipo de Sangre'}
            name={'id_tipo_sangre'}
            {...formItemLayout}
          >
            <CustomSelect
              placeholder={'Seleccione el Tipo de Sangre'}
              allowClear
            >
              {bloodType?.map((item: BloodType) => (
                <Option key={item.id} title={item.tipo_sangre} value={item.id}>
                  {item.tipo_sangre}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>

        <CustomCol {...defaultBreakpoints}>
          <CustomUpload
            accept={'.jpg, .jpeg, .png'}
            form={form}
            label={'Foto'}
            listType={'picture-card'}
            name={'imagen'}
            previewTitle={'Recortar imagen'}
            required={false}
            imageCrop
            labelCol={{ span: 8 }}
          />
        </CustomCol>
      </CustomRow>
    </CustomSpin>
  )
}

export default GeneralDataEmployee
