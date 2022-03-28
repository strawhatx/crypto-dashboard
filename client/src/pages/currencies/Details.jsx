import React from "react";
import { Box, Container } from "@mui/material";
import CurrencyChart from "../../components/currency/chart/Index";
import { useLocation } from "react-router-dom";
import CurrencyToolbar from "../../components/currency/toolbar/Index";
import { useTheme } from "@mui/system";
import CurrencyInfobar from "../../components/currency/infobar/Index";
import { useCurrencyHook } from "../../hooks/currency";
import CurrencyPriceConverter from "../../components/currency/price-converter/Index";
import CurrencyDescription from "../../components/currency/description/Index";

const CurrencyDetail = () => {
  const { state } = useLocation();
  const theme = useTheme();

  const { error, coin } = useCurrencyHook(state.uuid);

  return (
    <>
      {/* Hero */}
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

      {/** statistics */}
      <Box sx={{ mt: -8, pb: 3 }}>
        <Container maxWidth="lg">
          <CurrencyInfobar
            coinMarketcap={coin.marketCap}
            coin24hVolume={coin["24hVolume"]}
            coinCirculatingSupply={coin.supply?.circulating}
            coinMaxSupply={coin.supply?.total}
          />
        </Container>
      </Box>

      {/** price conveter */}
      <Box sx={{ pb: 4 }}>
        <Container maxWidth="lg">
          <CurrencyPriceConverter
            coinName={coin.name}
            coinSymbol={coin.symbol}
            coinIconUrl={coin.iconUrl}
            coinPrice={parseInt(coin.price)}
          />
        </Container>
      </Box>

      {/** about */}
      <Box sx={{ pb: 4 }}>
        <Container maxWidth="lg">
          <CurrencyDescription
            name={coin.name}
            rank={coin.rank}
            description={coin.description}
          />
        </Container>
      </Box>
    </>
  );
};

export default CurrencyDetail;
