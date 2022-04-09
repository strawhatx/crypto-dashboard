import React from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CurrencyMenu from "../../currency-menu/Index";
import LanguageMenu from "../../language-menu/LanguageMenu";

const MobileDrawerUserActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

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
        onClick={() => navigate("/signin")}
      >
        {t("Sign out")}
      </Button>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CurrencyMenu isIcon={false} />
        <LanguageMenu isIcon={false} />
      </Box>
    </Box>
  );
};

export default MobileDrawerUserActions;
