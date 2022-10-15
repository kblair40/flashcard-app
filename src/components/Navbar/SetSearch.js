import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import api from "api";

const SetSearch = () => {
  const [value, setValue] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    // Clear input if user changes path
    setValue("");
  }, [pathname]);

  const handleChange = async (e) => {
    const { value } = e.target;
    setValue(value);

    if (value.length > 2) {
      // must have at least 3 chars entered
      search(value);
    }
  };

  const search = async (searchValue) => {
    try {
      const response = await api.get("/search", {
        query: { title: searchValue },
      });
      console.log("RESPONSE:", response);
    } catch (e) {
      console.log("SEARCH FAILED:", e);
    }
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      minW="200px"
      borderColor="gray.300"
      placeholder="Search"
    />
  );
};

export default SetSearch;
