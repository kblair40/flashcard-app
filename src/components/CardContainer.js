import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "1rem",
  },
  card: {
    width: "60%",
  },
});

const CardContainer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Card className={classes.card}>{props.children}</Card>
    </div>
  );
};

export default CardContainer;
