import React from "react";
import { StarOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  Box,
  Button,
  Typography,
  CardContent,
} from "@mui/material";
import { useTheme } from "@mui/system";

const CurrencyToolbar = ({ coinName, coinSymbol, coinIconUrl }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: "transparent",
        color: theme.palette.primary.contrastText,
        boxShadow: 0,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Box sx={{ display: "flex", mx: { xs: "auto", sm: 0 } }}>
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
      </CardContent>
      {/** Toolbar */}
    </Card>
  );
};

CurrencyToolbar.propType = {
  coinName: PropTypes.string.isRequired,
  coinSymbol: PropTypes.string.isRequired,
  coinIconUrl: PropTypes.string.isRequired,
};

export default CurrencyToolbar;
