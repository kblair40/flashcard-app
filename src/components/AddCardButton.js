import React from "react";
import Button from "@material-ui/core/Button";

const AddCardButton = (props) => {
  return (
    <div>
      <Button
        type="submit"
        variant="outlined"
        color="default"
        style={{ marginTop: "1rem" }}
        onClick={props.handleSubmit}
      >
        Add Card
      </Button>
    </div>
  );
};

export default AddCardButton;
