import React from "react";
import { VStack } from "@chakra-ui/react";

import Editor from "components/Editor";

const Editors = () => {
  return (
    <VStack spacing="3rem" w="100%">
      <Editor />

      <Editor />
    </VStack>
  );
};

export default Editors;
