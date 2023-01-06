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
  const [fetchError, setFetchError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchSet = async (id) => {
      // get set by id, then set it's data in state
      try {
        const response = await api.get(`/flashcard_set/${id}`);

        if (response.data && response.data.set) {
          const { set } = response.data;
          setFlashcardSetData(response.data.set);

          if (set.flashcards.length) {
            /* only set if the set already has cards, which will only be the case if a previously
               created set is being edited */
            setActiveCard({ index: set.flashcards.length, id: undefined });
          }

          setFetchError(false);
        }
      } catch (e) {
        console.log("FAILED FETCHING SET:", e);
        setFetchError(true);
      }
    };

    if (params.id) {
      // Only fetch if set id is available in url params
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
    // flashcardSetData being falsy should never happen, but just in case...
    if (!flashcardSetData) return false;

    // makes loading indicator/spinner visible on save button
    setSaving(true);

    try {
      const data = {
        front_content: frontCardContent,
        back_content: backCardContent,
      };
      const url = `/flashcard_set/add/${flashcardSetData._id}`;
      // patch set with new card
      const response = await api.patch(url, data);

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
      // patch flashcard with new content
      const response = await api.patch(`/flashcard/${id}`, {
        front_content: frontCardContent,
        back_content: backCardContent,
      });

      if (response.data && response.data.flashcard) {
        const { flashcard } = response.data;
        const dataCopy = { ...flashcardSetData };
        const cardsCopy = [...dataCopy.flashcards];

        cardsCopy[activeCard.index] = flashcard;
        dataCopy.flashcards = cardsCopy;

        // update state locally so a GET request can be avoided
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

    // makes loading indicator/spinner visible on delete button
    setDeleting(true);

    try {
      const deleteUrl = `/flashcard_set/${flashcardSetData._id}/${card_id}`;
      const response = await api.delete(deleteUrl);

      if (response.data && response.data.set) {
        // update set with same data, minus the deleted card
        setFlashcardSetData(response.data.set);
        clearCards();
      }
    } catch (e) {
      console.error("FAILED DELETING CARD:", e);
    }

    setDeleting(false);
  };

  const clearCards = () => {
    // called every time a card is saved or deleted.
    // all control buttons except 'Exit' will be disabled immediately after this function
    setFrontCardContent("");
    setBackCardContent("");
    setActiveCard({ index: -1, id: undefined });
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
        fetchError,
        addCard: clearCards,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};

export default SetContext;

export { SetProvider };
