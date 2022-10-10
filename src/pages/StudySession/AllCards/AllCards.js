import React from "react";
import {
  Box,
  Flex,
  // Transition
} from "@chakra-ui/react";

const AllCards = ({ flashcards }) => {
  return (
    <Flex
      w={{ base: "100vw" }}
      border="1px solid #aaa"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      py="8px"
      overflowX="auto"
    >
      {flashcards && flashcards.length
        ? flashcards.map((card, i) => {
            console.log("CARD:", card);
            return <Card key={i} content={card.front_content} />;
          })
        : null}
    </Flex>
  );
};

export default AllCards;

const Card = ({ content }) => {
  return (
    <Flex
      justify="center"
      align="center"
      h="100px"
      minW="180px"
      mr="8px"
      border="1px solid #ccc"
      borderRadius="4px"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      _active={{ bg: "gray.100" }}
    >
      {content ? <Box dangerouslySetInnerHTML={{ __html: content }} /> : null}
    </Flex>
  );
};
