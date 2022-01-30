import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import CardSlider from "../../components/CardSlider";

const Currencies = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/")
      .then((response) => {
        console.log(response.data);
        setCurrencies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          pt: `${1.25}rem`,
          pb: `${7.3}rem`,
          mb: `${-3.75}rem`,
          bgcolor: "primary.dark",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            color="inherit"
            component="div"
            sx={{ color: "#FFFFFF", mb: `${0.52}rem`, pt: `${5}rem` }}
          >
            Currencies
          </Typography>

          <CardSlider children={[1, 2, 3, 4, 5, 6, 7]} />
        </Container>
      </Box>
    </>
  );
};

export default Currencies;
