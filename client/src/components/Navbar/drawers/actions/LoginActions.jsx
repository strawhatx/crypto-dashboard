import React from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LoginActions = () => {
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
        {t("Sign in")}
      </Button>
      <Button
        fullWidth
        size="medium"
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: theme.spacing(2) }}
        onClick={() => navigate("/signup")}
      >
        {t("Sign up")}
      </Button>
    </Box>
  );
};

export default LoginActions;
