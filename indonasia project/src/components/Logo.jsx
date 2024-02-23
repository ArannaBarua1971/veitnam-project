import React from 'react'

function Logo({className="",...props}) {
  return (
      <img src='./imgs/Logo.JPG' className={`${className} logo` } alt="logo" {...props}></img>
  )
}

export default Logo
