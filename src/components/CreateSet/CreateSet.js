import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, VStack, Grid, GridItem } from "@chakra-ui/react";

import Editors from "./Editors";
import api from "api";

const CreateSet = () => {
  const [flashcardSetData, setFlashcardSetData] = useState();

  const params = useParams();

  useEffect(() => {
    const fetchSet = async (id) => {
      try {
        const response = await api.get(`/flashcard_set/${id}`);
        console.log("\nRESPONSE:", response.data, "\n");

        if (response.data && response.data.set) {
          setFlashcardSetData(response.data.set);
        }
      } catch (e) {
        console.log("FAILED FETCHING SET:", e);
      }
    };

    if (params.id) {
      fetchSet(params.id);
    }
  }, [params]);

  return (
    <Flex justify="center" w="100%">
      <Box w={{ base: "90%", md: "700px" }}>
        <Editors />
      </Box>
    </Flex>
  );
};

export default CreateSet;
