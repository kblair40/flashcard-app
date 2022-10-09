import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const SetControls = ({ height = "100%", width = "100%" }) => {
  return (
    <Box height={height} width={width}>
      Controls
    </Box>
  );
};

export default SetControls;
