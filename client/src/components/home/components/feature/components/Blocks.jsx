import React from "react";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Card, Typography, Grid, Chip } from "@mui/material";
import {
  BalanceOutlined,
  CollectionsBookmarkOutlined,
  StarOutline,
} from "@mui/icons-material";

const HomeFeatureBlocks = () => {
  const { t } = useTranslation();

  const theme = useTheme();

  const items = [
    {
      icon: BalanceOutlined,
      title: "Transparency & Stability",
      text: "In crypto, transparency brings trust & strong transparency.",
    },
    {
      icon: CollectionsBookmarkOutlined,
      title: "Multiple Wallet Tracking",
      text: "Track multiple crypo portfolios easily and effeciently.",
    },
    {
      icon: StarOutline,
      title: "Unlimited Watchlists",
      text: "Track all your favorite coins with no cap. not ever.",
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                padding: "65px 25px 35px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px 0",
                boxShadow: "7px 5px 30px #48497926",
              }}
            >
              <Chip
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: 75,
                  width: 75,
                  borderRadius: 0,
                  mb: 4,
                  clipPath:
                    "polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)",

                  "& .MuiChip-icon": {
                    color: theme.palette.primary.main,
                    margin: 0,
                  },
                }}
                icon={
                  <item.icon
                    sx={{
                      zIndex: 1,
                      lineHeight: 1,
                      fontSize: 40,
                      color: "#9356f5",
                      position: "relative",
                    }}
                  />
                }
              />

              <Typography
                variant="h4"
                component="div"
                sx={{
                  textAlign: "center",
                  mb: 1.5,
                }}
              >
                {t(item.title)}
              </Typography>
              <Typography
                variant="p"
                component="div"
                sx={{
                  textAlign: "center",
                  pb: theme.spacing(1),
                  fontSize: 18,
                }}
              >
                {t(item.text)}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomeFeatureBlocks;
