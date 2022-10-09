import React from "react";
import { Box } from "@chakra-ui/react";

const SetControls = ({ height = "100%", width = "100%" }) => {
  return (
    <Box height={height} width={width} position="absolute" top={0} left={0}>
      Controls
    </Box>
  );
};

export default SetControls;
