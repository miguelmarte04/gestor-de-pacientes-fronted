/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormInstance, Segmented } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getCargos, setModalStateFormVacancy } from '../slicers/general'
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from '../themes'
import CustomCol from './CustomCol'
import CustomForm from './CustomForm'
import CustomFormItem from './CustomFormItem'
import CustomInput from './CustomInput'
import CustomModal from './CustomModal'
import CustomRow from './CustomRow'
import CustomReactMarkdown from './CustomReactMarkdown'
import CustomTitle from './CustomTitle'
import { EditOutlined, FileTextOutlined } from '@ant-design/icons'
import CustomSpace from './CustomSpace'
import { SegmentedValue } from 'antd/lib/segmented'
import CustomTextArea from './CustomTextArea'
import CustomSelect from './CustomSelect'
import {
  createVacancy,
  updateVacancy,
  VacancyType,
} from '../slicers/recruitment'
import { getSessionInfo } from '../utils/session'
import { showNotification } from '../utils/general'
import CustomDatePicker from './CustomDatePicker'
import CustomInputNumber from './CustomInputNumber'

interface VacancyFormProps {
  form?: FormInstance
  data?: VacancyType
}

const VacancyForm: React.FC<VacancyFormProps> = ({
  data: editData,
  form,
}): React.ReactElement => {
  const dispatch = useAppDispatch()
  const [segmented, setSegmented] = useState<SegmentedValue>('form')
  const { modalStateFormVacancy } = useAppSelector((state) => state.general)
  const { cargos, departments } = useAppSelector((state) => state.general)

  useEffect(() => {
    dispatch(
      getCargos({
        condition: {},
      })
    )
  }, [])

  useEffect(() => {
    if (editData?.id) {
      setSegmented('preview')
    }
  }, [editData])

  const handleModalState = () => {
    dispatch(setModalStateFormVacancy(!modalStateFormVacancy))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      document.execCommand('insertHTML', false, '   * ')
    }
  }

  const handleOnFinish = async () => {
    try {
      const data = (await form?.validateFields()) as VacancyType

      if (editData?.id) {
        const newData = Object.assign({}, editData, data)

        newData.estado = 'A'
        newData.estado_publicacion = 'A'

        dispatch(updateVacancy({ ...newData }))
      } else {
        data.correo_contacto = 'user@info.com'
        data.usuario_insercion = `${getSessionInfo().nombres} ${
          getSessionInfo().apellidos
        }`
        dispatch(createVacancy(data))
      }
    } catch (error) {
      showNotification({
        type: 'error',
        description: 'Por favor, complete los campos requeridos',
        title: 'Error',
      })
    }
  }

  const title = editData?.id ? 'Editar vacante' : 'Nueva vacante'

  return (
    <CustomModal
      okButtonProps={{ disabled: segmented !== 'form' }}
      onCancel={handleModalState}
      onOk={handleOnFinish}
      open={modalStateFormVacancy}
      title={<CustomTitle level={1}>{title}</CustomTitle>}
      width={'45%'}
    >
      <CustomRow justify={'start'}>
        <CustomSpace direction={'vertical'} size={'large'} width={'100%'}>
          <CustomCol xs={24} push={4}>
            <Segmented
              onChange={setSegmented}
              defaultValue={segmented}
              options={[
                {
                  label: 'Editor',
                  value: 'form',
                  icon: <EditOutlined />,
                },
                {
                  label: 'Vista Previa',
                  value: 'preview',
                  icon: <FileTextOutlined />,
                },
              ]}
            />
          </CustomCol>
          <CustomCol xs={24}>
            <CustomForm form={form} {...formItemLayout}>
              {segmented === 'form' ? (
                <CustomRow justify={'start'}>
                  <CustomCol {...defaultBreakpoints}>
                    <CustomFormItem
                      label={'Titulo'}
                      name={'nombre'}
                      rules={[{ required: true }]}
                    >
                      <CustomInput placeholder={'Titulo de la vacante'} />
                    </CustomFormItem>
                  </CustomCol>
                  <CustomCol {...defaultBreakpoints}>
                    <CustomFormItem
                      label={'Puesto'}
                      name={'puesto'}
                      rules={[{ required: true }]}
                    >
                      <CustomSelect
                        options={cargos?.map((item) => ({
                          label: item.cargo,
                          value: item.id.toString(),
                        }))}
                        placeholder={'Titulo de la vacante'}
                      />
                    </CustomFormItem>
                  </CustomCol>
                  <CustomCol {...defaultBreakpoints}>
                    <CustomFormItem
                      label={'Departamento'}
                      name={'id_departamento'}
                      rules={[{ required: true }]}
                    >
                      <CustomSelect
                        options={departments?.map((item) => ({
                          label: item.departamento,
                          value: item.id.toString(),
                        }))}
                        placeholder={'Departamento'}
                      />
                    </CustomFormItem>
                  </CustomCol>
                  <CustomCol {...defaultBreakpoints}>
                    <CustomFormItem
                      label={'Fecha Limite'}
                      name={'fecha_limite'}
                      rules={[{ required: true }]}
                    >
                      <CustomDatePicker style={{ width: '100%' }} />
                    </CustomFormItem>
                  </CustomCol>
                  <CustomCol {...defaultBreakpoints}>
                    <CustomFormItem
                      label={'Cantidad'}
                      name={'cantidad_maxima'}
                      rules={[{ required: true }]}
                    >
                      <CustomInputNumber
                        placeholder={'Cantidad de Vacantes'}
                        style={{ width: '100%' }}
                      />
                    </CustomFormItem>
                  </CustomCol>
                  <CustomCol xs={24}>
                    <CustomFormItem
                      label={'Descripcion'}
                      name={'descripcion'}
                      {...labelColFullWidth}
                      initialValue={'\n ## Descripción'}
                      rules={[{ required: true }]}
                    >
                      <CustomTextArea
                        autoSize={{ minRows: 15, maxRows: 15 }}
                        maxLength={1000}
                        onKeyDown={handleKeyDown}
                      />
                    </CustomFormItem>
                  </CustomCol>
                </CustomRow>
              ) : (
                <>
                  <CustomCol xs={24}>
                    <CustomFormItem
                      label={' '}
                      colon={false}
                      {...labelColFullWidth}
                    >
                      <CustomReactMarkdown
                        bordered={false}
                        height={'332.22px'}
                      >{` # ${form.getFieldValue('nombre') ?? 'Sin titulo'}
                       ${
                         form.getFieldValue('descripcion') ?? ' Sin descripción'
                       }`}</CustomReactMarkdown>
                    </CustomFormItem>
                  </CustomCol>
                </>
              )}
            </CustomForm>
          </CustomCol>
        </CustomSpace>
      </CustomRow>
    </CustomModal>
  )
}

export default VacancyForm
