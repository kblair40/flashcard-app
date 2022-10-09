import React, { useContext } from "react";
import { Flex, Button, VStack } from "@chakra-ui/react";

import SetContext from "store/SetContext";

const SetControls = ({ height = "100%", width = "100%" }) => {
  const { saveCard, deleteCard, addCard } = useContext(SetContext);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      height={height}
      width={width}
      position="absolute"
      top={0}
      left={0}
      pt="8px"
      px="8px"
      // border="1px solid #ccc"
      // borderBottom="1px solid #ececec"
    >
      <VStack w="100%" spacing="1rem">
        <ControlButton onClick={addCard} label="New Card" />
        <ControlButton onClick={saveCard} label="Save Card" />
        <ControlButton onClick={deleteCard} label="Delete Card" />
      </VStack>
    </Flex>
  );
};

export default SetControls;

const ControlButton = ({ label, onClick }) => {
  return (
    <Button
      w="100%"
      size="sm"
      colorScheme={label.startsWith("Delete") ? "red" : "blue"}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
