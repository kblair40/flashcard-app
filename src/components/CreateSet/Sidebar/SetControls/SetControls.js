import React, { useContext, useState, useEffect } from "react";
import { Flex, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import SetContext from "store/SetContext";

const SetControls = ({ height = "100%", width = "100%" }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    addCard,
    saveCard,
    deleteCard,
    deleting,
    saving,
    activeCard,
    patchCard,
  } = useContext(SetContext);

  useEffect(() => {
    setIsEditing(Boolean(activeCard && activeCard.id));
  }, [activeCard]);

  const handleClickSave = async () => {
    if (isEditing) {
      // patch card
      patchCard();
    } else {
      await saveCard();
    }
  };

  const handleClickExit = () => {
    navigate("/account/sets");
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
    >
      <VStack w="100%" spacing=".5rem">
        <ControlButton
          isDisabled={activeCard.id === undefined}
          label="New Card"
          onClick={addCard}
        />
        <ControlButton
          onClick={handleClickSave}
          label="Save Card"
          loading={saving}
        />
        <ControlButton
          isDisabled={!isEditing}
          onClick={deleteCard}
          label="Delete Card"
          loading={deleting}
        />
        <ControlButton onClick={handleClickExit} label="Exit" />
      </VStack>
    </Flex>
  );
};

export default SetControls;

const ControlButton = ({ label, onClick, loading, isDisabled }) => {
  return (
    <Button
      w="100%"
      size="sm"
      colorScheme={label.startsWith("Delete") ? "red" : "blue"}
      onClick={onClick}
      isLoading={loading}
      isDisabled={isDisabled}
    >
      {label}
    </Button>
  );
};
