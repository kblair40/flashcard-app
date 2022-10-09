import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import SetControls from "./SetControls";
import Thumbnails from "./Thumbnails";

const Sidebar = ({ cards, width = "100%" }) => {
  return (
    <Box width={width} h="100%" display={{ base: "none", sm: "block" }}>
      <Flex
        direction="column"
        h="100%"
        width="100%"
        position="relative"
        px="16px"
      >
        <SetControls height="29%" />
        <Thumbnails height="70%" cards={cards} />
      </Flex>
    </Box>
  );
};

export default Sidebar;
