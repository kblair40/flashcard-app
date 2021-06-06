import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import CardContainer from "./CardContainer";
import CardStyleOptions from "./CardStyleOptions";

const useStyles = makeStyles({
  cardInput: {
    width: "100%",
    height: "15rem",
    fontSize: "1.8rem",
    textAlign: "center",
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

const CardFront = (props) => {
  const classes = useStyles(props);
  const frontInputRef = React.useRef("");

  const setFocus = () => {
    frontInputRef.current.focus();
  };

  return (
    <CardContainer>
      <CardStyleOptions handleClick={setFocus} side="front" />
      <form>
        <FilledInput
          classes={{
            root: classes.cardInput,
            focused: classes.focused,
            inputMultiline: classes.focused,
          }}
          multiline
          rows={7}
          rowsMax={7}
          fullWidth
          disableUnderline={true}
          inputRef={frontInputRef}
        />
      </form>
    </CardContainer>
  );
};

export default CardFront;
