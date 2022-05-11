import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import heroImg from "../../assets/images/home-crypto.jpg";

const HomeView = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      {/** Hero */}
      <Box
        className="hero"
        sx={{
          pt: theme.spacing(12),
          pb: theme.spacing(15),
          bgColor: theme.palette.primary.main,
          bgImage: heroImg,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="div"
            sx={{
              mb: theme.spacing(0.6),
              py: theme.spacing(5),
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {t("The simplest way to track your crypto assets.")}
          </Typography>
        </Container>
      </Box>

      {/**Currencies */}
      <Box sx={{ mt: -8, pb: 1 }}>
        <Container maxWidth="md"></Container>
      </Box>
    </>
  );
};

export default HomeView;
