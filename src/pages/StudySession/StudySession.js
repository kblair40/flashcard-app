import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Flex,
  Heading,
  Center,
  Spinner,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

import api from "api";
import { getUnixTimestamp } from "utils/helpers";
import { ChevronIcon } from "utils/icons";
import Timer from "./Timer";
import CurrentCard from "./CurrentCard";
import AllCards from "./AllCards";

const StudySession = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState();
  const [title, setTitle] = useState("");
  const [hideAllCards, setHideAllCards] = useState(false);
  const [sessionId, setSessionId] = useState();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const params = useParams();

  useEffect(() => {
    const fetchSet = async (setId) => {
      try {
        const response = await api.get(`/flashcard_set/${setId}`);
        console.log("\nSET RESPONSE:", response.data);

        if (response.data && response.data.set) {
          const { flashcards, title } = response.data.set;
          setFlashcards(flashcards);
          setTitle(title);
        }
      } catch (e) {
        console.error("FAILED FETCHING SET:", e);
      }

      setLoading(false);
    };

    if (params && params.id) {
      fetchSet(params.id);
    }
  }, [params]);

  const sessionCreated = useRef(false);
  useEffect(() => {
    const createStudySession = async (setId) => {
      try {
        const response = await api.post("/study_session", {
          flashcard_set: setId,
          start_time: getUnixTimestamp(),
        });
        console.log("RESPONSE:", response.data);
        if (response.data && response.data.study_session) {
          const { _id } = response.data.study_session;
          setSessionId(_id);
        }
      } catch (e) {
        console.log("FAILED TO CREATE SESfSION:", e);
      }
    };

    if (params && params.id && !sessionCreated.current) {
      sessionCreated.current = true;
      createStudySession(params.id);
    }
  }, [params]);

  const shuffle = (cardsArray) => {
    const copy = [...cardsArray];
    console.log("CARDS BEFORE:", copy);
    copy.sort(() => Math.random() - 0.5);
    console.log("CARDS AFTER:", copy);
    setCurrentCard(0);
    setFlashcards(copy);
  };

  const handleClickCardPreview = (index) => {
    console.log("INDEX:", index);
    setCurrentCard(index);
  };

  const handleClickPrev = () => {
    setCurrentCard((prev) => prev - 1);
  };

  const handleClickNext = () => {
    setCurrentCard((prev) => prev + 1);
  };

  if (loading) {
    return (
      <Center h="calc(100vh - 60px)" overflowY="hidden">
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex
      justify="center"
      pt="1.5rem"
      h="calc(100vh - 60px)"
      position="relative"
      overflowY="hidden"
    >
      <Flex w="100%" maxW={{ base: "90%" }} direction="column" align="center">
        <Timer />
        <Heading
          mt=".5rem"
          mb="1.5rem"
          textAlign="center"
          textTransform="capitalize"
        >
          {title}
        </Heading>

        <CurrentCard
          handleClickNext={handleClickNext}
          handleClickPrev={handleClickPrev}
          flashcards={flashcards}
          currentCard={currentCard}
        />
      </Flex>

      <AllCards
        show={!hideAllCards}
        onClickCard={handleClickCardPreview}
        flashcards={flashcards}
        shuffle={shuffle}
        isHidden={hideAllCards}
        hideSelf={() => setHideAllCards(true)}
        showSelf={() => setHideAllCards(false)}
      />

      <GoBack isDark={isDark} />
    </Flex>
  );
};

export default StudySession;

const GoBack = ({ isDark }) => {
  return (
    <Box position="absolute" top="1rem" left="1rem">
      <Link to="/">
        <Button
          variant="ghost"
          leftIcon={
            <ChevronIcon
              transform="rotate(180deg)"
              transition="all 0.3s"
              boxSize="20px"
              fill={isDark ? "gray.50" : "gray.700"}
            />
          }
          _hover={{
            bg: "primary.300",
            color: "white",
            "& svg": { fill: "#fff" },
          }}
          _active={{ bg: "primary.400" }}
          transition="all 0.3s"
        >
          Back to My Sets
        </Button>
      </Link>
    </Box>
  );
};
