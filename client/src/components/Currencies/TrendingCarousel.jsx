import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "@mui/material";
import { trendingCoins } from "../../endpoints/coingecko";
import { numberWithCommas } from "../../util/coins-util";

import "react-alice-carousel/lib/alice-carousel.css";

const TrendingCarousel = () => {
  const [trending, setTrending] = useState([]);
  const currency = "usd";

  useEffect(async () => {
    try {
      const { data } = await axios.get(trendingCoins(currency));

      setTrending(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
        to={`/coins/${coin.id}`}
      >
        <img src={coin.image} alt={coin.name} height="80" />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{ color: profit > 0 ? "green" : "red", fontWeight: 400 }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span sx={{ fontSize: 22, fontWeight: 500 }}>
          $ {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <Box sx={{ height: `${50}%`, display: "flex", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={{ 0: { items: 2 }, 512: { items: 4 } }}
        autoPlay
        items={items}
      />
    </Box>
  );
};

export default TrendingCarousel;
