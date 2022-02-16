import React from "react";
import { Box, Container } from "@mui/material";
import CurrencyBreadcrumbs from "../../components/currency/breadcrumbs/Index";
import CurrencyChart from "../../components/currency/chart/Index";

const CurrencyDetail = (props) => {
  return (
    <>
      {/** Hero */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          pt: `${5.25}rem`,
          pb: `${5.3}rem`,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Container maxWidth="lg">
          <CurrencyBreadcrumbs />
          <CurrencyChart />
        </Container>
      </Box>
    </>
  );
};

export default CurrencyDetail;
