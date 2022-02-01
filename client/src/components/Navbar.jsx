import React from "react";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Button,
  MenuItem,
  IconButton,
  Menu,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/images/logo.svg";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "black.dark", boxShadow: 0 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box component="div" sx={{ flexGrow: { xs: 1, md: 0 } }}>
              <img src={logo} alt="logo" width="50px" />
            </Box>

            {/* Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button color="inherit" href="/currencies">
                Cryptocurrencies
              </Button>
              <Button color="inherit" href="/exchanges">
                Exchanges
              </Button>
              <Button color="inherit" href="/portfolios">
                Portfolio
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button color="inherit" href="/signin">
                Signin
              </Button>
              <Button color="inherit" href="/signup">
                Signup
              </Button>
            </Box>

            {/* Mobile */}
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button color="inherit" href="/currencies">
                    Cryptocurrencies
                  </Button>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Button color="inherit" href="/exchanges">
                    Exchanges
                  </Button>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Button color="inherit" href="/portfolios">
                    Portfolio
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
