import React from "react";
import Navbar from "./Navbar/Index";
import PropTypes from "prop-types";

const Layout = ({ children, hasNav }) => {
  return (
    <>
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
