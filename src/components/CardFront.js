import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { toolbarSetup } from "../helpers/toolbar-setup";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const styles = {
  wrapper: {
    border: "1px solid #bebebe",
    padding: "1rem",
    height: "40vh",
    minHeight: "16rem",
    overflow: "auto",
  },
};

const CardFront = ({ classes }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [rawContent, setRawContent] = useState("");
  // useEffect(() => {
  // console.log(editorState);
  // }, [editorState]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setRawContent(convertToRaw(editorState.getCurrentContent()));
    console.log("RAW CONTENT =", rawContent);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Editor
          editorClassName={classes.editor}
          toolbarClassName={classes.toolbar}
          wrapperClassName={classes.wrapperTwo}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={toolbarSetup}
        />
      </div>
    </>
  );
};

export default withStyles(styles)(CardFront);
