import React from "react";
import { StarOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Avatar, Box, Button } from "@mui/material";
import { useTheme } from "@mui/system";

const CurrencyToolbar = ({ coinName, coinSymbol, coinIconUrl }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          mx: { xs: "auto", sm: 0 },
          pb: 4,
        }}
      >
        <Avatar
          src={coinIconUrl}
          alt="coin-tag"
          sx={{
            width: { xs: theme.spacing(2.5), sm: theme.spacing(5) },
            height: { xs: theme.spacing(2.5), sm: theme.spacing(5) },
            marginRight: "1rem",
            marginBottom: ".4rem",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <Box
              sx={{
                typography: {
                  xs: theme.typography.h5,
                  sm: theme.typography.h4,
                },
                fontWeight: theme.typography.fontWeightMedium,
                mr: theme.spacing(2),
              }}
            >
              {coinName}
            </Box>

            <Box
              sx={{
                typography: {
                  xs: theme.typography.h6,
                  sm: theme.typography.h5,
                },
                fontWeight: theme.typography.fontWeightMedium,
                color: "text.secondary",
              }}
            >
              {coinSymbol}
            </Box>
          </Box>

          <Button
            color="inherit"
            size="medium"
            startIcon={<StarOutline fontSize="large" htmlColor="inherit" />}
            aria-label="watchlist"
            variant="text"
          ></Button>
        </Box>
      </Box>
    </>
  );
};

CurrencyToolbar.propTypes = {
  coinName: PropTypes.string.isRequired,
  coinSymbol: PropTypes.string.isRequired,
  coinIconUrl: PropTypes.string.isRequired,
};

export default CurrencyToolbar;
