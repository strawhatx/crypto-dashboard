import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import CurrencyBreadcrumbs from "../../components/currency/price-converter/Index";
import CurrencyChart from "../../components/currency/chart/Index";
import { useLocation } from "react-router-dom";
import axios from "../../config/axios";
import CurrencyToolbar from "../../components/currency/toolbar/Index";
import { useTheme } from "@mui/system";
import CurrencyInfobar from "../../components/currency/infobar/Index";

const CurrencyDetail = () => {
  const [coin, setCoin] = useState({});
  const { state } = useLocation();
  const theme = useTheme();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(`coins/${state.uuid}`);

      setCoin(data.data.coin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {/** Hero */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          pt: theme.spacing(5.25),
          pb: theme.spacing(7.3),
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Container maxWidth="lg">
          {/**<CurrencyBreadcrumbs />*/}
          <CurrencyToolbar
            coinName={coin.name}
            coinSymbol={coin.symbol}
            coinIconUrl={coin.iconUrl}
          />

          <CurrencyChart coinName={coin.name} coinPrice={coin.price} />
        </Container>
      </Box>

      {/**Currencies */}
      <Box sx={{ mt: -8, pb: 1 }}>
        <Container maxWidth="lg">
          <CurrencyInfobar
            coinMarketcap={coin.marketCap}
            coin24hVolume={coin["24hVolume"]}
            coinCirculatingSupply={coin.supply?.circulating}
            coinMaxSupply={coin.supply?.total}
          />
        </Container>
      </Box>
    </>
  );
};

export default CurrencyDetail;
