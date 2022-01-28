import React from "react";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <footer style={{ textAlign: "center" }}>
        Crypto Design Created by ME!
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
