import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center">
      <Flex
        direction="column"
        w="100%"
        pt="2rem"
        maxW={{ base: "300px", sm: "400px" }}
      >
        <Button onClick={() => navigate(`/accounts/sets`)}>Manage Sets</Button>
      </Flex>
    </Flex>
  );
};

export default Account;
