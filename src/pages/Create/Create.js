import React from "react";
import { useParams } from "react-router-dom";

import CreateSet from "components/CreateSet";
import CreateSetForm from "components/Forms/CreateSetForm";

const Create = () => {
  const params = useParams();

  return <div>{!params.id ? <CreateSetForm /> : <CreateSet />}</div>;
};

export default Create;
