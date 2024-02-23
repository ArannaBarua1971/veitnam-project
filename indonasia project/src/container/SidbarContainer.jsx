import React, { useEffect, useState } from 'react'

function SidbarContainer({children,show}) {

  const [showNav ,setShowNav] =useState();
  useEffect(()=>{
    setShowNav(show)
  })
  return (
    <div className={`sidbar  h-100 position-fixed top-0 left-0  ${showNav ? "show" :"hide"}`} >
      {children}
    </div>
  )
}

export default SidbarContainer
