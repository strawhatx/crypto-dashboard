import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import TrendingCarousel from "../../components/currencies/carousel/Index";
import CurrencyTable from "../../components/currencies/table/Index";
import axios from "../../config/axios";
import { useTheme } from "@mui/system";
import { getCoins } from "../../endpoints/coins";

const Currencies = () => {
  const [trending, setTrending] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const theme = useTheme();

  const fetchCoins = () => {
    axios.get(getCoins()).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          setCurrencies(json.data);
          setTrending(json.data.sort((a, b) => a.rank - b.rank).slice(0, 7));
        });
      }
    });
  };

  useEffect(() => fetchCoins(), []);
  return (
    <>
      {/** Hero */}
      <Box
        className="hero"
        sx={{
          pt: 1.25,
          pb: 15,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="div"
            sx={{
              mb: 0.6,
              py: 5,
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
      <Box sx={{ mt: -8, pb: 1 }}>
        <Container maxWidth="lg">
          <CurrencyTable currencies={currencies} />
        </Container>
      </Box>
    </>
  );
};

export default Currencies;
