import React, { useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import IconButton from "@material-ui/core/IconButton";
import { CardInputContext } from "../context/CardInputContext";

const useStyles = makeStyles({
  optionsContainer: {
    display: "flex",
    width: "100%",
    height: "15%",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  positionOptions: {
    display: "flex",
    width: "25%",
    marginLeft: "5%",
  },
  listOptions: {
    display: "flex",
    width: "45%",
    justifyContent: "center",
  },
  sizeOptions: {
    display: "flex",
    width: "20%",
    justifyContent: "flex-end",
  },
});

const CardStyleOptions = (props) => {
  const classes = useStyles();
  const ctx = useContext(CardInputContext);

  return (
    <div className={classes.optionsContainer}>
      <div onClick={props.handleClick} className={classes.positionOptions}>
        <IconButton
          size="small"
          onClick={() =>
            ctx.dispatch({
              side: props.side.toUpperCase(),
              alignment: "left",
            })
          }
        >
          <FormatAlignLeftIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() =>
            ctx.dispatch({
              side: props.side.toUpperCase(),
              alignment: "center",
            })
          }
        >
          <FormatAlignCenterIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() =>
            ctx.dispatch({
              side: props.side.toUpperCase(),
              alignment: "right",
            })
          }
        >
          <FormatAlignRightIcon />
        </IconButton>
      </div>
      <div className={classes.listOptions}>
        <IconButton size="small">
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton size="small">
          <FormatListNumberedIcon />
        </IconButton>
      </div>
      <div className={classes.sizeOptions}>
        <IconButton size="small">
          <FormatSizeIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CardStyleOptions;
