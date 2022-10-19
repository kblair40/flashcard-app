import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Heading, Center, Spinner } from "@chakra-ui/react";

import api from "api";

const FavoriteSets = () => {
  const [loading, setLoading] = useState(true);
  const [favSets, setFavSets] = useState([]);

  useEffect(() => {
    const fetchFavSets = async () => {
      try {
        const response = await api.get("/favorite_sets");
        console.log("FAV SETS RESPONSE.DATA:", response.data);
      } catch (e) {
        console.error("FAILED FETCHING SETS:", e);
      }
    };

    fetchFavSets();
  }, []);

  if (loading) {
    return (
      <Center h="200px">
        <Spinner />
      </Center>
    );
  }

  return <div>FavoriteSets</div>;
};

export default FavoriteSets;
