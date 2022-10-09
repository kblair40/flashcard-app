import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "api";

const SetContext = createContext();

const SetProvider = ({ children }) => {
  const [saving, setSaving] = useState(false);
  const [flashcardSetData, setFlashcardSetData] = useState();
  const [frontCardContent, setFrontCardContent] = useState("");
  const [backCardContent, setBackCardContent] = useState("");
  const [activeCard, setActiveCard] = useState({ index: 0, id: undefined });

  const params = useParams();

  useEffect(() => {
    const fetchSet = async (id) => {
      try {
        const response = await api.get(`/flashcard_set/${id}`);
        console.log("\nRESPONSE:", response.data, "\n");

        if (response.data && response.data.set) {
          const { set } = response.data;
          setFlashcardSetData(response.data.set);

          if (set.flashcards.length) {
            setActiveCard({ index: set.flashcards.length, id: undefined });
          }
        }
      } catch (e) {
        console.log("FAILED FETCHING SET:", e);
      }
    };

    if (params.id) {
      fetchSet(params.id);
    }
  }, [params.id]);

  const updateActiveCard = (card) => {
    const { index } = card;
    const actualCard = flashcardSetData.flashcards[index];

    setActiveCard(card);
    setBackCardContent(actualCard.back_content);
    setFrontCardContent(actualCard.front_content);
  };

  const saveCard = async () => {
    if (!flashcardSetData) return false;

    setSaving(true);

    try {
      const response = await api.patch(
        `/flashcard_set/add/${flashcardSetData._id}`,
        {
          front_content: frontCardContent,
          back_content: backCardContent,
        }
      );

      console.log("\nRESPONSE:", response.data, "\n");
      clearCards();
      setFlashcardSetData(response.data.flashcardSet);
      setSaving(false);
      return true;
    } catch (err) {
      console.error("FAILED SAVING CARD:", err);
      setSaving(false);
      return false;
    }
  };

  const patchCard = async (card) => {
    const { id } = card;

    try {
      const response = await api.patch(`/flashcard/${id}`, {
        front_content: frontCardContent,
        back_content: backCardContent,
      });
    } catch (err) {
      console.log("\nERROR PATCHING CARD:", err);
    }
  };

  const deleteCard = () => {
    //
  };

  const addCard = () => {
    //
  };

  const clearCards = () => {
    setFrontCardContent("");
    setBackCardContent("");
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
        saving,
        activeCard,
        updateActiveCard,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};

export default SetContext;

export { SetProvider };
