import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import CreateSet from "components/CreateSet";
import CreateSetForm from "components/Forms/CreateSetForm";

const Create = () => {
  const params = useParams();

  return (
    <Box border="1px solid transparent" h="100%">
      {!params.id ? <CreateSetForm /> : <CreateSet />}
    </Box>
  );
};

export default Create;
