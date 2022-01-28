import { useState } from "react";
import { Drawer, Button } from "antd";
import NavMenu from "./menus/NavMenu";
import LoginMenu from "./menus/LoginMenu";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="./">LOGO</a>
      </div>

      <div className="menuCon">
        <div className="leftMenu">
          <NavMenu />
        </div>

        <div className="rightMenu">
          <LoginMenu />
        </div>

        <Button
          className="barsMenu"
          type="primary"
          onClick={() => setVisible(true)}
        >
          <span className="barsBtn"></span>
        </Button>

        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <NavMenu />
          <hr />

          <LoginMenu />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
