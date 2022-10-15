import React from "react";
import { Box, Stack, Select, FormControl, FormLabel } from "@chakra-ui/react";

const HistoryFilters = ({ onChange, sortBy }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <Stack direction={{ base: "row" }} align="center">
      <Select
        value={sortBy}
        size="sm"
        placeholder="Sort By"
        onChange={handleChange}
      >
        <option value="newest">Most Recent</option>
        <option value="oldest">Oldest</option>
      </Select>
    </Stack>
  );
};

export default HistoryFilters;
