import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import CardStyleOptions from "./CardStyleOptions";

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
  const classes = useStyles(props);
  const backInputRef = React.useRef("");
  const setFocus = () => {
    backInputRef.current.focus();
  };

  return (
    <CardContainer>
      <CardStyleOptions handleClick={setFocus} side="back" />
      <form>
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
          disableUnderline={true}
          inputRef={backInputRef}
        />
      </form>
    </CardContainer>
  );
};

export default CardBack;
