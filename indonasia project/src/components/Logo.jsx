import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logo({className="",src="./imgs/Logo.JPG",...props}) {
  const navigate=useNavigate()

  return (
      <img onClick={()=> navigate("/")} src={src} className={`${className} logo` } alt="logo" {...props}></img>
  )
}

export default Logo
