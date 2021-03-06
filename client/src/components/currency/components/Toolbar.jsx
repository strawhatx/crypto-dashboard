import React, { useState } from "react";
import { StarOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Avatar, Box, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import useAuthStore from "../../../stores/authentication";
import { axios } from "../../../config/axios";
import { useCurrencyWatchlist } from "../../../hooks/currency/currency-watchlist";

const CurrencyToolbar = ({ coinId, coinName, coinSymbol, coinIconUrl }) => {
  const theme = useTheme();

  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  const { checked, setChecked } = useCurrencyWatchlist(coinId);

  const handleToggle = async () => {
    if (checked) {
      await handleAdd();
    } else {
      handleRemove();
    }
  };

  const handleAdd = async () => {
    await axios
      .post("/watchlists/add", {
        userId: currentUser.uid,
        coinId,
        coinName,
      })
      .then(async () => {
        setChecked(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemove = async () => {
    await axios
      .delete("/watchlists/", {
        userId: currentUser.uid,
        coinId,
      })
      .then(async () => {
        setChecked(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

          {currentUser && (
            <Button
              color="inherit"
              size="medium"
              startIcon={<StarOutline fontSize="large" htmlColor="inherit" />}
              aria-label="watchlist"
              variant="text"
              onClick={handleToggle}
            ></Button>
          )}
        </Box>
      </Box>
    </>
  );
};

CurrencyToolbar.propTypes = {
  coinId: PropTypes.string,
  coinName: PropTypes.string,
  coinSymbol: PropTypes.string,
  coinIconUrl: PropTypes.string,
};

export default CurrencyToolbar;
