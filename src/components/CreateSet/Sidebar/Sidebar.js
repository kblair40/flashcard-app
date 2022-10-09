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
        borderRight="1px solid"
        borderColor="#ccc"
        // px="16px"
      >
        <SetControls height="25%" />
        <Thumbnails height="75%" cards={cards} />
      </Flex>
    </Box>
  );
};

export default Sidebar;
