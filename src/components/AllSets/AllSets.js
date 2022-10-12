import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  Text,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Loading from "components/Loading";
import UserContext from "store/UserContext";
import { SettingsIcon, StudyIcon, ChevronIcon, AddIcon } from "utils/icons";
import { makeDisplayName } from "utils/helpers";
import api from "api";

const AllSets = () => {
  const { isSignedIn, userData } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [flashcardSets, setFlashcardSets] = useState();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const studyButtonBg = isDark ? "gray.50" : "#fff";

  useEffect(() => {
    const fetchFlashcardData = async () => {
      try {
        const response = await api.get("/user", {
          params: { flashcard_sets: true },
        });

        if (response.data && response.data.user) {
          setLoading(false);
          setFlashcardSets(response.data.user.flashcard_sets || []);
        }
      } catch (e) {
        console.error("FAILED FETCHING USER:", e);
      }

      setLoading(false);
    };

    if (isSignedIn) {
      fetchFlashcardData();
    } else {
      setLoading(false);
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <Flex justify="center" pt="20px">
      <Flex
        direction="column"
        w="100%"
        justify="space-between"
        maxW={{ base: "100%", sm: "440px", md: "600px" }}
        position="relative"
      >
        <Flex w="100%" justify="space-between">
          <Heading
            textTransform="capitalize"
            fontWeight="700"
            pl="12px"
            fontSize="2xl"
            mb=".75rem"
          >
            {userData ? `${makeDisplayName(userData)}'s` : ""} Flashcard Sets
          </Heading>

          <Link to="/manage-sets">
            <Tooltip label="Manage and Edit Sets">
              <IconButton
                variant="ghost"
                size="sm"
                icon={
                  <SettingsIcon
                    boxSize="18px"
                    fill={isDark ? "gray.50" : "gray.700"}
                  />
                }
              />
            </Tooltip>
          </Link>
        </Flex>

        <Flex h="100%" w="100%" direction="column">
          {loading ? (
            <Loading h="100px" />
          ) : !isSignedIn ? (
            <NotLoggedIn />
          ) : flashcardSets && flashcardSets.length ? (
            flashcardSets.map((set, i) => {
              return (
                <Link key={i} to={`/study/${set._id}`}>
                  <Flex
                    position="relative"
                    direction="column"
                    cursor="pointer"
                    w="100%"
                    p="8px 8px 10px 12px"
                    transition="background 0.2s"
                    _hover={{
                      bg: "gray.50",
                      "& button": {
                        transform: "translateX(-16px)",
                        bg: "gray.50",
                      },
                    }}
                    _active={{
                      bg: "gray.100",
                      "& button": {
                        bg: "gray.100",
                      },
                    }}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      w="100%"
                      h="100%"
                    >
                      <Text fontSize="lg" fontWeight="600" lineHeight={1}>
                        {set.title}
                      </Text>
                    </Flex>

                    <Text
                      mt="4px"
                      lineHeight={1}
                      fontSize="11px"
                      fontWeight="500"
                      textStyle={isDark ? "dm-secondary" : "lm-secondary"}
                    >
                      Last studied on 10/7
                    </Text>

                    <Box
                      bottom="4px"
                      right="10px"
                      position="absolute"
                      w="80px"
                      h="24px"
                    >
                      <Button
                        size="xs"
                        pr={0}
                        variant="ghost"
                        position="absolute"
                        fontWeight="700"
                        w="64px"
                        top={0}
                        bottom={0}
                        right={0}
                        zIndex={2}
                        bg={studyButtonBg}
                        leftIcon={
                          <StudyIcon
                            fill={isDark ? "gray.50" : "gray.700"}
                            boxSize="14px"
                          />
                        }
                      >
                        Study
                      </Button>

                      <ChevronIcon
                        boxSize="12px"
                        fill={isDark ? "gray.50" : "gray.800"}
                        position="absolute"
                        right="0"
                        top="6px"
                        zIndex={1}
                      />
                    </Box>
                  </Flex>
                </Link>
              );
            })
          ) : flashcardSets && !flashcardSets.length ? (
            <NoSets />
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AllSets;

const NoSets = () => {
  return (
    <Flex w="100%" direction="column" justify="center" align="center" pt="1rem">
      <Text textAlign="center" fontWeight="600">
        No Sets Created
      </Text>

      <Link to="/create">
        <Button
          mt="1rem"
          rounded="full"
          leftIcon={<AddIcon fill="white" boxSize="16px" />}
          _hover={{ bg: "primary.600" }}
          _active={{ bg: "primary.700" }}
          bg="primary.base"
          color="white"
        >
          Create a Set
        </Button>
      </Link>
    </Flex>
  );
};

const NotLoggedIn = () => {
  return (
    <Flex w="100%" direction="column" justify="center" align="center" pt="1rem">
      <Text lineHeight={1.2} fontWeight="500" textAlign="center">
        Sign up or log in to create custom flashcard sets
      </Text>
    </Flex>
  );
};
