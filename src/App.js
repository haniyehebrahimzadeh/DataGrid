import "./App.css";
import theme from "./Theme.js";
import * as React from "react";
import { Container, ThemeProvider } from "@mui/material";
import DataGrid from "./components/DataGrid";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="false">
        <Router>
          <Routes>
            <Route path="/" element={<DataGrid />}></Route>
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
