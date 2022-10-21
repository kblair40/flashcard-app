import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";

import UserContext, { UserProvider } from "store/UserContext";
import { StudySessionProvider } from "store/StudySessionContext";
import Home from "pages/Home";
import Create from "pages/Create";
import Account from "pages/Account";
import Study from "pages/Study";
import StudySession from "pages/StudySession";
import ManageSets from "pages/ManageSets";
import Navbar from "components/Navbar";

function App() {
  return (
    <UserProvider>
      <StudySessionProvider>
        <Box minH="100vh">
          <Navbar />

          <Box position="relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/create/:id" element={<Create />} />

              <Route path="/study" element={<Study />} />

              <Route path="/study/:id" element={<StudySession />} />

              <Route path="/manage-sets" element={<ManageSets />} />

              <Route path="/account" element={<Account />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </StudySessionProvider>
    </UserProvider>
  );
}

export default App;

const NotFound = () => {
  return (
    <Flex h="400px" justify="center" align="center">
      <Text fontWeight="600" fontSize="xl">
        (404) Page Not Found
      </Text>
    </Flex>
  );
};
