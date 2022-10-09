import { createContext, useEffect, useState } from "react";

const SetContext = createContext();

const SetProvider = ({ children }) => {
  const [frontCardContent, setFrontCardContent] = useState("");
  const [backCardContent, setBackCardContent] = useState("");

  return (
    <SetContext.Provider
      value={{
        frontCardContent,
        setFrontCardContent,
        backCardContent,
        setBackCardContent,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};

export default SetContext;

export { SetProvider };
