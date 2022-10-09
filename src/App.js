import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { UserProvider } from "store/UserContext";
import { SetProvider } from "store/SetContext";
import Home from "pages/Home";
import Create from "pages/Create";
import Navbar from "components/Navbar";

function App() {
  return (
    <UserProvider>
      <Box minH="100vh">
        <Navbar />

        <Box position="relative">
          <Routes>
            <Route path="/" element={<Home />} />

            <SetProvider>
              <Route path="/create" element={<Create />} />
              <Route path="/create/:id" element={<Create />} />
            </SetProvider>
          </Routes>
        </Box>
      </Box>
    </UserProvider>
  );
}

export default App;
