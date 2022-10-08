import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { quillSettings } from "utils/constants";

const Editor = () => {
  const [value, setValue] = useState("");

  return (
    <Flex justify="center" mt="2rem">
      <Box w="100%" maxW={{ base: "90%", sm: "450px", md: "600px" }}>
        <ReactQuill
          theme="snow"
          modules={quillSettings.modules}
          value={value}
          onChange={setValue}
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
