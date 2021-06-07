import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import CardStyleOptions from "./CardStyleOptions";
import AddCardButton from "./AddCardButton";

import CardContainer from "./CardContainer";

const useStyles = makeStyles({
  cardInput: {
    width: "100%",
    height: "15rem",
    fontSize: "1.1rem",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
    },
    "&$focused": {
      backgroundColor: "white",
    },
  },
  focused: {
    backgroundColor: "white",
    textAlign: (props) => props.textAlign,
  },
});

const CardBack = (props) => {
  const [textInput, setTextInput] = useState("");
  const classes = useStyles(props);
  const backInputRef = useRef("");
  const setFocus = () => {
    backInputRef.current.focus();
  };

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FINAL VALUE =", textInput);
    setTextInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContainer>
        <CardStyleOptions handleClick={setFocus} side="back" />

        <FilledInput
          classes={{
            root: classes.cardInput,
            focused: classes.focused,
            inputMultiline: classes.focused,
          }}
          multiline
          rows={10}
          rowsMax={10}
          fullWidth
          onChange={handleChange}
          value={textInput}
          disableUnderline={true}
          inputRef={backInputRef}
        />
      </CardContainer>
      <AddCardButton handleSubmit={handleSubmit} />
    </form>
  );
};

export default CardBack;
