import React, { useState, useContext } from "react";
import { Flex, Text, Button, useColorMode } from "@chakra-ui/react";

import UserContext from "store/UserContext";
import AuthModal from "components/Modals/AuthModal";
import { SmartIcon, GlobeNetworkIcon } from "utils/icons";

const Hero = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { isSignedIn } = useContext(UserContext);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex display={isSignedIn ? "none" : "flex"} justify="center" mt="3rem">
      <Flex
        direction="column"
        maxWidth={{ base: "300px", sm: "400px", md: "600px" }}
      >
        <Text textAlign="center" fontWeight="700" fontSize="5xl">
          FlashCards+
        </Text>

        <Text textAlign="center" fontWeight="500" fontSize="2xl">
          Study & share flashcard sets made around the world
        </Text>

        <Flex align="center" justify="flex-end" mt="2rem">
          <SmartIcon
            boxSize={{ base: "120px" }}
            fill={isDark ? "gray.100" : undefined}
          />
          <Text
            fontWeight="500"
            ml="1rem"
            textStyle={isDark ? "dm-secondary" : "lm-secondary"}
          >
            Recall crucial information like dates, vocabulary, symbols and
            formulas.
          </Text>
        </Flex>

        <Flex mt="1rem" align="center" justify="flex-end">
          <Text
            fontWeight="500"
            mr="1rem"
            textStyle={isDark ? "dm-secondary" : "lm-secondary"}
          >
            Search, discover and share your Flashcards with your peers.
          </Text>
          <GlobeNetworkIcon
            fill={isDark ? "gray.100" : undefined}
            boxSize={{ base: "120px" }}
          />
        </Flex>

        <Button
          onClick={() => setAuthModalOpen(true)}
          mt="3rem"
          rounded="full"
          size="lg"
          fontWeight="700"
          variant="solid-blue"
        >
          Create an Account For Free
        </Button>
      </Flex>

      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      )}
    </Flex>
  );
};

export default Hero;
