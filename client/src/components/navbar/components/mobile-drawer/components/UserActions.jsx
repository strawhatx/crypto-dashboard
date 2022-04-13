import React from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  useCurrencyStore,
  useLanguageStore,
  useModalStore,
} from "../../../../../stores/app-settings";
import useAuthStore from "../../../../../stores/authentication";

const MobileDrawerUserActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { logout } = useAuthStore((state) => ({
    logout: state.logout,
  }));

  const { selectedCurrency } = useCurrencyStore((state) => ({
    selectedCurrency: state.currency.symbol,
  }));

  const { selectedLanguage } = useLanguageStore((state) => ({
    selectedLanguage: state.language,
  }));

  const { setIsCurrenciesOpen, setIsLanguagesOpen, setIsMobileDrawerOpen } =
    useModalStore((state) => ({
      setIsCurrenciesOpen: state.setIsCurrenciesOpen,
      setIsLanguagesOpen: state.setIsLanguagesOpen,
      setIsMobileDrawerOpen: state.setIsMobileDrawerOpen,
    }));

  const handleOpenCurrency = () => {
    setIsMobileDrawerOpen(false);
    setIsCurrenciesOpen(true);
  };

  const handleOpenLanguage = () => {
    setIsMobileDrawerOpen(false);
    setIsLanguagesOpen(true);
  };

  const handleSignOut = () => {
    logout().then(() => navigate("/signin"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2.5, 2.5, 5),
      }}
    >
      <Button
        fullWidth
        size="medium"
        type="submit"
        variant="outlined"
        onClick={handleSignOut}
      >
        {t("Sign out")}
      </Button>
      <Box
        sx={{
          display: "flex",
          mt: theme.spacing(2.5),
          mb: theme.spacing(3),
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Button
          color="primary"
          aria-label="currency button"
          onClick={handleOpenCurrency}
          variant="contained"
          fullWidth
          sx={{ mr: 1 }}
        >
          {selectedCurrency}
        </Button>

        <Button
          color="primary"
          aria-label="language button"
          onClick={handleOpenLanguage}
          variant="contained"
          fullWidth
          sx={{ ml: 1 }}
        >
          {selectedLanguage}
        </Button>
      </Box>
    </Box>
  );
};

export default MobileDrawerUserActions;
