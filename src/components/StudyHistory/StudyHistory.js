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
import HistoryFilters from "./HistoryFilters";

const StudyHistory = () => {
  const [history, setHistory] = useState();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [deleting, setDeleting] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/history");
        if (response.data && response.data.history) {
          const { history } = response.data;
          const sortedHistory = history.sort((a, b) => {
            return b.start_time - a.start_time;
          });
          setHistory(sortedHistory);
        }
      } catch (e) {
        console.error("FAILED FETCHING HISTORY:", e);
      }
    };

    fetchHistory();
  }, []);

  // new set 10/15/2022 is the most recent
  const handleChangeSortBy = (sortBy) => {
    console.log("NEW SORTBY:", sortBy);
    setSortBy(sortBy);
    let histCopy = [...history];
    console.log("\nHISTORY BEFORE:", histCopy);
    histCopy = histCopy.sort((a, b) => {
      a = a.start_time;
      b = b.start_time;
      return sortBy === "newest" ? b - a : a - b;
    });

    console.log("SORTED:", histCopy);
    setHistory(histCopy);
  };

  const deleteItem = async () => {
    try {
      const response = await api.delete(`/history/${itemToDelete}`);
      console.log("RESPONSE:", response.data);

      if (response.data && response.data.history) {
        console.log("SETTING HISTORY:", response.data.history);
        setHistory(response.data.history);
      }
    } catch (e) {
      console.error("FAILED TO DELETE:", e);
    }
    setItemToDelete(undefined);
    setDeleting(false);
    setConfirmModalOpen(false);
  };

  return (
    <Flex justify="center" w="max-content">
      <Flex w="100%" direction="column" align="center">
        <Flex w="100%" justify="space-between" pr="8px" align="center">
          <Heading mb=".75rem" w="100%" fontSize={{ base: "xl", sm: "2xl" }}>
            History
          </Heading>

          <HistoryFilters sortBy={sortBy} onChange={handleChangeSortBy} />
        </Flex>

        {history &&
          history.map((histItem, idx) => {
            return (
              <HistoryItem
                onClick={() => {
                  setItemToDelete(histItem._id);
                  setConfirmModalOpen(true);
                }}
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
        confirming={deleting}
      />
    </Flex>
  );
};

export default StudyHistory;

const HistoryItem = ({ item, onClick }) => {
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
        ml="2rem"
        onClick={onClick}
        size="sm"
        bg={isDark ? "gray.800" : "#fff"}
        variant="ghost"
        rounded="full"
        aria-label="Delete Button"
        icon={<TrashIcon boxSize="16px" />}
      />
    </Flex>
  );
};
