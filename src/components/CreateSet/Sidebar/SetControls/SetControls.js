import React from "react";
import { Box, Flex, Button, VStack } from "@chakra-ui/react";

const SetControls = ({ height = "100%", width = "100%" }) => {
  const handleClickNewCard = () => {
    console.log("CREATE NEW CARD");
  };
  const handleClickSaveCard = () => {
    console.log("SAVE CARD");
  };
  const handleClickDeleteCard = () => {
    console.log("DELETE CARD");
  };

  return (
    <Flex
      direction="column"
      justify="center"
      height={height}
      width={width}
      position="absolute"
      top={0}
      left={0}
      pt="8px"
      // border="1px solid #ccc"
    >
      <VStack w="100%" spacing="1rem">
        <ControlButton onClick={handleClickNewCard} label="New Card" />
        <ControlButton onClick={handleClickSaveCard} label="Save Card" />
        <ControlButton onClick={handleClickDeleteCard} label="Delete Card" />
      </VStack>
    </Flex>
  );
};

export default SetControls;

const ControlButton = ({ label, onClick }) => {
  return (
    <Button
      w="96%"
      size="sm"
      colorScheme={label.startsWith("Delete") ? "red" : "blue"}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
