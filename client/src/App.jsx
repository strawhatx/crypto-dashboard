import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Index";
import Portfolio from "./pages/portfolio/Index";

import "./assets/theme.css";
import Layout from "./components/Layout";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/currencies"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/exchanges"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/portfolios"
          element={
            <Layout>
              <Portfolio />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
