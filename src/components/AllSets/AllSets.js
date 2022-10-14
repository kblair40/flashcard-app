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

  const studyButtonBg = isDark ? "gray.800" : "#fff";

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

  const headingStyles = {
    textTransform: "capitalize",
    fontWeight: "700",
    pl: "16px",
    fontSize: { base: "xl", sm: "2xl" },
  };

  return (
    <Flex justify="center" pt="32px">
      <Flex
        direction="column"
        w="100%"
        justify="space-between"
        maxW={{ base: "100%", sm: "440px", md: "600px" }}
        position="relative"
      >
        <Flex
          w="100%"
          justify="space-between"
          mb="1rem"
          pr="8px"
          align="center"
        >
          <Heading {...headingStyles} noOfLines={2}>
            {userData ? `${makeDisplayName(userData)}'s` : ""} Flashcard Sets
          </Heading>

          <Link to="/manage-sets">
            <Tooltip label="Manage and Edit Sets">
              <IconButton
                rounded="full"
                variant="ghost"
                transition="all 0.3s"
                _hover={{
                  bg: "primary.300",
                  "& svg": { fill: "#fff" },
                }}
                _active={{ bg: "primary.400" }}
                icon={
                  <SettingsIcon
                    boxSize="22px"
                    fill={isDark ? "gray.50" : "gray.700"}
                    transition="all 0.3s"
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
                    p="8px 16px 10px 16px"
                    transition="background 0.2s"
                    _hover={{
                      bg: !isDark ? "gray.50" : "gray.700",
                      "& button": {
                        transform: "translateX(-16px)",
                        bg: !isDark ? "gray.50" : "gray.700",
                      },
                      "& .chev_icon": { opacity: 1, right: "4px" },
                    }}
                    _active={{
                      bg: !isDark ? "gray.100" : "gray.600",
                      "& button": {
                        bg: !isDark ? "gray.100" : "gray.600",
                      },
                    }}
                  >
                    <Flex justify="space-between" align="center">
                      <Box w="100%" mr="24px" h="100%">
                        <Text
                          fontSize="lg"
                          fontWeight="600"
                          lineHeight={1.3}
                          noOfLines={2}
                        >
                          {i !== 1
                            ? set.title
                            : " Very Long Set Title That issss won't fit on mobile"}
                        </Text>

                        <Text
                          // mt="4px"
                          lineHeight={1}
                          fontSize="sm"
                          fontWeight="500"
                          textStyle={isDark ? "dm-secondary" : "lm-secondary"}
                        >
                          Last studied on 10/7
                        </Text>
                      </Box>

                      <Flex align="center" w="80px" h="24px">
                        <Button
                          size="md"
                          variant="ghost"
                          fontWeight="700"
                          w="64px"
                          bg={studyButtonBg}
                          zIndex={2}
                          leftIcon={
                            <StudyIcon
                              fill={isDark ? "gray.50" : "gray.700"}
                              boxSize="18px"
                              mr="4px"
                            />
                          }
                        >
                          Study
                        </Button>

                        <ChevronIcon
                          className="chev_icon"
                          boxSize="12px"
                          fill={isDark ? "gray.50" : "gray.800"}
                          zIndex={1}
                          position="relative"
                          right="12px"
                          transition="all 0.2s"
                          opacity={0}
                        />
                      </Flex>
                    </Flex>
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
      <Text textAlign="center" fontWeight="700">
        NO SETS FOUND
      </Text>

      <Link to="/create">
        <Button
          mt="1rem"
          rounded="full"
          size="lg"
          leftIcon={<AddIcon fill="white" boxSize="16px" />}
          _hover={{ bg: "primary.500" }}
          _active={{ bg: "primary.500" }}
          bg="primary.400"
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
