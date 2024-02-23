import React, { useRef } from "react";

import JoditEditor from "jodit-react";
function SummerNote({ value, setContent, className }) {
  const editor = useRef(null);


  return (
    <JoditEditor
        ref={editor}
      value={value}
      onChange={setContent}
      className={className}
    />
  );
}

export default SummerNote;
