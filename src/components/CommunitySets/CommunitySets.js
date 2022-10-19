import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";

import api from "api";

const headingStyles = {
  textTransform: "capitalize",
  fontWeight: "700",
  // pl: "16px",
  fontSize: { base: "xl", sm: "2xl" },
};

const CommunitySets = () => {
  return (
    <Flex justify="center" pt="32px" w="100%">
      <Flex
        direction="column"
        w="100%"
        justify="space-between"
        position="relative"
      >
        <Flex
          w="100%"
          justify="space-between"
          mb=".75rem"
          pr="8px"
          align="center"
        >
          <Heading {...headingStyles} noOfLines={2}>
            Latest Sets from the Community
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunitySets;
