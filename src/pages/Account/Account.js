import React, { useContext } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import UserContext from "store/UserContext";

const Account = () => {
  const { userData } = useContext(UserContext);
  const numOfSets = userData?.flashcard_sets?.length || 0;

  return (
    <Flex justify="center">
      <Flex
        direction="column"
        w="100%"
        pt="2rem"
        maxW={{ base: "300px", sm: "400px" }}
      >
        <Link to="sets">
          <Button w="100%">
            <Flex align="center" justify="center">
              <Text>Manage Sets</Text>
              <Text ml="6px" fontSize="sm" color="gray.500">
                ({numOfSets})
              </Text>
            </Flex>
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Account;
