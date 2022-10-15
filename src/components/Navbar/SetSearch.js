import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";

import api from "api";

const SetSearch = () => {
  const [value, setValue] = useState("");
  const [borderColor, setBorderColor] = useState("gray.300");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true);

  const inputRef = useRef();

  const { pathname } = useLocation();

  useEffect(() => {
    // Clear input if user changes path
    setValue("");
    setResults("");
  }, [pathname]);

  const handleChange = async (e) => {
    const { value } = e.target;
    setValue(value);

    if (value.length > 2) {
      // must have at least 3 chars entered
      search(value);
      setShowResults(true);
    } else {
      setShowResults(false);
      setResults([]);
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
    <Popover
      initialFocusRef={inputRef}
      returnFocusOnClose={false}
      isOpen={results && results.length && showResults}
    >
      <PopoverTrigger>
        <Input
          ref={inputRef}
          value={value}
          onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
          onChange={handleChange}
          minW="200px"
          borderColor={borderColor}
          placeholder="Search"
        />
      </PopoverTrigger>

      <PopoverContent p={0}>
        <PopoverArrow />
        <PopoverHeader fontWeight="600" p="8px 16px 8px 12px">
          Results
        </PopoverHeader>
        <PopoverBody p={0}>
          {results
            ? results.map((result, i) => {
                return <Result key={i} result={result} />;
              })
            : null}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SetSearch;

const Result = ({ result }) => {
  return (
    <Link to={`/study/${result._id}/`}>
      <Flex
        py="8px"
        px="12px"
        w="100%"
        align="end"
        cursor="pointer"
        transition="background 0.3s"
        _hover={{ bg: "gray.100" }}
      >
        <Text lineHeight={1} mr="6px" fontWeight="600">
          {result.title}
        </Text>
        <Text fontSize="sm" color="gray.500" lineHeight={1}>
          {result.flashcards.length} cards
        </Text>
      </Flex>
    </Link>
  );
};
