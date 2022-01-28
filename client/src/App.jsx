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
        <Layout>
          <Route path="/" element={<Home />} />
          <Route path="/currencies" element={<Home />} />
          <Route path="/exchanges" element={<Home />} />
        </Layout>

        <Route path="/portfolios" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
