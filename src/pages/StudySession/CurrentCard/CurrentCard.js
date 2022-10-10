import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Center, Button } from "@chakra-ui/react";

const CurrentCard = ({ card }) => {
  const [side, setSide] = useState("front");

  useEffect(() => {
    setSide("front");
  }, [card]);

  return (
    <Flex align="center" direction="column" h="100%" w="100%">
      <Flex
        align="center"
        bg="#fcfcfc"
        justify="center"
        shadow="sm"
        h="100%"
        w="100%"
      >
        <Box
          dangerouslySetInnerHTML={{
            __html: side === "front" ? card.front_content : card.back_content,
          }}
        />
      </Flex>

      <Button mt="1rem" variant="ghost">
        Flip
      </Button>
    </Flex>
  );
};

export default CurrentCard;
