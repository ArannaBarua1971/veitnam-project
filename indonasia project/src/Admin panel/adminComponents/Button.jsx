import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "btnColor",
  textColor = "text-light",
  textStyle = "",
  className = "",
  ...props
}) {
  return (
    <>
      <button
        type={type}
        className={`${className} ${bgColor} ${textColor} px-4  mt-3  border-0 rounded`}
        {...props}
      >
        <p className={`${textStyle}`}>{children}</p>
      </button>
    </>
  );
}

export default Button;
