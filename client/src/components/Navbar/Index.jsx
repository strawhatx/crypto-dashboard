import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/coins-logo-black.png";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import LanguageMenu from "./menus/LanguageMenu";
import CurrencyMenu from "./menus/CurrencyMenu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/system";
import useAuthStore from "../../stores/authentication";
import UserMenu from "./menus/UserMenu";
import LoginMenu from "./menus/LoginMenu";
import MobileDrawer from "./drawers/MobileDrawer";

const Navbar = () => {
  const [color, setColor] = useState("transparent");
  const [actions, setActions] = useState(null);
  const { t } = useTranslation();
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
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                  color: "inherit",
                  lineHeight: 1.85714,
                  fontSize: 14,
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
              >
                {t("Home")}
              </Link>
              <Link
                to="/currencies"
                style={{
                  marginLeft: 48,
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "inherit",
                  fontWeight: 500,
                  lineHeight: 1.85714,
                  fontSize: 14,
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
              >
                {t("Currencies")}
              </Link>
              <Link
                to="/portfolios"
                style={{
                  marginLeft: 48,
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  fontWeight: 500,
                  lineHeight: 1.85714,
                  fontSize: 14,
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
              >
                {t("Portfolio")}
              </Link>
              <Link
                to="/watchlist"
                style={{
                  marginLeft: 48,
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  fontWeight: 500,
                  lineHeight: 1.85714,
                  fontSize: 14,
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
              >
                {t("Watchlist")}
              </Link>
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
              <CurrencyMenu isIcon={true} />
              <LanguageMenu isIcon={true} />

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
