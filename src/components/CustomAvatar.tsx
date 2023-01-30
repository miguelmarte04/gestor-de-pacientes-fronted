import React from 'react'
import { Avatar, AvatarProps } from 'antd'

const CustomAvatar: React.FC<AvatarProps> = ({
  alt = '',
  onError = () => false,
  shape = 'circle',
  size = 'default',
  src = '',
  srcSet = '',
  ...props
}): React.ReactElement => {
  return (
    <Avatar
      alt={alt}
      onError={onError}
      shape={shape}
      size={size}
      src={src}
      srcSet={srcSet}
      {...props}
    >
      {props.children}
    </Avatar>
  )
}
export default CustomAvatar
