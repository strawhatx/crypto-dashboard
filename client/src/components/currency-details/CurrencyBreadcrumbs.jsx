import { Breadcrumbs } from "@mui/material";
import { NavigateNextIcon } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";

const CurrencyBreadcrumbs = () => {
  const { id } = useParams();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/currencies">
      Cryptocurrencies
    </Link>,
    <Typography key="2" color="text.primary">
      {id}
    </Typography>,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default CurrencyBreadcrumbs;
