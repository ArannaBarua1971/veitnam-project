import React from 'react'

function Input({
    label="",
    name="",
    labelStyle="",
    placeholder="",
    type="text",
    className="",
    classForDiv="",
    ...props
}) {
  return (
    <div className={classForDiv}>
       {label && <label htmlFor={name} className={`${labelStyle} InputLabel`}>{label}</label>}
       <input type={type} name={name} placeholder={placeholder} className={`${className} Input `} {...props} />
    </div>
  )
}

export default Input
