import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Reorder, useDragControls } from "framer-motion";

import "./Thumbnails.css";
import api from "api";
import SetContext from "store/SetContext";

const Thumbnails = ({ isDark, height = "100%", width = "100%" }) => {
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

  const reorderAxis = useBreakpointValue({ base: "x", sm: "y" });
  const cardsDisplay = useBreakpointValue({ base: "flex", sm: "block" });
  const cardMargin = useBreakpointValue({
    base: { left: "4px", right: "4px" },
    sm: { left: 0, right: 0 },
  });
  const cardsOverflow = useBreakpointValue({ base: "auto", sm: "hidden" });
  const cardHeight = useBreakpointValue({ base: "100%", sm: undefined });

  return (
    <Box
      height={height}
      width={width}
      position={{ sm: "absolute" }}
      bottom={{ sm: 0 }}
      left={{ sm: 0 }}
      pt={{ sm: "16px" }}
      pb={{ sm: "32px" }}
    >
      <Heading
        display={{ base: "none", sm: "block" }}
        fontSize="xl"
        textAlign="center"
        borderBottom="1px solid"
        borderColor={isDark ? "gray.400" : "gray.300"}
      >
        Cards
      </Heading>

      <Box
        display={{ base: "flex", sm: "block" }}
        flexDirection={{ base: "row", sm: "unset" }}
        flexWrap={{ base: "wrap", sm: "unset" }}
        alignItems={{ base: "center", sm: "unset" }}
        onPointerDown={startDrag}
        onPointerUp={endDrag}
        w="100%"
        height={{ base: "100%" }}
        overflowY={{ sm: "auto" }}
        p={{ sm: "6px 6px 0 6px", md: "4px 8px 0 8px" }}
        background={
          saving ? "rgba(10,20,240,0.02)" : isDark ? "gray.800" : "#fff"
        }
        transition={"background 0.2s"}
        zIndex={-1}
      >
        <Reorder.Group
          onReorder={handleChangeOrder}
          values={cards}
          axis={reorderAxis}
          style={{
            height: cardHeight,
            maxWidth: "100vw",
            display: cardsDisplay,
            overflowY: "auto",
            overflowX: cardsOverflow,
          }}
        >
          {cards && cards.length ? (
            cards.map((card, i) => {
              console.log("\nCARD:", card);
              return (
                <Reorder.Item
                  key={card._id}
                  value={card}
                  dragControls={dragControls}
                  style={{
                    margin: `0 ${cardMargin.right} 0 ${cardMargin.left}`,
                  }}
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
            <Text textAlign="center" pt="8px" fontWeight="600" fontSize="sm">
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
      mb={{ sm: "8px" }}
      h="100%"
      minH={{ base: "50px", sm: "60px" }}
      maxH={{ base: "120px", sm: "100px" }}
      overflow={{ base: "hidden" }}
      minW={{ base: "120px", sm: "unset" }}
      w="100%"
      borderWidth={1}
      borderStyle="solid"
      borderColor={
        isActive && isDark
          ? "gray.100"
          : isActive
          ? "gray.800"
          : isDark
          ? "gray.500"
          : "gray.300"
      }
      borderRadius="4px"
      justify="center"
      align="center"
      cursor="pointer"
      position="relative"
      transition={"background 0.3s"}
      bg={isDark ? "gray.700" : "gray.50"}
      _hover={{ background: isDark ? "gray.600" : "gray.100" }}
      pb={{ base: ".75rem", sm: "0" }}
      className="thumbnail"
    >
      <Box
        className="preview-card-content-live"
        p={{ base: ".5rem 1rem", sm: ".25rem 1rem .25rem" }}
        textAlign="center"
        maxH={{ base: "120px", sm: "100px" }}
        overflow={{ base: "hidden" }}
        dangerouslySetInnerHTML={{ __html: frontContent }}
      />

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
