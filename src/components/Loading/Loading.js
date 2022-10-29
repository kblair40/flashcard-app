import React from "react";
import { Center, Spinner, useColorModeValue } from "@chakra-ui/react";

const Loading = ({ ...props }) => {
  const spinnerColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Center {...props}>
      <Spinner color={spinnerColor} />
    </Center>
  );
};

export default Loading;
