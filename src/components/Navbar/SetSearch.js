import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

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
