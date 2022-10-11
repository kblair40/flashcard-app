import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, Center, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import CurrentCard from "./CurrentCard";
import AllCards from "./AllCards";
import api from "api";

const StudySession = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState();
  const [title, setTitle] = useState("");
  const [hideAllCards, setHideAllCards] = useState(false);

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
      pt="2rem"
      h="calc(100vh - 60px)"
      position="relative"
      overflowY="hidden"
    >
      <Flex w="100%" maxW={{ base: "90%" }} direction="column" align="center">
        <Heading mb="1.5rem" textAlign="center">
          {title}
        </Heading>

        <CurrentCard flashcards={flashcards} currentCard={currentCard} />

        <Flex justify="center" w="100%" top={"20rem"} position="relative">
          <Button
            mr="1rem"
            isDisabled={currentCard === 0}
            onClick={() => setCurrentCard((prev) => prev - 1)}
          >
            Prev Card
          </Button>
          <Button
            onClick={() => setCurrentCard((prev) => prev + 1)}
            isDisabled={flashcards && flashcards.length - 1 === currentCard}
          >
            Next Card
          </Button>
        </Flex>
      </Flex>

      <AllCards
        show={!hideAllCards}
        onClickCard={handleClickCardPreview}
        flashcards={flashcards}
        shuffle={shuffle}
        isHidden={hideAllCards}
        hideSelf={() => setHideAllCards(true)}
      />

      {hideAllCards && (
        <Button
          size="sm"
          onClick={() => setHideAllCards(!hideAllCards)}
          position="fixed"
          bottom=".25rem"
          right=".5rem"
        >
          Show Cards
        </Button>
      )}
    </Flex>
  );
};

export default StudySession;
