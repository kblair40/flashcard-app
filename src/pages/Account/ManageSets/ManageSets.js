import React, { useEffect, useState } from "react";

import api from "api";

const ManageSets = () => {
  const [flashcardData, setFlashcardData] = useState();

  useEffect(() => {
    const fetchFlashcardData = async () => {
      try {
        const response = await api.get("/user/flashcard_sets");
        console.log("RESPONSE:", response.data);
      } catch (e) {
        console.error("FAILED TO FETCH FLASHCARDS:", flashcardData);
      }
    };

    fetchFlashcardData();
  }, []);

  return <div>ManageSets</div>;
};

export default ManageSets;
