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
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  MenuDivider,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import useDetectLogout from "hooks/useDetectLogout";
import FavoriteSets from "components/FavoriteSets";
import StudyHistory from "components/StudyHistory";
import {
  AddIcon,
  EditIcon,
  TrashIcon,
  StudyIcon,
  MoreHorizontalIcon,
} from "utils/icons";
import api from "api";

const ManageSets = () => {
  const [loading, setLoading] = useState(true);
  const [flashcardSets, setFlashcardSets] = useState();
  const [changingPublicStatus, setChangingPublicStatus] = useState();

  useDetectLogout();

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
    <Flex
      pt="60px"
      justify="center"
      w="100%"
      // maxW={{ base: "98%", sm: "100vw", md: "100vw" }}
      maxW={{ base: "100vw" }}
      pr={{ base: "16px", md: 0 }}
      pl="16px"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify={{ md: "space-between" }}
        align={{ base: "center", md: "start" }}
        w="100%"
        mt="2rem"
      >
        <Box pr={{ md: "1rem" }} w={{ base: "100%" }} mx={{ md: "auto" }}>
          <CreatedSets
            changingPublicStatus={changingPublicStatus}
            flashcardSets={flashcardSets}
            handleChangePublicStatus={handleChangePublicStatus}
            isDark={isDark}
          />
        </Box>

        <Flex
          w={{ base: "100%", md: "340px" }}
          mt={{ base: "2.5rem", md: 0 }}
          direction={{ base: "column" }}
          align={{ base: "center", md: "start" }}
          h={{ md: "calc(100vh - 106px)" }}
          pb={{ base: "1rem", md: 0 }}
        >
          <Box
            h={{ md: "50%" }}
            w={{ base: "100%", md: "340px" }}
            mb={{ md: "1.5rem" }}
          >
            <Box h={{ md: "100%" }} w={{ base: "100%", md: "100%" }}>
              <FavoriteSets />
            </Box>
          </Box>

          <Box
            h={{ md: "50%" }}
            w={{ base: "100%", md: "340px" }}
            ml={{ base: "0" }}
            mt={{ base: "1.5rem", md: "0" }}
          >
            <Box h={{ md: "100%" }} w={{ base: "100%", md: "100%" }}>
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
    <Box bg={isDark ? "gray.800" : "gray.50"} rounded="lg" w="100%">
      <Box p={{ base: "1.5rem .5rem .5rem", sm: "1.5rem 1rem .5rem" }}>
        <Heading fontSize={{ base: "xl", sm: "2xl" }} pb="1rem">
          Your Created Sets
        </Heading>
      </Box>

      {flashcardSets && flashcardSets.length ? (
        <Grid
          p={{ base: "0 .5rem .5rem", sm: "0 1rem .5rem" }}
          maxH={{ base: "45vh", md: "calc(100vh - 186px)" }}
          overflowY="auto"
          templateRows="auto"
          w="100%"
          templateColumns={{
            base: "3fr 2.5fr 1fr 2fr",
            sm: "2fr 1.5fr 1fr 1fr",
            lg: "2fr 1fr 1.5fr 1fr 1fr",
          }}
          columnGap={{ base: "4", sm: "8" }}
          rowGap="3"
          alignItems="center"
        >
          {["Title", "# of Cards", "Last Updated", "Public", ""].map(
            (header, i) => {
              return (
                <GridItem
                  justifySelf={[1, 2, 3].includes(i) ? "center" : undefined}
                  // border=".1px solid #fff"
                  key={i}
                  display={i === 2 ? { base: "none", lg: "block" } : "block"}
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

                return (
                  <React.Fragment key={i}>
                    <GridItem w="100%" maxW={{ base: "100px", sm: "140px" }}>
                      <Text noOfLines={1} fontWeight="600" w="100%">
                        {title}
                      </Text>
                    </GridItem>

                    <GridItem display="flex" justifyContent="center">
                      <Text fontWeight="600">{flashcards.length}</Text>
                    </GridItem>

                    <GridItem
                      justifyContent="center"
                      display={{ base: "none", lg: "flex" }}
                    >
                      <Text fontWeight="600">{lastUpdated}</Text>
                    </GridItem>

                    <GridItem display="flex" justifyContent="center">
                      {changingPublicStatus === _id ? (
                        <Center>
                          <Spinner />
                        </Center>
                      ) : (
                        <Checkbox
                          colorScheme="gray"
                          isDisabled={changingPublicStatus === _id}
                          isChecked={isPublic}
                          onChange={(e) => handleChangePublicStatus(e, _id)}
                        />
                      )}
                    </GridItem>
                    {/* 5hr 53min */}
                    <GridItem>
                      <SetMenu setId={_id} />
                      {/* <Link to={`/create/${_id}`}>
                        <Button
                          bg="transparent"
                          transition="background-color 0.2s"
                          _hover={{ bg: isDark ? "gray.700" : "gray.100" }}
                          _active={{ bg: isDark ? "gray.600" : "gray.200" }}
                          leftIcon={<EditIcon boxSize="14px" />}
                          size="sm"
                          w="100%"
                        >
                          Edit
                        </Button>
                      </Link> */}
                    </GridItem>
                  </React.Fragment>
                );
              })
            : null}

          {flashcardSets && !flashcardSets.length ? (
            <NoSets isDark={isDark} />
          ) : null}
        </Grid>
      ) : (
        <NoSets isDark={isDark} />
      )}
    </Box>
  );
};

const SetMenu = ({ setId }) => {
  const [deleting, setDeleting] = useState(false);

  const menuBg = useColorModeValue("gray.50", "gray.800");

  const navigate = useNavigate();

  const handleClickDelete = async () => {
    setDeleting(true);
    try {
      const response = await api.delete(`/flashcard_set/${setId}`);
      console.log("RESPONSE.DATA:", response.data);
    } catch (e) {
      console.log("FAILED TO DELETE SET:", e);
    }
    setDeleting(false);
  };

  return (
    <Menu>
      <MenuButton
        size="sm"
        rounded="full"
        as={IconButton}
        icon={<MoreHorizontalIcon boxSize="18px" />}
        variant="ghost"
      />

      <MenuList bg={menuBg}>
        <MenuItem
          closeOnSelect={true}
          fontWeight="500"
          onClick={() => navigate(`/study/${setId}`)}
          icon={<StudyIcon boxSize="18px" />}
        >
          Studdy
        </MenuItem>

        <MenuItem
          border="1px solid green"
          closeOnSelect={true}
          fontWeight="500"
          icon={<EditIcon boxSize="18px" />}
          onClick={() => navigate(`/create/${setId}`)}
        >
          Edit
        </MenuItem>

        <MenuDivider />

        <MenuItem
          closeOnSelect={true}
          fontWeight="500"
          icon={<TrashIcon boxSize="18px" />}
        >
          Delete Set
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const NoSets = ({ isDark }) => {
  return (
    <Flex direction="column" w="100%" justify="center" align="center" pb="1rem">
      <Text
        textAlign="center"
        fontSize="lg"
        fontWeight="600"
        color={isDark ? "gray.50" : "gray.700"}
      >
        You haven't created a set yet
      </Text>

      <Link to="/create">
        <Button
          variant="solid-blue"
          mt="1.5rem"
          rounded="full"
          size="lg"
          leftIcon={<AddIcon fill="#fff" boxSize="16px" />}
        >
          Create a Set
        </Button>
      </Link>
    </Flex>
  );
};
