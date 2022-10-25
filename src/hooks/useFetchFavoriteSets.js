import { useState, useEffect } from "react";

import api from "api";

const useFetchFavoriteSets = () => {
  const [loading, setLoading] = useState(true);
  const [favSets, setFavSets] = useState();

  const fetchFavSets = async () => {
    try {
      const response = await api.get("/favorite_sets");
      // console.log("FAV SETS RESPONSE.DATA:", response.data);
      setFavSets(response.data);
    } catch (e) {
      console.error("FAILED FETCHING SETS:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavSets();
  }, []);

  return {
    loading,
    favSets,
    fetchFavSets,
  };
};

export default useFetchFavoriteSets;
