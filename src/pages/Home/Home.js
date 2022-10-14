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
    <div>
      <Hero />
      <AllSets />

      <StudyHistory />

      {/* {isSignedIn && <Text textAlign="center">Signed In!</Text>} */}
    </div>
  );
};

export default Home;
