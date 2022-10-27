import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "api";

const SetContext = createContext();

const SetProvider = ({ children }) => {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [flashcardSetData, setFlashcardSetData] = useState();
  const [frontCardContent, setFrontCardContent] = useState("");
  const [backCardContent, setBackCardContent] = useState("");
  const [activeCard, setActiveCard] = useState({ index: -1, id: undefined });

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
    if (!card) return;
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

      console.log("\nSAVE RESPONSE:", response.data, "\n");
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

  const patchCard = async () => {
    const { id } = activeCard;
    if (!id) return null;

    setSaving(true);

    try {
      const response = await api.patch(`/flashcard/${id}`, {
        front_content: frontCardContent,
        back_content: backCardContent,
      });

      // console.log("\n\nPATCH RESPONSE:", response.data);
      if (response.data && response.data.flashcard) {
        const { flashcard } = response.data;
        const dataCopy = { ...flashcardSetData };
        const cardsCopy = [...dataCopy.flashcards];

        cardsCopy[activeCard.index] = flashcard;
        dataCopy.flashcards = cardsCopy;

        setFlashcardSetData(dataCopy);
        clearCards();
        setActiveCard({ id: undefined, index: -1 });
      }
    } catch (err) {
      console.log("\nERROR PATCHING CARD:", err);
    }

    setSaving(false);
  };

  const deleteCard = async () => {
    const { id: card_id } = activeCard;
    if (!card_id || !flashcardSetData) return null;

    const { _id: set_id } = flashcardSetData;

    setDeleting(true);

    try {
      const response = await api.delete(`/flashcard_set/${set_id}/${card_id}`);
      console.log("\n\nRESPONSE.DATA:", response.data);

      if (response.data && response.data.set) {
        const { set } = response.data;

        console.log("SET AFTER DELETE:", set);

        setFlashcardSetData(set);
        clearCards();
      }
    } catch (e) {
      console.error("FAILED DELETING CARD:", e);
    }

    setDeleting(false);
  };

  const addCard = () => {
    clearCards();
    // setActiveCard({ index: -1, id: undefined });
  };

  const clearCards = () => {
    setFrontCardContent("");
    setBackCardContent("");
    setActiveCard({ index: -1, id: undefined });

    // setTimeout(() => {
    //   setFlashcardSetData(flashcardSetData);
    // }, 1000);
  };

  return (
    <SetContext.Provider
      value={{
        frontCardContent,
        setFrontCardContent,
        backCardContent,
        setBackCardContent,
        flashcardSetData,
        setFlashcardSetData,
        saveCard,
        deleteCard,
        saving,
        deleting,
        activeCard,
        updateActiveCard,
        patchCard,
        addCard,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};

export default SetContext;

export { SetProvider };
