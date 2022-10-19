import React, { useEffect, useState } from "react";
import {
  Spinner,
  Center,
  Flex,
  Button,
  Grid,
  GridItem,
  Checkbox,
  useColorMode,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import FavoriteSets from "components/FavoriteSets";
import StudyHistory from "components/StudyHistory";
import { AddIcon, EditIcon } from "utils/icons";
import api from "api";

const ManageSets = () => {
  const [loading, setLoading] = useState(true);
  const [flashcardSets, setFlashcardSets] = useState();
  const [changingPublicStatus, setChangingPublicStatus] = useState();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

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

    fetchFlashcardData();
  }, []);

  const handleChangePublicStatus = async (e, id) => {
    setChangingPublicStatus(id);
    const { checked } = e.target;

    try {
      const response = await api.patch(`/flashcard_set/patch/${id}`, {
        public: checked,
      });

      if (response.data && response.data.set) {
        const { _id } = response.data.set;
        const setIdx = flashcardSets.findIndex((card) => card._id === _id);
        const setsCopy = [...flashcardSets];

        if (setIdx > -1) {
          setsCopy[setIdx] = response.data.set;
        }

        setFlashcardSets(setsCopy);
      }
    } catch (e) {
      console.error("FAILED PATCHING PUBLIC STATUS:", e);
    }

    setChangingPublicStatus(undefined);
  };

  if (loading) {
    return (
      <Center h="400px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex justify="center" w="100%" px={{ base: "16px" }}>
      <Flex
        direction={{ base: "column" }}
        align={{ base: "center" }}
        w="100%"
        maxW={{ base: "98%", sm: "420px", md: "720px" }}
        mt="2rem"
      >
        <Box w={{ base: "100%", md: "max-content" }}>
          <CreatedSets
            changingPublicStatus={changingPublicStatus}
            flashcardSets={flashcardSets}
            handleChangePublicStatus={handleChangePublicStatus}
            isDark={isDark}
          />
        </Box>

        <Flex
          w={{ base: "100%" }}
          mt={{ base: "2.5rem" }}
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "start" }}
        >
          <Box w={{ base: "100%", md: "50%" }}>
            <Box w={{ md: "max-content" }}>
              <FavoriteSets />
            </Box>
          </Box>

          <Box
            w={{ base: "100%", md: "50%" }}
            ml={{ base: "0" }}
            mt={{ base: "1.5rem", md: "0" }}
          >
            <Box w={{ md: "max-content" }}>
              <StudyHistory />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ManageSets;

const CreatedSets = ({
  changingPublicStatus,
  flashcardSets,
  handleChangePublicStatus,
  isDark,
}) => {
  return (
    <React.Fragment>
      <Heading fontSize={{ base: "xl", sm: "2xl" }} mb="1.5rem">
        Your Created Sets
      </Heading>

      <Grid
        templateRows="auto"
        templateColumns={{
          base: "repeat(4, max-content)",
          md: "repeat(5, max-content)",
        }}
        columnGap={{ base: "4", sm: "8" }}
        rowGap="3"
        alignItems="center"
      >
        {["Title", "# of Cards", "Last Updated", "Public", ""].map(
          (header, i) => {
            return (
              <GridItem
                key={i}
                display={i === 2 ? { base: "none", md: "block" } : "block"}
              >
                <Text fontWeight="600" fontSize={{ base: "sm" }}>
                  {header}
                </Text>
              </GridItem>
            );
          }
        )}

        {flashcardSets && flashcardSets.length
          ? flashcardSets.map((set, i) => {
              const {
                updatedAt,
                title,
                flashcards,
                _id,
                public: isPublic,
              } = set;

              const lastUpdated = new Date(updatedAt).toLocaleDateString();

              let vals = [
                <GridItem w="100%" maxW={{ base: "100px", sm: "140px" }}>
                  <Text noOfLines={1} fontWeight="500" w="100%">
                    {title}
                  </Text>
                </GridItem>,

                <GridItem display="flex" justifyContent="center">
                  <Text fontWeight="500">{flashcards.length}</Text>
                </GridItem>,

                <GridItem
                  justifyContent="center"
                  display={{ base: "none", md: "flex" }}
                >
                  <Text fontWeight="500">{lastUpdated}</Text>
                </GridItem>,

                <GridItem display="flex" justifyContent="center">
                  {changingPublicStatus === _id ? (
                    <Center>
                      <Spinner />
                    </Center>
                  ) : (
                    <Checkbox
                      isDisabled={changingPublicStatus === _id}
                      isChecked={isPublic}
                      onChange={(e) => handleChangePublicStatus(e, _id)}
                    />
                  )}
                </GridItem>,

                <GridItem>
                  <Link to={`/create/${_id}`}>
                    <Button
                      variant="ghost"
                      leftIcon={<EditIcon boxSize="14px" fill="gray.700" />}
                      size="sm"
                      w="100%"
                    >
                      Edit
                    </Button>
                  </Link>
                </GridItem>,
              ];

              return <React.Fragment key={i}>{vals}</React.Fragment>;
            })
          : null}

        {flashcardSets && !flashcardSets.length ? (
          <NoSets isDark={isDark} />
        ) : null}
      </Grid>
    </React.Fragment>
  );
};

const NoSets = ({ isDark }) => {
  return (
    <Flex direction="column" h="200px" w="100%" justify="center" align="center">
      <Text
        textAlign="center"
        fontWeight="700"
        color={isDark ? "gray.50" : "gray.700"}
      >
        NO SETS FOUND
      </Text>

      <Link to="/create">
        <Button
          mt="2rem"
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
