import React from "react";
import {
  Box,
  Flex,
  Slide,
  Button,
  HStack,
  useColorMode,
} from "@chakra-ui/react";

const AllCards = ({ flashcards, onClickCard, show, shuffle, hideSelf }) => {
  return (
    <Slide
      in={show}
      direction="bottom"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        overflowX: "auto",
        overflowY: "hidden",
        width: { base: "100vw" },
        boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.09)",
        padding: "40px 8px 8px 8px",
      }}
      unmountOnExit
    >
      <HStack position="absolute" right="1rem" top=".5rem">
        <Button onClick={hideSelf} size="xs">
          Hide
        </Button>

        <Button onClick={() => shuffle(flashcards)} size="xs">
          Randomize
        </Button>
      </HStack>

      <Flex align="center" justify="start" mr="8px">
        {flashcards && flashcards.length
          ? flashcards.map((card, i) => {
              return (
                <Card
                  key={i}
                  content={card.front_content}
                  onClick={() => onClickCard(i)}
                />
              );
            })
          : null}
      </Flex>
    </Slide>
  );
};

export default AllCards;

const Card = ({ content, onClick }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex
      onClick={onClick}
      justify="center"
      align="center"
      h="100px"
      minW="180px"
      mr="8px"
      boxShadow="md"
      borderRadius="4px"
      cursor="pointer"
      transition="background 0.3s"
      bg={isDark ? "gray.700" : undefined}
      _hover={{ bg: isDark ? "gray.600" : "gray.50" }}
      _active={{ bg: isDark ? "gray.600" : "gray.100" }}
    >
      {content ? <Box dangerouslySetInnerHTML={{ __html: content }} /> : null}
    </Flex>
  );
};
