import React from "react";
import { StarOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Avatar, Box, Button, Typography } from "@mui/material";

const CurrencyTitleToolbar = ({ currency }) => {
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
          src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/color/${currency?.symbol?.toLowerCase()}.svg`}
          alt="currency-tag"
          sx={{
            width: { xs: 30, sm: 40 },
            height: { xs: 30, sm: 40 },
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
              typography: { xs: "h5", sm: "h4" },
              fontWeight: "medium",
              mr: 2,
            }}
          >
            {currency?.name}
          </Box>

          <Box
            sx={{
              typography: { xs: "h6", sm: "h5" },
              fontWeight: "medium",
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
