import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import api from "api";

const StudyHistory = () => {
  const [history, setHistory] = useState();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/history");
        console.log("RESPONSE:", response.data);
      } catch (e) {
        console.error("FAILED FETCHING HISTORY:", e);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Flex justify="center">
      <Flex
        w="100%"
        maxW={{ base: "340px" }}
        direction="column"
        align="center"
      ></Flex>
    </Flex>
  );
};

export default StudyHistory;
