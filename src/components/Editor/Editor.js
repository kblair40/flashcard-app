import React from "react";
import { Flex, Box, useColorMode } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { quillSettings } from "utils/constants";

const Editor = ({ value, onChange }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

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
          className={isDark ? "custom-editor-dark" : "custom-editor-light"}
          theme="snow"
          modules={quillSettings.modules}
          value={value}
          onChange={onChange}
          preserveWhitespace={true}
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
