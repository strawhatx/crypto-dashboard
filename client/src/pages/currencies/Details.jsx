import React from "react";
import { Box, Container } from "@mui/material";
import CurrencyBreadcrumbs from "../../components/currency-details/CurrencyBreadcrumbs";

const CurrencyDetail = () => {
  return (
    <>
      {/** Hero */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          pt: `${1.25}rem`,
          pb: `${5.3}rem`,
          bgcolor: "black.dark",
        }}
      >
        <Container maxWidth="md">
          <CurrencyBreadcrumbs />
        </Container>
      </Box>
    </>
  );
};

export default CurrencyDetail;
