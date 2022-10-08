import React from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";

import Editor from "components/Editor";

const Editors = () => {
  return (
    <Flex w="100%" justify="center">
      <VStack spacing="3rem">
        <Editor />

        <Editor />
      </VStack>
    </Flex>
  );
};

export default Editors;
