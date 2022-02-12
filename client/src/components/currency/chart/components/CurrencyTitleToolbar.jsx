import React from "react";
import { StarOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

const CurrencyTitleToolbar = ({ currency }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      {/** Toolbar */}
      <Box sx={{ display: "flex" }}>
        <img
          src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/color/${currency?.symbol?.toLowerCase()}.svg`}
          alt="currency-tag"
          width={40}
          height={40}
          style={{ marginRight: "1rem", marginBottom: ".4rem" }}
        />
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: "medium", mr: 2 }}
          >
            {currency?.name}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "medium", color: "text.secondary" }}
          >
            {currency?.symbol}
          </Typography>
        </Box>
      </Box>

      {/* Watch list */}
      <Box>
        <Button
          color="inherit"
          startIcon={<StarOutline fontSize="medium" htmlColor="inherit" />}
          aria-label="watchlist"
          variant="text"
        >
          <Typography sx={{ display: { xs: "none", sm: "flex" }, padding: 1 }}>
            Add to Watchlist
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

CurrencyTitleToolbar.propType = {
  currency: PropTypes.object.isRequired,
};

export default CurrencyTitleToolbar;
