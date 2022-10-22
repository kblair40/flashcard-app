import React, { useContext } from "react";
import {
  Flex,
  Text,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

import SetContext from "store/SetContext";
import Sidebar from "./Sidebar";
import Editors from "./Editors";

const SetMeta = ({ setData, height = "max-content", width = "100%" }) => {
  let category, title;

  if (setData) {
    category = setData.category;
    title = setData.title;
  }
  console.log("category:", category);
  return (
    <Flex
      mt="1rem"
      height={height}
      width={width}
      px={{ base: "8px", md: "16px" }}
      flexWrap="wrap"
      justifyContent="center"
    >
      <Flex w="100%" maxWidth="700px">
        <Flex
          direction={{ base: "column", sm: "row" }}
          mr="1.25rem"
          align={{ base: "start", sm: "center" }}
        >
          <Text fontWeight={600}>Category:</Text>
          {category && (
            <Editable ml="4px" defaultValue={category}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          )}
        </Flex>

        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "start", sm: "center" }}
        >
          <Text fontWeight={600}>Title:</Text>
          {title && (
            <Editable ml="4px" defaultValue={title}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

const CreateSet = () => {
  const { flashcardSetData: setData } = useContext(SetContext);

  return (
    <Flex justify="center" w="100%" h="calc(100vh - 64px)" overflowY="hidden">
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
