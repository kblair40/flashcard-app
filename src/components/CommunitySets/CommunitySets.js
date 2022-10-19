import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Heading, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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

          {loading ? (
            <Flex h="200px" w="100%" justify="center" align="center">
              <Spinner />
            </Flex>
          ) : communitySets && communitySets.length ? (
            communitySets.map((set, idx) => {
              return <div />;
            })
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunitySets;
