import React from "react";
import Navbar from "./navbar/Index";
import PropTypes from "prop-types";
import LanguageMenu from "./language-modal/Index";
import CurrencyMenu from "./currency-modal/Index";

const Layout = ({ children, hasNav }) => {
  return (
    <>
      {/**Modals */}
      <CurrencyMenu />
      <LanguageMenu />

      {hasNav && <Navbar />}

      <main>{children}</main>

      <footer style={{ textAlign: "center" }}>
        Crypto Design Created by ME!
      </footer>
    </>
  );
};

Layout.propTypes = {
  hasNav: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default Layout;
