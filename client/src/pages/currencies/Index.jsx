import React from "react";
import { Box, Container, Typography } from "@mui/material";
import TrendingCarousel from "../../components/ccurrencies/TrendingCarousel";
import CurrencyTable from "../../components/ccurrencies/CurrencyTable";

const Currencies = () => {
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
          bgcolor: "black.dark",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            color="inherit"
            component="div"
            sx={{
              color: "#FFFFFF",
              mb: `${0.6}rem`,
              pt: `${5}rem`,
              pb: `${5}rem`,
              fontWeight: "bold",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Currencies
          </Typography>
        </Container>

        <Box>
          <Container maxWidth="md">
            <TrendingCarousel />
          </Container>
        </Box>
      </Box>

      {/**Currencies */}
      <Box sx={{ mt: `${-5}rem`, pb: `${1}rem` }}>
        <Container maxWidth="md">
          <CurrencyTable />
        </Container>
      </Box>
    </>
  );
};

export default Currencies;
