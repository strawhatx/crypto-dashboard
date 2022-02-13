import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import TrendingCarousel from "../../components/currencies/carousel/Index";
import CurrencyTable from "../../components/currencies/table/Index";
import axios from "axios";
import { getTickers } from "../../endpoints/coinpaprika";

const Currencies = () => {
  const [trending, setTrending] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(getTickers());
      setCurrencies(data);
      setTrending(data.sort((a, b) => a.rank - b.rank).slice(0, 7));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => fetchCoins(), []);
  return (
    <>
      {/** Hero */}
      <Box
        sx={{
          pt: `${1.25}rem`,
          pb: `${7.3}rem`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: 5, mb: `${0.6}rem` }}>
            <Typography variant="h4">Currencies</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TrendingCarousel trending={trending} />
            </Grid>
            <Grid item xs={12}>
              <CurrencyTable currencies={currencies} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Currencies;
