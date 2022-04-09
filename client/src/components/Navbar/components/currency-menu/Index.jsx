import React, { useState } from "react";
import { useTheme } from "@mui/system";
import { Box, TextField, IconButton } from "@mui/material";
import { useCurrencyStore } from "../../../../stores/app-settings";
import { useCurrencyReferencesHook } from "../../../../hooks/currency/currency-references";
import BasicDialog from "../../../dialog/Index";
import CurrencyImg from "../../../../assets/images/currency.svg";
import CurrencyMenuPopularGrid from "./components/PopularGrid";
import CurrencyMenuAllGrid from "./components/AllGrid";
import CurrencyMenuNoResults from "./components/NoResults";

const CurrencyMenu = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const { total, size, popularCurrencies, allCurrencies } =
    useCurrencyReferencesHook(page, search);

  const { selected } = useCurrencyStore((state) => ({
    selected: state.currency.symbol,
  }));

  return (
    <Box>
      <IconButton
        color="primary"
        aria-label="currencies"
        onClick={() => setOpen(true)}
        sx={{
          display: "inline-flex",
          backgroundColor: "transparent",
          border: 0,
          padding: 1,
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          color: "inherit",
        }}
      >
        <img
          src={CurrencyImg}
          className="currency-img"
          alt="currency"
          style={{ margin: "auto" }}
        />
      </IconButton>

      <BasicDialog
        btnTitle={selected}
        title="Select a currency"
        type="currency"
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
            {popularCurrencies.length > 0 && (
              <CurrencyMenuPopularGrid currencies={popularCurrencies} />
            )}

            {allCurrencies.length > 0 && (
              <CurrencyMenuAllGrid
                currencies={allCurrencies}
                total={total}
                size={size}
                setPage={setPage}
              />
            )}

            {popularCurrencies.length <= 0 && allCurrencies.length <= 0 && (
              <CurrencyMenuNoResults />
            )}
          </Box>
        }
      />
    </Box>
  );
};

export default CurrencyMenu;
