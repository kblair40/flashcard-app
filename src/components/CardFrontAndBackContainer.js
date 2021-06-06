import React from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

const CardFrontAndBackContainer = () => {
  return (
    <React.Fragment>
      <CardFront />
      <CardBack />
    </React.Fragment>
  );
};

export default CardFrontAndBackContainer;
