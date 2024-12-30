import React, { useState } from "react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 

const JobRequirements = ({ value, onChange , name }) => {
  const [editorContent, setEditorContent] = useState(value || "<p></p>");


  const handleChange = (newValue) => {
    setEditorContent(newValue); 
    onChange(name, newValue); 
  };

  return (
    <div className="editor-container relative z-10 w-full">
      <ReactQuill
        value={editorContent} 
        onChange={handleChange} 
        theme="snow" 
        className="w-full rounded-md h-[8rem] md:h-[11rem]"
      />
    </div>
  );
};

export default JobRequirements;
