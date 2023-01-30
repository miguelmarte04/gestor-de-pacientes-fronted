import React from 'react'

interface ConditionalComponentProps {
  condition: boolean
  children: React.ReactNode
}

const ConditionalComponent: React.FC<ConditionalComponentProps> = ({
  condition,
  children,
}): React.ReactElement => {
  return condition ? <>{children}</> : <></>
}

export default ConditionalComponent
