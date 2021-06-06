import React, { useState, useRef, useContext } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { CardInputContext } from "../context/CardInputContext";

const CardFrontAndBackContainer = () => {
  const ctx = useContext(CardInputContext);

  return (
    <React.Fragment>
      <CardFront
        textAlign={ctx.cardFrontAlignment}
        value={ctx.cardFrontInput}
      />
      <CardBack textAlign={ctx.cardBackAlignment} value={ctx.cardBackInput} />
    </React.Fragment>
  );
};

export default CardFrontAndBackContainer;
