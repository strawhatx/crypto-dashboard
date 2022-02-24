import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.svg";
import { Box, AppBar, Container, Toolbar, Button } from "@mui/material";
import Mobile from "./menus/MobileMenu";
import LanguageMenu from "./menus/LanguageMenu";
import CurrencyMenu from "./menus/CurrencyMenu";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box component="div" sx={{ flexGrow: { xs: 1, md: 0 } }}>
              <img src={logo} alt="logo" width="50px" />
            </Box>

            {/* Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button color="inherit" href="/currencies">
                {t("Currencies")}
              </Button>
              <Button color="inherit" href="/exchanges">
                {t("Exchanges")}
              </Button>
              <Button color="inherit" href="/portfolios">
                {t("Portfolio")}
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <CurrencyMenu />
              <LanguageMenu />

              <Button color="inherit" href="/signin">
                {t("Signin")}
              </Button>
              <Button color="inherit" href="/signup">
                {t("Signup")}
              </Button>
            </Box>

            {/* Mobile */}
            <Mobile />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
