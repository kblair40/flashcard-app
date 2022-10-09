import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { UserProvider } from "store/UserContext";
import Home from "pages/Home";
import Create from "pages/Create";
import Account from "pages/Account";
import Navbar from "components/Navbar";

function App() {
  return (
    <UserProvider>
      <Box minH="100vh">
        <Navbar />

        <Box position="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/create/:id" element={<Create />} />

            <Route path="/account" element={<Account />} />
          </Routes>
        </Box>
      </Box>
    </UserProvider>
  );
}

export default App;
