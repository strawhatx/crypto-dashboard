import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/system";

const CurrencyBreadcrumbs = () => {
  const { state } = useLocation();
  const theme = useTheme();

  const breadcrumbs = [
    <Typography
      key="1"
      sx={{
        "&:hover": { color: theme.palette.secondary.main, cursor: "pointer" },
      }}
      href="/currencies"
    >
      Cryptocurrencies
    </Typography>,
    <Typography key="2" color="inherit">
      {state.name}
    </Typography>,
  ];

  return (
    <Card
      sx={{
        bgcolor: "transparent",
        color: theme.palette.primary.contrastText,
        boxShadow: 0,
      }}
    >
      <CardContent>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" htmlColor="inherit" />}
          aria-label="breadcrumb"
          sx={{ mb: "1.125rem", display: "flex", alignItems: "baseline" }}
        >
          {breadcrumbs}
        </Breadcrumbs>
      </CardContent>
    </Card>
  );
};

export default CurrencyBreadcrumbs;
