import React, { useState, useEffect } from "react";
import { Drawer, IconButton, Box, List } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/system";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/coins-logo-black.png";
import MobileDrawerLoginActions from "./components/LoginActions";
import MobileDrawerUserActions from "./components/UserActions";
import useAuthStore from "../../../../stores/authentication";
import MobileDrawerNavItems from "./components/NavItems";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);
  const [actions, setActions] = useState(null);
  const theme = useTheme();

  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  useEffect(() => {
    setActions(
      !!currentUser ? <MobileDrawerUserActions /> : <MobileDrawerLoginActions />
    );
  }, [currentUser]);

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
            <List>
              <MobileDrawerNavItems />{" "}
            </List>
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
