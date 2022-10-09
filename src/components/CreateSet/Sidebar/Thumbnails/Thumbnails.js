import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";

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
        {cards && cards.length ? (
          cards.map((card, i) => {
            return (
              <Thumbnail key={i} frontContent={card.front_content} index={i} />
            );
          })
        ) : (
          <Text>No Cards</Text>
        )}
      </Box>
    </Box>
  );
};

export default Thumbnails;

const Thumbnail = ({ frontContent, index }) => {
  return (
    <Flex
      mx="auto"
      mb="8px"
      // h="120px"
      py="8px"
      minH="60px"
      maxH="120px"
      w="100%"
      borderRadius="4px"
      border="1px solid #ccc"
      justify="center"
      align="center"
      cursor="pointer"
      position="relative"
      transition={"background 0.3s"}
      _hover={{ background: "#eee" }}
    >
      <Box dangerouslySetInnerHTML={{ __html: frontContent }} />

      <Text
        position="absolute"
        top="4px"
        left="4px"
        fontWeight="medium"
        fontSize="xs"
      >
        {index + 1}
      </Text>
    </Flex>
  );
};
