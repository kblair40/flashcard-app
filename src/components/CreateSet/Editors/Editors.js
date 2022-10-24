import React, { useContext } from "react";
import { Box, VStack } from "@chakra-ui/react";

import SetContext from "store/SetContext";
import Editor from "components/Editor";

const Editors = ({ width = "100%", height = "100%" }) => {
  const {
    frontCardContent,
    setFrontCardContent,
    backCardContent,
    setBackCardContent,
  } = useContext(SetContext);

  return (
    <VStack
      // border="1px solid red"
      spacing={{ base: "1rem", sm: "2rem" }}
      w={width}
      h={height}
      pr={{ base: "8px", sm: "16px" }}
      pl={{ base: "8px", sm: "0" }}
      // overflowY="auto"
      // pb="8px"
    >
      <Box w="100%" maxWidth="700px">
        <Editor value={frontCardContent} onChange={setFrontCardContent} />
      </Box>

      <Box w="100%" maxW="700px" pb="1rem">
        <Editor value={backCardContent} onChange={setBackCardContent} />
      </Box>
    </VStack>
  );
};

export default Editors;
