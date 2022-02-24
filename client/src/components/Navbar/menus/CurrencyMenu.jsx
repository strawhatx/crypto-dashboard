import React, { useState, useEffect } from "react";
import { useCurrencyStore } from "../../../stores";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import axios from "../../../config/axios";

const CurrencyMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const [t, i18n] = useTranslation();

  const { selected, update } = useCurrencyStore((state) => ({
    selected: state.selected,
    update: state.update,
  }));

  const fetchCurrencies = async () => {
    try {
      const { data } = axios.get("/app-currency/");

      setCurrencies(data.data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (value) => {
    update(value?.toUpperCase());

    setAnchorEl(null);
  };

  useEffect(() => {
    fetchCurrencies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        variant="contained"
        sx={{
          border: 1,
          borderColor: "#f5f5f5e3",
          color: theme.palette.primary.contrastText,
          py: theme.spacing(0.25),
          mr: theme.spacing(2),
        }}
      >
        <Typography>{selected}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        {currencies.map((e, i) => (
          <MenuItem
            key={i}
            onClick={() => handleSelect(e.code)}
            sx={{ py: theme.spacing(2), pr: theme.spacing(5) }}
          >
            {e.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CurrencyMenu;
