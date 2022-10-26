import React, { useRef, useEffect } from "react";
import { Flex, Box, useColorMode } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "editor.css";

import { quillSettings } from "utils/constants";

const Editor = ({ value, onChange, cardSide }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const quill = useRef(null);
  // const didMount = useRef(false);

  // useEffect(() => {
  //   if (!didMount.current) {
  //     if (cardSide === "front") {
  //       let editor = quill.current.getEditor();
  //       editor.format("bold", "true");
  //       editor.format("align", "center");
  //       editor.focus();
  //     }
  //   } else {
  //     didMount.current = true;
  //   }
  // }, [cardSide]);

  return (
    <Flex justify="center" w="100%">
      <Box
        w="100%"
        sx={{
          "& svg path, line, rect, circle, polyline": {
            stroke: isDark ? "#F7FAFC !important" : "#2D3748 !important",
          },
        }}
      >
        <ReactQuill
          ref={quill}
          className={
            isDark
              ? "custom-editor-dark custom-editor"
              : "custom-editor-light custom-editor"
          }
          theme="snow"
          modules={quillSettings.modules}
          value={value}
          onChange={onChange}
          preserveWhitespace={true}
          onEditorCreated={() => console.log("\n\nCREATED\n\n")}
          // formats={quillSettings.formats}
        />
      </Box>
    </Flex>
  );
};

export default Editor;

// rich-markdown-editor - 337kb
// draft-js - 65kb
// jodit-react - 221kb
// react-froala-wysiwyg - 125kb
// react-quill - 51kb
