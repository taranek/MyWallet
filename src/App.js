import React from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import AdminView from "./views/AdminView";
const theme = createMuiTheme({});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <AdminView></AdminView>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
