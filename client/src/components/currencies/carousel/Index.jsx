import React, { useState, useEffect } from "react";
import { Box, useTheme, alpha } from "@mui/system";
import AliceCarousel from "react-alice-carousel";
import { Avatar, Card, Link, Typography, Grid } from "@mui/material";
import NumberFormat from "react-number-format";

import "react-alice-carousel/lib/alice-carousel.css";
import axios from "../../../config/axios";

const TrendingCarousel = () => {
  const [trending, setTrending] = useState([]);

  const theme = useTheme();

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(`coins/trending/`);

      setTrending(data.data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => fetchCoins(), []);

  const items = trending.map((coin) => {
    const profit = parseInt(coin.change) >= 0;
    return (
      <Grid item xs={10}>
        <Link
          sx={{ textDecoration: "none" }}
          to={`/coins/${coin.id}`}
          state={{ uuid: coin.uuid, name: coin.name }}
        >
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
                src={coin.iconUrl}
                alt={coin.name}
                width={24}
                height={24}
              />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ mr: 1 }}>
                <NumberFormat
                  value={coin.price?.toFixed(2)}
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
                  value={`${profit && "+"} ${parseInt(coin.change_24h)?.toFixed(
                    2
                  )}`}
                  displayType={"text"}
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
