import React from "react";
import { Button } from "../components";

function Popup(props) {
  return props.trigger >= 0 ? (
    <div className="popup" id={`#${props.id}`} data-target={`#${props.id}`}>
      <div className="fullPopupPart">
        <div
          className="emptyPlaceforclose w-100 h-100  "
          onClick={() => props.setTrigger(-1)}
        ></div>
        <div className="popup_inner rounded">
          <div className="close">
            <Button
              className={`ms-auto popup_close_button ${props.className}  mb-4`}
              onClick={() => props.setTrigger(-1)}
            >
              x
            </Button>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
