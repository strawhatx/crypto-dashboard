import React from "react";
import { Menu } from "antd";

const NavMenu = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="currencies">
        <a href="">Cryptocurrencies</a>
      </Menu.Item>
      <Menu.Item key="exchanges">
        <a href="">Exchanges</a>
      </Menu.Item>
      <Menu.Item key="portfolio">
        <a href="">Portfolio</a>
      </Menu.Item>
    </Menu>
  );
};

export default NavMenu;
