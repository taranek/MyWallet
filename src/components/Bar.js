import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import useSharedStyles from "../styles/SharedStyles";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  bottom: {
    top: "auto",
    bottom: 0
  }
}));

export default function Bar(props) {
  const isBottom = props.bottom ? true : false;
  const internalStyles = useStyles();
  const sharedStyles = useSharedStyles();
  return (
    <div className={internalStyles.root}>
      <AppBar className={isBottom ? internalStyles.bottom : null}>
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </div>
  );
}
