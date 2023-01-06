import React, { useContext, useState, useEffect } from "react";
import {
  Flex,
  Button,
  Stack,
  Tooltip,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { AddIcon, TrashIcon, SaveIcon } from "utils/icons";
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
    frontCardContent,
    backCardContent,
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
    navigate("/manage-sets");
  };

  const isEmpty = (val) => {
    return val.replace(/<(.|\n)*?>/g, "").trim().length === 0;
  };

  const tooltipPlacement = useBreakpointValue({ base: "top", sm: "right" });

  return (
    <Flex
      direction={{ sm: "column" }}
      justify="center"
      align="center"
      height={height}
      width={width}
      position={{ sm: "absolute" }}
      top={{ sm: 0 }}
      left={{ sm: 0 }}
      p={{ base: "0 6px 0 6px", md: "0 8px 0 8px" }}
    >
      <Stack
        w="100%"
        spacing={{ base: ".25rem", sm: ".5rem" }}
        direction={{ base: "row-reverse", sm: "column" }}
      >
        <Tooltip
          placement={tooltipPlacement}
          label="You must be editing a previously created card"
          isDisabled={activeCard.id !== undefined}
        >
          <Box>
            <ControlButton
              isDisabled={activeCard.id === undefined}
              label="New Card"
              onClick={addCard}
            />
          </Box>
        </Tooltip>

        <Tooltip
          placement={tooltipPlacement}
          label="You must be editing a previously created card or have content on both sides of a new card"
          isDisabled={!isEmpty(frontCardContent) || !isEmpty(backCardContent)}
        >
          <Box>
            <ControlButton
              onClick={handleClickSave}
              isDisabled={isEmpty(frontCardContent) || isEmpty(backCardContent)}
              label="Save Card"
              loading={saving}
            />
          </Box>
        </Tooltip>

        <Tooltip
          placement={tooltipPlacement}
          isDisabled={isEditing}
          label={"A card you have created must be selected in order to delete"}
        >
          <Box>
            <ControlButton
              isDisabled={!isEditing}
              onClick={deleteCard}
              label="Delete Card"
              loading={deleting}
              variant="solid-red"
            />
          </Box>
        </Tooltip>
        <ControlButton onClick={handleClickExit} label="Exit" />
      </Stack>
    </Flex>
  );
};

export default SetControls;

let boxSize = "14px";
const icons = {
  "New Card": <AddIcon boxSize={boxSize} />,
  "Save Card": <SaveIcon boxSize={"15px"} />,
  "Delete Card": <TrashIcon boxSize={boxSize} fill="gray.50" />,
};

const ControlButton = ({ label, onClick, loading, isDisabled, variant }) => {
  return (
    <Button
      w="100%"
      size={{ base: "xs", sm: "sm" }}
      onClick={onClick}
      isLoading={loading}
      isDisabled={isDisabled}
      variant={variant}
      leftIcon={icons[label] ? icons[label] : null}
    >
      {label}
    </Button>
  );
};
