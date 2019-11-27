import React from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import AdminView from "./views/AdminView";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const theme = createMuiTheme({});

function App() {
  console.log('Updated app');
  console.log('rates api:',process.env.REACT_APP_RATES_API);
  return (
    <React.Fragment>
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <AdminView></AdminView>
      </div>
    </MuiThemeProvider>
    <ToastContainer/>
    </React.Fragment>
  );
}

export default App;
