import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import AdminView from './components/AdminView';
const theme = createMuiTheme({
  
});

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
