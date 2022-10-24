import React from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";

import SetControls from "../Sidebar/SetControls";
import Thumbnails from "../Sidebar/Thumbnails";

const BottomBar = ({ width = "100%" }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Box
      bg={isDark ? "gray.800" : "#fff"}
      width={width}
      h="100%"
      display={{ base: "block", sm: "none" }}
    >
      <Flex
        h="100%"
        width="100%"
        position="relative"
        borderTop="1px solid"
        borderColor={isDark ? "gray.500" : "gray.200"}
      >
        <SetControls isDark={isDark} loc="bottom" />
        <Thumbnails isDark={isDark} loc="bottom" />
      </Flex>
    </Box>
  );
};

export default BottomBar;
