import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

const Thumbnails = ({ cards, height = "100%", width = "100%" }) => {
  return (
    <Box
      height={height}
      width={width}
      maxHeight="100%"
      // overflowY="auto"
      position="absolute"
      bottom={0}
      left={0}
      pt="8px"
      // pl="4px"
      // border="1px solid #000"
    >
      <Heading
        size="sm"
        textAlign="left"
        pl="8px"
        borderBottom="1px solid #cacaca"
      >
        Cards
      </Heading>
      <Box
        w="100%"
        h="100%"
        overflowY="auto"
        pl="8px"
        pr="12px"
        pt="4px"
        mt="4px"
      >
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </Box>
      {/* <Thumbnail />
      <Thumbnail /> */}
    </Box>
  );
};

export default Thumbnails;

const Thumbnail = () => {
  return (
    <Box
      mx="auto"
      mb="8px"
      h="150px"
      w="100%"
      borderRadius="4px"
      border="1px solid #ccc"
    />
  );
};
