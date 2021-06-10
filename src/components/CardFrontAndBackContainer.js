import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    // background: "rgba(50,50,200, 0.1)",
  },
  card: {
    width: "50%",
    minWidth: "22rem",
  },
  front: {
    // height: "100%",
  },
  back: {
    // height: "100%",
  },
};

const CardFrontAndBackContainer = ({ classes }) => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <CardFront />
      </div>
      <div className={classes.card}>
        <CardBack />
      </div>
    </div>
  );
};

export default withStyles(styles)(CardFrontAndBackContainer);
