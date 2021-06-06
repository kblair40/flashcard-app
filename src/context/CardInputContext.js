import React, { createContext, useState } from "react";

export const CardInputContext = createContext();

export function CardInputProvider(props) {
  const [cardFrontInput, setCardFrontInput] = useState("");
  const [cardBackInput, setCardBackInput] = useState("");
  const [cardFrontAlignment, setCardFrontAlignment] = useState("center");
  const [cardBackAlignment, setCardBackAlignment] = useState("right");

  const handleAlignmentChange = (value) => {
    setCardFrontAlignment(value);
  };

  return (
    <CardInputContext.Provider
      value={{
        cardFrontInput,
        setCardFrontInput,
        cardBackInput,
        setCardBackInput,
        cardFrontAlignment,
        setCardFrontAlignment,
        cardBackAlignment,
        setCardBackAlignment,
      }}
    >
      {props.children}
    </CardInputContext.Provider>
  );
}
