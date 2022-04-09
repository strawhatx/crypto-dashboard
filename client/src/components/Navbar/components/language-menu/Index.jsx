import React, { useState, useEffect } from "react";
import {
  all_languages,
  popular_languages,
} from "../../../../assets/i18n/languages";
import { useLanguageStore } from "../../../../stores/app-settings";
import { Box, TextField, IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import BasicDialog from "../../../dialog/Index";
import LanguageImg from "../../../assets/images/language.svg";
import LanguageMenuPopularGrid from "./components/PopularGrid";
import LanguageMenuNoResults from "./components/NoResults";
import LanguageMenuAllGrid from "./components/AllGrid";

const LanguageMenu = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const { i18n } = useTranslation();

  const { selected, update } = useLanguageStore((state) => ({
    selected: state.language,
    update: state.updateLanguage,
  }));

  const handlePopularSearch = () => {
    return popular_languages.filter(
      (lang) =>
        lang.label.toLowerCase().includes(search?.toLowerCase()) ||
        lang.value.toLowerCase().includes(search?.toLowerCase())
    );
  };

  const handleAllSearch = () => {
    return all_languages.filter(
      (lang) =>
        lang.label.toLowerCase().includes(search?.toLowerCase()) ||
        lang.value.toLowerCase().includes(search?.toLowerCase())
    );
  };

  useEffect(() => {
    i18n.changeLanguage(selected.toLowerCase(), () =>
      console.log("language changed")
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <Box sx={{ ml: 2 }}>
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
          src={LanguageImg}
          className="language-img"
          alt="language"
          style={{ margin: "auto" }}
        />
      </IconButton>
      <BasicDialog
        btnTitle={selected}
        title="Select a language"
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
            {handlePopularSearch().length > 0 && (
              <LanguageMenuPopularGrid languages={handlePopularSearch()} />
            )}

            {handleAllSearch().length > 0 && (
              <LanguageMenuAllGrid languages={handleAllSearch()} />
            )}

            {handlePopularSearch().length <= 0 &&
              handleAllSearch().length <= 0 && <LanguageMenuNoResults />}
          </Box>
        }
      />
    </Box>
  );
};

export default LanguageMenu;
