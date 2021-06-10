import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  cardsContainer: {
    height: "95%",
    width: "100%",
    border: "1px solid #aaa",
    padding: ".5rem",
  },
};

const UserCards = ({ classes }) => {
  return <div className={classes.cardsContainer}></div>;
};

export default withStyles(styles)(UserCards);
