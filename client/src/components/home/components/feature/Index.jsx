import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomeMarket = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        pt: theme.spacing(22),
        pb: theme.spacing(15),
      }}
    >
      <Box>
        <Typography
          variant="h2"
          component="div"
          sx={{
            textAlign: "center",
            pb: theme.spacing(1),
          }}
        >
          {t("Boost up with Our Great Features")}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}></Box>
    </Container>
  );
};

export default HomeMarket;
