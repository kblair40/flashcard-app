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
      spacing={{ base: "1rem", sm: "2rem" }}
      w={width}
      h={height}
      pr={{ base: "8px", sm: "16px" }}
      pl={{ base: "8px", sm: "0" }}
    >
      <Box w="100%" maxWidth="700px">
        <Editor
          cardSide="front"
          value={frontCardContent}
          onChange={setFrontCardContent}
        />
      </Box>

      <Box w="100%" maxW="700px" pb="1rem">
        <Editor
          cardSide="back"
          value={backCardContent}
          onChange={setBackCardContent}
        />
      </Box>
    </VStack>
  );
};

export default Editors;
