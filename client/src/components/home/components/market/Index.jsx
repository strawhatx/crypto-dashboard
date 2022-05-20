import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import HomeMarketCurrenciesTable from "./components/Table";
import { useNavigate } from "react-router-dom";
import { Forward30Outlined } from "@mui/icons-material";

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
          {t("Market")}
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="p"
          component="div"
          sx={{
            textAlign: "center",
            pb: theme.spacing(8),
            fontSize: 22,
          }}
        >
          {t("Easily track 250+ cryptocurrencies with 20+ fiat currencies")}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <HomeMarketCurrenciesTable />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/currencies")}
          endIcon={<Forward30Outlined />}
          sx={{
            backgroundColor: theme.palette.grey[300],
            color: "black",
            borderRadius: 5,

            boxShadow: "0 8px 13px #00000040",
            "&:hover": {
              backgroundColor: theme.palette.grey[500],
            },
          }}
        >
          Learn More
        </Button>
      </Box>
    </Container>
  );
};

export default HomeMarket;
