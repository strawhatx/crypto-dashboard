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

  const stack = items.map((e, i) => {
    return (
      <Grid item xs={12} sm={6} md={3}>
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
              <NumberFormat
                value={e.value?.toString()}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
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

CurrencyInfobar.propType = {
  coinMarketcap: PropTypes.string.isRequired,
  coin24hVolume: PropTypes.string.isRequired,
  coinCirculatingSupply: PropTypes.string.isRequired,
  coinMaxSupply: PropTypes.string.isRequired,
};

export default CurrencyInfobar;
