import React, { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
// import Editor from "components/Editor";
// import ManageSets from "pages/ManageSets";
import StudyHistory from "components/StudyHistory";
import AllSets from "components/AllSets";
import Hero from "components/Hero";
import UserContext from "store/UserContext";

const Home = () => {
  const { isSignedIn } = useContext(UserContext);
  return (
    <Flex justify="center">
      <Hero />

      <Box w="100%" maxW={{ base: "340px", sm: "440px", md: "640px" }}>
        <AllSets />

        <StudyHistory />
      </Box>

      {/* {isSignedIn && <Text textAlign="center">Signed In!</Text>} */}
    </Flex>
  );
};

export default Home;
