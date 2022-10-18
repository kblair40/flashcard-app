import React, { useContext } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import SetContext from "store/SetContext";
import Sidebar from "./Sidebar";
import Editors from "./Editors";

const CreateSet = () => {
  const { flashcardSetData: setData } = useContext(SetContext);
  // console.log("SET CTX:", setData);

  return (
    <Flex justify="center" w="100%" h="calc(100vh - 60px)" overflowY="hidden">
      <Sidebar width={{ base: "100%", sm: "30%", md: "25%" }} />

      <Flex
        direction="column"
        h="100%"
        width={{ base: "100%", sm: "70%", md: "75%" }}
      >
        <SetMeta setData={setData} />
        <Editors width={{ base: "100%" }} />
      </Flex>
    </Flex>
  );
};

export default CreateSet;

const SetMeta = ({ setData, height = "100%", width = "100%" }) => {
  let category, title;

  if (setData) {
    category = setData.category;
    title = setData.title;
  }
  return (
    <Flex height={height} width={width} px="1rem" flexWrap="wrap">
      <Box mr="1rem">
        <Text fontWeight={600}>Category:</Text>
        <Text>{category}</Text>
      </Box>

      <Box>
        <Text fontWeight={600}>Title:</Text>
        <Text>{title}</Text>
      </Box>
    </Flex>
  );
};
