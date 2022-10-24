import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Flex,
  Heading,
  Center,
  Spinner,
  Box,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

import useDetectLogout from "hooks/useDetectLogout";
import api from "api";
import { ChevronIcon } from "utils/icons";
import Timer from "./Timer";
import CurrentCard from "./CurrentCard";
import AllCards from "./AllCards";
import StudySessionContext from "store/StudySessionContext";

const StudySession = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState();
  const [title, setTitle] = useState("");
  const [hideAllCards, setHideAllCards] = useState(false);

  useDetectLogout();

  const { createStudySession } = useContext(StudySessionContext);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const params = useParams();

  useEffect(() => {
    const createSession = async (cardCount) => {
      try {
        const createRes = await createStudySession(params.id, cardCount);
        console.log("CREATE RES:", createRes);
      } catch (e) {
        console.error("FAILED TO CREATE STUDY SESSION:", e);
      }
    };

    const fetchSet = async (setId) => {
      try {
        const response = await api.get(`/flashcard_set/${setId}`);
        console.log("\nSET RESPONSE:", response.data);

        if (response.data && response.data.set) {
          const { flashcards, title } = response.data.set;
          setFlashcards(flashcards);
          setTitle(title);

          let ellapsed_time = localStorage.get_item("ellapsed_time");
          if (!ellapsed_time) {
            createSession(flashcards.length);
          }
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

  const shuffle = (cardsArray) => {
    const copy = [...cardsArray];
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

  if (flashcards && flashcards.length === 0) {
    return (
      <Flex
        align="center"
        justify="center"
        direction="column"
        h="calc(100vh - 60px)"
        overflowY="hidden"
      >
        <Text fontSize="lg" fontWeight={600}>
          No cards in this set
        </Text>

        <Link to="/">
          <Flex align="center" pt="8px">
            <Box
              transform="rotate(180deg)"
              mr="4px"
              position="relative"
              top="2px"
            >
              <ChevronIcon boxSize="18px" />
            </Box>

            <Text fontWeight={500}>Go back to home</Text>
          </Flex>
        </Link>
      </Flex>
    );
  }

  return (
    <Flex
      justify="center"
      pt={{ base: "124px", sm: "84px" }}
      h="calc(100vh)"
      position="relative"
      overflowY="hidden"
    >
      <Flex w="100%" maxW={{ base: "90%" }} direction="column" align="center">
        <Timer />

        <Heading
          mt={{ base: "1rem", sm: ".5rem" }}
          mb="1.5rem"
          textAlign="center"
          textTransform="capitalize"
          fontSize={{ base: "2xl", sm: "3xl" }}
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

const GoBack = () => {
  return (
    <Box position="absolute" top="5rem" left={{ base: ".5rem", md: "1rem" }}>
      <Link to="/">
        <Button
          variant="icon-button"
          leftIcon={
            <ChevronIcon
              transform="rotate(180deg)"
              boxSize={{ base: "15px", sm: "18px" }}
            />
          }
          size={{ base: "sm", md: "md" }}
          px={{ base: "8px", md: "16px" }}
          rounded="full"
        >
          Back to My Sets
        </Button>
      </Link>
    </Box>
  );
};
