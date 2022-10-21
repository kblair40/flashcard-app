import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  InputLeftElement,
  InputGroup,
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

import { SearchIcon } from "utils/icons";
import api from "api";

const SetSearch = ({ isDisabled }) => {
  const [value, setValue] = useState("");
  // const [borderColor, setBorderColor] = useState("gray.300");
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
  };

  return (
    <Popover
      initialFocusRef={inputRef}
      returnFocusOnClose={false}
      isOpen={results && results.length && showResults}
    >
      <PopoverTrigger>
        <InputGroup>
          <InputLeftElement
            children={<SearchIcon boxSize="18px" fill="gray.400" />}
          />
          <Input
            variant="neutral-outline"
            isDisabled={isDisabled}
            ref={inputRef}
            value={value}
            onBlur={() => setShowResults(false)}
            onFocus={() => setShowResults(true)}
            onChange={handleChange}
            w="100%"
            placeholder="Search"
          />
        </InputGroup>
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
