import React from "react";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Card, CardContent, Grid } from "@mui/material";

const HomeMarketFeatureBlocks = () => {
  const { t } = useTranslation();

  const theme = useTheme();

  const items = [
    {
      icon: "",
      title: "Transparency & Stability",
      text: "In crypto, transparency brings trust & strong transparency.",
    },
    {
      icon: "",
      title: "Multiple Wallet Tracking",
      text: "Track multiple crypo portfolios easily and effeciently.",
    },
    {
      icon: "",
      title: "Unlimited Watchlists",
      text: "Track all your favorite coins with no cap. not ever.",
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent></CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomeMarketFeatureBlocks;
