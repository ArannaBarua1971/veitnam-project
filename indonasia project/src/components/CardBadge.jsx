import React from "react";

function CardBadge({children,className=""}) {
  return (
    <span className={`${className} badge ms-auto`}>
        {children}
    </span>
  );
}

export default CardBadge;
