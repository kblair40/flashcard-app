import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { UserProvider } from "store/UserContext";
import { StudySessionProvider } from "store/StudySessionContext";
import Navbar from "components/Navbar";
import PageLoading from "components/PageLoading";

import Home from "pages/Home";
// import Create from "pages/Create";
// import Account from "pages/Account";
// import Study from "pages/Study";
// import StudySession from "pages/StudySession";
// import Settings from "pages/Settings";
// import ManageSets from "pages/ManageSets";

const Create = lazy(() => import("./pages/Create"));
const Account = lazy(() => import("./pages/Account"));
const Study = React.lazy(() => import("./pages/Study"));
const StudySession = React.lazy(() => import("./pages/StudySession"));
const Settings = React.lazy(() => import("./pages/Settings"));
const ManageSets = React.lazy(() => import("./pages/ManageSets"));

function App() {
  const mainBg = useColorModeValue("#fff", "gray.900");
  return (
    <UserProvider>
      <StudySessionProvider>
        <Box minH="100vh" bg={mainBg}>
          <Navbar />

          <Box position="relative">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/create"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Create />
                  </Suspense>
                }
              />

              <Route
                path="/create/:id"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Create />
                  </Suspense>
                }
              />

              <Route
                path="/study"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Study />
                  </Suspense>
                }
              />

              <Route
                path="/study/:id"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <StudySession />
                  </Suspense>
                }
              />

              <Route
                path="/manage-sets"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <ManageSets />
                  </Suspense>
                }
              />

              <Route
                path="/account"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Account />
                  </Suspense>
                }
              />

              <Route
                path="/settings"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Settings />
                  </Suspense>
                }
              />

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
