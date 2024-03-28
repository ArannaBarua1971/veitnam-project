import React from "react";
import { format, addDays } from "date-fns";

function ContentHeader({ children, className = "", date = "", ...props }) {
  return (
    <h3
      className={`${className} section_header `}
      {...props}
      style={{ fontSize: "32px" }}
    >
      {children}
      {date != "" ? (
        <p className="headerDate">
          <i class="fa-regular fa-clock"></i> 
          {format(
            addDays(new Date(date), 1 * 0),
            "hh:mm dd/M/yyyy"
          )}
        </p>
      ) : (
        <></>
      )}
    </h3>
  );
}

export default ContentHeader;
