import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import Sidebar from "./Sidebar";
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
    <Flex justify="center" w="100%" h="calc(100vh - 60px)" overflowY="hidden">
      <Sidebar width={{ base: "100%", sm: "30%", md: "25%" }} />

      <Editors width={{ base: "100%", sm: "70%", md: "75%" }} />
    </Flex>
  );
};

export default CreateSet;
