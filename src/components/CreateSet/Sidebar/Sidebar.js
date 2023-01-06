import React from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";

import SetControls from "./SetControls";
import Thumbnails from "./Thumbnails";

const Sidebar = ({ width = "100%" }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Box bg={isDark ? "gray.800" : "#fff"} width={width} h="100%">
      <Flex
        direction="column"
        h="100%"
        width="100%"
        position="relative"
        borderRight={{ base: "none", sm: "1px solid" }}
        borderColor={{ sm: isDark ? "gray.500" : "gray.200" }}
      >
        <SetControls
          height={{ base: "30%", sm: "25%" }}
          width={{ base: "100%", sm: "100%" }}
        />
        <Thumbnails
          height={{ base: "70%", sm: "75%" }}
          width={{ base: "100%", sm: "100%" }}
          isDark={isDark}
        />
      </Flex>
    </Box>
  );
};

export default Sidebar;
