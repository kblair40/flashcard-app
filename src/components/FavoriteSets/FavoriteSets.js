import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Center,
  Spinner,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";

import { StarFilledIcon, StarOutlineIcon } from "utils/icons";
import api from "api";

const FavoriteSets = () => {
  const [loading, setLoading] = useState(true);
  const [favSets, setFavSets] = useState([]);
  const [favSetIds, setFavSetIds] = useState([]);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  useEffect(() => {
    const fetchFavSets = async () => {
      try {
        const response = await api.get("/favorite_sets");
        console.log("FAV SETS RESPONSE.DATA:", response.data);
        setFavSets(response.data);
        setFavSetIds(response.data.map((set) => set._id));
      } catch (e) {
        console.error("FAILED FETCHING SETS:", e);
      }
      setLoading(false);
    };

    fetchFavSets();
  }, []);

  if (loading) {
    return (
      <Center h="200px">
        <Spinner />
      </Center>
    );
  }

  const headingStyles = {
    textTransform: "capitalize",
    fontWeight: "700",
    fontSize: { base: "xl", sm: "2xl" },
  };

  return (
    <Flex direction="column" align="center" pt="32px">
      <Heading {...headingStyles} noOfLines={2} mb="1.5rem">
        Favorite Flashcard Sets
      </Heading>

      {loading ? (
        <Center h="200px">
          <Spinner />
        </Center>
      ) : favSets && favSets.length ? (
        favSets.map((set, i) => {
          return (
            <Flex
              w="max-content"
              key={i}
              justify="space-between"
              mb=".75rem"
              pr="8px"
              align="center"
            >
              <Flex align="center" mr="2rem">
                <Text fontWeight="500">{set.title}</Text>
                <Text
                  ml=".75rem"
                  fontStyle="italic"
                  fontSize="sm"
                  textStyle={isDark ? "dm-secondary" : "lm-secondary"}
                >
                  {set.flashcards.length} cards
                </Text>
              </Flex>

              <IconButton
                icon={<StarFilledIcon boxSize="18px" />}
                size="sm"
                rounded="full"
              />
            </Flex>
          );
        })
      ) : null}
    </Flex>
  );
};

export default FavoriteSets;
