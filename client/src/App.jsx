import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";
import Home from "./pages/home/Index";
import Currencies from "./pages/currencies/Index";
import CurrencyDetail from "./pages/currencies/Details";
import Layout from "./components/Layout";
import Register from "./pages/register/Index";
import Login from "./pages/login/Index";
import ForgotPassword from "./pages/forgot-password/Index";
import UserProfile from "./pages/profile/Index";
import Watchlists from "./pages/watchlist/Index";
import { GlobalStyles } from "./assets/theme/base/globalStyles";

import "./assets/i18n";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route
            exact
            path="/"
            element={<Layout children={<Home />} hasNav={true} />}
          />
          <Route
            exact
            path="/signup"
            element={<Layout children={<Register />} hasNav={false} />}
          />
          <Route
            exact
            path="/signin"
            element={<Layout children={<Login />} hasNav={false} />}
          />
          <Route
            exact
            path="/my-account"
            element={<Layout children={<UserProfile />} hasNav={true} />}
          />
          <Route
            exact
            path="/forgot-password"
            element={<Layout children={<ForgotPassword />} hasNav={false} />}
          />
          <Route
            path="/currencies"
            element={<Layout children={<Currencies />} hasNav={true} />}
          />
          <Route
            path="/currencies/:id"
            element={<Layout children={<CurrencyDetail />} hasNav={true} />}
          />
          <Route
            path="/watchlists"
            element={<Layout children={<Watchlists />} hasNav={true} />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
