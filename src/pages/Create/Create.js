import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import CreateSet from "components/CreateSet";
import CreateSetForm from "components/Forms/CreateSetForm";
import useDetectLogout from "hooks/useDetectLogout";

const Create = () => {
  const params = useParams();

  useDetectLogout();

  return (
    <Box border="1px solid transparent" h="100%" pt="60px">
      {!params.id ? <CreateSetForm /> : <CreateSet />}
    </Box>
  );
};

export default Create;
