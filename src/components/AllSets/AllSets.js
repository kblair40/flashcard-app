import React, { useEffect, useState } from "react";
import {
  Spinner,
  Center,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { SettingsIcon, EditIcon, MoreHorizontalIcon } from "utils/icons";
import api from "api";

const AllSets = () => {
  const [loading, setLoading] = useState(true);
  const [flashcardSets, setFlashcardSets] = useState();

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
      width={{ base: "200px" }}
      borderRightWidth="1px"
      borderBottomWidth="1px"
      borderColor="#eee"
      py="12px"
      // p="12px 8px 12px 12px"
    >
      <Link to="/manage-sets">
        <IconButton
          variant="ghost"
          size="sm"
          icon={<SettingsIcon boxSize="18px" />}
          position="absolute"
          right="8px"
          top="1rem"
        />
      </Link>

      <Flex h="100%" w="100%" direction="column">
        <Heading
          p="0 8px 0 12px"
          size="lg"
          mb=".75rem"
          textStyle="lm-secondary"
        >
          Sets
        </Heading>

        {flashcardSets && flashcardSets.length
          ? flashcardSets.map((set, i) => {
              return (
                <Flex
                  direction="column"
                  key={i}
                  cursor="pointer"
                  w="100%"
                  transition="background 0.2s"
                  _hover={{ bg: "gray.50" }}
                  _active={{ bg: "gray.100" }}
                  p="2px 8px 10px 12px"
                  // border="1px solid #ccc"
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    w="100%"
                    h="100%"
                  >
                    <Text fontWeight="600" lineHeight={1}>
                      {set.title}
                    </Text>

                    <Menu>
                      <MenuButton
                        as={IconButton}
                        rounded="full"
                        variant="ghost"
                        size="xs"
                        icon={<MoreHorizontalIcon boxSize="14px" />}
                      />
                      <MenuList py={0} w="80px">
                        <MenuItem py="8px" icon={<EditIcon boxSize="16px" />}>
                          <Link to={`/manage-sets/${set._id}`}>
                            <Text
                              lineHeight={1}
                              fontSize="sm"
                              ml="8px"
                              fontWeight="500"
                            >
                              Edit
                            </Text>
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>

                  <Text
                    lineHeight={1}
                    fontSize="xs"
                    textStyle={isDark ? "dm-secondary" : "lm-secondary"}
                  >
                    Last Studied: 10/7
                  </Text>
                </Flex>
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
