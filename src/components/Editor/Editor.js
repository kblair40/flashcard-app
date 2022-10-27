import React from "react";
import { Flex, Box, useColorMode } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "editor.css";
import { quillSettings } from "utils/constants";

const Editor = React.forwardRef(({ value, onChange }, ref) => {
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
          ref={ref}
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
          // formats={quillSettings.formats}
        />
      </Box>
    </Flex>
  );
});

export default Editor;
