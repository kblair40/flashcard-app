import React, { useEffect, useState } from "react";
import {
  IconButton,
  Button,
  Flex,
  Text,
  Heading,
  useColorMode,
  Box,
  Tooltip,
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
  const [moreThan20, setMoreThan20] = useState(false);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/history");
        if (response.data && response.data.history) {
          const { history, moreThan20 } = response.data;
          if (typeof moreThan20 === "boolean") {
            setMoreThan20(moreThan20);
          }

          console.log("\nMORE THAN 20:", moreThan20, "N");
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
    setSortBy(sortBy);
    let histCopy = [...history];

    histCopy = histCopy.sort((a, b) => {
      a = a.start_time;
      b = b.start_time;
      return sortBy === "newest" ? b - a : a - b;
    });

    setHistory(histCopy);
  };

  const deleteItem = async () => {
    try {
      const response = await api.delete(`/history/${itemToDelete}`);

      if (response.data && response.data.history) {
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
    <Flex
      h="100%"
      bg={isDark ? "gray.800" : "gray.50"}
      borderRadius={{ base: "8px", md: "8px 0 0 8px" }}
      justify="center"
      w={{ base: "100%" }}
    >
      <Flex w="100%" direction="column" align="center">
        <Flex
          w="100%"
          justify="space-between"
          p={{ base: "1.5rem 1rem .5rem" }}
          align="center"
        >
          <Heading pb=".75rem" w="100%" fontSize={{ base: "xl", sm: "2xl" }}>
            History
          </Heading>

          <HistoryFilters sortBy={sortBy} onChange={handleChangeSortBy} />
        </Flex>

        <Box
          px={{ base: "1rem" }}
          overflowY="auto"
          w="100%"
          maxH={{ base: "50vh", md: "unset" }}
        >
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

          {moreThan20 ? (
            <Tooltip
              label="Only the last 20 sessions from your history are shown here.  A page where your full history can be seen is in progress."
              placement="top"
            >
              <Box>
                <Button my="8px" size="sm" w="100%" isDisabled={true}>
                  See All
                </Button>
              </Box>
            </Tooltip>
          ) : null}
        </Box>
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
      w={{ base: "100%" }}
      pr={{ base: "1rem", sm: 0 }}
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

        <Text
          fontSize="sm"
          fontStyle="italic"
          color={!isDark ? "dm-secondary" : "lm-secondary"}
          lineHeight={1}
        >
          {duration}
        </Text>
      </Flex>

      <IconButton
        ml="2rem"
        onClick={onClick}
        size={{ base: "xs", md: "xs" }}
        bg={isDark ? "gray.800" : "#fff"}
        variant="icon-button-red"
        rounded="full"
        aria-label="Delete Button"
        icon={<TrashIcon boxSize="14px" />}
      />
    </Flex>
  );
};
