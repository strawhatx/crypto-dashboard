import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";

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
          py: "140px",
          bgcolor: "primary.dark",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            color="inherit"
            component="div"
            sx={{ my: "30px" }}
          >
            Currencies
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Currencies;
