import React, { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { useCurrenciesHook } from "../../../../hooks/currencies/currencies";
import WatchlistAddCoinsList from "./components/List";
import BasicDialog from "../../../dialog/Index";

const WatchlistAddCoin = () => {
  const [open, setOpen] = useState(false);
  const page = 1;
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const { coins } = useCurrenciesHook(page, search, 6);

  return (
    <>
      <Button
        color="primary"
        aria-label="add to watchlist"
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add to Watchlist
      </Button>

      <BasicDialog
        title="Select a coin"
        type="language"
        open={open}
        setOpen={setOpen}
        size="xs"
        children={
          <Box sx={{ pb: theme.spacing(5) }}>
            <Box
              classNames="search"
              sx={{ mb: theme.spacing(4), justifyContent: "center" }}
            >
              <TextField
                label="Search"
                size="small"
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <WatchlistAddCoinsList currencies={coins} />
          </Box>
        }
      />
    </>
  );
};

export default WatchlistAddCoin;
