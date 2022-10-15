import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import api from "api";

const SetSearch = () => {
  const [value, setValue] = useState("");
  const [borderColor, setBorderColor] = useState("gray.300");
  const [results, setResults] = useState([]);

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
    console.log("SEARCH VALUE:", searchValue);
    setBorderColor("red.600");
    try {
      const response = await api.get("/search", {
        params: { title: searchValue },
      });
      console.log("RESPONSE:", response.data);
      if (response.data) {
        setResults(response.data);
      }
    } catch (e) {
      console.log("SEARCH FAILED:", e);
    }
    setBorderColor("gray.600");
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      minW="200px"
      borderColor={borderColor}
      placeholder="Search"
    />
  );
};

export default SetSearch;
