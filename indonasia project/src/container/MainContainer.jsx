import React from 'react'

function MainContainer({children,className="",...props}) {
    return (
        <div className={`${className} `} {...props}>
          {children}
        </div>
      )
}

export default MainContainer
