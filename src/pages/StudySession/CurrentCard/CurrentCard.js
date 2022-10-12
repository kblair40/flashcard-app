import React, { useState, useEffect, useRef } from "react";
import ReactCardFlip from "react-card-flip";
import { motion, AnimatePresence } from "framer-motion";

import { FlipIcon, ChevronIcon } from "utils/icons";
import { Box, Flex, Button, useColorMode } from "@chakra-ui/react";

const CurrentCard = ({
  flashcards,
  currentCard,
  handleClickPrev,
  handleClickNext,
}) => {
  const [flipCards, setFlipCards] = useState();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const didMount = useRef(false);
  useEffect(() => {
    // if (didMount.current || !flashcards) return;
    if (!flashcards) return;

    didMount.current = true;

    let flipCardsArray = [];
    flashcards.forEach((card, i) => {
      const { front_content, back_content } = card;

      flipCardsArray.push(
        <FlipContainer key={i} index={i} currentCard={currentCard}>
          <Flashcard content={front_content} side="front" />
          <Flashcard content={back_content} side="back" />
        </FlipContainer>
      );
    });

    setFlipCards(flipCardsArray);
  }, [flashcards]);

  const curIdx = useRef(0);

  let forward = false;
  if (curIdx.current <= currentCard) {
    forward = true;
  }

  curIdx.current = currentCard;

  if (!flipCards || !flipCards.length) return null;

  return (
    <>
      <Flex
        maxW={{ base: "340px", sm: "440px", md: "520px" }}
        w="100%"
        justify="space-between"
        mb=".5rem"
      >
        <Button
          rounded="full"
          onClick={handleClickPrev}
          variant="ghost"
          size="sm"
          pointerEvents={currentCard === 0 ? "none" : undefined}
          isDisabled={currentCard === 0}
          transition="all 0.3s"
          leftIcon={
            <ChevronIcon
              boxSize="14px"
              transform="rotate(180deg)"
              transition="all 0.3s"
              fill={isDark ? "gray.50" : "gray.700"}
            />
          }
          _hover={{
            bg: "primary.300",
            color: "white",
            "& svg": { fill: "#fff" },
          }}
          _active={{ bg: "primary.400" }}
        >
          Last Card
        </Button>
        <Button
          rounded="full"
          pointerEvents={
            currentCard === flashcards.length - 1 ? "none" : undefined
          }
          isDisabled={currentCard === flashcards.length - 1}
          onClick={handleClickNext}
          transition="all 0.3s"
          rightIcon={
            <ChevronIcon
              fill={isDark ? "gray.50" : "gray.700"}
              boxSize="14px"
              transition="all 0.3s"
            />
          }
          variant="ghost"
          size="sm"
          _hover={{
            bg: "primary.300",
            color: "white",
            "& svg": { fill: "#fff" },
          }}
          _active={{ bg: "primary.400" }}
        >
          Next Card
        </Button>
      </Flex>

      <Flex direction="column" w="100%" align="center">
        <AnimatePresence>
          <motion.div
            key={`flashcard-${currentCard}`}
            initial={{ x: forward ? "-150%" : "150%" }}
            animate={{
              x: 0,
              position: "absolute",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {flipCards[currentCard]}
          </motion.div>
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default CurrentCard;

const FlipContainer = ({ children }) => {
  const [side, setSide] = useState("front");

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  if (!children) return null;

  return (
    <>
      <ReactCardFlip
        flipSpeedBackToFront={0.3}
        flipSpeedFrontToBack={0.3}
        isFlipped={side === "back"}
        flipDirection="vertical"
      >
        {children}
      </ReactCardFlip>
      <Flex w="100%" justify="center">
        <Box
          rounded="full"
          w="min-content"
          _hover={{
            "& svg": {
              transform: "rotate(180deg)",
              fill: "#fff",
            },
          }}
        >
          <Button
            rounded="full"
            mx="auto"
            mt="1rem"
            variant="ghost"
            transition={"all 0.3s"}
            onClick={() => setSide(side === "back" ? "front" : "back")}
            leftIcon={
              <FlipIcon
                transition={"all 0.3s"}
                fill={isDark ? "gray.50" : "gray.700"}
              />
            }
            _hover={{
              bg: "primary.300",
              color: "white",
            }}
            _active={{ bg: "primary.400" }}
          >
            Flip
          </Button>
        </Box>
      </Flex>
    </>
  );
};

const Flashcard = ({ content }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex
      justify="center"
      align="center"
      h={{ base: "250px", sm: "260px", md: "310px" }}
      w={{ base: "340px", sm: "440px", md: "520px" }}
      borderRadius="2px"
      shadow="md"
      bg={isDark ? "gray.700" : "gray.50"}
    >
      <Box
        dangerouslySetInnerHTML={{
          __html: content ? content : "<div />",
        }}
      />
    </Flex>
  );
};
