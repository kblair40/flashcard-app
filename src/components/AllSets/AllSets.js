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
  const [latestSessions, setLatestSessions] = useState();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const studyButtonBg = isDark ? "gray.800" : "gray.50";

  const figureLatestSessions = (sets, sessions) => {
    let latestSessions = {};
    console.log("SETS/SESSIONS:", { sets, sessions });
    sessions.sort((a, b) => a.start_time - b.start_time);

    for (let session of sessions) {
      if (!latestSessions[session.flashcard_set]) {
        latestSessions[session.flashcard_set] = session.start_time;
      }
    }

    setLatestSessions(latestSessions);
  };

  useEffect(() => {}, [userData]);

  useEffect(() => {
    const fetchFlashcardData = async () => {
      try {
        const response = await api.get("/user", {
          params: { flashcard_sets: true },
        });

        if (response.data && response.data.user) {
          setLoading(false);
          // console.log("response.data.user:", response.data.user);
          setFlashcardSets(response.data.user.flashcard_sets || []);

          figureLatestSessions(
            response.data.user.flashcard_sets,
            response.data.user.study_sessions
          );

          return;
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
    fontSize: { base: "xl", sm: "2xl" },
  };

  const mainBg = isDark ? "gray.800" : "gray.50";

  return (
    <Flex justify="center" pt="32px" w="100%">
      <Flex
        rounded="lg"
        bg={mainBg}
        direction="column"
        w="100%"
        justify="space-between"
        position="relative"
        pb={{ base: "8px", md: 0 }}
        // pb="8px"
      >
        <Flex
          w="100%"
          justify="space-between"
          p="1rem 1rem .75rem"
          align="center"
        >
          <Heading {...headingStyles} noOfLines={1}>
            {userData ? `${makeDisplayName(userData)}'s` : ""} Flashcard Sets
          </Heading>

          <Link to="/manage-sets">
            <Tooltip label="Manage and Edit Sets">
              <IconButton
                variant="icon-buttons"
                rounded="full"
                _hover={{
                  bg: isDark ? "gray.700" : "gray.100",
                  "& svg": isDark ? { fill: "#fff" } : undefined,
                }}
                _active={{
                  bg: isDark ? "gray.600" : "gray.200",
                }}
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

        <Flex
          h="100%"
          w="100%"
          direction="column"
          maxH={{ base: "50vh", md: "calc(100vh - 176px)" }}
          overflowY={{ base: "auto" }}
          pb={{ md: "1rem" }}
        >
          {loading ? (
            <Loading h="200px" />
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
                    py="8px"
                    px="1rem"
                    transition="background 0.2s"
                    _hover={{
                      bg: !isDark ? "gray.100" : "gray.700",
                      "& button": {
                        transform: "translateX(-16px)",
                        bg: !isDark ? "gray.100" : "gray.700",
                      },
                      "& .chev_icon": { opacity: 1, right: "4px" },
                    }}
                    _active={{
                      bg: !isDark ? "gray.200" : "gray.700",
                      "& button": {
                        bg: !isDark ? "gray.200" : "gray.700",
                      },
                    }}
                  >
                    <Flex justify="space-between" align="center">
                      <Box w="100%" mr="24px" h="100%">
                        <Text
                          fontSize="lg"
                          fontWeight="600"
                          lineHeight={1.3}
                          noOfLines={1}
                        >
                          {set.title}
                        </Text>

                        <Box
                          lineHeight={1}
                          mt="3px"
                          fontSize="xs"
                          textStyle={isDark ? "dm-tertiary" : "lm-secondary"}
                        >
                          {latestSessions[set._id]
                            ? `Last Studied: ${new Date(
                                latestSessions[set._id]
                              ).toLocaleDateString()}`
                            : "Not yet studied"}
                        </Box>
                      </Box>

                      <Flex align="center" w="80px" h="24px">
                        <Button
                          size="md"
                          variant="ghost"
                          fontWeight="700"
                          w="64px"
                          bg={studyButtonBg}
                          zIndex={2}
                          leftIcon={<StudyIcon boxSize="18px" mr="4px" />}
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
            <NoSets isDark={isDark} />
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AllSets;

const NoSets = ({ isDark }) => {
  return (
    <Flex
      pb="1rem"
      w="100%"
      direction="column"
      justify="center"
      align="center"
      pt="1rem"
    >
      <Text textAlign="center" fontWeight="600" fontSize="lg">
        You haven't created a set yet
      </Text>

      <Link to="/create">
        <Button
          mt="1rem"
          rounded="full"
          size="lg"
          leftIcon={<AddIcon fill="#fff" boxSize="16px" />}
          fontWeight="700"
          variant={isDark ? "solid-blue" : "solid-blue"}
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
