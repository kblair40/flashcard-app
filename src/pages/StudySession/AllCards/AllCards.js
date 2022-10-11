import React from "react";
import { Box, Flex, Slide, Button } from "@chakra-ui/react";

const AllCards = ({ flashcards, onClickCard, show, shuffle }) => {
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
      <Button
        onClick={() => shuffle(flashcards)}
        size="xs"
        position="absolute"
        right="1rem"
        top=".5rem"
      >
        Randomize
      </Button>

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
      _hover={{ bg: "gray.50" }}
      _active={{ bg: "gray.100" }}
    >
      {content ? <Box dangerouslySetInnerHTML={{ __html: content }} /> : null}
    </Flex>
  );
};
