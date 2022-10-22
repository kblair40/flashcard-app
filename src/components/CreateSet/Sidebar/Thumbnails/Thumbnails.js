import React, { useContext, useState, useEffect, useRef } from "react";
import { Box, Heading, Text, Flex, Spinner } from "@chakra-ui/react";
import { Reorder, useDragControls } from "framer-motion";

import api from "api";
import SetContext from "store/SetContext";

const Thumbnails = ({ isDark, height = "100%", width = "100%" }) => {
  // add some kind of overlay with spinner while saving new order
  const [saving, setSaving] = useState(false);
  const [cards, setCards] = useState([]);

  const dragControls = useDragControls();

  const {
    flashcardSetData,
    activeCard,
    updateActiveCard,
    setFlashcardSetData,
  } = useContext(SetContext);

  const flashcardsOrder = useRef();
  const flashcardsOrderComparator = useRef();

  useEffect(() => {
    if (flashcardSetData && flashcardSetData.flashcards) {
      setCards(flashcardSetData.flashcards);
      flashcardsOrder.current = flashcardSetData.flashcards;
      flashcardsOrderComparator.current = flashcardSetData.flashcards;
    }
  }, [flashcardSetData]);

  const handleChangeOrder = async (cardsArray) => {
    console.log("NEW ORDER:", cardsArray);
    // Only updates locally, so user can visually see order has changed.
    // api call to change the order is in the endDrag handler
    setCards(cardsArray);
    flashcardsOrder.current = cardsArray;
  };

  const isDragging = useRef(false);
  const startDrag = (e) => {
    isDragging.current = true;
  };

  const didChange = (cardsArray, comparator) => {
    for (let i = 0; i < cardsArray.length; i++) {
      if (cardsArray[i]._id !== comparator[i]._id) {
        return true;
      }
    }

    return false;
  };

  const endDrag = async (e) => {
    const cardsArray = flashcardsOrder.current;
    isDragging.current = false;

    if (
      !didChange(flashcardsOrder.current, flashcardsOrderComparator.current)
    ) {
      return;
    }

    setSaving(true);

    for (let i = 0; i < cardsArray.length; i++) {
      let card = cardsArray[i];
      card.index = i + 1;
    }

    try {
      const response = await api.patch(
        `/flashcard_set/change_order/${flashcardSetData._id}`,
        {
          flashcards: cardsArray,
        }
      );
      console.log("CHANGE ORDER RESPONSE:", response.data);

      if (response.data && response.data.set) {
        const { set } = response.data;
        flashcardsOrder.current = set.flashcards;
        flashcardsOrderComparator.current = set.flashcards;
        setFlashcardSetData(set);
      }
    } catch (err) {
      console.error("FAILED PATCHING SET ORDER:", err);
    }

    setSaving(false);
  };

  return (
    <Box
      height={height}
      width={width}
      maxHeight="100%"
      position="absolute"
      bottom={0}
      left={0}
      pt="16px"
      pb="32px"
    >
      <Heading
        fontSize="xl"
        textAlign="center"
        borderBottom="1px solid"
        borderColor={isDark ? "gray.400" : "gray.300"}
      >
        Cards
      </Heading>

      <Box
        onPointerDown={startDrag}
        onPointerUp={endDrag}
        w="100%"
        h="100%"
        overflowY="auto"
        p="4px 12px 0 8px"
        mt="4px"
        background={
          saving ? "rgba(10,20,240,0.02)" : isDark ? "gray.800" : "#fff"
        }
        transition={"background 0.2s"}
        zIndex={-1}
      >
        <Reorder.Group onReorder={handleChangeOrder} values={cards} axis="y">
          {cards && cards.length ? (
            cards.map((card, i) => {
              console.log("\nCARD:", card);
              return (
                <Reorder.Item
                  key={card._id}
                  value={card}
                  dragControls={dragControls}
                >
                  <Thumbnail
                    updateActiveCard={updateActiveCard}
                    key={i}
                    frontContent={card.front_content}
                    id={card._id}
                    index={i}
                    isDark={isDark}
                    isActive={
                      activeCard && activeCard.id
                        ? activeCard.id === card._id
                        : false
                    }
                  />
                </Reorder.Item>
              );
            })
          ) : (
            <Text
              textAlign="center"
              pt="8px"
              fontWeight="600"
              fontSize="sm"
              // textTransform={"uppercase"}
            >
              No Cards
            </Text>
          )}
        </Reorder.Group>
      </Box>
      {saving && <LoadingOverlay cardCount={cards ? cards.length : 0} />}
    </Box>
  );
};

export default Thumbnails;

const Thumbnail = ({
  isDark,
  frontContent,
  index,
  id,
  updateActiveCard,
  isActive,
}) => {
  const handleClick = () => {
    updateActiveCard({ index, id });
  };

  return (
    <Flex
      zIndex={1}
      onClick={handleClick}
      mx="auto"
      mb="8px"
      py="8px"
      minH="60px"
      maxH="120px"
      w="100%"
      borderWidth={1}
      borderStyle="solid"
      borderColor={isActive ? "green.500" : isDark ? "gray.500" : "gray.300"}
      borderRadius="4px"
      justify="center"
      align="center"
      cursor="pointer"
      position="relative"
      transition={"background 0.3s"}
      bg={isDark ? "gray.700" : "gray.50"}
      _hover={{ background: isDark ? "gray.600" : "gray.100" }}
    >
      <Box dangerouslySetInnerHTML={{ __html: frontContent }} />

      <Text
        position="absolute"
        top="4px"
        left="4px"
        fontWeight="medium"
        fontSize="xs"
      >
        {index + 1}
      </Text>
    </Flex>
  );
};

const LoadingOverlay = ({ cardCount }) => {
  return (
    <Flex
      position="absolute"
      bottom={0}
      top="1.8rem"
      left={0}
      h="100%"
      w="100%"
      justify="center"
      align="center"
      onClick={(e) => e.stopPropagation()}
      zIndex={10}
    >
      <Spinner position="relative" bottom={cardCount <= 5 ? "40px" : 0} />
    </Flex>
  );
};
