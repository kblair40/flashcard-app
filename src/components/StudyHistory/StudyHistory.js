import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";

import api from "api";
import { getCleanDuration } from "utils/helpers";

const StudyHistory = () => {
  const [history, setHistory] = useState();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/history");
        console.log("RESPONSE:", response.data);
        if (response.data && response.data.history) {
          setHistory(response.data.history);
        }
      } catch (e) {
        console.error("FAILED FETCHING HISTORY:", e);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Flex justify="center" mt="2rem">
      <Flex
        w="100%"
        maxW={{ base: "340px", sm: "400px", md: "440px" }}
        direction="column"
        align="center"
      >
        <Heading w="100%" fontSize="2xl">
          History
        </Heading>

        {history &&
          history.map((histItem, idx) => {
            return <HistoryItem item={histItem} key={idx} />;
          })}
      </Flex>
    </Flex>
  );
};

export default StudyHistory;

const HistoryItem = ({ item }) => {
  const duration = getCleanDuration(item.duration);

  return (
    <Flex
      direction="column"
      w="100%"
      py="8px"
      borderRadius="4px"
      // border="1px solid #ddd"
    >
      <Flex w="100%" align="end" mb="6px">
        <Text mr="6px" fontSize="lg" fontWeight="600" lineHeight={1}>
          {item.flashcard_set.title}
        </Text>

        <Text lineHeight={1} fontSize="sm">
          {new Date(item.start_time).toLocaleDateString()}
        </Text>
      </Flex>

      <Text fontSize="sm" fontStyle="italic" color="gray.600" lineHeight={1}>
        {duration}
      </Text>
    </Flex>
  );
};
