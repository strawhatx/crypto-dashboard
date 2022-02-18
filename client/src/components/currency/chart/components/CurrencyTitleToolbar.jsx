import React from "react";
import { StarOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

const CurrencyTitleToolbar = ({ currency }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        mb: 4,
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      {/** Toolbar */}
      <Box sx={{ display: "flex", mx: { xs: "auto", sm: 0 } }}>
        <Avatar
          src={currency.iconUrl}
          alt="currency-tag"
          sx={{
            width: { xs: theme.spacing(2.5), sm: theme.spacing(5) },
            height: { xs: theme.spacing(2.5), sm: theme.spacing(5) },
            marginRight: "1rem",
            marginBottom: ".4rem",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <Box
            sx={{
              typography: { xs: theme.typography.h5, sm: theme.typography.h4 },
              fontWeight: theme.typography.fontWeightMedium,
              mr: theme.spacing(2),
            }}
          >
            {currency?.name}
          </Box>

          <Box
            sx={{
              typography: { xs: theme.typography.h6, sm: theme.typography.h5 },
              fontWeight: theme.typography.fontWeightMedium,
              color: "text.secondary",
            }}
          >
            {currency?.symbol}
          </Box>
        </Box>
      </Box>

      {/* Watch list */}
      <Box sx={{ mx: { xs: "auto", sm: 0 } }}>
        <Button
          color="inherit"
          size="medium"
          startIcon={<StarOutline fontSize="medium" htmlColor="inherit" />}
          aria-label="watchlist"
          variant="text"
        >
          <Typography sx={{ padding: 1 }}>Add to Watchlist</Typography>
        </Button>
      </Box>
    </Box>
  );
};

CurrencyTitleToolbar.propType = {
  currency: PropTypes.object.isRequired,
};

export default CurrencyTitleToolbar;
