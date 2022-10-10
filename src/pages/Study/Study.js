import React, { useEffect, useState } from "react";
import { Spinner, Center, Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import api from "api";

const Study = () => {
  const [loading, setLoading] = useState(true);
  const [flashcardSets, setFlashcardSets] = useState();

  useEffect(() => {
    const fetchFlashcardData = async () => {
      try {
        const response = await api.get("/user", {
          params: { flashcard_sets: true },
        });
        // console.log("\nUSER RESPONSE:", response.data);
        if (response.data && response.data.user) {
          setLoading(false);
          setFlashcardSets(response.data.user.flashcard_sets || []);
        }
      } catch (e) {
        console.error("FAILE FETCHING USER:", e);
      }

      setLoading(false);
    };

    fetchFlashcardData();
  }, []);

  if (loading) {
    return (
      <Center h="400px">
        <Spinner />
      </Center>
    );
  }
  return (
    <Flex justify="center" mt="2rem">
      <Flex
        direction="column"
        align="center"
        w="100%"
        maxW={{ base: "340px", sm: "420px", md: "600px" }}
      >
        <Text fontSize="xl" fontWeight="600">
          Sets
        </Text>

        {flashcardSets && flashcardSets.length
          ? flashcardSets.map((set, i) => {
              return (
                <Link to={`/study/${set._id}`}>
                  <Button>
                    <Flex justify="center" align="center">
                      <Text>{`${set.title}`}</Text>
                      <Text ml="6px" fontSize="xs" color="gray.600">
                        ({set.flashcards.length} cards)
                      </Text>
                    </Flex>
                  </Button>
                </Link>
              );
            })
          : null}
      </Flex>
    </Flex>
  );
};

export default Study;
