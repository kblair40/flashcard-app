import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";

import SetContext from "store/SetContext";
import Sidebar from "./Sidebar";
import Editors from "./Editors";

const CreateSet = () => {
  const { flashcardSetData } = useContext(SetContext);

  return (
    <Flex justify="center" w="100%" h="calc(100vh - 60px)" overflowY="hidden">
      <Sidebar
        width={{ base: "100%", sm: "30%", md: "25%" }}
        cards={flashcardSetData ? flashcardSetData.flashcards : []}
      />

      <Editors width={{ base: "100%", sm: "70%", md: "75%" }} />
    </Flex>
  );
};

export default CreateSet;
