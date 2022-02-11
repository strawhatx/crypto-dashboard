import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "@mui/material";
import { getTickers } from "../../endpoints/coinpaprika";
import NumberFormat from "react-number-format";

import "react-alice-carousel/lib/alice-carousel.css";

const TrendingCarousel = () => {
  const [trending, setTrending] = useState([]);

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(getTickers());

      setTrending(data.sort((a, b) => a.rank - b.rank).slice(0, 7));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => fetchCoins(), []);

  const items = trending.map((coin) => {
    const profit = coin?.quotes.USD.percent_change_24h >= 0;
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
        <img
          src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/color/${coin.symbol.toLowerCase()}.svg`}
          alt={coin.name}
          height="80"
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{ color: profit > 0 ? "green" : "red", fontWeight: 400 }}
          >
            <NumberFormat
              value={`${
                profit && "+"
              } ${coin?.quotes.USD.percent_change_24h?.toFixed(2)}%`}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </span>
        <span sx={{ fontSize: 22, fontWeight: 500 }}>
          <NumberFormat
            value={coin?.quotes.USD.price?.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
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
