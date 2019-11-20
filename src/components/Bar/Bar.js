import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import styles from "./styles";

export default function Bar(props) {
  const isBottom = props.bottom ? true : false;
  const internalStyles = styles();
  return (
    <div>
      <AppBar className={isBottom ? internalStyles.bottom : null}>
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </div>
  );
}
