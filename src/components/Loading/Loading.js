import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Loading = ({ ...props }) => {
  return (
    <Center {...props}>
      <Spinner />
    </Center>
  );
};

export default Loading;
