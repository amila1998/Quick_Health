import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import './textEditor.css'

const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "table" , "font",],
};

const TextEditor = ({ initialValue, setBody }) => {
  const editor = useRef(null);

  return (
    <div>
      <div className="txte">
        <JoditEditor
          ref={editor}
          value={initialValue}
          config={config}
          tabIndex={1}
          //   onBlur={(newContent) => getValue(newContent)}
          onChange={(newContent) => setBody(newContent)}
        />
      </div>
    </div>

  );
};

export default TextEditor;