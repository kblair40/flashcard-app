import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Heading,
  Spinner,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { TrashIcon } from "utils/icons";
import api from "api";

const headingStyles = {
  textTransform: "capitalize",
  fontWeight: "700",
  fontSize: { base: "xl", sm: "2xl" },
};

const CommunitySets = () => {
  const [loading, setLoading] = useState(true);
  const [communitySets, setCommunitySets] = useState();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/community_sets");

        if (response.data) {
          console.log("COMMUNITY RESPONSE:", response.data);
          setCommunitySets(response.data);
        }
      } catch (e) {
        console.error("FAILED FETCHING HISTORY:", e);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  return (
    <Flex justify="center" pt="32px" w="100%">
      <Flex
        direction="column"
        w="100%"
        justify="space-between"
        position="relative"
      >
        <Flex
          w="100%"
          justify="space-between"
          mb=".75rem"
          pr="8px"
          align="center"
        >
          <Heading {...headingStyles} noOfLines={2}>
            Latest Sets from the Community
          </Heading>
        </Flex>

        {loading ? (
          <Flex h="200px" w="100%" justify="center" align="center">
            <Spinner />
          </Flex>
        ) : communitySets && communitySets.length ? (
          communitySets.reverse().map((set, idx) => {
            return (
              <CommunitySet
                key={idx}
                set={set}
                onClick={() => console.log("clicked")}
              />
            );
          })
        ) : null}
      </Flex>
    </Flex>
  );
};

export default CommunitySets;

const CommunitySet = ({ set, onClick }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  if (!set) {
    return null;
  }

  return (
    <Flex
      justify="space-between"
      align="center"
      py="8px"
      borderRadius="4px"
      w="100%"
    >
      <Flex direction="column" w="100%">
        <Text mr="6px" mb="6px" fontSize="lg" fontWeight="600" lineHeight={1}>
          {set.title}
        </Text>

        <Text lineHeight={1} fontSize="sm">
          Created {new Date(set.createdAt).toLocaleDateString()}
        </Text>
      </Flex>

      <IconButton
        onClick={onClick}
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
