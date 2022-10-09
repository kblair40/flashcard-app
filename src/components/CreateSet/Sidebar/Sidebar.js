import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import SetControls from "./SetControls";
import Thumbnails from "./Thumbnails";

const Sidebar = ({ width = "100%" }) => {
  return (
    <Box
      width={width}
      border="1px solid #ececec"
      h="100%"
      display={{ base: "none", sm: "block" }}
    >
      <Flex
        direction="column"
        h="100%"
        width="100%"
        position="relative"
        px="16px"
      >
        <SetControls height="30%" />
        <Thumbnails height="70%" />
      </Flex>
    </Box>
  );
};

export default Sidebar;
