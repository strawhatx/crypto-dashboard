import React, { useState, useEffect } from "react";
import { useCurrencyStore } from "../../../stores/global";
import { useTheme } from "@mui/system";
import { useCurrencyReferencesHook } from "../../../hooks/currency-references";
import BasicDialog from "../../dialog/Index";
import NoResultsImg from "../../../assets/images/no-results.svg";
import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";

const CurrencyMenu = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const { loading, error, total, size, popularCurrencies, allCurrencies } =
    useCurrencyReferencesHook(page, search);

  const { selected, update } = useCurrencyStore((state) => ({
    selected: state.currency.symbol,
    update: state.updateCurrency,
  }));

  const popularGrid = (
    <Box className="popular" sx={{ mb: theme.spacing(4) }}>
      <Typography sx={{ pb: theme.spacing(2) }}>Popular</Typography>
      <Grid container spacing={1}>
        {popularCurrencies?.map((e, i) => (
          <Grid key={i} item xs={6} md={4}>
            <Button
              fullWidth
              onClick={() => update(e)}
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                height: theme.spacing(6),
              }}
            >
              <Typography
                variant="p"
                sx={{
                  color:
                    e.symbol === selected ? theme.palette.secondary.main : "",
                }}
              >
                {e.name} ({e.symbol})
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const allGrid = (
    <Box className="all">
      <Typography sx={{ pb: theme.spacing(2) }}>All</Typography>
      <Grid container spacing={1}>
        {allCurrencies?.map((e, i) => (
          <Grid key={i} item xs={6} md={4}>
            <Button
              fullWidth
              onClick={() => update(e)}
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                height: theme.spacing(6),
              }}
            >
              <Typography
                variant="p"
                sx={{
                  color:
                    e.symbol === selected ? theme.palette.secondary.main : "",
                }}
              >
                {e.name} ({e.symbol})
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
      {/* Comes from @material-ui/lab */}
      <Pagination
        count={parseInt((total / size).toFixed(0))}
        sx={{
          padding: 2,
          pt: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Box>
  );

  const NoResults = (
    <Box
      className="no-results"
      sx={{
        display: "flex",
        padding: theme.spacing(4),
        mt: theme.spacing(5),
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "block" }}>
        <Box>
          <img
            src={NoResultsImg}
            className="no-results-img"
            alt="no results"
            style={{ margin: "auto" }}
          />
        </Box>
        <Box>
          <p>No search results</p>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <BasicDialog
        btnTitle={selected}
        title="Select a currency"
        children={
          <Box sx={{ pb: theme.spacing(5) }}>
            <Box classNames="search" sx={{ mb: theme.spacing(4) }}>
              <TextField
                label="Search"
                size="small"
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            {popularCurrencies.length > 0 && popularGrid}

            {allCurrencies.length > 0 && allGrid}

            {popularCurrencies.length <= 0 &&
              allCurrencies.length <= 0 &&
              NoResults}
          </Box>
        }
      />
    </>
  );
};

export default CurrencyMenu;
