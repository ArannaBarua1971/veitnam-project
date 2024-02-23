import React from "react";

function SidbarMobile({...props}) {
  return (
    <div className=" d-md-none d-inline-block text-dark position-fixed  px-2 py-3 rounded right-0 mx-2 my-2" {...props}>
          <i className="fa-solid fa-bars fa-2xl "></i>
    </div>
  );
}

export default SidbarMobile;
