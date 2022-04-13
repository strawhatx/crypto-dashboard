import React, { useState, useEffect } from "react";
import logo from "../../assets/images/coins-logo-black.png";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/system";
import PropTypes from "prop-types";
import useAuthStore from "../../stores/authentication";
import UserMenu from "./components/UserMenu";
import LoginMenu from "./components/LoginMenu";
import MobileDrawer from "./components/mobile-drawer/Index";
import NavbarNavItems from "./components/NavItems";
import NavbarModalButtons from "./components/Buttons";

const Navbar = () => {
  const [color, setColor] = useState("transparent");
  const [actions, setActions] = useState(null);

  const theme = useTheme();

  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  const handleNavColor = () => {
    console.log(window.scrollY);

    let height = window.screen.width > 600 ? 80 : 64;

    if (window.scrollY >= height) {
      setColor("primary");
    } else {
      setColor("transparent");
    }
  };

  window.addEventListener("scroll", handleNavColor);

  useEffect(() => {
    setActions(!!currentUser ? <UserMenu /> : <LoginMenu />);
  }, [currentUser]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color={color} sx={{ boxShadow: "none" }}>
        <Toolbar disableGutters sx={{ height: { md: 80 } }}>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* Logo*/}
            <Box sx={{ lineHeight: 0, position: "relative" }}>
              <Link to="/">
                <Box
                  href="/"
                  sx={{
                    width: 75,
                    lineHeight: 0,
                    cursor: "pointer",
                    display: "inline-flex",
                  }}
                >
                  <img src={logo} alt="logo" />
                </Box>
              </Link>
              <Typography
                component="span"
                sx={{
                  minWidth: 22,
                  lineHeight: 0,
                  borderRadius: 0.6,
                  cursor: "default",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  justifyContent: "center",
                  padding: theme.spacing(0, 0.8),
                  color: theme.palette.info.dark,
                  backgroundColor: theme.palette.info.lighter,
                  fontWeight: 700,
                  ml: 0.5,
                  left: 66,
                  height: 20,
                  fontSize: 11,
                  position: "absolute",
                }}
              >
                v1.3
              </Typography>
            </Box>

            {/* Main Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                ml: 6,
              }}
            >
              <NavbarNavItems />
            </Box>

            {/* divider */}
            <Box sx={{ flexGrow: 1 }}></Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <NavbarModalButtons />

              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ ml: 2, borderWidth: "0px thin 0px 0px", height: 24 }}
              />

              {actions}
            </Box>

            {/* Mobile */}
            <MobileDrawer />
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
