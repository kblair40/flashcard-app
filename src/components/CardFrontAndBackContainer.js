import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import UserCards from "./UserCards";

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  editCardsContainer: {
    height: "100vh",
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  userCardsContainer: {
    height: "100vh",
    width: "25%",
    minWidth: "15rem",
    display: "flex",
    alignItems: "center",
  },
  card: {
    width: "100%",
    minWidth: "22rem",
  },
};

const CardFrontAndBackContainer = ({ classes }) => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.editCardsContainer}>
          <div className={classes.card}>
            <CardFront />
          </div>
          <div className={classes.card}>
            <CardBack />
          </div>
        </div>
        <div className={classes.userCardsContainer}>
          <UserCards />
        </div>
      </div>
      {/* <UserCards /> */}
    </>
  );
};

export default withStyles(styles)(CardFrontAndBackContainer);
