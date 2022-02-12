import React from "react";
import { Box } from "@mui/system";
import AliceCarousel from "react-alice-carousel";
import { Link } from "@mui/material";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import "react-alice-carousel/lib/alice-carousel.css";

const TrendingCarousel = ({ trending }) => {
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
          color: "inherit",
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

TrendingCarousel.propType = {
  trending: PropTypes.array.isRequired,
};

export default TrendingCarousel;
