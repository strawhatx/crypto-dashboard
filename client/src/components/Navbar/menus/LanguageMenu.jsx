import React, { useState } from "react";
import { languages } from "../../../assets/i18n/languages";
import { useLanguageStore } from "../../../stores";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";

const LanguageMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const [t, i18n] = useTranslation();

  const { selected, update } = useLanguageStore((state) => ({
    selected: state.selected,
    update: state.update,
  }));

  const fetchLanguages = () => {
    setData(languages);
  };

  const handleSelect = (value) => {
    update(value?.toUpperCase());

    setAnchorEl(null);
  };

  useEffect(() => {
    if (data.length <= 0) {
      fetchLanguages();
    }

    i18n.changeLanguage(selected.toLowerCase(), () =>
      console.log("language changed")
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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
        {data.map((e, i) => (
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

export default LanguageMenu;
