import React from "react";

import { useTheme } from "@mui/system";
import { Button, Box, Grid, Typography, Pagination } from "@mui/material";
import PropType from "prop-types";
import { useCurrencyStore } from "../../../../../stores/app-settings";

const CurrencyMenuAllGrid = ({ currencies, total, size, setPage }) => {
  const theme = useTheme();

  const { selected, update } = useCurrencyStore((state) => ({
    selected: state.currency.symbol,
    update: state.updateCurrency,
  }));

  return (
    <Box className="all">
      <Typography sx={{ pb: theme.spacing(2) }}>All</Typography>
      <Grid container spacing={1}>
        {currencies?.map((e, i) => (
          <Grid key={i} item xs={12} sm={12} md={4}>
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
};

CurrencyMenuAllGrid.propType = {
  currencies: PropType.array,
  total: PropType.number,
  size: PropType.number,
  setPage: PropType.any,
};

export default CurrencyMenuAllGrid;
