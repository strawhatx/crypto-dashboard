import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./assets/theme";
import Home from "./pages/home/Index";
import Currencies from "./pages/currencies/Index";
import Portfolio from "./pages/portfolio/Index";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<Layout children={<Home />} />} />
          <Route
            path="/currencies"
            element={<Layout children={<Currencies />} />}
          />
          <Route path="/exchanges" element={<Layout children={<Home />} />} />
          <Route
            path="/portfolios"
            element={<Layout children={<Portfolio />} />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
