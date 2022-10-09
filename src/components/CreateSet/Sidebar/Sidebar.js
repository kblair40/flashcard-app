import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import SetControls from "./SetControls";
import Thumbnails from "./Thumbnails";

const Sidebar = ({ width = "100%" }) => {
  return (
    <Box
      width={width}
      // border="1px solid red"
      // position="absolute"
      h="100%"
      // top={0}
      // left={0}
      // bottom={0}
    >
      <Flex
        direction="column"
        h="100%"
        // border="1px solid black"
        //
      >
        <SetControls height="30%" />
        <Thumbnails height="70%" />
      </Flex>
    </Box>
  );
};

export default Sidebar;
