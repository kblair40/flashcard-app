import React, { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";

import AllSets from "components/AllSets";
import CommunitySets from "components/CommunitySets";
import Hero from "components/Hero";
import UserContext from "store/UserContext";

const Home = () => {
  const { isSignedIn } = useContext(UserContext);

  return (
    <Flex justify="center" w="100%">
      <Hero />

      {isSignedIn && (
        <Flex
          direction={{ base: "column", md: "row" }}
          w="100%"
          maxW={{ base: "340px", sm: "440px", md: "960px" }}
          height={{ md: "calc(100vh - 60px)" }}
        >
          <Box w={{ base: "100%", md: "65%" }} ml={{ md: "1rem" }}>
            <AllSets />
          </Box>

          <Box w={{ base: "100%", md: "35%" }} ml={{ md: "2.5rem" }}>
            <CommunitySets />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
