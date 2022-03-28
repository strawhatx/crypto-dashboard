import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, MenuItem, IconButton, Menu } from "@mui/material";
import { useTranslation } from "react-i18next";

const Mobile = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => setIsOpen(true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <MenuItem onClick={() => setIsOpen(false)}>
          <Button color="inherit" href="/currencies">
            {t("Currencies")}
          </Button>
        </MenuItem>

        <MenuItem onClick={() => setIsOpen(false)}>
          <Button color="inherit" href="/portfolios">
            {t("Portfolio")}
          </Button>
        </MenuItem>
        <hr />
        <MenuItem onClick={() => setIsOpen(false)}>
          <Button color="inherit" href="/portfolios">
            {t("Signin")}
          </Button>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(false)}>
          <Button color="inherit" href="/portfolios">
            {t("Signup")}
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Mobile;
