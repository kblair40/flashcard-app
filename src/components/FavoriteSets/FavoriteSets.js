import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Center,
  Spinner,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";

import { StarFilledIcon } from "utils/icons";
import api from "api";

const FavoriteSets = () => {
  const [loading, setLoading] = useState(true);
  const [favSets, setFavSets] = useState([]);
  const [removingFavorite, setRemovingFavorite] = useState();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  useEffect(() => {
    const fetchFavSets = async () => {
      try {
        const response = await api.get("/favorite_sets");
        // console.log("FAV SETS RESPONSE.DATA:", response.data);
        setFavSets(response.data);
      } catch (e) {
        console.error("FAILED FETCHING SETS:", e);
      }
      setLoading(false);
    };

    fetchFavSets();
  }, []);

  const handleClickUnfavorite = async (setId) => {
    setRemovingFavorite(setId);

    try {
      const response = await api.patch("/user/remove", {
        favorite_set: setId,
      });
      console.log("RESPONSE:", response.data);

      if (response.data) setFavSets(response.data.favorite_flashcard_sets);
    } catch (e) {
      console.error("FAILED TO ADD/REMOVE SET AS FAVORITE:", e);
    }
    setRemovingFavorite(setId);
  };

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
    <Flex direction="column" w="100%">
      <Heading {...headingStyles} noOfLines={2} mb="1.5rem">
        Your Favorite Sets
      </Heading>

      {loading ? (
        <Center h="200px">
          <Spinner />
        </Center>
      ) : favSets && favSets.length ? (
        favSets.map((set, i) => {
          return (
            <Flex
              w={{ base: "100%" }}
              key={i}
              justify="space-between"
              mb="1rem"
              align="center"
              pr={{ base: "1rem", sm: 0 }}
            >
              <Flex align="center" mr="2rem">
                <Text noOfLines={1} fontWeight="500">
                  {set.title}
                </Text>

                <Text
                  whiteSpace={"nowrap"}
                  ml=".75rem"
                  fontStyle="italic"
                  fontSize="sm"
                  textStyle={isDark ? "dm-secondary" : "lm-secondary"}
                >
                  {set.flashcards.length} cards
                </Text>
              </Flex>

              <IconButton
                variant="ghost"
                isLoading={removingFavorite === set._id}
                onClick={() => handleClickUnfavorite(set._id)}
                icon={<StarFilledIcon boxSize="14px" />}
                size="xs"
                rounded="full"
              />
            </Flex>
          );
        })
      ) : favSets && !favSets.length ? (
        <Text textAlign="center" fontWeight="600" fontSize="lg">
          No Favorite Sets
        </Text>
      ) : null}
    </Flex>
  );
};

export default FavoriteSets;
