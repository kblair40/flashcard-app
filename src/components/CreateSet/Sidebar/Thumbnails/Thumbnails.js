import React, { useContext } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";

import SetContext from "store/SetContext";

const Thumbnails = ({ height = "100%", width = "100%" }) => {
  const { flashcardSetData, activeCard, updateActiveCard } =
    useContext(SetContext);

  let cards = [];
  if (flashcardSetData) {
    cards = flashcardSetData.flashcards;
  }

  return (
    <Box
      height={height}
      width={width}
      maxHeight="100%"
      position="absolute"
      bottom={0}
      left={0}
      pt="8px"
      pb="32px"
    >
      <Heading
        size="sm"
        textAlign="left"
        pl="8px"
        borderBottom="1px solid #cacaca"
      >
        Cards
      </Heading>

      <Box w="100%" h="100%" overflowY="auto" p="4px 12px 0 8px" mt="4px">
        {cards && cards.length ? (
          cards.map((card, i) => {
            return (
              <Thumbnail
                updateActiveCard={updateActiveCard}
                key={i}
                frontContent={card.front_content}
                id={card._id}
                index={i}
                isActive={
                  activeCard && activeCard.id
                    ? activeCard.id === card._id
                    : false
                }
              />
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

const Thumbnail = ({ frontContent, index, id, updateActiveCard, isActive }) => {
  const handleClick = () => {
    updateActiveCard({ index, id });
  };

  return (
    <Flex
      onClick={handleClick}
      mx="auto"
      mb="8px"
      py="8px"
      minH="60px"
      maxH="120px"
      w="100%"
      borderWidth={1}
      borderStyle="solid"
      borderColor={isActive ? "green.500" : "#ccc"}
      borderRadius="4px"
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
