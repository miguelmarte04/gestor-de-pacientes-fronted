import React from 'react'
import Directions from './Directions'
import CustomRow from './CustomRow'
import CustomCol from './CustomCol'
import Phone from './phone'
import Emails from './emails'
import { FormInstance } from 'antd'
type phoneType = {
  id: number
  form: FormInstance
}
const ContactDataEmployee = ({ id, form }: phoneType): React.ReactElement => {
  return (
    <>
      <Directions id={id} form={form} />
      <CustomRow justify="space-between" align="top">
        <CustomCol xs={11}>
          <Phone id={id} form={form} />
        </CustomCol>
        <CustomCol xs={11}>
          <Emails id={id} form={form} />
        </CustomCol>
      </CustomRow>
    </>
  )
}

export default ContactDataEmployee
