import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Grid, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

const CurrencyInfobar = ({
  coinMarketcap,
  coin24hVolume,
  coinCirculatingSupply,
  coinMaxSupply,
}) => {
  const theme = useTheme();

  const card = (label, value) => {
    return (
      <Card
        sx={{
          bgcolor: theme.palette.primary.light,
          color: theme.palette.grey[600],
          boxShadow: 0,
        }}
      >
        +
        <CardContent sx={{ display: "flex", flex: "1 1 0%" }}>
          <Box>
            <Typography variant="h3">{value}</Typography>
            <Typography variant="p">{label}</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {card("Marketcap", coinMarketcap)}
        </Grid>
        <Grid item xs={6}>
          {card("24h Volume", coin24hVolume)}
        </Grid>
        <Grid item xs={6}>
          {card("Circulating Supply", coinCirculatingSupply)}
        </Grid>
        <Grid item xs={6}>
          {card("Max Supply", coinMaxSupply)}
        </Grid>
      </Grid>
    </>
  );
};

CurrencyInfobar.propType = {
  coinMarketcap: PropTypes.string.isRequired,
  coin24hVolume: PropTypes.string.isRequired,
  coinCirculatingSupply: PropTypes.string.isRequired,
  coinMaxSupply: PropTypes.string.isRequired,
};

export default CurrencyInfobar;
