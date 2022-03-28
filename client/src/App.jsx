import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";
import Home from "./pages/home/Index";
import Currencies from "./pages/currencies/Index";
import CurrencyDetail from "./pages/currencies/Details";
import Portfolio from "./pages/portfolio/Index";
import Layout from "./components/Layout";
import { GlobalStyles } from "./assets/theme/base/globalStyles";

import "./assets/i18n";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route exact path="/" element={<Layout children={<Home />} />} />
          <Route
            path="/currencies"
            element={<Layout children={<Currencies />} />}
          />
          <Route
            path="/currencies/:id"
            element={<Layout children={<CurrencyDetail />} />}
          />
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
