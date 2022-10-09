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
      spacing="3rem"
      w={width}
      h={height}
      px={{ base: "8px", md: "16px" }}
    >
      <Box w="100%" maxWidth="700px">
        <Editor value={frontCardContent} onChange={setFrontCardContent} />
      </Box>

      <Box w="100%" maxW="700px">
        <Editor value={backCardContent} onChange={setBackCardContent} />
      </Box>
    </VStack>
  );
};

export default Editors;
