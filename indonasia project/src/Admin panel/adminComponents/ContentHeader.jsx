import React from 'react'

function ContentHeader({children,className="",...props}) {
  return (
    <h3 className={`${className} section_header`} {...props}>
      {children}
    </h3>
  )
}

export default ContentHeader
