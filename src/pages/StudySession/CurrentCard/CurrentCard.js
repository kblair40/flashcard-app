import React, { useState, useEffect, useRef } from "react";
import ReactCardFlip from "react-card-flip";
import { motion, AnimatePresence } from "framer-motion";

import { Box, Flex, Button } from "@chakra-ui/react";

const CurrentCard = ({ flashcards, currentCard }) => {
  const [flipCards, setFlipCards] = useState();

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
  );
};

export default CurrentCard;

const FlipContainer = ({ children }) => {
  const [side, setSide] = useState("front");

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
      <Button
        width="100%"
        mt=".75rem"
        variant="ghost"
        onClick={() => setSide(side === "back" ? "front" : "back")}
      >
        Flip
      </Button>
    </>
  );
};

const Flashcard = ({ content }) => {
  return (
    <Flex
      justify="center"
      align="center"
      h={{ base: "250px", sm: "260px", md: "340px" }}
      w={{ base: "340px", sm: "440px", md: "550px" }}
      borderRadius="2px"
      shadow="sm"
      bg="gray.50"
    >
      <Box
        dangerouslySetInnerHTML={{
          __html: content ? content : "<div />",
        }}
      />
    </Flex>
  );
};

//
// BACKUP COPY
// import React, { useState, useEffect, useRef } from "react";
// import ReactCardFlip from "react-card-flip";

// import { Box, Flex, Button } from "@chakra-ui/react";

// const MotionContainer = ({ flashcards, currentCard }) => {
//   const [flipCards, setFlipCards] = useState();

//   const didMount = useRef(false);
//   useEffect(() => {
//     if (didMount.current || !flashcards) return;

//     didMount.current = true;

//     let flipCardsArray = [];
//     flashcards.forEach((card, i) => {
//       const { front_content, back_content } = card;

//       flipCardsArray.push(
//         <FlipContainer key={i}>
//           <Flashcard content={front_content} side="front" />
//           <Flashcard content={back_content} side="back" />
//         </FlipContainer>
//       );
//     });

//     setFlipCards(flipCardsArray);
//   }, [flashcards]);

//   if (!flipCards || !flipCards.length) return null;

//   return (
//     <Flex direction="column" w="100%" align="center">
//       {flipCards[currentCard]}
//     </Flex>
//   );
// };

// export default MotionContainer;

// const FlipContainer = ({ children }) => {
//   const [side, setSide] = useState("front");
//   if (!children) return null;

//   return (
//     <>
//       <ReactCardFlip
//         flipSpeedBackToFront={0.3}
//         flipSpeedFrontToBack={0.3}
//         isFlipped={side === "back"}
//         flipDirection="vertical"
//       >
//         {children}
//       </ReactCardFlip>
//       <Button
//         mt=".75rem"
//         variant="ghost"
//         onClick={() => setSide(side === "back" ? "front" : "back")}
//       >
//         Flip
//       </Button>
//     </>
//   );
// };

// const Flashcard = ({ content }) => {
//   return (
//     <Flex
//       justify="center"
//       align="center"
//       h={{ base: "250px", sm: "260px", md: "340px" }}
//       w={{ base: "340px", sm: "440px", md: "550px" }}
//       borderRadius="2px"
//       shadow="sm"
//       bg="gray.50"
//     >
//       <Box
//         dangerouslySetInnerHTML={{
//           __html: content ? content : "<div />",
//         }}
//       />
//     </Flex>
//   );
// };
