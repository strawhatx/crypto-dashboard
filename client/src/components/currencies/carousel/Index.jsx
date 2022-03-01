import React from "react";
import { Link } from "react-router-dom";
import { Box, useTheme, alpha } from "@mui/system";
import AliceCarousel from "react-alice-carousel";
import { Avatar, Card, Typography, Grid } from "@mui/material";
import NumberFormat from "react-number-format";
import "react-alice-carousel/lib/alice-carousel.css";
import { useTrendingHook } from "../../../hooks/trending";

const TrendingCarousel = () => {
  const { loading, error, trending } = useTrendingHook();
  const theme = useTheme();

  const items = trending?.map((coin) => {
    const profit = coin.change >= 0;
    return (
      <Grid item xs={10}>
        <Link
          sx={{ textDecoration: "none" }}
          to={`/currencies/${coin.name?.toLowerCase()}}`}
          state={{ uuid: coin.uuid, name: coin.name }}
        >
          <Card
            sx={{
              boxShadow: "none",
              textAlign: "center",
              padding: theme.spacing(3, 5),
              color: profit
                ? theme.palette.success.darker
                : theme.palette.error.darker,
              backgroundColor: profit
                ? theme.palette.success.lighter
                : theme.palette.error.lighter,
            }}
          >
            <Box
              sx={{
                margin: "auto",
                display: "flex",
                borderRadius: "50%",
                alignItems: "center",
                width: theme.spacing(8),
                height: theme.spacing(8),
                justifyContent: "center",
                marginBottom: theme.spacing(3),
                color: profit
                  ? theme.palette.success.dark
                  : theme.palette.error.dark,
                backgroundImage: `linear-gradient(135deg, ${alpha(
                  profit
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
                  0
                )} 0%, ${alpha(
                  profit
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
                  0.24
                )} 100%)`,
              }}
            >
              <Avatar
                src={coin.iconUrl}
                alt={coin.name}
                width={24}
                height={24}
              />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ mr: 1 }}>
                <NumberFormat
                  value={coin.price?.toString()}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={
                    coin.price >= 1
                      ? 2
                      : coin.price
                          ?.split("")
                          .findIndex((e) => parseInt(e) > 0) + 2
                  }
                  prefix={"$"}
                />
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color: profit
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
                  fontWeight: 400,
                }}
              >
                <NumberFormat
                  value={`${profit && "+"} ${coin.change}%`}
                  displayType={"text"}
                  decimalScale={2}
                  thousandSeparator={true}
                />
                %
              </Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              {coin.name}
            </Typography>
          </Card>
        </Link>
      </Grid>
    );
  });

  return (
    <Box sx={{ display: "flex" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={{
          0: { items: 1 },
          400: { items: 2 },
          650: { items: 3 },
          800: { items: 4 },
        }}
        autoPlay
        items={items}
      />
    </Box>
  );
};

export default TrendingCarousel;
