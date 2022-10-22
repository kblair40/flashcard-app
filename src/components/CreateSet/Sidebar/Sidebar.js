import React from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";

import SetControls from "./SetControls";
import Thumbnails from "./Thumbnails";

const Sidebar = ({ width = "100%" }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Box width={width} h="100%" display={{ base: "none", sm: "block" }}>
      <Flex
        direction="column"
        h="100%"
        width="100%"
        position="relative"
        borderRight="1px solid"
        borderColor={isDark ? "gray.500" : "gray.200"}
      >
        <SetControls height="25%" isDark={isDark} />
        <Thumbnails height="75%" isDark={isDark} />
      </Flex>
    </Box>
  );
};

export default Sidebar;
