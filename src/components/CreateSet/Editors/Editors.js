import React from "react";
import { Box, VStack } from "@chakra-ui/react";

import Editor from "components/Editor";

const Editors = ({ width = "100%", height = "100%" }) => {
  return (
    <VStack
      spacing="3rem"
      w={width}
      h={height}
      px={{ base: "8px", md: "16px" }}
    >
      <Box w="100%" maxWidth="700px">
        <Editor />
      </Box>

      <Box w="100%" maxW="700px">
        <Editor />
      </Box>
    </VStack>
  );
};

export default Editors;
