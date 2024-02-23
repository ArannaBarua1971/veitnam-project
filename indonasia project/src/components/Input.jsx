import React, { useState } from 'react'

function Input({
    label="",
    name="",
    labelStyle="",
    placeholder="",
    type="text",
    className="",
    classForDiv="",
    icon="",
    ...props
}) {

  const [showPassword,setShowPassword]=useState(false)
  return (
    <div className={classForDiv} >
       {label && <label htmlFor={name} className={`${labelStyle} InputLabel`}>{label}</label>}
       <div id='inputDiv'>
       <input type={showPassword ? "text" :type} name={name} placeholder={placeholder} className={`${className} Input `} {...props} />
       {icon ?<i id='inputIcon' onClick={()=> setShowPassword(pre => !pre)} className={showPassword ? icon :"fa-regular fa-eye-slash"}></i>:<></>}
       </div>
    </div>
  )
}

export default Input
