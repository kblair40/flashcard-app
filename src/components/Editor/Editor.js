import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { quillSettings } from "utils/constants";

const Editor = ({ value, onChange }) => {
  return (
    <Flex justify="center" w="100%">
      <Box w="100%">
        <ReactQuill
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
