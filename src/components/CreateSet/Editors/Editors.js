import React from "react";
import { VStack } from "@chakra-ui/react";

import Editor from "components/Editor";

const Editors = ({ width = "100%", height = "100%" }) => {
  return (
    <VStack spacing="3rem" w={width} h={height}>
      <Editor />

      <Editor />
    </VStack>
  );
};

export default Editors;
