import React from 'react'
import { SecondaryParagraph } from './CustomTypography'

const Copyright: React.FC = () => {
  return (
    <SecondaryParagraph
      style={{ textAlign: 'center' }}
    >{`Copyright © ${new Date().getFullYear()} `}</SecondaryParagraph>
  )
}
export default Copyright
