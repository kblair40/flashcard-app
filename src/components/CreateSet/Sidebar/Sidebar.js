import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import SetControls from "./SetControls";
import Thumbnails from "./Thumbnails";

const Sidebar = ({ width = "100%" }) => {
  return (
    <Box width={width}>
      <SetControls />
      <Thumbnails />
    </Box>
  );
};

export default Sidebar;
