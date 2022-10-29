import React, { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";

import { UserProvider } from "store/UserContext";
import { StudySessionProvider } from "store/StudySessionContext";
import Navbar from "components/Navbar";
import PageLoading from "components/Loading/PageLoading";

const Create = lazy(() => import("./pages/Create"));
const Account = lazy(() => import("./pages/Account"));
const Study = React.lazy(() => import("./pages/Study"));
const StudySession = React.lazy(() => import("./pages/StudySession"));
const Settings = React.lazy(() => import("./pages/Settings"));
const ManageSets = React.lazy(() => import("./pages/ManageSets"));
const Home = React.lazy(() => import("./pages/Home"));

function App() {
  const mainBg = useColorModeValue("#fff", "gray.900");
  return (
    <UserProvider>
      <StudySessionProvider>
        <Box minH="100vh" bg={mainBg}>
          <Navbar />

          <Box position="relative">
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Home />
                  </Suspense>
                }
              />

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
  const uniqueTextColor = useColorModeValue("blue.500", "blue.300");
  return (
    <Flex
      direction="column"
      h="calc(100vh - 60px)"
      justify="center"
      align="center"
    >
      <Flex fontWeight="600" fontSize="xl" mb="1rem">
        <Text>Page Not Found</Text>

        <Box ml="6px">(4</Box>
        <Box color={uniqueTextColor}>0</Box>
        <Box>4)</Box>
      </Flex>

      <Link to="/">
        <Button variant="solid-blue">Go Home</Button>
      </Link>
    </Flex>
  );
};
