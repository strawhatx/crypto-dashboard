import React from "react";
import { Box, useTheme, alpha } from "@mui/system";
import AliceCarousel from "react-alice-carousel";
import { Avatar, Card, Link, Typography, Grid } from "@mui/material";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import "react-alice-carousel/lib/alice-carousel.css";

const TrendingCarousel = ({ trending }) => {
  const theme = useTheme();

  const items = trending.map((coin) => {
    const profit = coin?.quotes.USD.percent_change_24h >= 0;
    return (
      <Grid item xs={10}>
        <Link sx={{ textDecoration: "none" }} to={`/coins/${coin.id}`}>
          <Card
            sx={{
              boxShadow: "none",
              textAlign: "center",
              padding: theme.spacing(3, 5),
              color:
                profit > 0
                  ? theme.palette.success.darker
                  : theme.palette.error.darker,
              backgroundColor:
                profit > 0
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
                color:
                  profit > 0
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
                backgroundImage: `linear-gradient(135deg, ${alpha(
                  profit > 0
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
                  0
                )} 0%, ${alpha(
                  profit > 0
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
                  0.24
                )} 100%)`,
              }}
            >
              <Avatar
                src={`https://cdn.coinranking.com/Sy33Krudb/${coin.symbol.toLowerCase()}.svg`}
                alt={coin.name}
                width={24}
                height={24}
              />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ mr: 1 }}>
                <NumberFormat
                  value={coin?.quotes.USD.price?.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color:
                    profit > 0
                      ? theme.palette.success.dark
                      : theme.palette.error.dark,
                  fontWeight: 400,
                }}
              >
                <NumberFormat
                  value={`${
                    profit && "+"
                  } ${coin?.quotes.USD.percent_change_24h?.toFixed(2)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                %
              </Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              {coin?.name}
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

TrendingCarousel.propType = {
  trending: PropTypes.array.isRequired,
};

export default TrendingCarousel;
