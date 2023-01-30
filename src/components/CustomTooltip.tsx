import React, { useState } from 'react'
import { Tooltip } from 'antd'
import { TooltipProps } from 'antd'

type PropsType = {
  title?: string | React.ReactNode
  disabled?: boolean
}
const CustomTooltip: React.FC<TooltipProps & PropsType> = ({
  title = '',
  disabled = false,
  ...props
}): React.ReactElement => {
  const [state, setState] = useState<boolean>()

  return !title || disabled ? (
    <>{props.children}</>
  ) : (
    <div
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
    >
      <Tooltip visible={state} title={title} {...props}>
        {props.children}
      </Tooltip>
    </div>
  )
}
export default CustomTooltip
