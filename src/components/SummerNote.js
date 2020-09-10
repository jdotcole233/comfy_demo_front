import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default ({ onChange, ...props }) => (
  <Editor
    {...props}
    toolbarClassName="toolbarClassName"
    wrapperClassName="wrapperClassName"
    editorClassName="editorClassName form-control-editor"
    onEditorStateChange={onChange}
  />
);
