import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";

import CardContainer from "./CardContainer";

const useStyles = makeStyles({
  cardInput: {
    width: "100%",
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
  },
});

const CardFront = () => {
  const classes = useStyles();
  return (
    <CardContainer>
      <form>
        <FilledInput
          classes={{
            root: classes.cardInput,
            focused: classes.focused,
            inputMultiline: classes.focused,
          }}
          multiline
          rows={10}
          rowsMax={50}
          fullWidth
          disableUnderline={true}
        />
      </form>
    </CardContainer>
  );
};

export default CardFront;
