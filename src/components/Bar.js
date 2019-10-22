import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
const useStyles = makeStyles(() => ({
  bottom: {
    top: "auto",
    bottom: 0
  }
}));

export default function Bar(props) {
  const isBottom = props.bottom ? true : false;
  const internalStyles = useStyles();
  return (
    <div>
      <AppBar className={isBottom ? internalStyles.bottom : null}>
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </div>
  );
}
