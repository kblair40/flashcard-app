import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";

import { Box, Flex, Button } from "@chakra-ui/react";

const MotionContainer = ({ flashcards, currentCard }) => {
  const [card, setCard] = useState();
  const [cardComponents, setCardComponents] = useState({
    front: null,
    back: null,
  });
  const [side, setSide] = useState("front");

  useEffect(() => {
    if (!flashcards) return;

    setSide("front");

    let cardObj = flashcards[currentCard];

    if (cardObj && cardObj.front_content && cardObj.back_content) {
      const { front_content, back_content } = cardObj;
      setCardComponents({
        front: <Flashcard content={front_content} side="front" />,
        back: <Flashcard content={back_content} side="back" />,
      });
    }

    setCard(cardObj);
  }, [currentCard, flashcards]);

  if (!card) return null;

  return (
    <Flex direction="column" w="100%" align="center">
      <Button
        mb=".75rem"
        variant="ghost"
        onClick={() => setSide(side === "back" ? "front" : "back")}
      >
        Flip
      </Button>

      <ReactCardFlip isFlipped={side === "back"} flipDirection="vertical">
        {cardComponents.front}
        {cardComponents.back}
      </ReactCardFlip>
    </Flex>
  );
};

export default MotionContainer;

const Flashcard = ({ content }) => {
  return (
    <Flex
      justify="center"
      align="center"
      h={{ base: "250px", sm: "280px", md: "380px" }}
      w={{ base: "340px", sm: "400px", md: "550px" }}
      borderRadius="6px"
      shadow="sm"
      bg="#fcfcfc"
    >
      <Box
        dangerouslySetInnerHTML={{
          __html: content ? content : "<div />",
        }}
      />
    </Flex>
  );
};
