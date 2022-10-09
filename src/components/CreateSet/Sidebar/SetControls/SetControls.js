import React, { useContext, useState, useEffect } from "react";
import { Flex, Button, VStack } from "@chakra-ui/react";

import SetContext from "store/SetContext";

const SetControls = ({ height = "100%", width = "100%" }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { saveCard, deleteCard, saving, activeCard, patchCard } =
    useContext(SetContext);

  useEffect(() => {
    setIsEditing(Boolean(activeCard && activeCard.id));
  }, [activeCard]);

  const handleClickSave = async () => {
    if (isEditing) {
      // patch card
      patchCard(activeCard.id);
    } else {
      await saveCard();
    }
  };

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
        <ControlButton label="New Card" />
        <ControlButton
          onClick={handleClickSave}
          label="Save Card"
          loading={saving}
        />
        <ControlButton onClick={deleteCard} label="Delete Card" />
      </VStack>
    </Flex>
  );
};

export default SetControls;

const ControlButton = ({ label, onClick, loading }) => {
  return (
    <Button
      w="100%"
      size="sm"
      colorScheme={label.startsWith("Delete") ? "red" : "blue"}
      onClick={onClick}
      isLoading={loading}
    >
      {label}
    </Button>
  );
};
