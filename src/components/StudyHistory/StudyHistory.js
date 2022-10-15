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
    <Flex justify="center" mt="2rem" w="100%">
      <Flex w="100%" direction="column" align="center">
        <Heading mb=".75rem" w="100%" fontSize={{ base: "xl", sm: "2xl" }}>
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
    <Flex direction="column" w="100%" py="8px" borderRadius="4px">
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
