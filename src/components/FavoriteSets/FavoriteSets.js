import React, { useEffect, useState, useRef } from "react";
import {
  Flex,
  Text,
  Heading,
  Center,
  Spinner,
  IconButton,
  useColorMode,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import useFetchFavoriteSets from "hooks/useFetchFavoriteSets";
import ConfirmDeleteFavoriteModal from "components/Modals/ConfirmDeleteFavoriteModal";
import { StarFilledIcon, StudyIcon } from "utils/icons";
import api from "api";

const FavoriteSets = ({ deletedSetCount }) => {
  const [setToDelete, setSetToDelete] = useState();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [removingFavorite, setRemovingFavorite] = useState();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { favSets, loading, fetchFavSets } = useFetchFavoriteSets();

  const deletedCount = useRef(0);
  useEffect(() => {
    if (deletedSetCount > 0 && deletedCount.current < deletedSetCount) {
      deletedCount.current = deletedSetCount;
      fetchFavSets();
    }
  }, [deletedSetCount]);

  const removeFavorite = async () => {
    setRemovingFavorite(setToDelete);

    try {
      const response = await api.patch("/user/remove", {
        favorite_set: setToDelete,
      });

      fetchFavSets();
    } catch (e) {
      console.error("FAILED TO ADD/REMOVE SET AS FAVORITE:", e);
    }

    setRemovingFavorite(undefined);
    setSetToDelete(undefined);
  };

  const handleClickUnfavorite = (setId) => {
    setSetToDelete(setId);
    setShowConfirmDeleteModal(true);
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
    <Flex
      direction="column"
      w="100%"
      bg={isDark ? "gray.800" : "gray.50"}
      borderRadius={{ base: "8px", md: "8px 0 0 8px", lg: "8px" }}
      h="100%"
    >
      <Box p={{ base: "1.5rem 1rem .5rem" }}>
        <Heading {...headingStyles} noOfLines={2} pb="1rem">
          Your Favorite Sets
        </Heading>
      </Box>

      <Box
        px={{ base: "1rem" }}
        maxH={{ base: "40vh", md: "unset" }}
        overflowY="auto"
      >
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

                <Flex align="center">
                  <Tooltip label="Start a new study session" placement="left">
                    <Link to={`/study/${set._id}`}>
                      <IconButton
                        mr="4px"
                        variant="ghost"
                        isLoading={removingFavorite === set._id}
                        icon={<StudyIcon boxSize="14px" />}
                        size="xs"
                        rounded="full"
                      />
                    </Link>
                  </Tooltip>

                  <Tooltip label="Remove from favorites" placement="left">
                    <IconButton
                      variant="ghost"
                      isLoading={removingFavorite === set._id}
                      onClick={() => handleClickUnfavorite(set._id)}
                      icon={<StarFilledIcon boxSize="14px" />}
                      size="xs"
                      rounded="full"
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            );
          })
        ) : favSets && !favSets.length ? (
          <Flex direction="column" align="center" pb={{ base: "1rem", md: 0 }}>
            <Text
              textAlign="center"
              fontWeight="600"
              fontSize="lg"
              color={isDark ? "gray.50" : "gray.700"}
            >
              No Favorite Sets
            </Text>

            <Box mt=".5rem" px={{ base: "16px", sm: "32px", md: "16px" }}>
              <Text textAlign={"center"} fontWeight="500">
                Click the star icon next to any set from the community or that
                you created to add it to your favorites
              </Text>
            </Box>
          </Flex>
        ) : null}
      </Box>

      {showConfirmDeleteModal && (
        <ConfirmDeleteFavoriteModal
          isOpen={showConfirmDeleteModal}
          onClose={() => {
            setSetToDelete(undefined);
            setShowConfirmDeleteModal(false);
          }}
          onConfirm={removeFavorite}
        />
      )}
    </Flex>
  );
};
export default FavoriteSets;
