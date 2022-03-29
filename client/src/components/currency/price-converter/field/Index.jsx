import React from "react";
import { useTheme } from "@mui/system";
import { Box, Typography, Avatar, Input } from "@mui/material";
import PropTypes from "prop-types";

const CurrencyPriceConverterFeild = ({
  name,
  symbol,
  iconUrl,
  amount,
  change,
}) => {
  const theme = useTheme();

  //const handleDecimalScale = (value) => {
  //  if (value <= 0) return;
  //
  //  let valString = value.toString();
  //
  //  return value >= 1
  //    ? 2
  //    : valString?.split("").findIndex((e) => parseInt(e) > 0) + 2;
  //};

  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 0%",
        flexDirection: "row",
        padding: theme.spacing(3.5, 4),
      }}
    >
      <Avatar
        src={iconUrl}
        alt="currency-tag"
        width={40}
        height={40}
        style={{ marginRight: "1rem" }}
      />
      <Box sx={{ marginRight: "1rem" }}>
        <Box>
          <Typography variant="p" sx={{ fontSize: 12 }}>
            {symbol}
          </Typography>
        </Box>
        <Box>
          <Typography variant="p" sx={{ fontSize: 12 }}>
            {name}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: "1 1 0%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Input
          type="number"
          pattern="[0-9]*"
          fullWidth
          sx={{
            "&:before": { border: "none" },
            "& input": { textAlign: "right" },
            py: theme.spacing(1.2),
            bgColor: "transparent",
            borderColor: theme.palette.grey[300],

            border: "none",
            width: "100%",
            fontSize: 18,
          }}
          value={amount}
          onChange={(e) => change(e)}
        />
      </Box>
    </Box>
  );
};

CurrencyPriceConverterFeild.propTypes = {
  name: PropTypes.string,
  symbol: PropTypes.string,
  iconUrl: PropTypes.string,
  amount: PropTypes.number,
  change: PropTypes.func,
};

export default CurrencyPriceConverterFeild;
