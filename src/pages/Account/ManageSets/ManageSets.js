import React, { useEffect, useState } from "react";
import {
  Spinner,
  Center,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import api from "api";

const ManageSets = () => {
  const [loading, setLoading] = useState(true);
  const [flashcardSets, setFlashcardSets] = useState();
  const [changingPublicStatus, setChangingPublicStatus] = useState(false);

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
    setChangingPublicStatus(true);
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

    setChangingPublicStatus(false);
  };

  if (loading) {
    return (
      <Center h="400px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex justify="center">
      <Flex
        direction="column"
        align="center"
        w="100%"
        maxW={{ base: "98%", sm: "90%", md: "720px" }}
        mt="2rem"
      >
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th># of Cards</Th>
                <Th>Last Updated</Th>
                <Th>Public</Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              {flashcardSets && flashcardSets.length
                ? flashcardSets.map((set, i) => {
                    const {
                      updatedAt,
                      title,
                      flashcards,
                      _id,
                      public: isPublic,
                    } = set;
                    // console.log("SET:", set);
                    const lastUpdated = new Date(updatedAt);

                    return (
                      <Tr key={i}>
                        <Td>{title}</Td>
                        <Td>{flashcards.length}</Td>
                        <Td>{lastUpdated.toLocaleString()}</Td>
                        <Td>
                          <Flex justify="center">
                            {changingPublicStatus ? (
                              <Spinner />
                            ) : (
                              <Checkbox
                                isDisabled={changingPublicStatus}
                                isChecked={isPublic}
                                onChange={(e) =>
                                  handleChangePublicStatus(e, _id)
                                }
                              />
                            )}
                          </Flex>
                        </Td>

                        <Td>
                          <Link to={`/create/${_id}`}>
                            <Button w="100%">Edit</Button>
                          </Link>
                        </Td>
                      </Tr>
                    );
                  })
                : null}
            </Tbody>
          </Table>
        </TableContainer>

        {/* {flashcardSets && flashcardSets.length
          ? flashcardSets.map((set, i) => {
              const { updatedAt, title, flashcards, public: isPublic } = set;
              console.log("SET:", set);
              return (
                <Link to="#" key={i} style={{ width: "100%" }}>
                  <Button w="100%">{set.title}</Button>
                </Link>
              );
            })
          : null} */}
      </Flex>
    </Flex>
  );
};

export default ManageSets;
