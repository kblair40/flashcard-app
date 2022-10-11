import React, { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { Reorder } from "framer-motion";

import api from "api";
import SetContext from "store/SetContext";

const Thumbnails = ({ height = "100%", width = "100%" }) => {
  const [cards, setCards] = useState([]);

  const { flashcardSetData, activeCard, updateActiveCard } =
    useContext(SetContext);

  useEffect(() => {
    if (flashcardSetData && flashcardSetData.flashcards) {
      setCards(flashcardSetData.flashcards);
    }
  }, [flashcardSetData]);

  // let cards = [];
  // if (flashcardSetData) {
  //   cards = flashcardSetData.flashcards;
  // }

  const handleChangeOrder = async (cardsArray) => {
    console.log("NEW ORDER:", cardsArray);
    setCards(cardsArray);

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
      console.log("RESPONSE:", response.data);
    } catch (err) {
      console.error("FAILED PATCHING SET ORDER:", err);
    }
  };

  return (
    <Box
      height={height}
      width={width}
      maxHeight="100%"
      position="absolute"
      bottom={0}
      left={0}
      pt="8px"
      pb="32px"
    >
      <Heading
        size="sm"
        textAlign="left"
        pl="8px"
        borderBottom="1px solid #cacaca"
      >
        Cards
      </Heading>

      <Box w="100%" h="100%" overflowY="auto" p="4px 12px 0 8px" mt="4px">
        <Reorder.Group onReorder={handleChangeOrder} values={cards} axis="y">
          {cards && cards.length ? (
            cards.map((card, i) => {
              return (
                <Reorder.Item key={card._id} value={card}>
                  <Thumbnail
                    updateActiveCard={updateActiveCard}
                    key={i}
                    frontContent={card.front_content}
                    id={card._id}
                    index={i}
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
            <Text>No Cards</Text>
          )}
        </Reorder.Group>
      </Box>
    </Box>
  );
};

export default Thumbnails;

const Thumbnail = ({ frontContent, index, id, updateActiveCard, isActive }) => {
  const handleClick = () => {
    updateActiveCard({ index, id });
  };

  return (
    <Flex
      onClick={handleClick}
      mx="auto"
      mb="8px"
      py="8px"
      minH="60px"
      maxH="120px"
      w="100%"
      borderWidth={1}
      borderStyle="solid"
      borderColor={isActive ? "green.500" : "#ccc"}
      borderRadius="4px"
      justify="center"
      align="center"
      cursor="pointer"
      position="relative"
      transition={"background 0.3s"}
      _hover={{ background: "#eee" }}
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
