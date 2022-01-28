import React from "react";
import { Menu } from "antd";

const NavMenu = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="currencies">
        <a href="/currencies">Cryptocurrencies</a>
      </Menu.Item>
      <Menu.Item key="exchanges">
        <a href="exchanges">Exchanges</a>
      </Menu.Item>
      <Menu.Item key="portfolio">
        <a href="portfolios">Portfolio</a>
      </Menu.Item>
    </Menu>
  );
};

export default NavMenu;
