import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  Flex,
  Heading,
  Spinner,
  // useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import UserContext from "store/UserContext";
import {
  MoreHorizontalIcon,
  StarOutlineIcon,
  StudyIcon,
  StarFilledIcon,
} from "utils/icons";
import api from "api";

const headingStyles = {
  textTransform: "capitalize",
  fontWeight: "700",
  fontSize: { base: "xl", sm: "2xl", md: "xl" },
};

const CommunitySets = () => {
  const [loading, setLoading] = useState(true);
  const [communitySets, setCommunitySets] = useState();
  const [favSets, setFavSets] = useState([]);

  let { userData, loading: ctxLoading } = useContext(UserContext);
  // console.log("USER DATA:", userData);

  useEffect(() => {
    if (userData && !loading) {
      setFavSets(userData?.favorite_flashcard_sets || []);
    }
  }, [ctxLoading, userData]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/community_sets");

        if (response.data) {
          // console.log("COMMUNITY RESPONSE:", response.data);
          setCommunitySets(response.data);
        }
      } catch (e) {
        console.error("FAILED FETCHING HISTORY:", e);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  return (
    <Flex
      justify="center"
      w="100%"
      borderLeft={{ md: "1px solid" }}
      borderColor={{ md: "#e5e5e5" }}
      maxH={{ md: "50%" }}
      overflowY={{ md: "scroll" }}
      h={{ md: "fit-content" }}
      p={{ base: "32px 0 0", md: "32px 8px 0" }}
    >
      <Flex direction="column" w="100%" position="relative">
        <Flex
          w="100%"
          justify="space-between"
          mb=".75rem"
          pr="8px"
          align="center"
        >
          <Heading {...headingStyles} noOfLines={2}>
            Latest Sets from the Community
          </Heading>
        </Flex>

        {loading ? (
          <Flex h="200px" w="100%" justify="center" align="center">
            <Spinner />
          </Flex>
        ) : communitySets && communitySets.length ? (
          communitySets.reverse().map((set, idx) => {
            return (
              <CommunitySet
                isFavorited={favSets.includes(set._id)}
                key={idx}
                set={set}
                onClick={() => console.log("clicked")}
              />
            );
          })
        ) : null}
      </Flex>
    </Flex>
  );
};

export default CommunitySets;

const CommunitySet = ({ set, isFavorited }) => {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  // const { colorMode } = useColorMode();
  // const isDark = colorMode === "dark";

  useEffect(() => {
    if (typeof isFavorited === "boolean") {
      setIsFavorite(isFavorited);
    }
  }, [isFavorited]);

  const handleClickFavorite = async () => {
    try {
      setLoading(true);
      const response = await api.patch(
        `/user/${isFavorite ? "remove" : "add"}`,
        {
          favorite_set: set._id,
        }
      );
      // console.log("RESPONSE:", response.data);
      setIsFavorite((prev) => !prev);
    } catch (e) {
      console.error("FAILED TO ADD/REMOVE SET AS FAVORITE:", e);
    }
    setLoading(false);
  };

  if (!set) {
    return null;
  }

  return (
    <Flex
      justify="space-between"
      align="center"
      py="8px"
      borderRadius="4px"
      w="100%"
    >
      <Flex direction="column" w="100%">
        <Text mr="6px" mb="6px" fontSize="lg" fontWeight="600" lineHeight={1}>
          {set.title}
        </Text>

        <Text lineHeight={1} fontSize="sm">
          Created {new Date(set.createdAt).toLocaleDateString()}
        </Text>
      </Flex>

      <Menu>
        <MenuButton
          size="sm"
          rounded="full"
          as={IconButton}
          icon={<MoreHorizontalIcon boxSize="18px" />}
          variant="ghost"
        />

        <MenuList>
          <Link to={`/study/${set._id}`}>
            <MenuItem
              closeOnSelect={true}
              fontWeight="500"
              icon={<StudyIcon boxSize="18px" />}
            >
              Study
            </MenuItem>
          </Link>
          <MenuItem
            closeOnSelect={true}
            isDisabled={loading}
            onClick={handleClickFavorite}
            fontWeight="500"
            icon={
              !isFavorite ? (
                <StarOutlineIcon boxSize="18px" />
              ) : (
                <StarFilledIcon boxSize="18px" />
              )
            }
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
