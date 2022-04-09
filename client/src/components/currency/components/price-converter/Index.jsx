import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/system";
import { useCurrencyStore } from "../../../../stores/app-settings";
import { useCurrencyReferenceHook } from "../../../../hooks/currency/currency-reference";
import PropTypes from "prop-types";
import CurrencyPriceConverterFeild from "./components/Field";

const CurrencyPriceConverter = ({
  coinName,
  coinSymbol,
  coinIconUrl,
  coinPrice,
}) => {
  const [amount, setAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [fromAmount, setFromAmount] = useState(0);
  const [amountInFrom, setAmountInFrom] = useState(true);

  const theme = useTheme();

  const { selected } = useCurrencyStore((state) => ({
    selected: state.currency.symbol,
  }));

  const { error, currency } = useCurrencyReferenceHook(selected);

  useEffect(() => {
    if (!coinPrice) return;

    if (amountInFrom) {
      setFromAmount(amount);
      setToAmount(amount * coinPrice);
    } else {
      setToAmount(amount);
      setFromAmount(amount / coinPrice);
    }
  }, [amountInFrom, amount, coinPrice]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFrom(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFrom(false);
  };

  return (
    <>
      <Typography variant="h5" sx={{ my: theme.spacing(1.5) }}>
        {coinSymbol} to {currency.symbol} Conversion
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "column", md: "row" },
          border: `${1}px solid`,
          borderRadius: theme.spacing(2),
          borderColor: theme.palette.grey[300],
        }}
      >
        <CurrencyPriceConverterFeild
          name={coinName}
          symbol={coinSymbol}
          iconUrl={coinIconUrl}
          amount={fromAmount}
          change={handleFromAmountChange}
        />

        <CurrencyPriceConverterFeild
          name={currency.name}
          symbol={currency.symbol}
          iconUrl={currency.iconUrl}
          amount={toAmount}
          change={handleToAmountChange}
        />
      </Box>
    </>
  );
};

CurrencyPriceConverter.propTypes = {
  coinName: PropTypes.string,
  coinSymbol: PropTypes.string,
  coinIconUrl: PropTypes.string,
  coinPrice: PropTypes.number,
};

export default CurrencyPriceConverter;
