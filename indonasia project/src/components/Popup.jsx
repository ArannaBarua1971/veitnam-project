import React from "react";
import { Button } from "../components";

function Popup(props) {
  return props.trigger>=0 ? (
    <div className="popup" id={`#${props.id}`} data-target={`#${props.id}`}>
      <div className="popup_inner rounded">
        <Button
          className={`ms-auto d-block ${props.className}  `}
          onClick={() => props.setTrigger(-1)}
        >
          x
        </Button>
        {props.children}
        
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
