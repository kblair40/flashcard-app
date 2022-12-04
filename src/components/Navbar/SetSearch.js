import React, { useEffect, useState, useRef, useCallback } from "react";
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
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";
import debounce from "lodash.debounce";

import { SearchIcon } from "utils/icons";
import api from "api";

const SetSearch = ({ isDisabled, isDark }) => {
  const [searching, setSearching] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true);

  const inputRef = useRef();

  const { pathname } = useLocation();

  useEffect(() => {
    // Clear input if user changes path
    setValue("");
    setResults("");
  }, [pathname]);

  const debouncedSave = useCallback(
    debounce((newValue) => search(newValue), 300),
    []
  );

  const handleChange = async (e) => {
    const { value } = e.target;
    setValue(value);

    // must have at least 3 chars entered
    if (value.length > 2) {
      setSearching(true);
      debouncedSave(value);
      // search(value);
      setShowResults(true);
    } else {
      setShowResults(false);
      setResults([]);
    }
  };

  const search = async (searchValue) => {
    console.log("SEARCH VALUE:", searchValue);
    setSearching(true);
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
    setSearching(false);
  };

  return (
    <Popover
      initialFocusRef={inputRef}
      returnFocusOnClose={false}
      isOpen={value.length > 2 && showResults}
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

      <PopoverContent p={0} bg={isDark ? "gray.700" : "#fff"}>
        <PopoverArrow />
        <PopoverHeader fontWeight="600" p="8px 16px 8px 12px">
          Results
        </PopoverHeader>
        <PopoverBody p={0}>
          {searching ? (
            <Center py="1rem">
              <Spinner />
            </Center>
          ) : results && results.length ? (
            results.map((result, i) => {
              return <Result key={i} result={result} isDark={isDark} />;
            })
          ) : results && !results.length ? (
            <Center py="1rem">
              <Text fontWeight="600">NO SETS FOUND</Text>
            </Center>
          ) : null}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SetSearch;

const Result = ({ result, isDark }) => {
  return (
    <Link style={{ zIndex: 10000000 }} to={`/study/${result._id}/`}>
      <Flex
        // onClick={(e) => e.stopPropagation()}
        py="8px"
        px="12px"
        w="100%"
        align="end"
        cursor="pointer"
        transition="background 0.3s"
        _hover={{ bg: isDark ? "gray.600" : "gray.100" }}
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
