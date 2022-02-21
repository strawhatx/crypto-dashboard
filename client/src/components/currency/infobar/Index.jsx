import React from "react";
import PropTypes from "prop-types";
import { Card, Stack, Grid, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import NumberFormat from "react-number-format";

const CurrencyInfobar = ({
  coinMarketcap,
  coin24hVolume,
  coinCirculatingSupply,
  coinMaxSupply,
}) => {
  const theme = useTheme();
  const items = [
    { label: "Circulating Supply", value: coinCirculatingSupply },
    { label: "Max Supply", value: coinMaxSupply },
    { label: "Market Cap", value: coinMarketcap },
    { label: "24h Volume", value: coin24hVolume },
  ];

  const stack = items.map((e, i) => {
    return (
      <Stack
        direction="column"
        alignItems="left"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          borderBottom: i < items.length - 1 ? 1 : 0,
          borderColor: theme.palette.grey[300],
          padding: theme.spacing(1.5625, 1.75),
        }}
      >
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ fontSize: 16, color: theme.palette.grey[500] }}
        >
          {e.label}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            pr: 3,
            flexShrink: 0,
            color: theme.palette.grey[700],
          }}
        >
          <NumberFormat
            value={e.value?.toString()}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Typography>
      </Stack>
    );
  });

  const card = (label, value) => {
    return (
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
              value={value?.toString()}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </Typography>
        </Box>

        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {label}
        </Typography>
      </Card>
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          {card("Circulating Supply", coinCirculatingSupply)}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {card("Max Supply", coinMaxSupply)}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {card("Marketcap", coinMarketcap)}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {card("24h Volume", coin24hVolume)}
        </Grid>
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
