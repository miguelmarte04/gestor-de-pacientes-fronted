import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
// import remarkGfm from 'remark-gfm'

import rehypeformat from 'rehype-format'

interface CustomReactMarkdownProps extends ReactMarkdownOptions {
  height?: string
  width?: string
  bordered?: boolean
}

const CustomReactMarkdown: React.FC<CustomReactMarkdownProps> = ({
  height,
  width,
  bordered = true,
  ...props
}): React.ReactElement => {
  return (
    <div
      style={{ height, width }}
      className={
        bordered ? 'ant-input' : 'ant-input ant-input-sm ant-input-borderless'
      }
    >
      <ReactMarkdown remarkPlugins={[rehypeformat]} {...props}>
        {props.children}
      </ReactMarkdown>
    </div>
  )
}

export default CustomReactMarkdown
