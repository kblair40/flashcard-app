import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  Flex,
  Heading,
  Spinner,
  useColorModeValue,
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
    if (userData) {
      setFavSets(userData?.favorite_flashcard_sets || []);
    }
  }, [ctxLoading, userData]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/community_sets");

        if (response.data) {
          // console.log("COMMUNITY RESPONSE:", response.data);
          setCommunitySets(response.data.reverse());
        }
      } catch (e) {
        console.error("FAILED FETCHING HISTORY:", e);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const bgMain = useColorModeValue("gray.50", "gray.800");

  return (
    <Flex
      justify="center"
      w="100%"
      borderLeft={{ md: "1px solid" }}
      borderColor={{ md: borderColor }}
      overflowY={{ md: "auto" }}
      overflowX="hidden"
      h={{ md: "calc(100vh - 76px)" }}
      p={{ base: "32px 0 0", md: "32px 8px 0 12px" }}
    >
      <Flex
        direction="column"
        w="100%"
        position="relative"
        bg={bgMain}
        rounded="lg"
      >
        <Flex
          w="100%"
          justify="space-between"
          p="1rem 1rem .75rem"
          align="center"
        >
          <Heading {...headingStyles} noOfLines={2}>
            Latest Sets from the Community
          </Heading>
        </Flex>

        <Flex
          h="100%"
          w="100%"
          direction="column"
          maxH={{ base: "30vh", md: "calc(100vh - 160px)" }}
          overflowY={{ base: "auto" }}
          pb={{ md: "1rem" }}
        >
          {loading ? (
            <Flex h="200px" w="100%" justify="center" align="center">
              <Spinner />
            </Flex>
          ) : communitySets && communitySets.length ? (
            communitySets.map((set, idx) => {
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

  const menuBg = useColorModeValue("gray.50", "gray.700");

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
      px="1rem"
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

        <MenuList bg={menuBg}>
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
