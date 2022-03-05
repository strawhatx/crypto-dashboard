import React from "react";
import PropTypes from "prop-types";
import { Card, Grid, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";

const CurrencyInfobar = ({
  coinMarketcap,
  coin24hVolume,
  coinCirculatingSupply,
  coinMaxSupply,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const items = [
    { label: t("Circulating Supply"), value: coinCirculatingSupply },
    { label: t("Max Supply"), value: coinMaxSupply },
    { label: t("Market Cap"), value: coinMarketcap },
    { label: t("24h Volume"), value: coin24hVolume },
  ];

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000 && num < 1000000000) {
      return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million < 1 billion
    } else if (num > 1000000000) {
      return (num / 1000000000).toFixed(2) + "B"; // convert to B for number from > 1 billion
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

  const stack = items.map((e, i) => {
    return (
      <Grid key={i} item xs={12} sm={6} md={3}>
        <Card
          sx={{
            boxShadow: "none",
            textAlign: "center",
            padding: theme.spacing(3, 5),
            backgroundColor: "#f5f5f5e3",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ mr: 1 }}>
              {numFormatter(e.value)}
            </Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            {e.label}
          </Typography>
        </Card>
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {stack}
      </Grid>
    </Box>
  );
};

CurrencyInfobar.propTypes = {
  coinMarketcap: PropTypes.string,
  coin24hVolume: PropTypes.string,
  coinCirculatingSupply: PropTypes.string,
  coinMaxSupply: PropTypes.string,
};

export default CurrencyInfobar;
