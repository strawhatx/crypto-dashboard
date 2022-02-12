import { Breadcrumbs, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";

const CurrencyBreadcrumbs = () => {
  const { id } = useParams();

  const breadcrumbs = [
    <Typography
      key="1"
      sx={{ "&:hover": { color: "secondary.main", cursor: "pointer" } }}
      href="/currencies"
    >
      Cryptocurrencies
    </Typography>,
    <Typography key="2" color="inherit">
      {id}
    </Typography>,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" htmlColor="inherit" />}
      aria-label="breadcrumb"
      sx={{ mb: "1.125rem" }}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default CurrencyBreadcrumbs;
