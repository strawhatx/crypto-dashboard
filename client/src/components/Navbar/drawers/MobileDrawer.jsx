import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/system";

import logo from "../../../assets/images/coins-logo-black.png";
import { Link } from "react-router-dom";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const navItems = ["Home", "Currencies", "Portfolio", "Watchlist"].map(
    (item) => {
      return (
        <ListItem>
          <ListItemButton>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      );
    }
  );

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
        <Box sx={{ overflowX: "auto" }}>
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

          <List>{navItems}</List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileDrawer;
