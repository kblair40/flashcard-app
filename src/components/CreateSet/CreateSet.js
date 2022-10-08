import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "api";

const CreateSet = () => {
  const [setData, setSetData] = useState();

  const params = useParams();

  useEffect(() => {
    const fetchSet = async (id) => {
      try {
        const response = await api.get(`/flashcard_set/${id}`);
        console.log("\nRESPONSE:", response.data, "\n");
      } catch (e) {
        console.log("FAILED FETCHING SET:", e);
      }
    };

    if (params.id) {
      fetchSet(params.id);
    }
  }, [params]);

  return <div>CreateSet</div>;
};

export default CreateSet;
