import React, { useState } from "react";
import { Button } from "@mui/material";
import { useCurrenciesHook } from "../../../../hooks/currencies/currencies";
import WatchlistAddCoinsList from "./components/List";

const WatchlistAddCoin = () => {
  const [open, setOpen] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const { coins } = useCurrenciesHook(page, search, 6);

  return (
    <>
      <Button
        color="primary"
        aria-label="add to watchlist"
        onClick={() => setOpen(true)}
      >
        Add to Watchlist
      </Button>

      <BasicDialog
        title="Select a coin"
        type="language"
        open={open}
        setOpen={setOpen}
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
            <WatchlistAddCoinsList currencies={coins} />
          </Box>
        }
      />
    </>
  );
};

export default WatchlistAddCoin;
