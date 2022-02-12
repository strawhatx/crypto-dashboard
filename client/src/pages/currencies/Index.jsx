import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          pt: `${1.25}rem`,
          pb: `${7.3}rem`,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            component="div"
            sx={{
              mb: `${0.6}rem`,
              pt: `${5}rem`,
              pb: `${5}rem`,
              fontWeight: "bold",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Currencies
          </Typography>
        </Container>

        <Box>
          <Container maxWidth="lg">
            <TrendingCarousel trending={trending} />
          </Container>
        </Box>
      </Box>

      {/**Currencies */}
      <Box sx={{ mt: `${-5}rem`, pb: `${1}rem` }}>
        <Container maxWidth="lg">
          <CurrencyTable currencies={currencies} />
        </Container>
      </Box>
    </>
  );
};

export default Currencies;
