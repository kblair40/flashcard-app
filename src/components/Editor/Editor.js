import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const [value, setValue] = useState("");

  return (
    <Flex justify="center" mt="2rem">
      <Box w="100%" maxW={"600px"}>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
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
