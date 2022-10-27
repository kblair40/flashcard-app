import React, { useRef, useEffect, useContext, useState } from "react";
import { Flex, Box, useColorMode } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "editor.css";

import UserContext from "store/UserContext";
import { quillSettings } from "utils/constants";

const styleMap = {
  bold: ["bold", "true"],
  italic: ["italic", "true"],
  underline: ["underline", "true"],
  left: ["align", "left"],
  center: ["align", "center"],
  right: ["align", "right"],
  justify: ["align", "justify"],
  small: ["size", "small"],
  medium: ["size", "normal"], // no such size as "medium" with quill
  large: ["size", "large"],
  huge: ["size", "huge"],
};

const Editor = ({ value, onChange, cardSide }) => {
  const [defaultStyles, setDefaultStyles] = useState();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { userData } = useContext(UserContext);

  const quill = useRef(null);
  // const didMount = useRef(false);

  useEffect(() => {
    const getDefaultStyles = (styles) => {
      if (!styles) return;

      let defaultStyles = [];

      if (styles.isBold) defaultStyles.push(styleMap.bold);
      if (styles.isItalic) defaultStyles.push(styleMap.italic);
      if (styles.isUnderlined) defaultStyles.push(styleMap.underline);
      if (styles.textAlign !== "left") {
        defaultStyles.push(styleMap[styles["textAlign"]]);
      }
      if (styles.fontSize !== "medium") {
        defaultStyles.push(styleMap[styles["fontSize"]]);
      }

      const editor = quill.current.getEditor();
      for (let style of defaultStyles) {
        editor.format(...style);
      }

      if (cardSide === "front") {
        // only focus front side
        editor.focus();
      }
    };

    if (userData && userData.default_styles && quill.current) {
      const styles = userData.default_styles[cardSide];
      console.log("\nstyles:", styles);
      getDefaultStyles(styles);
    }
  }, [userData, cardSide]);

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
