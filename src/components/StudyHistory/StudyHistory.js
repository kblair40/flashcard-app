import React, { useEffect, useState } from "react";
import {
  IconButton,
  Flex,
  Text,
  Heading,
  useColorMode,
} from "@chakra-ui/react";

import api from "api";
import { TrashIcon } from "utils/icons";
import { getCleanDuration } from "utils/helpers";
import ConfirmDeleteModal from "components/Modals/ConfirmDeleteModal";

const StudyHistory = () => {
  const [history, setHistory] = useState();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

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

  const deleteItem = async () => {
    try {
      const response = await api.delete(`/study_history/${itemToDelete}`);
      console.log("RESPONSE:", response);
    } catch (e) {
      console.error("FAILED TO DELETE:", e);
    }
    setItemToDelete(undefined);
  };

  return (
    <Flex justify="center" mt="2rem" w="100%">
      <Flex w="100%" direction="column" align="center">
        <Heading mb=".75rem" w="100%" fontSize={{ base: "xl", sm: "2xl" }}>
          History
        </Heading>

        {history &&
          history.map((histItem, idx) => {
            return (
              <HistoryItem
                onClick={() => setItemToDelete(histItem._id)}
                item={histItem}
                key={idx}
              />
            );
          })}
      </Flex>

      <ConfirmDeleteModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={deleteItem}
      />
    </Flex>
  );
};

export default StudyHistory;

const HistoryItem = ({ item }) => {
  const duration = getCleanDuration(item.duration);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex
      justify="space-between"
      align="center"
      py="8px"
      borderRadius="4px"
      w="100%"
    >
      <Flex direction="column" w="100%">
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

      <IconButton
        size="sm"
        bg={isDark ? "gray.800" : "#fff"}
        variant="ghost"
        rounded="full"
        aria-label="Delete Button"
        icon={<TrashIcon boxSize="18px" />}
      />
    </Flex>
  );
};
