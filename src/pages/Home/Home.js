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
          maxW={{ base: "340px", sm: "440px", md: "none" }}
          height={{ md: "calc(100vh - 60px)" }}
          justify={{ lg: "space-between" }}
        >
          <Box
            flex={1}
            maxW={{ lg: "628px" }}
            w={{ base: "100%", md: "100%" }}
            ml={{ md: "1.5rem" }}
            mx={{ lg: "auto" }}
          >
            <AllSets />
          </Box>

          <Box
            w={{ base: "100%", md: "250px", lg: "300px" }}
            ml={{ md: "2.5rem" }}
          >
            <CommunitySets />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
