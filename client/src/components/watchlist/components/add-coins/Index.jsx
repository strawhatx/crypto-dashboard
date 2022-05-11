import React, { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { useCurrenciesHook } from "../../../../hooks/currencies/currencies";
import WatchlistAddCoinsList from "./components/List";
import BasicDialog from "../../../dialog/Index";
import { useWatchlistStore } from "../../../../stores/app-settings";

const WatchlistAddCoin = () => {
  const page = 1;
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const { coins } = useCurrenciesHook(page, search, 6);

  const { isAddOpen, setIsAddOpen } = useWatchlistStore((state) => ({
    isAddOpen: state.isAddOpen,
    setIsAddOpen: state.setIsAddOpen,
  }));

  return (
    <>
      <Button
        color="primary"
        aria-label="add to watchlist"
        variant="contained"
        onClick={() => setIsAddOpen(true)}
      >
        Add to Watchlist
      </Button>

      <BasicDialog
        title="Select a coin"
        type="language"
        open={isAddOpen}
        setOpen={setIsAddOpen}
        size="xs"
        children={
          <Box>
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
            <WatchlistAddCoinsList currencies={coins} setOpen={setIsAddOpen} />
          </Box>
        }
      />
    </>
  );
};

export default WatchlistAddCoin;
