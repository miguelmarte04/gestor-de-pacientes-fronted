import React from 'react'
import Search, { SearchProps } from 'antd/lib/input/Search'

const CustomSearch: React.FC<SearchProps> = ({
  autoComplete = 'off',
  ...props
}) => (
  <Search autoComplete={autoComplete} size={'small'} {...props}>
    {props.children}
  </Search>
)

export default CustomSearch
