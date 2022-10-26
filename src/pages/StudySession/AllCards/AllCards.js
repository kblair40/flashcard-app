import React from "react";
import {
  Box,
  Flex,
  Slide,
  Button,
  HStack,
  useColorMode,
} from "@chakra-ui/react";

import "./AllCards.css";

const AllCards = ({
  flashcards,
  onClickCard,
  show,
  shuffle,
  hideSelf,
  showSelf,
}) => {
  return (
    <>
      <Slide
        in={show}
        direction="bottom"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          overflowX: "auto",
          overflowY: "hidden",
          minWidth: { base: "100vw" },
          width: "100%",
          boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.09)",
          padding: "2px",
        }}
        unmountOnExit
      >
        <Flex align="center" justify="start" mx="8px">
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

      <HStack
        transition="all 0.4s ease"
        position="fixed"
        right="1rem"
        bottom={show ? { base: "7rem", sm: "8.5rem" } : { base: "1rem" }}
        zIndex={10}
      >
        <Button onClick={show ? hideSelf : showSelf} size="xs">
          {show ? "Hide" : "Show Cards"}
        </Button>

        <Button onClick={() => shuffle(flashcards)} size="xs">
          Randomize
        </Button>
      </HStack>
    </>
  );
};

export default AllCards;

const Card = ({ content, onClick }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Box py="8px" bg={isDark ? "gray.900" : "gray.50"}>
      <Flex
        className="preview-card-live"
        onClick={onClick}
        justify="center"
        align="center"
        h={{ base: "80px", sm: "100px" }}
        minW={{ base: "150px", sm: "180px" }}
        mr={{ base: "8px", sm: "12px" }}
        boxShadow="md"
        borderRadius="4px"
        cursor="pointer"
        transition="background 0.3s"
        bg={isDark ? "gray.800" : "#fff"}
        _hover={{ bg: isDark ? "gray.700" : "gray.50" }}
        _active={{ bg: isDark ? "gray.600" : "gray.100" }}
        p="4px"
      >
        {content ? (
          <Box
            className="preview-card-content-live"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : null}
      </Flex>
    </Box>
  );
};
