import React, { useState } from "react";
import { useTheme } from "@mui/system";
import { Box, TextField } from "@mui/material";
import { useModalStore } from "../../stores/app-settings";
import { useCurrencyReferencesHook } from "../../hooks/currency/currency-references";
import BasicDialog from "../dialog/basic/Index";
import CurrencyMenuPopularGrid from "./components/PopularGrid";
import CurrencyMenuAllGrid from "./components/AllGrid";
import CurrencyMenuNoResults from "./components/NoResults";

const CurrencyMenu = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const { total, size, popularCurrencies, allCurrencies } =
    useCurrencyReferencesHook(page, search);

  const { isOpen, setOpen } = useModalStore((state) => ({
    isOpen: state.isCurrenciesOpen,
    setOpen: state.setIsCurrenciesOpen,
  }));

  return (
    <>
      <BasicDialog
        title="Select a currency"
        type="currency"
        open={isOpen}
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
    </>
  );
};

export default CurrencyMenu;
