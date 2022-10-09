import React from "react";
import { Box } from "@chakra-ui/react";

const Thumbnails = ({ height = "100%", width = "100%" }) => {
  return (
    <Box
      height={height}
      width={width}
      maxHeight="100%"
      overflowY="auto"
      position="absolute"
      bottom={0}
      left={0}
      pt="8px"
    >
      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
    </Box>
  );
};

export default Thumbnails;

const Thumbnail = () => {
  return (
    <Box
      mb="8px"
      h="150px"
      w="100%"
      borderRadius="4px"
      border="1px solid #ccc"
    />
  );
};
