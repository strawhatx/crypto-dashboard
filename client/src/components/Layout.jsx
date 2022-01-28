import React from "react";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>

      <Content>{children}</Content>

      <Footer style={{ textAlign: "center" }}>
        Crypto Design Created by ME!
      </Footer>
    </Layout>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainLayout;
