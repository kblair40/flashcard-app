import React, { useEffect, useState } from "react";
import {
  Spinner,
  Center,
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import { SettingsIcon, StudyIcon, ChevronIcon } from "utils/icons";
import api from "api";

const AllSets = () => {
  const [loading, setLoading] = useState(true);
  const [flashcardSets, setFlashcardSets] = useState();

  const navigate = useNavigate();

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

    fetchFlashcardData();
  }, []);

  if (loading) {
    return (
      <Center h="400px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width={{ base: "220px" }}
      borderRightWidth="1px"
      borderBottomWidth="1px"
      borderColor="#eee"
      py="12px"
    >
      <Link to="/manage-sets">
        <IconButton
          variant="ghost"
          size="sm"
          icon={
            <SettingsIcon
              boxSize="18px"
              fill={isDark ? "gray.50" : "gray.700"}
            />
          }
          position="absolute"
          right="8px"
          top="1rem"
        />
      </Link>

      <Flex h="100%" w="100%" direction="column">
        <Heading p="0 8px 0 12px" size="lg" mb=".75rem">
          Sets
        </Heading>

        {flashcardSets && flashcardSets.length
          ? flashcardSets.map((set, i) => {
              return (
                <Link key={i} to={`/study/${set._id}`}>
                  <Flex
                    position="relative"
                    direction="column"
                    cursor="pointer"
                    w="100%"
                    p="6px 8px 10px 12px"
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
                      mt="2px"
                      lineHeight={1}
                      fontSize="xs"
                      fontWeight="500"
                      textStyle={isDark ? "dm-secondary" : "lm-secondary"}
                    >
                      Last Studied: 10/7
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
          : null}
      </Flex>
    </Box>
  );

  // return (
  //   <Flex justify="center">
  //     <Flex
  //       direction="column"
  //       align="center"
  //       w="100%"
  //       maxW={{ base: "98%", sm: "90%", md: "720px" }}
  //       mt="2rem"
  //     >
  //       <TableContainer>
  //         <Table size="sm">
  //           <Thead>
  //             <Tr>
  //               <Th>Title</Th>
  //               <Th># of Cards</Th>
  //               <Th>Last Updated</Th>
  //               <Th>Public</Th>
  //               <Th></Th>
  //             </Tr>
  //           </Thead>

  //           <Tbody>
  //             {flashcardSets && flashcardSets.length
  //               ? flashcardSets.map((set, i) => {
  //                   const {
  //                     updatedAt,
  //                     title,
  //                     flashcards,
  //                     _id,
  //                     public: isPublic,
  //                   } = set;
  //                   // console.log("SET:", set);
  //                   const lastUpdated = new Date(updatedAt);

  //                   return (
  //                     <Tr key={i}>
  //                       <Td>{title}</Td>
  //                       <Td>{flashcards.length}</Td>
  //                       <Td>{lastUpdated.toLocaleString()}</Td>
  //                       <Td>
  //                         <Flex justify="center">
  //                           {changingPublicStatus ? (
  //                             <Spinner />
  //                           ) : (
  //                             <Checkbox
  //                               isDisabled={changingPublicStatus}
  //                               isChecked={isPublic}
  //                               onChange={(e) =>
  //                                 handleChangePublicStatus(e, _id)
  //                               }
  //                             />
  //                           )}
  //                         </Flex>
  //                       </Td>

  //                       <Td>
  //                         <Link to={`/create/${_id}`}>
  //                           <Button w="100%">Edit</Button>
  //                         </Link>
  //                       </Td>
  //                     </Tr>
  //                   );
  //                 })
  //               : null}
  //           </Tbody>
  //         </Table>
  //       </TableContainer>
  //     </Flex>
  //   </Flex>
  // );
};

export default AllSets;
