import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import api from "api";

const StudySession = () => {
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState();

  const params = useParams();

  useEffect(() => {
    const fetchSet = async (setId) => {
      try {
        const response = await api.get(`/flashcard_set/${setId}`);
        console.log("\nSET RESPONSE:", response.data);

        if (response.data && response.data.set) {
          const { flashcards } = response.data.set;
          setFlashcards(flashcards);
        }
      } catch (e) {
        console.error("FAILED FETCHING SET:", e);
      }
    };

    if (params && params.id) {
      fetchSet(params.id);
    }
  }, [params]);

  return (
    <Flex justify="center">
      <Flex
        w="100%"
        maxW={{ base: "90%" }}
        direction="column"
        align="center"
      ></Flex>
    </Flex>
  );
};

export default StudySession;
