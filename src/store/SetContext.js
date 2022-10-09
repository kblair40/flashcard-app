import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "api";

const SetContext = createContext();

const SetProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [flashcardSetData, setFlashcardSetData] = useState();
  const [frontCardContent, setFrontCardContent] = useState("");
  const [backCardContent, setBackCardContent] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchSet = async (id) => {
      try {
        const response = await api.get(`/flashcard_set/${id}`);
        console.log("\nRESPONSE:", response.data, "\n");

        if (response.data && response.data.set) {
          setFlashcardSetData(response.data.set);
        }
      } catch (e) {
        console.log("FAILED FETCHING SET:", e);
      }
    };

    if (params.id) {
      fetchSet(params.id);
    }
  }, [params.id]);

  const saveCard = async () => {
    if (!flashcardSetData) return false;

    try {
      const response = await api.patch(
        `/flashcard_set/add/${flashcardSetData._id}`,
        {
          front_content: frontCardContent,
          back_content: backCardContent,
        }
      );

      console.log("\nRESPONSE:", response.data, "\n");
      return true;
    } catch (err) {
      console.error("FAILED SAVING CARD:", err);
      return false;
    }
  };

  const deleteCard = () => {
    //
  };

  const addCard = () => {
    //
  };

  return (
    <SetContext.Provider
      value={{
        frontCardContent,
        setFrontCardContent,
        backCardContent,
        setBackCardContent,
        flashcardSetData,
        saveCard,
        deleteCard,
        addCard,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};

export default SetContext;

export { SetProvider };
