import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { toolbarSetup } from "../helpers/toolbar-setup";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const styles = {
  wrapper: {
    // background: "black",
  },
};

const CardContainer = ({ classes }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  return (
    <div>
      <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div
        style={{
          border: "1px solid black",
          padding: "2px",
          minHeight: "400px",
        }}
      >
        <Editor
          wrapperClassName={classes.wrapper}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={toolbarSetup}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(CardContainer);
