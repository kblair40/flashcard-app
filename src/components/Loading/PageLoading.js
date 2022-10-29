import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

const PageLoading = () => {
  return (
    <Center
      zIndex={100}
      position="fixed"
      top="60px"
      left={0}
      right={0}
      bottom={0}
      w="100vw"
      bg="rgba(26, 32, 44, 0.3)"
    >
      <Spinner size="xl" thickness="6px" />
    </Center>
  );
};

export default PageLoading;
