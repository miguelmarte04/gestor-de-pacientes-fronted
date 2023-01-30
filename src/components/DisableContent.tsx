import React from 'react'

type DisableContentProps = {
  disabled?: boolean
  opacity?: string
  style?: React.CSSProperties
  children?: React.ReactNode | React.ReactNode[]
}
const DisableContent: React.FC<DisableContentProps> = ({
  children,
  disabled = false,
  opacity = '1',
  style,
}) => {
  return (
    <div
      style={
        disabled
          ? { pointerEvents: 'none', opacity, cursor: 'not-allowed', ...style }
          : { ...style }
      }
      onKeyDown={(e) => {
        disabled && e.preventDefault()
      }}
    >
      {children}
    </div>
  )
}

export default DisableContent
