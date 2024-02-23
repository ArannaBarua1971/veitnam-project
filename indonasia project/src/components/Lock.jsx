import React from "react";

function Lock({children,className="" ,...props}) {
  return (
    <div className={`${className} lock`} {...props}>
        {children}
    </div>
  );
}

export default Lock;
