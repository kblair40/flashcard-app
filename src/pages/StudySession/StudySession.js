import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Center, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import CurrentCard from "./CurrentCard";
import api from "api";

const StudySession = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState();
  const [title, setTitle] = useState("");

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

  if (loading) {
    return (
      <Center h={"calc(100vh - 60px)"} overflowY="hidden">
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex justify="center" pt="2rem">
      <Flex w="100%" maxW={{ base: "90%" }} direction="column" align="center">
        <Heading mb="1.5rem" textAlign="center">
          {title}
        </Heading>

        <Box
          w={{ base: "340px", sm: "440px" }}
          h={{ base: "250px", sm: "310px" }}
        >
          <CurrentCard card={flashcards[currentCard]} />
        </Box>

        <Flex mt="2rem" justify="center" w="100%">
          <Button
            isDisabled={currentCard === 0}
            onClick={() => setCurrentCard(currentCard - 1)}
            mr="8px"
          >
            Prev Card
          </Button>
          <Button
            isDisabled={flashcards && currentCard === flashcards.length - 1}
            onClick={() => setCurrentCard(currentCard + 1)}
          >
            Next Card
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StudySession;
