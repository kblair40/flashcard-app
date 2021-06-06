import React, { createContext, useState, useReducer } from "react";
const initialAlignment = {
  front: "center",
  back: "left",
};
export const CardInputContext = createContext(initialAlignment);

export const alignmentReducer = (state, action) => {
  if (action.side === "FRONT") {
    return { front: action.alignment, back: state.back };
  } else {
    return { back: action.alignment, front: state.front };
  }
};

export function CardInputProvider(props) {
  const [cardAlignment, dispatch] = useReducer(
    alignmentReducer,
    initialAlignment
  );

  const setAlignment = (side, alignment) => {
    dispatch({ side: side, alignment: alignment });
  };

  const cardInputContext = {
    front: cardAlignment.front,
    back: cardAlignment.back,
    setAlignment: setAlignment,
    dispatch: dispatch,
  };

  return (
    <CardInputContext.Provider value={cardInputContext}>
      {props.children}
    </CardInputContext.Provider>
  );
}
