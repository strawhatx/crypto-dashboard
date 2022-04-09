import React, { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/system";

import logo from "../../../assets/images/coins-logo-black.png";
import { Link, useNavigate } from "react-router-dom";
import LoginActions from "./actions/LoginActions";
import UserActions from "./actions/UserActions";
import useAuthStore from "../../../stores/authentication";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);
  const [actions, setActions] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  useEffect(() => {
    setActions(!!currentUser ? <UserActions /> : <LoginActions />);
  }, [currentUser]);

  const navItems = [
    { name: "Home", url: "/" },
    { name: "Currencies", url: "/currencies" },
    { name: "Portfolio", url: "/portfolios" },
    { name: "Watchlist", url: "/watchlists" },
    { name: "My Account", url: "/my-account" },
  ].map((item) => {
    return (
      <ListItemButton
        key={item.name}
        onClick={() => navigate(item.url)}
        sx={{
          verticalAlign: "middle",
          display: "flex",

          padding: theme.spacing(1, 2.5),
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          height: 48,
          color: "rgb(99, 115, 129)",
        }}
      >
        <ListItemText
          primary={item.name}
          sx={{
            fontSize: 12,
            textTransform: "capitalize",
            fontWeight: 600,
            lineHeight: 1.85714,
          }}
        />
      </ListItemButton>
    );
  });

  return (
    <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="mobile"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => setOpen(true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
          },
        }}
        anchor={"left"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            overflowX: "auto",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/**Header */}
          <Box sx={{ padding: theme.spacing(3, 2.5), lineHeight: 0 }}>
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
          </Box>

          <Box>
            <List>{navItems}</List>
          </Box>

          {/* divider */}
          <Box sx={{ flexGrow: 1 }}></Box>

          {actions}
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileDrawer;
