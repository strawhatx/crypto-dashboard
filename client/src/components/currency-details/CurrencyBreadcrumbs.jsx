import { Breadcrumbs, Typography, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";

const CurrencyBreadcrumbs = () => {
  const { id } = useParams();

  const breadcrumbs = [
    <Typography
      key="1"
      color="inherit"
      sx={{ "&:hover": { color: "primary.main", cursor: "pointer" } }}
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
      sx={{ color: "#657786" }}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default CurrencyBreadcrumbs;
