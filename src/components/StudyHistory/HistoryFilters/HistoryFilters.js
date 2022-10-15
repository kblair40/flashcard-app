import React from "react";
import { Stack, Select } from "@chakra-ui/react";

const HistoryFilters = ({ onChange, sortBy }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <Stack direction={{ base: "row" }} align="center">
      <Select
        w="max-content"
        value={sortBy}
        size="sm"
        onChange={handleChange}
        _focus={{ borderColor: "gray.500" }}
        _focusVisible={{ outline: "none" }}
        rounded="md"
      >
        <option value="newest">Most Recent</option>
        <option value="oldest">Oldest</option>
      </Select>
    </Stack>
  );
};

export default HistoryFilters;
