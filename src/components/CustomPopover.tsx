import { Popover, PopoverProps } from 'antd'
import React from 'react'

const CustomPopover = React.forwardRef<unknown, PopoverProps>(
  ({ placement = 'top', trigger = 'click', ...props }, ref) => (
    <Popover placement={placement} trigger={trigger} ref={ref} {...props}>
      {props.children}
    </Popover>
  )
)

CustomPopover.displayName = 'CustomPopover'

export default CustomPopover
