import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { UserProvider } from "store/UserContext";
import Home from "pages/Home";
import Create from "pages/Create";
import Navbar from "components/Navbar";

function App() {
  return (
    <UserProvider>
      <Box minH="100vh">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/:id" element={<Create />} />
        </Routes>
      </Box>
    </UserProvider>
  );
}

export default App;
