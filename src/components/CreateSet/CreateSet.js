import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, VStack, Grid, GridItem } from "@chakra-ui/react";

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
    <Flex
      justify="center"
      w="100%"
      // border="1px solid black"
      h="calc(100vh - 60px)"
      overflowY="hidden"
      // position={"absolute"}
      // height="100%"
      // top={0}
      // left={0}
      // right={0}
      // bottom={0}
    >
      {/* <Box
        display={{ base: "hidden", sm: "block" }}
        w={{ base: "100%", sm: "70%" }}
      > */}
      <Sidebar width={{ base: "100%", sm: "30%" }} />
      {/* </Box> */}

      {/* <Box w={{ base: "90%", sm: "70%" }}> */}
      <Editors width={{ base: "100%", sm: "70%" }} />
      {/* </Box> */}
    </Flex>
  );
};

export default CreateSet;
