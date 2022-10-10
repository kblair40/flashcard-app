import React from "react";
import { Box, Flex, Slide } from "@chakra-ui/react";

const AllCards = ({ flashcards, onClickCard, show }) => {
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
        border: "1px solid #aaa",
        padding: "8px",
      }}
      unmountOnExit
    >
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
      mr="16px"
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
